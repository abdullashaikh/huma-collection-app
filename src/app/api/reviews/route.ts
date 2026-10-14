import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache on server for 1 hour (complies with Google Places API policies allowing up to 30 days)

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  authorPhoto: string | null;
  authorUri: string | null;
  rating: number;
  relativePublishTime: string;
  text: string;
  publishTime?: string;
}

export interface GoogleReviewsApiResponse {
  configured: boolean;
  placeId?: string;
  displayName?: string;
  rating: number | null;
  userRatingCount: number;
  reviews: GoogleReviewItem[];
  googleMapsUri: string;
  error?: boolean;
  message?: string;
}

const DEFAULT_MAPS_URI =
  'https://www.google.com/maps/search/?api=1&query=Huma+Collection,+Near+Markaz+Masjid,+Vyara,+Gujarat+394650';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  // If credentials are not yet configured, return graceful unconfigured payload (never fabricate fake reviews)
  if (!apiKey || !placeId) {
    return NextResponse.json<GoogleReviewsApiResponse>(
      {
        configured: false,
        rating: null,
        userRatingCount: 0,
        reviews: [],
        googleMapsUri: DEFAULT_MAPS_URI,
        message: 'Google Places API credentials (GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID) are not configured in environment variables.',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  }

  try {
    // Google Places API (New) details endpoint
    // Standard solution ID attribution: gmp_git_agentskills_v1
    const endpoint = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews,googleMapsUri',
        'X-Goog-Maps-Solution-ID': 'gmp_git_agentskills_v1',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.warn(`[Google Places API Error] Status ${response.status}:`, errorText);
      return NextResponse.json<GoogleReviewsApiResponse>(
        {
          configured: true,
          error: true,
          rating: null,
          userRatingCount: 0,
          reviews: [],
          googleMapsUri: DEFAULT_MAPS_URI,
          message: `Google Places API returned status ${response.status}.`,
        },
        { status: 200 }
      );
    }

    const data = await response.json();

    const rawReviews = Array.isArray(data.reviews) ? data.reviews : [];

    const mappedReviews: GoogleReviewItem[] = rawReviews.map((r: any, index: number) => {
      const text =
        typeof r.text === 'object' && r.text?.text
          ? r.text.text
          : typeof r.originalText === 'object' && r.originalText?.text
          ? r.originalText.text
          : typeof r.text === 'string'
          ? r.text
          : '';

      return {
        id: r.name || `review-${index}`,
        authorName: r.authorAttribution?.displayName || 'Google Reviewer',
        authorPhoto: r.authorAttribution?.photoUri || null,
        authorUri: r.authorAttribution?.uri || null,
        rating: Number(r.rating) || 5,
        relativePublishTime: r.relativePublishTimeDescription || 'Recently',
        text: text.trim(),
        publishTime: r.publishTime,
      };
    });

    const result: GoogleReviewsApiResponse = {
      configured: true,
      placeId: data.id || placeId,
      displayName: data.displayName?.text || 'Huma Collection',
      rating: typeof data.rating === 'number' ? data.rating : null,
      userRatingCount: typeof data.userRatingCount === 'number' ? data.userRatingCount : 0,
      reviews: mappedReviews,
      googleMapsUri: data.googleMapsUri || DEFAULT_MAPS_URI,
    };

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    console.error('[Google Places API Exception]:', err?.message || err);
    return NextResponse.json<GoogleReviewsApiResponse>(
      {
        configured: true,
        error: true,
        rating: null,
        userRatingCount: 0,
        reviews: [],
        googleMapsUri: DEFAULT_MAPS_URI,
        message: 'Internal server error while retrieving Google reviews.',
      },
      { status: 200 }
    );
  }
}
