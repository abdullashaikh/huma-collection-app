import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://humahijabcollection.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout',
          '/order-confirmation/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/checkout',
          '/order-confirmation/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/icon.svg', '/*.webp', '/*.jpg', '/*.png'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
