import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout',
          '/order-confirmation/',
          '/track-order',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/checkout',
          '/order-confirmation/',
          '/track-order',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/icon.svg',
          '/favicon.ico',
          '/*.webp',
          '/*.jpg',
          '/*.png',
          '/*.svg',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
