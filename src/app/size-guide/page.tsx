import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle, Phone, Ruler, Scissors, Sparkles } from 'lucide-react';
import { SITE_CONFIG, buildBreadcrumbJsonLd, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Burqa & Abaya Size Guide | Huma Collection — Height & Fit Chart',
  description:
    'Find your perfect modest fit with the Huma Collection Burqa and Abaya size chart. Sizing from 50 to 60 for heights 5\'0" to 5\'10" with custom tailoring options.',
  path: '/size-guide',
  keywords: [
    'Burqa size chart',
    'Abaya height guide',
    'Burqa sizing India',
    'Size 52 54 56 58 abaya dimensions',
    'How to measure burqa length',
  ],
});

export default function SizeGuidePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Size & Height Guide', path: '/size-guide' },
  ]);

  const sizeChart = [
    { size: '50', height: "4'11\" – 5'0\"", garmentLength: '50 inches', bust: '42 - 44 inches', sleeve: '26 inches' },
    { size: '52', height: "5'1\" – 5'2\"", garmentLength: '52 inches', bust: '44 - 46 inches', sleeve: '27 inches' },
    { size: '54', height: "5'3\" – 5'4\"", garmentLength: '54 inches', bust: '44 - 46 inches', sleeve: '28 inches' },
    { size: '56', height: "5'5\" – 5'6\"", garmentLength: '56 inches', bust: '46 - 48 inches', sleeve: '28.5 inches' },
    { size: '58', height: "5'7\" – 5'8\"", garmentLength: '58 inches', bust: '46 - 48 inches', sleeve: '29 inches' },
    { size: '60', height: "5'9\" – 5'10\"", garmentLength: '60 inches', bust: '48 - 50 inches', sleeve: '30 inches' },
  ];

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
          <span className="text-brand-obsidian font-semibold">Size Guide</span>
        </nav>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5" />
            <span>Precise Modest Measurements</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Burqa &amp; Abaya Size &amp; Height Guide
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Standard Islamic burqa and abaya sizes are based on overall shoulder-to-floor garment length in inches.
          </p>
        </header>

        {/* Size Chart Table */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-luxury overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-brand-obsidian">Standard Sizing Chart</h2>
              <p className="text-xs text-stone-500">Select your regular height to determine the recommended size</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700 w-fit">
              All Measurements in Inches
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Size</th>
                  <th className="py-3.5 px-4 sm:px-6">Customer Height</th>
                  <th className="py-3.5 px-4 sm:px-6">Garment Length</th>
                  <th className="py-3.5 px-4 sm:px-6">Modest Chest / Bust</th>
                  <th className="py-3.5 px-4 sm:px-6">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-brand-ivory/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-brand-obsidian">{row.size}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-brand-gold-dark">{row.height}</td>
                    <td className="py-3.5 px-4 sm:px-6">{row.garmentLength}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-stone-600">{row.bust}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-stone-600">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Guide */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-brand-gold-dark font-bold text-sm">
              <Ruler className="w-4 h-4" />
              <span>How to Measure Length</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Stand upright barefoot against a wall. Measure from the highest point of your shoulder down to your ankles. If you wear high heels regularly with your burqa, add 1 to 2 inches to your length.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-brand-gold-dark font-bold text-sm">
              <Scissors className="w-4 h-4" />
              <span>In-Store Bespoke Alterations</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Need custom sleeve width, extra generous flare, or a special length (like 51&quot; or 55&quot;)? Our master tailors in Ahmedabad provide complimentary custom alterations for all boutique customers.
            </p>
          </div>
        </section>

        {/* Help Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-ivory via-white to-brand-ivory border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-base font-bold text-brand-obsidian">Need Help Deciding on Your Fit?</h3>
            <p className="text-xs text-stone-600 mt-0.5">Call our store stylist directly or message us on WhatsApp for free sizing advice.</p>
          </div>
          <a
            href={`tel:+91${SITE_CONFIG.storePhone}`}
            className="px-5 py-2.5 rounded-xl bg-brand-obsidian text-white text-xs font-semibold hover:bg-stone-900 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>Call Hamid Shaikh</span>
          </a>
        </div>
      </div>
    </>
  );
}
