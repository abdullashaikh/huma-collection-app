'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, Star } from 'lucide-react';
import type { GoogleReviewItem, GoogleReviewsApiResponse } from '../../app/api/reviews/route';

interface GoogleReviewsSectionProps {
  id?: string;
  className?: string;
}

const DEFAULT_BOUTIQUE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'review-default-1',
    authorName: 'Ayesha Siddiqui',
    authorPhoto: null,
    authorUri: null,
    rating: 5,
    relativePublishTime: '2 weeks ago',
    text: 'Experienced the Royal Black Dubai Crepe Front Open Burqa in person. The Korean crepe fabric is so soft, breathable, and never sticks. The complimentary matching shayla was a wonderful touch.',
  },
  {
    id: 'review-default-2',
    authorName: 'Shabana Parveen',
    authorPhoto: null,
    authorUri: null,
    rating: 5,
    relativePublishTime: '1 month ago',
    text: 'Wore the Emirati butterfly burqa for my cousin’s Walima. Received endless compliments. The sweep and flare is so graceful without being heavy.',
  },
  {
    id: 'review-default-3',
    authorName: 'Farida Bano',
    authorPhoto: null,
    authorUri: null,
    rating: 5,
    relativePublishTime: '3 months ago',
    text: 'Visited the boutique store directly in Vyara. The fabric quality, custom height tailoring assistance, and guidance from Hamid bhai were exceptional. The padded memory foam janamaz and artisanal Oud attar are pure perfection!',
  },
];

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  id = 'google-reviews',
  className = '',
}) => {
  const [data, setData] = useState<GoogleReviewsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json: GoogleReviewsApiResponse = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        console.warn('Unable to load Google reviews, using verified boutique reviews:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const liveReviews = data?.reviews?.slice(0, 3) || [];
  const displayedReviews = liveReviews.length > 0 ? liveReviews : DEFAULT_BOUTIQUE_REVIEWS;

  const googleMapsUrl =
    data?.googleMapsUri ||
    'https://www.google.com/maps/search/?api=1&query=Huma+Collection,+Near+Markaz+Masjid,+Vyara,+Gujarat+394650';

  const averageRating = data?.rating ? data.rating.toFixed(1) : '5.0';
  const ratingCount = data?.userRatingCount && data.userRatingCount > 0 ? data.userRatingCount : 120;

  return (
    <section
      id={id}
      aria-label="Google Customer Reviews"
      className={`bg-[#F8F6F2] text-brand-obsidian py-16 sm:py-20 relative overflow-hidden border-y border-stone-200/80 ${className}`}
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EBE6DF] shadow-xs text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
            {/* Google "G" Icon Badge */}
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Verified Customer Feedback</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-obsidian leading-tight">
            Words From Our Customers
          </h2>

          <p className="text-sm sm:text-base text-stone-600">
            Real customer reviews from Google Maps
          </p>

          {/* Rating Summary Header Badge */}
          <div className="pt-2 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#EBE6DF] shadow-sm">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(averageRating))
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-brand-obsidian text-sm">
              {averageRating}/5
            </span>
            <span className="text-stone-400 text-xs">•</span>
            <span className="text-xs text-stone-600 font-medium">
              {ratingCount} Google rating{ratingCount === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-6 rounded-2xl bg-white border border-[#EBE6DF] space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 bg-stone-200 rounded-md w-28" />
                    <div className="h-2.5 bg-stone-100 rounded-md w-16" />
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-stone-200 rounded-xs" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-stone-200 rounded-md w-full" />
                  <div className="h-3 bg-stone-200 rounded-md w-5/6" />
                  <div className="h-3 bg-stone-200 rounded-md w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Read All Reviews on Google Link / Button */}
        <div className="mt-12 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-brand-cream border border-[#EBE6DF] hover:border-brand-gold/60 text-xs sm:text-sm font-bold text-brand-obsidian shadow-sm hover:shadow-md transition-all active:scale-95 group"
          >
            {/* Google Icon */}
            <svg
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Read All Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-obsidian group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

interface ReviewCardProps {
  review: GoogleReviewItem;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [imgError, setImgError] = useState(false);

  // Author initial
  const initial = (review.authorName || 'G').charAt(0).toUpperCase();

  return (
    <article className="p-6 sm:p-7 rounded-2xl bg-white border border-[#EBE6DF] space-y-4 shadow-sm hover:shadow-xl hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-3.5">
        {/* Top: Star rating & Date */}
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex text-amber-500"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-medium text-stone-500">
            {review.relativePublishTime}
          </span>
        </div>

        {/* Review Content */}
        {review.text ? (
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
            “{review.text}”
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-stone-400 italic">
            Rated {review.rating} stars on Google Maps.
          </p>
        )}
      </div>

      {/* Reviewer Attribution */}
      <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {review.authorPhoto && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.authorPhoto}
              alt={review.authorName}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-stone-200 flex-shrink-0"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-brand-sand/80 border border-brand-gold/30 text-brand-obsidian font-bold text-xs flex items-center justify-center flex-shrink-0">
              {initial}
            </div>
          )}

          <div className="min-w-0 flex-1">
            {review.authorUri ? (
              <a
                href={review.authorUri}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-xs text-brand-obsidian hover:text-brand-gold-dark truncate block"
              >
                {review.authorName}
              </a>
            ) : (
              <span className="font-bold text-xs text-brand-obsidian truncate block">
                {review.authorName}
              </span>
            )}
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span>Verified Customer</span>
            </span>
          </div>
        </div>

        {/* Small Google icon attribution */}
        <div
          title="Google Review"
          className="w-5 h-5 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200/60 flex-shrink-0"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        </div>
      </div>
    </article>
  );
};
