import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Category, Product } from '../../../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../../../lib/fallback-data';
import {
  SITE_CONFIG,
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildPageMetadata,
} from '../../../lib/seo';
import { CategoryPageClient } from './CategoryPageClient';

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
    const products =
      prodJson.data && prodJson.data.length > 0
        ? prodJson.data
        : FALLBACK_PRODUCTS.filter(
            (p) =>
              p.categorySlug === slug ||
              (p as any).category_slug === slug ||
              (category && (p.categoryId === category.id || (p as any).category_id === category.id))
          );

    return {
      category,
      products,
    };
  } catch (err) {
    console.warn('API unavailable for category page, using fallback catalog.');
    const category = FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
    const products = FALLBACK_PRODUCTS.filter(
      (p) =>
        p.categorySlug === slug ||
        (p as any).category_slug === slug ||
        (category && (p.categoryId === category.id || (p as any).category_id === category.id))
    );
    return { category, products };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Burqa category has a dedicated canonical route at /burqa
  if (params.slug === 'burqa') {
    return buildPageMetadata({
      title: 'Designer Burqa Collection | Huma Collection',
      description:
        'Explore our signature modest burqas. Luxury Korean Crepe front-open, Emirati butterfly flare, and 360-degree umbrella cuts designed with modest proportions.',
      path: '/burqa',
    });
  }

  const { category } = await getCategoryData(params.slug);
  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = category.seoTitle || `${category.name} | ${SITE_CONFIG.brandName}`;
  const description =
    category.seoDescription ||
    category.description ||
    `Explore our curated selection of ${category.name} at ${SITE_CONFIG.brandName}. Modest styles and premium fabrics.`;

  return buildPageMetadata({
    title,
    description,
    path: `/category/${category.slug}`,
    ogImage: category.imageUrl || SITE_CONFIG.defaultOgImage,
  });
}

export default async function CategoryPage({ params }: Props) {
  // Route consolidation: redirect /category/burqa to dedicated /burqa landing page
  if (params.slug === 'burqa') {
    redirect('/burqa');
  }

  const { category, products } = await getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  const canonicalPath = `/category/${category.slug}`;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collection' },
    { name: category.name, path: canonicalPath },
  ]);

  const collectionJsonLd = buildCollectionPageJsonLd(
    `${category.name} | ${SITE_CONFIG.brandName}`,
    category.description || `Shop premium ${category.name} at ${SITE_CONFIG.brandName}`,
    canonicalPath
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <CategoryPageClient category={category} initialProducts={products} />
    </>
  );
}
