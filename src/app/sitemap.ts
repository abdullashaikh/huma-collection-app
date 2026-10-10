import { MetadataRoute } from 'next';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../lib/fallback-data';
import { Category, Product } from '../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://humahijabcollection.com';
  const now = new Date();

  // 1. Fetch live categories & products from API, or use fallback
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

  // 2. Static High-Priority Core Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/burqa`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collection?audience=WOMEN`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/collection?audience=MEN`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collection?audience=ALL`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 3. Dynamic Category Landing Pages
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((cat) => cat.isActive !== false)
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: cat.slug === 'burqa' ? 0.95 : 0.85,
    }));

  // 4. Dynamic Product Detail Pages
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((prod) => prod.status === 'ACTIVE' || !prod.status)
    .map((prod) => {
      const isBurqa = prod.categorySlug === 'burqa' || prod.categoryId === 1;
      const path = isBurqa ? `/burqa/${prod.slug}` : `/product/${prod.slug}`;
      const lastMod = (prod as any).updatedAt || (prod as any).updated_at ? new Date((prod as any).updatedAt || (prod as any).updated_at) : now;
      return {
        url: `${baseUrl}${path}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: prod.isBestseller || prod.isFeatured ? 0.9 : 0.8,
      };
    });

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
