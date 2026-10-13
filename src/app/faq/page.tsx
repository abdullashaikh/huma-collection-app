import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Frequently Asked Questions | Huma Collection — Sizing, Fabrics & Ordering',
  description:
    'Find answers about Huma Collection modest wear: fabrics (Korean Crepe, Saudi Nida), boutique visits, custom sizing, non-alcoholic attars, and online shopping.',
  path: '/faq',
  keywords: [
    'Huma Collection FAQ',
    'Burqa fabrics questions',
    'Korean crepe vs Saudi nida abaya',
    'How to buy burqa online India',
    'Non-alcoholic attar questions',
  ],
});

export default function FaqPage() {
  const faqs = [
    {
      question: 'Where is the Huma Collection physical boutique located?',
      answer:
        'Our physical boutique is located on Relief Road, near Teen Darwaza in Ahmedabad, Gujarat, 380001, India. Customers are welcome to visit seven days a week between 10:30 AM and 9:30 PM to experience our fabrics and enjoy in-person consultations.',
    },
    {
      question: 'What premium fabrics do you use for your burqas and abayas?',
      answer:
        'We specialize in authentic imported fabrics including high-thread-count Korean Crepe, Saudi Nida Matte, Firdaus Georgette, and Turkish Chiffon. All our fabrics are selected for 100% opacity, breathable airflow in Indian climates, and elegant non-clinging modest drape.',
    },
    {
      question: 'How do burqa and abaya sizes work?',
      answer:
        'Islamic modest wear sizing is based on overall garment length measured in inches from shoulder to floor (sizes 50 through 60). For example, size 52 fits heights 5\'1" to 5\'2", while size 56 fits heights 5\'5" to 5\'6". Please refer to our Size Guide for complete measurements.',
    },
    {
      question: 'Do you offer custom tailoring and bespoke length alterations?',
      answer:
        'Yes! For boutique visitors or direct WhatsApp consultations with Hamid Shaikh, we offer custom sleeve adjustments, neckline modifications, and bespoke height tailoring to guarantee an exact fit.',
    },
    {
      question: 'Are your attars and perfumes completely alcohol-free?',
      answer:
        'Yes, 100% of our artisanal concentrated attars and Arabian ouds are completely alcohol-free (non-alcoholic), pure oil-based formulations that are Halal-compliant and skin-friendly for daily wear and prayer.',
    },
    {
      question: 'When does nationwide online checkout and home delivery launch?',
      answer:
        'Full online digital checkout with home delivery across India officially opens in November 2026. Currently, customers can explore our complete collection online and place orders via phone or WhatsApp with Hamid Shaikh (+91 82006 17009).',
    },
    {
      question: 'What is your exchange policy if a size does not fit?',
      answer:
        'We offer a 7-day free size exchange on all standard, unworn modest garments with original brand tags attached. You can exchange by courier or in person at our Ahmedabad boutique.',
    },
    {
      question: 'Which courier services do you use for delivery in India?',
      answer:
        'We ship pan-India using premium courier services including BlueDart Express and Delhivery, delivering securely to valid 6-digit Indian postal pincodes with online AWB tracking.',
    },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Frequently Asked Questions', path: '/faq' },
  ]);

  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        <nav className="flex items-center gap-1.5 text-xs text-stone-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-obsidian">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-obsidian font-semibold">FAQ</span>
        </nav>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Assistance</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Everything you need to know about our modest fabrics, sizing, boutique location, and ordering.
          </p>
        </header>

        {/* FAQ Accordion-Style Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-2 hover:border-brand-gold/40 transition-colors"
            >
              <h2 className="font-serif text-base sm:text-lg font-bold text-brand-obsidian flex items-start gap-2">
                <span className="text-brand-gold-dark font-sans text-xs font-bold px-2 py-0.5 rounded bg-brand-gold/10 mt-0.5">
                  Q{index + 1}
                </span>
                <span>{faq.question}</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-ivory via-white to-brand-ivory border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-brand-obsidian">Still Have a Question?</h3>
            <p className="text-xs text-stone-600">Connect directly with store owner Hamid Shaikh for personal assistance.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:+91${SITE_CONFIG.storePhone}`}
              className="px-5 py-2.5 rounded-xl bg-brand-obsidian text-white text-xs font-semibold hover:bg-stone-900 transition-colors shadow-sm flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Call Store</span>
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-brand-obsidian text-xs font-semibold hover:border-brand-gold/60 transition-colors shadow-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
