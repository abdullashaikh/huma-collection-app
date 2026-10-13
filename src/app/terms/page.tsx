import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText, Scale } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms & Conditions | Huma Collection — Store Policies & Usage',
  description:
    'Read terms and conditions for Huma Collection. Covers website usage, pricing accuracy, modest fashion ordering, and governing law in Ahmedabad, India.',
  path: '/terms',
  keywords: [
    'Huma Collection terms and conditions',
    'Modest wear terms of service',
    'Online shopping terms Ahmedabad India',
  ],
});

export default function TermsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        <nav className="flex items-center gap-1.5 text-xs text-stone-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-obsidian">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-obsidian font-semibold">Terms &amp; Conditions</span>
        </nav>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Terms &amp; Conditions
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Last Updated: October 2026 • Governed under the laws of the State of Gujarat, India
          </p>
        </header>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">1. Introduction &amp; Acceptance</h2>
            <p>
              Welcome to Huma Collection. By accessing or using our website (<strong>https://www.humacollection.in</strong>), browsing our digital showcase, or placing orders via phone, WhatsApp, or online checkout, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">2. Product Accuracy &amp; Fabric Characteristics</h2>
            <p>
              We strive to display garment colors, embroidery detailing, and textures as accurately as possible. However, slight variations in color perception may occur due to monitor calibration and ambient photography lighting. Fabric opacity and weight descriptions reflect genuine Korean Crepe and Saudi Nida fabric standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">3. Pricing &amp; Currency</h2>
            <p>
              All prices displayed on the website are in <strong>Indian Rupees (INR)</strong> and inclusive of applicable goods and services taxes unless stated otherwise. We reserve the right to modify prices, discounts, and promotions without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">4. Order Placement &amp; Showcase Status</h2>
            <p>
              While digital ordering with nationwide courier delivery officially commences in <strong>{SITE_CONFIG.onlineLaunchDate}</strong>, customers may reserve pieces or place orders directly via phone, WhatsApp, or in-person visits to our boutique. Orders are subject to item availability at the time of confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">5. Intellectual Property Rights</h2>
            <p>
              All trademarks, product photography, logos, and written content published on this website are the intellectual property of Huma Collection and Hamid Shaikh. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">6. Governing Jurisdiction</h2>
            <p>
              Any legal dispute arising from or related to website usage or purchases shall be subject to the exclusive jurisdiction of the competent courts in <strong>Ahmedabad, Gujarat, India</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
