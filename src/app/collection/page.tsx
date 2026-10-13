import { Metadata } from 'next';
import { Suspense } from 'react';
import { Category, Product } from '../../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../../lib/fallback-data';
import { CollectionClient } from './CollectionClient';

export const metadata: Metadata = {
  title: {
    absolute: 'All Modest Collections & Catalogue | Huma Collection',
  },
  description:
    'Explore our complete modest wear catalogue including luxury burqas, designer abayas, breathable hijabs, non-alcoholic attars, and Islamic prayer essentials.',
  alternates: {
    canonical: 'https://www.humacollection.in/collection',
  },
  openGraph: {
    title: 'All Modest Collections & Catalogue | Huma Collection',
    description:
      'Explore our complete modest wear catalogue including luxury burqas, designer abayas, breathable hijabs, non-alcoholic attars, and Islamic prayer essentials.',
    url: 'https://www.humacollection.in/collection',
    siteName: 'Huma Collection',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'All Modest Collections — Huma Collection',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Modest Collections & Catalogue | Huma Collection',
    description:
      'Explore our complete modest wear catalogue including luxury burqas, designer abayas, breathable hijabs, non-alcoholic attars, and Islamic prayer essentials.',
  },
};

async function getCollectionData(): Promise<{
  categories: Category[];
  products: Product[];
}> {
  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/categories`, {
        cache: 'no-store',
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products?limit=100`, {
        cache: 'no-store',
      }),
    ]);

    const catJson = await catRes.json();
    const prodJson = await prodRes.json();

    const categories = catJson.data && catJson.data.length > 0 ? catJson.data : FALLBACK_CATEGORIES;
    const products = prodJson.data && prodJson.data.length > 0 ? prodJson.data : FALLBACK_PRODUCTS;

    return { categories, products };
  } catch (err) {
    console.warn('API unavailable for collection page, using fallback dataset.');
    return { categories: FALLBACK_CATEGORIES, products: FALLBACK_PRODUCTS };
  }
}

export default async function CollectionPage() {
  const { categories, products } = await getCollectionData();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Modest Collections | Huma Collection',
    description:
      'Complete catalogue of luxury burqas, designer abayas, breathable hijabs, non-alcoholic attars, and pilgrimage essentials.',
    url: 'https://www.humacollection.in/collection',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-stone-500 font-medium">
            Loading boutique collection...
          </div>
        }
      >
        <CollectionClient initialCategories={categories} initialProducts={products} />
      </Suspense>
    </>
  );
}
