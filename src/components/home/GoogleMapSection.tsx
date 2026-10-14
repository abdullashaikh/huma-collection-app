import React from 'react';
import {
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  User,
} from 'lucide-react';

interface GoogleMapSectionProps {
  id?: string;
  className?: string;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  id = 'visit-store',
  className = '',
}) => {
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
  const rawPhone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const formattedPhone = process.env.NEXT_PUBLIC_STORE_PHONE_FORMATTED || '+91 82006 17009';

  // Huma Collection in Vyara, Gujarat
  const storeQuery = 'Huma Collection, Near Markaz Masjid, Vyara, Gujarat 394650';
  const encodedStoreQuery = encodeURIComponent(storeQuery);

  // Free Google Maps Embed URL or Google Maps Embed API if key is supplied
  const embedApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
    process.env.GOOGLE_MAPS_EMBED_API_KEY ||
    '';

  const embedMapUrl = embedApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${embedApiKey}&q=${encodedStoreQuery}&solution_id=gmp_git_agentskills_v1`
    : `https://www.google.com/maps?q=${encodedStoreQuery}&output=embed`;

  // Direct Google Maps navigation URL for the "Get Directions" button
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedStoreQuery}`;

  // View store on Google Maps link
  const viewStoreMapsUrl =
    process.env.NEXT_PUBLIC_MAPS_URL ||
    `https://www.google.com/maps/search/?api=1&query=${encodedStoreQuery}`;

  const whatsappUrl = `https://wa.me/91${rawPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I am visiting Huma Collection store in Vyara and would like to inquire about piece availability.'
  )}`;

  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="bg-gradient-to-b from-brand-ivory via-white to-brand-ivory rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-gold/40 shadow-luxury overflow-hidden relative">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Section Title & Supporting Text */}
        <div className="relative z-10 max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
            <Store className="w-3.5 h-3.5 text-brand-gold" />
            <span>Physical Boutique Experience</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-obsidian leading-tight">
            Visit Huma Collection
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Visit our store in Vyara, Gujarat, and explore our collection.
          </p>
        </div>

        {/* Main 2-Column Content: Details + Interactive Map */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Store Details & Boutique Services */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Step inside our flagship boutique to experience the rich drape of genuine Korean crepe, explore luxury Saudi abayas, examine intricate zari embroidery in person, and receive personalized fit consultations for standard and custom silhouettes.
              </p>

              {/* Owner & Contact Pill Card */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-brand-sand/70 border border-brand-gold/30 flex items-center justify-center text-brand-obsidian flex-shrink-0">
                      <User className="w-5 h-5 text-brand-gold-dark" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-600 block">
                        Store Owner &amp; In-Store Stylist
                      </span>
                      <h3 className="font-serif text-base font-bold text-brand-obsidian">
                        {ownerName}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={`tel:+91${rawPhone}`}
                    className="p-2.5 rounded-xl bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/30 text-brand-gold-dark transition-colors flex items-center justify-center"
                    aria-label={`Call ${formattedPhone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                {/* Verified Location Text */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-stone-600 block">
                      Store Address
                    </span>
                    <p className="text-xs font-semibold text-brand-obsidian leading-snug mt-0.5">
                      Near Markaz Masjid, Vyara, Gujarat 394650, India
                    </p>
                    <a
                      href={viewStoreMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-gold-dark hover:underline inline-flex items-center gap-1 mt-1.5"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Boutique Hours */}
                <div className="flex items-start gap-3 pt-1 border-t border-stone-100">
                  <Clock className="w-4 h-4 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-600 block">
                      Operating Hours
                    </span>
                    <p className="text-xs font-semibold text-brand-obsidian">
                      Open All 7 Days • 10:30 AM – 9:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>

              {/* In-Store Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium text-stone-800">Modest Fitting Area</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span className="font-medium text-stone-800">Custom Height Hemming</span>
                </div>
              </div>
            </div>

            {/* Prominent Action Buttons (Issue 13: Added generous vertical spacing and clear separation) */}
            <div className="space-y-3.5 pt-6 mt-4 border-t border-stone-200/80">
              {/* 1. Prominent "Get Directions" Button */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-obsidian font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2.5 active:scale-95 group"
              >
                <Navigation className="w-4 h-4 text-brand-obsidian group-hover:scale-110 transition-transform" />
                <span>Get Directions</span>
              </a>

              {/* 2. Call Store & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:+91${rawPhone}`}
                  className="py-3 px-4 rounded-xl bg-brand-obsidian hover:bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Call: {formattedPhone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Responsive Google Map */}
          <div className="lg:col-span-7 flex flex-col min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-gold/30 shadow-lg bg-stone-100 flex flex-col">
              {/* Map Embed Frame */}
              <iframe
                title="Huma Collection Location Map — Vyara, Gujarat"
                src={embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex-1 rounded-2xl sm:rounded-3xl"
              />

              {/* Floating map info badge */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-stone-200/90 shadow-md flex items-center justify-between sm:justify-start gap-2.5 pointer-events-auto">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <span className="text-xs font-bold text-brand-obsidian truncate">
                    Huma Collection • Vyara
                  </span>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-gold-dark hover:underline flex items-center gap-1 flex-shrink-0"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
