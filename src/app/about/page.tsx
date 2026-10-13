import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, ChevronRight, Heart, MapPin, Phone, ShieldCheck, Sparkles, Store, User } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us | Huma Collection — Modest Fashion Boutique',
  description:
    'Discover the story of Huma Collection, founded by Hamid Shaikh in Ahmedabad. Specializing in luxury Korean crepe burqas, Saudi nida abayas, and Islamic essentials.',
  path: '/about',
  keywords: [
    'About Huma Collection',
    'Hamid Shaikh modest wear',
    'Burqa store Ahmedabad',
    'Modest fashion brand India',
    'Luxury abayas India',
    'Islamic boutique Ahmedabad',
  ],
});

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-obsidian">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-obsidian font-semibold">About Us</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Our Heritage &amp; Craft</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian leading-tight">
            About Huma Collection
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Founded by <strong>{SITE_CONFIG.ownerName}</strong>, Huma Collection is an established modest fashion boutique located in the heart of Ahmedabad, Gujarat. We specialize in luxury burqas, designer abayas, breathable hijabs, Saudi niqabs, non-alcoholic artisanal attars, and Sunnah essentials.
          </p>
        </header>

        {/* Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold-dark">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">100% Modest Silhouettes</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We design every cut with generous modesty, zero translucency, and graceful drapes using authentic imported Korean Crepe and Saudi Nida Matte fabrics.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold-dark">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">Physical Boutique Experience</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our flagship boutique on Relief Road near Teen Darwaza in Ahmedabad welcomes patrons seven days a week for in-person fabric trials and custom length alterations.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold-dark">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">Artisanal Tailoring</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every seam, hidden snap button, and delicate zari threadwork embroidery is handled by master tailors with decades of Islamic modest apparel expertise.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="bg-gradient-to-br from-brand-ivory via-white to-brand-ivory p-6 sm:p-10 rounded-3xl border border-brand-gold/30 shadow-luxury space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-obsidian">
            Our Journey &amp; Vision
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              Modesty is an expression of dignity, grace, and inner strength. For years, Huma Collection served as a trusted neighborhood destination in Ahmedabad where families could find uncompromised modest apparel crafted from world-class fabrics without inflated import markups.
            </p>
            <p>
              Under the stewardship of Hamid Shaikh, we have expanded our catalogue to include complete Sunnah essentials: orthopedic memory foam Janamaz for knee comfort during prayer, non-alcoholic attars crafted from pure oud and floral extracts, hand-crafted men&apos;s prayer caps (topis), and comprehensive Hajj &amp; Umrah travel essentials.
            </p>
            <p>
              While our nationwide digital checkout officially launches in <strong>{SITE_CONFIG.onlineLaunchDate}</strong>, our complete collection is showcased online for transparent browsing, phone consultations, and in-store trials.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold-dark">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Founder &amp; Boutique Lead</p>
                <p className="text-sm font-bold text-brand-obsidian">{SITE_CONFIG.ownerName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-brand-obsidian text-white text-xs font-semibold hover:bg-stone-900 transition-colors shadow-sm"
              >
                Contact Our Boutique
              </Link>
              <Link
                href="/collection"
                className="px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-brand-obsidian text-xs font-semibold hover:border-brand-gold/60 transition-colors shadow-sm"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
