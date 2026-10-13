import { MetadataRoute } from 'next';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../lib/fallback-data';
import { SITE_CONFIG } from '../lib/seo';
import { Category, Product } from '../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.siteUrl;

  // Stable release date for static pages rather than dynamically generating "now" on every crawl
  const staticContentDate = new Date('2026-10-10T00:00:00.000Z');

  // 1. Fetch live categories & products from API, or use verified fallback catalog
  let categories: Category[] = FALLBACK_CATEGORIES;
  let products: Product[] = FALLBACK_PRODUCTS;

  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/categories`, {
        cache: 'no-store',
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products?limit=200`, {
        cache: 'no-store',
      }),
    ]);

    if (catRes.ok) {
      const catJson = await catRes.json();
      if (catJson.data && Array.isArray(catJson.data) && catJson.data.length > 0) {
        categories = catJson.data;
      }
    }

    if (prodRes.ok) {
      const prodJson = await prodRes.json();
      if (prodJson.data && Array.isArray(prodJson.data) && prodJson.data.length > 0) {
        products = prodJson.data;
      }
    }
  } catch (err) {
    // Graceful fallback during static build without crashing
  }

  // 2. Static High-Priority Core & Informational Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: staticContentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/burqa`,
      lastModified: staticContentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: staticContentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticContentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticContentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/size-guide`,
      lastModified: staticContentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: staticContentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: staticContentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: staticContentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticContentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticContentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 3. Dynamic Category Landing Pages (excluding dedicated /burqa route to eliminate duplicates)
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((cat) => cat.isActive !== false && cat.slug !== 'burqa')
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: (cat as any).updatedAt || (cat as any).updated_at ? new Date((cat as any).updatedAt || (cat as any).updated_at) : staticContentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

  // 4. Dynamic Product Detail Pages (routing burqas to /burqa/[slug] and others to /product/[slug])
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((prod) => prod.status === 'ACTIVE' || !prod.status)
    .map((prod) => {
      const isBurqa =
        prod.categorySlug === 'burqa' ||
        (prod as any).category_slug === 'burqa' ||
        prod.categoryId === 1 ||
        (prod as any).category_id === 1;
      const path = isBurqa ? `/burqa/${prod.slug}` : `/product/${prod.slug}`;
      const lastMod =
        (prod as any).updatedAt || (prod as any).updated_at
          ? new Date((prod as any).updatedAt || (prod as any).updated_at)
          : staticContentDate;

      return {
        url: `${baseUrl}${path}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: prod.isBestseller || prod.isFeatured ? 0.9 : 0.8,
      };
    });

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
