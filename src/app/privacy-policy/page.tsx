import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Lock, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy | Huma Collection — Customer Data Protection',
  description:
    'Read how Huma Collection safeguards customer data, secures transactions via Razorpay, and protects your personal privacy under Indian IT regulations.',
  path: '/privacy-policy',
  keywords: [
    'Huma Collection privacy policy',
    'Customer data security modest wear',
    'Razorpay payment privacy',
  ],
});

export default function PrivacyPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
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
          <span className="text-brand-obsidian font-semibold">Privacy Policy</span>
        </nav>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection &amp; Security</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Privacy Policy
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Last Updated: October 2026 • Governed under the Information Technology Act, 2000 (India)
          </p>
        </header>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">1. Our Commitment to Your Privacy</h2>
            <p>
              At Huma Collection, we respect your personal dignity and privacy. This Privacy Policy details how we collect, use, and protect your information when you browse our website (<strong>https://www.humacollection.in</strong>) or place orders with our boutique.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Contact &amp; Account Details:</strong> Name, 10-digit mobile phone number, email address, and delivery addresses provided for order fulfillment and OTP verification.
              </li>
              <li>
                <strong>Transactional Information:</strong> Order history, selected garment sizing, and payment reference numbers. We do <em>not</em> store debit/credit card numbers or CVVs on our servers.
              </li>
              <li>
                <strong>Technical Browsing Data:</strong> Standard server logs, IP addresses, browser types, and anonymized analytics to ensure website stability and responsiveness.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">3. How We Use Your Information</h2>
            <p>Your information is used strictly for legitimate commercial and fulfillment purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Processing and delivering your modest apparel orders.</li>
              <li>Sending SMS or WhatsApp order confirmations and tracking links.</li>
              <li>Providing personalized sizing and styling assistance upon your request.</li>
              <li>Complying with applicable Indian tax and legal requirements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">4. Payment Security &amp; Razorpay</h2>
            <p>
              All online payment transactions are processed through <strong>Razorpay</strong>, a PCI-DSS Level 1 compliant payment gateway. Payment credentials are encrypted using industry-standard 256-bit SSL encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">5. No Selling or Renting of Customer Data</h2>
            <p>
              We maintain a zero-compromise policy: we never sell, rent, trade, or monetize your personal details with third-party marketing brokers. Data is shared exclusively with authorized courier partners (such as BlueDart and Delhivery) solely to deliver your orders.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian">6. Your Rights &amp; Grievance Redressal</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your customer records at any time. For privacy inquiries, please contact our store representative at{' '}
              <a href={`tel:+91${SITE_CONFIG.storePhone}`} className="text-brand-gold-dark font-semibold hover:underline">
                {SITE_CONFIG.storePhoneFormatted}
              </a>{' '}
              or visit our boutique on Relief Road near Teen Darwaza in Ahmedabad.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
