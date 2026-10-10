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
      canonical: `https://humahijabcollection.com/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category, products } = await getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Category Header with FadeUp */}
      <FadeUp className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">Huma Modest</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian">{category.name}</h1>
        {category.description && (
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">{category.description}</p>
        )}
      </FadeUp>

      {/* Grid with StaggerContainer */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <p className="text-sm font-semibold text-brand-obsidian">Fresh pieces arriving soon for {category.name}.</p>
          <p className="text-xs text-stone-500 mt-1">Explore our signature Burqa collection in the meantime.</p>
          <Link
            href="/burqa"
            className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-brand-obsidian text-white text-xs font-semibold"
          >
            Explore Burqa Collection
          </Link>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
