import { Metadata } from 'next';
import { Suspense } from 'react';
import { Category, Product } from '../../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../../lib/fallback-data';
import { CollectionClient } from './CollectionClient';

export const metadata: Metadata = {
  title: 'Boutique Collection & Catalogue | Huma Hijab Collection',
  description:
    'Explore our complete catalogue of luxury burqas, breathable hijabs, artisanal non-alcoholic attars, men\'s prayer caps, and Hajj & Umrah travel essentials.',
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

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-stone-500 font-medium">
          Loading boutique collection...
        </div>
      }
    >
      <CollectionClient initialCategories={categories} initialProducts={products} />
    </Suspense>
  );
}
