import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Clock, MapPin, Package, ShieldCheck, Truck } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Shipping Policy | Huma Collection — Delivery & Timelines',
  description:
    'Learn about Huma Collection shipping terms, courier partners (BlueDart / Delhivery), dispatch timelines, free delivery thresholds, and boutique pickup in India.',
  path: '/shipping-policy',
  keywords: [
    'Huma Collection shipping policy',
    'Burqa delivery India',
    'Modest fashion delivery timelines',
    'Abaya shipping charges',
  ],
});

export default function ShippingPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
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
          <span className="text-brand-obsidian font-semibold">Shipping Policy</span>
        </nav>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Fulfillment &amp; Logistics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Last Updated: October 2026 • Effective across all deliveries within India
          </p>
        </header>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">1. Pan-India Delivery Network</h2>
            <p>
              Huma Collection partners with top-tier Indian express logistics carriers—including <strong>BlueDart Express</strong>, <strong>Delhivery</strong>, and registered Indian postal services—to deliver modest garments safely to valid 6-digit postal pincodes across India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">2. Order Processing &amp; Dispatch</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Ready-to-Wear Pieces:</strong> In-stock standard burqas, hijabs, attars, and accessories are inspected, packed in dustproof modest packaging, and dispatched within <strong>24 to 48 business hours</strong> of order confirmation.
              </li>
              <li>
                <strong>Custom Length Alterations:</strong> Customized garments (such as bespoke height hem adjustments) require an additional 1 to 2 business days for master tailor finishing prior to dispatch.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">3. Estimated Delivery Timelines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="font-bold text-brand-obsidian block">Metro Cities (Mumbai, Delhi, Bengaluru, etc.)</span>
                <span className="text-xs text-stone-600">Typically 2 to 4 business days post-dispatch.</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="font-bold text-brand-obsidian block">Rest of India &amp; Regional Towns</span>
                <span className="text-xs text-stone-600">Typically 4 to 7 business days post-dispatch.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">4. Shipping Charges &amp; Free Delivery</h2>
            <p>
              Standard shipping charges are computed transparently during checkout based on delivery pincode and package weight. Orders that exceed our active promotional threshold qualify for <strong>Free Standard Shipping</strong> within India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">5. Order Tracking &amp; Notifications</h2>
            <p>
              Once your package is handed over to the courier, an AWB tracking number and real-time tracking link are generated. You can look up your shipment status at any time via our{' '}
              <Link href="/track-order" className="text-brand-gold-dark font-semibold hover:underline">
                Track Order
              </Link>{' '}
              page or request direct WhatsApp updates from store management.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">6. In-Store Boutique Pickup</h2>
            <p>
              Customers located in or visiting Ahmedabad can choose in-store pickup at our physical boutique on Relief Road near Teen Darwaza at no shipping charge.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
