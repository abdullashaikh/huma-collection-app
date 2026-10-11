import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '../../../components/product/ProductCard';
import { FadeUp, StaggerContainer, StaggerItem } from '../../../components/ui/Motion';
import { Category, Product } from '../../../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../../../lib/fallback-data';

interface Props {
  params: { slug: string };
}

async function getCategoryData(slug: string): Promise<{
  category: Category | null;
  products: Product[];
}> {
  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/categories/${slug}`, {
        cache: 'no-store',
      }),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products?category=${slug}&limit=24`,
        { cache: 'no-store' }
      ),
    ]);

    const catJson = await catRes.json();
    const prodJson = await prodRes.json();

    const category = catJson.data || FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
    const products = prodJson.data && prodJson.data.length > 0 ? prodJson.data : FALLBACK_PRODUCTS.filter((p) => p.categorySlug === slug);

    return {
      category,
      products,
    };
  } catch (err) {
    console.warn('API unavailable for category page, using fallback catalog.');
    const category = FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
    const products = FALLBACK_PRODUCTS.filter((p) => p.categorySlug === slug || (slug === 'burqa' && p.categoryId === 1));
    return { category, products };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await getCategoryData(params.slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: category.seoTitle || `${category.name} | Huma Hijab Collection`,
    description: category.seoDescription || category.description || 'Shop modest collection.',
    alternates: {
      canonical: `https://www.humacollection.in/category/${category.slug}`,
    },
  };
}

import { CategoryPageClient } from './CategoryPageClient';

export default async function CategoryPage({ params }: Props) {
  const { category, products } = await getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.humacollection.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://www.humacollection.in/category/${category.slug}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} | Huma Hijab Collection`,
    description: category.description || `Shop premium ${category.name} at Huma Hijab Collection`,
    url: `https://www.humacollection.in/category/${category.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <CategoryPageClient category={category} initialProducts={products} />
    </>
  );
}
