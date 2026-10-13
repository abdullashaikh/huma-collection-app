import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, Sparkles, Store, User } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us | Huma Collection — Boutique & Customer Inquiries',
  description:
    'Contact Huma Collection in Ahmedabad. Call +91 82006 17009 or visit our boutique on Relief Road near Teen Darwaza for modest fashion consultations.',
  path: '/contact',
  keywords: [
    'Contact Huma Collection',
    'Huma Collection phone number',
    'Burqa shop Relief Road Ahmedabad',
    'Hamid Shaikh contact',
    'Ahmedabad modest fashion store directions',
  ],
});

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' },
  ]);

  const whatsappInquiryUrl = `https://wa.me/91${SITE_CONFIG.storePhone}?text=${encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I am visiting the Huma Collection website and would like to make an inquiry.'
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-obsidian">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-obsidian font-semibold">Contact Us</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Customer Care &amp; Boutique Visits</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian leading-tight">
            Contact Huma Collection
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Whether you have questions about fabric drape, need custom sizing advice (sizes 50 to 60), or wish to visit our physical boutique in Ahmedabad, we are here to assist you.
          </p>
        </header>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Direct Phone & WhatsApp */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-luxury space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-bold block">Direct Stylist Hotline</span>
                <h2 className="font-serif text-lg font-bold text-brand-obsidian">Call &amp; WhatsApp Inquiries</h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div>
                <span className="text-stone-500 block text-xs">Boutique Owner &amp; Consultant</span>
                <span className="font-bold text-brand-obsidian text-base">{SITE_CONFIG.ownerName}</span>
              </div>

              <div>
                <span className="text-stone-500 block text-xs">Telephone Number</span>
                <a
                  href={`tel:+91${SITE_CONFIG.storePhone}`}
                  className="text-lg font-bold text-brand-gold-dark hover:underline inline-flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>{SITE_CONFIG.storePhoneFormatted}</span>
                </a>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:+91${SITE_CONFIG.storePhone}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-brand-obsidian text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-stone-900 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Physical Store Location */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-luxury space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 rounded-2xl bg-brand-sand/70 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-bold block">Visit Our Flagship Store</span>
                <h2 className="font-serif text-lg font-bold text-brand-obsidian">Physical Boutique Location</h2>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div>
                <span className="text-stone-500 block text-xs">Store Address</span>
                <p className="font-semibold text-brand-obsidian mt-0.5 leading-snug">
                  Huma Collection<br />
                  {SITE_CONFIG.address.streetAddress},<br />
                  {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion} — {SITE_CONFIG.address.postalCode}, India
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-500 block text-xs">Boutique Timings</span>
                  <p className="font-semibold text-brand-obsidian">
                    Monday to Sunday: 10:30 AM – 9:30 PM (IST)
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-brand-obsidian font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span>Open in Google Maps &amp; Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Online Launch Notice */}
        <section className="bg-gradient-to-r from-brand-ivory to-white p-6 sm:p-8 rounded-2xl border border-brand-gold/30 text-xs sm:text-sm text-stone-700 space-y-2">
          <h2 className="font-serif text-base font-bold text-brand-obsidian flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Digital Shopping &amp; Nationwide Home Delivery</span>
          </h2>
          <p className="leading-relaxed">
            Our complete digital checkout and doorstep delivery across India officially opens in <strong>{SITE_CONFIG.onlineLaunchDate}</strong>. Today, you are welcome to browse our full product catalogue online, check in-store stock via phone or WhatsApp, and place orders directly with Hamid Shaikh.
          </p>
        </section>
      </div>
    </>
  );
}
