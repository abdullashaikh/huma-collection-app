import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '../../components/product/ProductCard';
import { Product } from '../../types';
import { FALLBACK_PRODUCTS } from '../../lib/fallback-data';

export const metadata: Metadata = {
  title: {
    absolute: 'Designer Burqa Collection | Huma Collection',
  },
  description:
    'Explore our signature modest burqas. Luxury Korean Crepe front-open, Emirati butterfly flare, and 360-degree umbrella cuts designed with modest proportions.',
  alternates: {
    canonical: 'https://www.humacollection.in/burqa',
  },
  openGraph: {
    title: 'Designer Burqa Collection | Huma Collection',
    description:
      'Explore our signature modest burqas. Luxury Korean Crepe front-open, Emirati butterfly flare, and 360-degree umbrella cuts designed with modest proportions.',
    url: 'https://www.humacollection.in/burqa',
    siteName: 'Huma Collection',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Designer Burqa Collection — Huma Collection',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designer Burqa Collection | Huma Collection',
    description:
      'Explore our signature modest burqas. Luxury Korean Crepe front-open, Emirati butterfly flare, and 360-degree umbrella cuts designed with modest proportions.',
  },
};

interface BurqaPageProps {
  searchParams: {
    sort?: string;
    search?: string;
    fabric?: string;
    style?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

async function getBurqaProducts(searchParams: BurqaPageProps['searchParams']): Promise<{
  products: Product[];
  meta: any;
}> {
  const queryParams = new URLSearchParams();
  queryParams.set('category', 'burqa');
  if (searchParams.sort) queryParams.set('sort', searchParams.sort);
  if (searchParams.search) queryParams.set('search', searchParams.search);
  if (searchParams.fabric) queryParams.set('fabric', searchParams.fabric);
  if (searchParams.style) queryParams.set('style', searchParams.style);
  if (searchParams.minPrice) queryParams.set('minPrice', searchParams.minPrice);
  if (searchParams.maxPrice) queryParams.set('maxPrice', searchParams.maxPrice);
  if (searchParams.page) queryParams.set('page', searchParams.page);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products?${queryParams.toString()}`,
      { cache: 'no-store' }
    );
    const json = await res.json();
    const products = json.data && json.data.length > 0 ? json.data : FALLBACK_PRODUCTS;
    return {
      products,
      meta: json.meta || {},
    };
  } catch (err) {
    console.warn('API unavailable, using local burqa products catalog.');
    return { products: FALLBACK_PRODUCTS, meta: {} };
  }
}

export default async function BurqaCategoryPage({ searchParams }: BurqaPageProps) {
  const { products, meta } = await getBurqaProducts(searchParams);

  const fabrics = [
    { label: 'All Fabrics', value: '' },
    { label: 'Pure Korean Crepe', value: 'Korean' },
    { label: 'Saudi Nida Matte', value: 'Nida' },
    { label: 'Firdaus Georgette', value: 'Georgette' },
  ];

  const styles = [
    { label: 'All Silhouettes', value: '' },
    { label: 'Front Open', value: 'Front' },
    { label: 'Butterfly Flare', value: 'Butterfly' },
    { label: '360 Umbrella Cut', value: 'Umbrella' },
  ];

  const sortOptions = [
    { label: 'Bestselling', value: 'bestseller' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  const jsonLdBreadcrumb = {
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
        name: 'Burqa Collection',
        item: 'https://www.humacollection.in/burqa',
      },
    ],
  };

  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Designer Burqa Collection | Huma Collection',
    description: 'Explore our signature modest burqas. Luxury Korean Crepe front-open, Emirati butterfly flare, and 360-degree umbrella cuts designed with modest proportions.',
    url: 'https://www.humacollection.in/burqa',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />

      {/* Header Banner */}
      <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-dark text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Huma Signature</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian">
          Burqa Collection
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Crafted with reverence for modest values. Flowing fabrics, meticulous hand-finishing, and silhouettes designed to provide complete, dignified coverage.
        </p>
        <div className="pt-1">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs">
            <span>🏛️ In-Store Boutique Showcase • Online Shopping November 2026</span>
            <span className="text-stone-300">•</span>
            <a href="tel:+918200617009" className="font-bold text-brand-obsidian hover:underline">
              Call: 8200617009
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Quick Style Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1 mr-1 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Style:
          </span>
          {styles.map((s) => {
            const isSelected = (searchParams.style || '') === s.value;
            return (
              <Link
                key={s.label}
                href={`/burqa?${new URLSearchParams({ ...searchParams, style: s.value, page: '1' }).toString()}`}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-brand-obsidian text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-xs text-stone-500 font-medium">Sort By:</span>
          <div className="flex gap-1.5">
            {sortOptions.map((opt) => {
              const isSelected = (searchParams.sort || 'bestseller') === opt.value;
              return (
                <Link
                  key={opt.value}
                  href={`/burqa?${new URLSearchParams({ ...searchParams, sort: opt.value }).toString()}`}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-brand-gold/20 text-brand-gold-dark font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid & Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-sm font-bold text-brand-obsidian flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              {(searchParams.fabric || searchParams.style || searchParams.minPrice || searchParams.search) && (
                <Link href="/burqa" className="text-[11px] text-red-600 hover:underline font-semibold">
                  Reset All
                </Link>
              )}
            </div>

            {/* Fabric Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">Fabric</h4>
              <div className="space-y-2">
                {fabrics.map((f) => (
                  <Link
                    key={f.label}
                    href={`/burqa?${new URLSearchParams({ ...searchParams, fabric: f.value, page: '1' }).toString()}`}
                    className={`block text-xs py-1 transition-colors ${
                      (searchParams.fabric || '') === f.value
                        ? 'font-bold text-brand-gold-dark'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {f.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Height / Size Reference Guide */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Height Sizing</h4>
              <ul className="text-[11px] text-stone-500 space-y-1">
                <li>• <strong>Size 52:</strong> Height 5&apos;1&quot; - 5&apos;2&quot;</li>
                <li>• <strong>Size 54:</strong> Height 5&apos;3&quot; - 5&apos;4&quot;</li>
                <li>• <strong>Size 56:</strong> Height 5&apos;5&quot; - 5&apos;6&quot;</li>
                <li>• <strong>Size 58:</strong> Height 5&apos;7&quot; - 5&apos;8&quot;</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
              <p className="text-sm font-semibold text-brand-obsidian">No Burqa pieces match your filter criteria.</p>
              <p className="text-xs text-stone-500 mt-1">Try clearing some filters to see our full catalogue.</p>
              <Link
                href="/burqa"
                className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-brand-obsidian text-white text-xs font-semibold"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
