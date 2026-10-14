import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { HeroSection } from '../components/home/HeroSection';
import { OnlineShoppingComingSoon } from '../components/home/OnlineShoppingComingSoon';
import { MarqueeBanner } from '../components/home/MarqueeBanner';
import { BrandCraftsmanshipSection } from '../components/home/BrandCraftsmanshipSection';
import { InstagramReelsGallery } from '../components/home/InstagramReelsGallery';
import { GoogleMapSection } from '../components/home/GoogleMapSection';
import { GoogleReviewsSection } from '../components/home/GoogleReviewsSection';
import { Category, Product } from '../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../lib/fallback-data';

export const metadata: Metadata = {
  title: 'Huma Collection | Hijabs, Abayas, Burqas & Islamic Essentials',
  description:
    'Discover elegant hijabs, abayas, burqas, niqabs, perfumes, attar and Islamic essentials at Huma Collection. Explore modest fashion and find products that suit your style.',
  alternates: {
    canonical: 'https://www.humacollection.in',
  },
  openGraph: {
    title: 'Huma Collection | Hijabs, Abayas, Burqas & Islamic Essentials',
    description:
      'Discover elegant hijabs, abayas, burqas, niqabs, perfumes, attar and Islamic essentials at Huma Collection. Explore modest fashion and find products that suit your style.',
    url: 'https://www.humacollection.in',
    siteName: 'Huma Collection',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Huma Collection — Hijabs, Abayas, Burqas & Islamic Essentials',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huma Collection | Hijabs, Abayas, Burqas & Islamic Essentials',
    description:
      'Discover elegant hijabs, abayas, burqas, niqabs, perfumes, attar and Islamic essentials at Huma Collection.',
    images: ['https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85'],
  },
};

async function getHomeData(): Promise<{
  products: Product[];
  categories: Category[];
  heroProduct: Product | null;
}> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://api.humacollection.in/api/v1').replace(/\/+$/, '');
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    const [prodRes, catRes] = await Promise.all([
      fetch(`${apiUrl}/products?limit=100`, {
        next: { revalidate: 60 },
        signal: controller.signal,
      }),
      fetch(`${apiUrl}/categories`, {
        next: { revalidate: 300 },
        signal: controller.signal,
      }),
    ]);
    clearTimeout(timer);

    const prods = await prodRes.json().catch(() => ({ data: [] }));
    const cats = await catRes.json().catch(() => ({ data: [] }));

    const products: Product[] = prods.data && prods.data.length > 0 ? prods.data : [...FALLBACK_PRODUCTS];
    const categories: Category[] = cats.data && cats.data.length > 0 ? cats.data : [...FALLBACK_CATEGORIES];

    // Ensure every category has required items by supplementing from FALLBACK_PRODUCTS
    const seenIds = new Set(products.map((p) => p.id));
    for (const fbItem of FALLBACK_PRODUCTS) {
      const fbCat = (fbItem.categorySlug || '').toLowerCase();
      const currentCatCount = products.filter(
        (p) => (p.categorySlug || (p as any).category_slug || '').toLowerCase() === fbCat
      ).length;
      const targetCount = fbCat === 'abaya' ? 4 : 2;
      if (currentCatCount < targetCount && !seenIds.has(fbItem.id)) {
        products.push(fbItem);
        seenIds.add(fbItem.id);
      }
    }

    const allCandidates = [...products];

    // Priority for Hero Showcase Product:
    const heroProduct =
      allCandidates.find((p) => {
        const rawTags = Array.isArray(p.tags) ? p.tags.join(' ') : String(p.tags || '');
        return rawTags.toLowerCase().includes('hero');
      }) ||
      allCandidates.find((p) => {
        const cat = (p.categorySlug || (p as any).category_slug || '').toLowerCase();
        return cat.includes('abaya') && Boolean(p.isFeatured || (p as any).is_featured);
      }) ||
      allCandidates.find((p) => {
        const cat = (p.categorySlug || (p as any).category_slug || '').toLowerCase();
        return cat.includes('abaya');
      }) ||
      FALLBACK_PRODUCTS.find((p) => p.categorySlug === 'abaya') ||
      null;

    return {
      products,
      categories,
      heroProduct,
    };
  } catch (err) {
    console.warn('API unavailable, falling back to local dataset for home data.');
    const fallbackAbaya = FALLBACK_PRODUCTS.find((p) => p.categorySlug === 'abaya') || FALLBACK_PRODUCTS[0];
    return {
      products: FALLBACK_PRODUCTS,
      categories: FALLBACK_CATEGORIES,
      heroProduct: fallbackAbaya,
    };
  }
}

