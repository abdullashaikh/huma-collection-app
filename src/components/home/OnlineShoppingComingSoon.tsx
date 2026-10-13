import React from 'react';
import { Calendar, Compass, MapPin, Phone, Sparkles, Store } from 'lucide-react';

interface OnlineShoppingComingSoonProps {
  className?: string;
}

export const OnlineShoppingComingSoon: React.FC<OnlineShoppingComingSoonProps> = ({
  className = '',
}) => {
  const phone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const mapsUrl =
    process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
  const launchDate = process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026';

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-obsidian via-[#23201D] to-brand-obsidian text-white border-2 border-brand-gold/40 shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Ambient Luxury Glow Effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-gold/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-600/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="space-y-4 max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-light text-xs font-semibold tracking-wider uppercase">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>In-Store Discovery • Digital Launch {launchDate}</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Online Shopping Coming Soon!
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
              Explore our collection in-store today. Online shopping is expected to launch in{' '}
              <span className="font-semibold text-brand-gold">{launchDate}</span>.
              In the meantime, browse our curated catalogue online, view rich multi-angle details, and visit our physical boutique to experience the fabrics firsthand.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Physical Store Open Today</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Interactive 360° Viewing</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Direct In-Store Assistance</span>
              </div>
            </div>
          </div>

          {/* Right Action CTA Block */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 flex-shrink-0 lg:w-72">
            {/* Primary: Explore Collection Button */}
            <a
              href="#collection"
              className="px-6 py-4 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-obsidian font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2 active:scale-95 text-center"
            >
              <Sparkles className="w-4 h-4 text-brand-obsidian" />
              <span>Explore Collection</span>
            </a>

            {/* Secondary: Get Directions Button */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
            >
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span>Get Directions</span>
            </a>

            {/* Tertiary: Call Store Button */}
            <a
              href={`tel:+91${phone}`}
              className="px-6 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-900 text-stone-200 border border-brand-gold/30 font-medium text-xs transition-all flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Call Store: 8200617009</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
