import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Return & Refund Policy | Huma Collection — Exchanges & Guarantees',
  description:
    'Understand Huma Collection 7-day size exchange policy, return criteria for unworn modest garments with tags intact, and in-store boutique exchanges.',
  path: '/refund-policy',
  keywords: [
    'Huma Collection return policy',
    'Burqa exchange Ahmedabad',
    'Abaya refund terms',
    '7 day size exchange modest wear',
  ],
});

export default function RefundPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Return & Refund Policy', path: '/refund-policy' },
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
          <span className="text-brand-obsidian font-semibold">Return &amp; Refund Policy</span>
        </nav>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Customer Peace of Mind</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Return &amp; Refund Policy
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Last Updated: October 2026 • 7-Day Exchange Window
          </p>
        </header>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">1. 7-Day Size Exchange Policy</h2>
            <p>
              We want you to feel complete grace, comfort, and modest coverage in your garments. If your standard-sized burqa or abaya does not provide the desired length or fit, you may request a <strong>free size exchange within 7 days</strong> of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">2. Eligibility Conditions for Exchange</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Garments must be unworn, unwashed, unaltered, and free of stains, perfumes, or scent.</li>
              <li>All original boutique brand tags, spare snap buttons, and dust bags must be attached and intact.</li>
              <li>Proof of purchase (invoice, order number, or booking reference) must accompany the request.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">3. Non-Returnable &amp; Non-Exchangeable Items</h2>
            <p>For religious hygiene and bespoke tailoring reasons, the following items cannot be returned or exchanged once opened:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Artisanal Attars &amp; Oud Perfumes:</strong> Opened bottles or broken safety seals.</li>
              <li><strong>Hijab Undercaps &amp; Niqabs:</strong> Intimate face and head-covering items once unsealed.</li>
              <li><strong>Custom Altered Pieces:</strong> Garments that have received custom length cutting, embroidery adjustments, or bespoke sizing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">4. Damaged or Defective Items</h2>
            <p>
              Every garment undergoes rigorous pre-dispatch inspection. In the unlikely event you receive a damaged package or defective item, please notify us within <strong>48 hours of delivery</strong> with unboxing photographs via WhatsApp (+91 82006 17009) or email. We will arrange an immediate replacement or full refund at no cost to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">5. In-Store Boutique Exchanges</h2>
            <p>
              You are welcome to bring online orders directly to our physical boutique in Ahmedabad (Relief Road near Teen Darwaza) for instant size trial, tailoring adjustment, or exchange with store assistance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">6. Refund Processing Timeline</h2>
            <p>
              When an approved return is received and verified at our fulfillment center, refunds are processed to the original payment source within <strong>5 to 7 business days</strong> via Razorpay.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
