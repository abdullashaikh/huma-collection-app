import type { Metadata } from 'next';
import { Category, Product } from '../types';

export const SITE_CONFIG = {
  siteUrl: 'https://www.humacollection.in',
  brandName: 'Huma Collection',
  legalName: 'Huma Hijab Collection',
  tagline: 'Hijabs, Abayas, Burqas & Islamic Essentials',
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh',
  storePhone: process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009',
  storePhoneFormatted: process.env.NEXT_PUBLIC_STORE_PHONE_FORMATTED || '+91 82006 17009',
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, ''),
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    'https://www.google.com/maps/search/?api=1&query=Huma+Collection,+Near+Markaz+Masjid,+Vyara,+Gujarat+394650',
  onlineLaunchDate: process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026',
  locale: 'en_IN',
  address: {
    streetAddress: 'Near Markaz Masjid',
    addressLocality: 'Vyara',
    addressRegion: 'Gujarat',
    postalCode: '394650',
    addressCountry: 'IN',
  },
  geo: {
    latitude: '21.1126',
    longitude: '73.3934',
  },
  defaultOgImage: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
};

/**
 * Builds a normalized, absolute HTTPS canonical URL on the primary production domain.
 */
export function absoluteUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return SITE_CONFIG.siteUrl;
  }
  return `${SITE_CONFIG.siteUrl}${cleanPath.replace(/\/+$/, '')}`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Generates standardized, Google-compliant Next.js Metadata.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = SITE_CONFIG.defaultOgImage,
  ogType = 'website',
  noindex = false,
  keywords,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);

  const hasBrand =
    title.includes(SITE_CONFIG.brandName) ||
    title.includes(SITE_CONFIG.legalName) ||
    title.includes('Huma Collection');
  const metadataTitle = hasBrand ? { absolute: title } : title;

  return {
    title: metadataTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.brandName,
      locale: SITE_CONFIG.locale,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Builds Google-compliant JSON-LD Product schema.
 * Never invents ratings, reviews, or GTINs when unavailable.
 */
export function buildProductJsonLd(product: Product, canonicalUrl: string, imageUrls: string[]) {
  const price = product.salePrice || product.basePrice || (product as any).sale_price || (product as any).base_price || 0;
  const inStock = product.status === 'ACTIVE' || !product.status;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: imageUrls.length > 0 ? imageUrls : [SITE_CONFIG.defaultOgImage],
    description: product.shortDescription || product.description,
    sku: product.skuBase || product.slug,
    category: product.categoryName || 'Modest Wear',
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.brandName,
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'INR',
      price: Number(price).toFixed(2),
      priceValidUntil: '2027-12-31',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.brandName,
      },
    },
  };

  // Only include aggregateRating if genuine reviews exist
  if (product.reviewCount && product.reviewCount > 0 && product.averageRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(product.averageRating).toFixed(1),
      reviewCount: product.reviewCount,
    };
  }

  return schema;
}

/**
 * Builds Google-compliant JSON-LD BreadcrumbList schema.
 */
export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Builds Google-compliant JSON-LD FAQPage schema.
 */
export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Builds Google-compliant JSON-LD CollectionPage schema.
 */
export function buildCollectionPageJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
    },
  };
}