export default async function HomePage() {
  const { products, categories, heroProduct } = await getHomeData();

  // 1. Abayas: Show 4 items AT FIRST (per user request)
  const abayaProducts = products
    .filter((p) => {
      const slug = (p.categorySlug || (p as any).category_slug || '').toLowerCase();
      const name = (p.name || '').toLowerCase();
      return slug === 'abaya' || p.categoryId === 3 || (p as any).category_id === 3 || name.includes('abaya');
    })
    .slice(0, 4);

  const selectedAbayaIds = new Set(abayaProducts.map((p) => p.id));

  // 2. Each other category: Show 2 items (per user request)
  const preferredCategoryOrder = ['burqa', 'hijab', 'niqab', 'perfume-attar', 'janamaz', 'topi', 'hajj-umrah', 'tasbih', 'jewellery'];

  const otherCategories = [...categories]
    .filter((c) => c.slug !== 'abaya' && !c.parentId)
    .sort((a, b) => {
      const idxA = preferredCategoryOrder.indexOf(a.slug);
      const idxB = preferredCategoryOrder.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });

  const otherCategorized = otherCategories
    .map((cat) => {
      const catItems = products
        .filter((p) => {
          if (selectedAbayaIds.has(p.id)) return false;
          const pSlug = (p.categorySlug || (p as any).category_slug || '').toLowerCase();
          const pId = p.categoryId || (p as any).category_id;
          const pName = (p.categoryName || '').toLowerCase();
          return (
            pSlug === cat.slug.toLowerCase() ||
            pId === cat.id ||
            (pName && pName === cat.name.toLowerCase())
          );
        })
        .slice(0, 2);

      return {
        category: cat,
        items: catItems,
      };
    })
    .filter((group) => group.items.length > 0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Huma Hijab Collection boutique located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Huma Hijab Collection is located near Teen Darwaza on Relief Road in Ahmedabad, Gujarat, India. You can visit in person to experience our luxury Saudi Nida and Korean Crepe fabrics.',
        },
      },
      {
        '@type': 'Question',
        name: 'What fabrics are used in your luxury burqas and abayas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in genuine imported Korean Crepe, Saudi Nida Matte, Dubai Georgette, and Turkish Chiffon with 100% opacity and generous modest flare.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer custom sizing and bespoke alterations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide in-store bespoke tailoring and length alterations (sizes 50 through 62) to guarantee a modest fit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the attars and perfumes 100% non-alcoholic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our artisanal concentrated attars and Arabian ouds are 100% alcohol-free and Halal-compliant.',
        },
      },
      {
        '@type': 'Question',
        name: 'When does online shopping and doorstep delivery launch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Online checkout with nationwide home delivery officially launches in November 2026. Today, customers can browse our complete digital catalogue and call or visit our boutique.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="space-y-16 sm:space-y-24 pb-16 bg-brand-cream text-brand-dark">
        {/* 1. Cinematic Hero Section (Server-rendered HTML for instant H1 paint) */}
        <HeroSection heroProduct={heroProduct} />

        {/* 2. Official Online Shopping Coming Soon Announcement Banner */}
        <OnlineShoppingComingSoon />

        {/* 3. Luxury Continuous Marquee Ribbon */}
        <MarqueeBanner />

        {/* 4. PRIMARY FLAGSHIP SHOWCASE (Commented out per user request) */}
        {/*
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-brand-ivory via-white to-brand-ivory rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-luxury">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Primary Specialization</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-obsidian">
                  {primaryCat ? `Signature ${primaryCat.name} Masterpieces` : 'Signature Modest Masterpieces'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                  {primaryCat?.description ||
                    'Front-open, butterfly flare, and 360-degree umbrella cuts. Tailored with authentic Korean Crepe and Saudi Nida fabrics.'}
                </p>
              </div>

              <Link
                href={primaryCat?.slug === 'burqa' ? '/burqa' : `/category/${primaryCat?.slug || 'burqa'}`}
                className="inline-flex items-center gap-2.5 text-xs font-bold text-brand-obsidian hover:text-brand-gold-dark tracking-wide uppercase group flex-shrink-0 min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-brand-gold/60 shadow-sm transition-all active:scale-95"
              >
                <span>View Complete Catalog</span>
                <span className="w-7 h-7 rounded-full bg-brand-sand flex items-center justify-center text-brand-obsidian group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {primaryProducts.length > 0 ? (
                primaryProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                products.slice(0, 4).map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        */}

        {/* 5. Editorial Craftsmanship Section (Commented out per user request) */}
        {/* <BrandCraftsmanshipSection /> */}

        {/* Curated Category Showcase (Abaya: 4 items first, then 2 items for each other category) */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
          {/* Main Showcase Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Curated Boutique Catalogue</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-brand-obsidian">
                Explore Our Modest Masterpieces
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Master-crafted modest wear, premium Saudi crepe abayas, breathable Turkish hijabs, and authentic Islamic essentials.
              </p>
            </div>

            <Link
              href="/collection"
              className="inline-flex items-center gap-2.5 text-xs font-bold text-brand-obsidian hover:text-brand-gold-dark tracking-wide uppercase group flex-shrink-0 min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-brand-gold/60 shadow-sm transition-all active:scale-95 self-start md:self-end"
            >
              <span>Explore All Collections</span>
              <span className="w-7 h-7 rounded-full bg-brand-sand flex items-center justify-center text-brand-obsidian group-hover:bg-brand-gold group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* 1. Abayas: 4 items AT FIRST */}
          {abayaProducts.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                      Featured Abayas
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold-dark border border-brand-gold/30">
                      4 Signature Pieces
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-brand-obsidian mt-0.5 tracking-tight">
                    Signature Abayas
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5 max-w-xl">
                    Fluid silhouettes, imported Korean Crepe, wudu-friendly snap cuffs, and modest drape.
                  </p>
                </div>
                <Link
                  href="/category/abaya"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold-dark hover:text-brand-obsidian transition-colors self-start sm:self-auto"
                >
                  <span>View All Abayas</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {abayaProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Each Other Category: 2 items */}
          {otherCategorized.map(({ category, items }) => (
            <div key={category.id} className="space-y-6 pt-10 border-t border-stone-200/80">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                      {category.audience === 'MEN' ? "Men's Collection" : category.audience === 'ALL' ? "Islamic Essentials" : "Women's Collection"}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      2 Featured Items
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-brand-obsidian mt-0.5 tracking-tight">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5 max-w-xl">
                      {category.description}
                    </p>
                  )}
                </div>
                <Link
                  href={category.slug === 'burqa' ? '/burqa' : `/category/${category.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold-dark hover:text-brand-obsidian transition-colors self-start sm:self-auto"
                >
                  <span>View All {category.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {items.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 7. Instagram Lookbook / Reels Gallery in Motion */}
        <InstagramReelsGallery />

        {/* 8. Interactive Google Map & Physical Store Visit Section */}
        <GoogleMapSection />

        {/* 9. Verified Customer Reviews & Google Ratings */}
        <GoogleReviewsSection />
      </div>
    </>
  );
}
