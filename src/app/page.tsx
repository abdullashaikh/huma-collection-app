import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '../components/product/ProductCard';
import { HeroSection } from '../components/home/HeroSection';
import { OnlineShoppingComingSoon } from '../components/home/OnlineShoppingComingSoon';
import { MarqueeBanner } from '../components/home/MarqueeBanner';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { BrandCraftsmanshipSection } from '../components/home/BrandCraftsmanshipSection';
import { InstagramReelsGallery } from '../components/home/InstagramReelsGallery';
import { StoreVisitSection } from '../components/home/StoreVisitSection';
import { FadeUp, SectionReveal, StaggerContainer, StaggerItem } from '../components/ui/Motion';
import { Category, Product } from '../types';
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../lib/fallback-data';

async function getHomeData(): Promise<{
  products: Product[];
  categories: Category[];
}> {
  try {
    const [prodRes, catRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products?limit=12&sort=bestseller`, {
        cache: 'no-store',
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/categories`, {
        cache: 'no-store',
      }),
    ]);

    const prods = await prodRes.json();
    const cats = await catRes.json();

    const products = prods.data && prods.data.length > 0 ? prods.data : FALLBACK_PRODUCTS;
    const categories = cats.data && cats.data.length > 0 ? cats.data : FALLBACK_CATEGORIES;

    return {
      products,
      categories,
    };
  } catch (err) {
    console.warn('API unavailable, falling back to local dataset for home data.');
    return { products: FALLBACK_PRODUCTS, categories: FALLBACK_CATEGORIES };
  }
}

export default async function HomePage() {
  const { products, categories } = await getHomeData();

  // Primary category (Burqa or first published category)
  const primaryCat = categories.find((c) => c.slug === 'burqa') || categories[0];

  const primaryProducts = products.filter(
    (p) => primaryCat && (p.categoryId === primaryCat.id || (p as any).category_id === primaryCat.id || p.categorySlug === primaryCat.slug)
  );

  const otherProducts = products.filter(
    (p) => !primaryCat || (p.categoryId !== primaryCat.id && (p as any).category_id !== primaryCat.id && p.categorySlug !== primaryCat.slug)
  );

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
      {/* 1. Cinematic Hero Section with Staggered Motion */}
      <HeroSection />

      {/* 2. Official Online Shopping Coming Soon Announcement Banner */}
      <OnlineShoppingComingSoon />

      {/* 3. Luxury Continuous Marquee Ribbon */}
      <MarqueeBanner />

      {/* 4. Curated Category Showcase (Architectural Arches & Motion) */}
      <CategoryShowcase categories={categories} />

      {/* 5. PRIMARY FLAGSHIP SHOWCASE */}
      <SectionReveal id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-brand-ivory via-white to-brand-ivory rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-luxury">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
          </FadeUp>

          {/* Staggered Product Grid */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {primaryProducts.length > 0 ? (
              primaryProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))
            ) : (
              products.slice(0, 4).map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))
            )}
          </StaggerContainer>
        </div>
      </SectionReveal>

      {/* 5. Editorial Craftsmanship Section */}
      <BrandCraftsmanshipSection />

      {/* 6. Trending Modest Essentials & Men's Islamic Wear */}
      {otherProducts.length > 0 && (
        <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">Curated Essentials</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-obsidian mt-0.5">
                Hijabs, Artisanal Attars, Men&apos;s Topis &amp; Sunnah Essentials
              </h2>
            </div>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2.5 text-xs font-bold text-brand-obsidian hover:text-brand-gold-dark tracking-wide uppercase group flex-shrink-0 min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-brand-gold/60 shadow-sm transition-all active:scale-95"
            >
              <span>Explore All Collections</span>
              <span className="w-7 h-7 rounded-full bg-brand-sand flex items-center justify-center text-brand-obsidian group-hover:bg-brand-gold group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {otherProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionReveal>
      )}

      {/* 7. Instagram Lookbook / Reels Gallery in Motion */}
      <InstagramReelsGallery />

      {/* 8. Physical Store Visit & Direct Boutique Contact Section */}
      <StoreVisitSection />

      {/* 9. Customer Testimonials & Trust Proof */}
      <SectionReveal className="bg-gradient-to-b from-brand-ivory via-white to-brand-ivory text-brand-obsidian py-16 sm:py-20 relative overflow-hidden border-y border-brand-gold/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeUp className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">Trusted By Modest Sisters</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-obsidian">
              Words From Our Customers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">Real verified feedback from sisters across India</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="p-6 rounded-2xl bg-white border border-stone-200/90 space-y-3 shadow-md hover:shadow-xl hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-base text-brand-obsidian">“The drape is unmatched”</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Experienced the Royal Black Dubai Crepe Front Open Burqa in person. The Korean crepe fabric is so soft, breathable, and never sticks. The complimentary matching shayla was a wonderful touch.
                </p>
                <div className="pt-2 text-xs font-semibold text-brand-gold-dark flex items-center gap-1.5 border-t border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ayesha Siddiqui • Mumbai (Verified Customer)</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-2xl bg-white border border-stone-200/90 space-y-3 shadow-md hover:shadow-xl hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-base text-brand-obsidian">“Golden embroidery is stunning”</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Wore the Emirati butterfly burqa for my cousin&apos;s Walima. Received endless compliments. The sweep and flare is so graceful without being heavy.
                </p>
                <div className="pt-2 text-xs font-semibold text-brand-gold-dark flex items-center gap-1.5 border-t border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shabana Parveen • Hyderabad (Verified Customer)</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-2xl bg-white border border-stone-200/90 space-y-3 shadow-md hover:shadow-xl hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-base text-brand-obsidian">“Exceptional Boutique Experience”</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Visited the boutique store directly. The fabric quality, custom height tailoring assistance, and guidance from the team were exceptional. The padded memory foam janamaz and artisanal Oud attar are pure perfection!
                </p>
                <div className="pt-2 text-xs font-semibold text-brand-gold-dark flex items-center gap-1.5 border-t border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Farida Bano • Delhi (Verified In-Store Customer)</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </SectionReveal>
    </div>
  </>
);
}
