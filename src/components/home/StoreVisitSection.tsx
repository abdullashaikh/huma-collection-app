'use client';

import React from 'react';
import {
  Clock,
  Compass,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LUXURY_EASE } from '../ui/Motion';

interface StoreVisitSectionProps {
  id?: string;
  className?: string;
}

export const StoreVisitSection: React.FC<StoreVisitSectionProps> = ({
  id = 'store-visit',
  className = '',
}) => {
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
  const rawPhone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const formattedPhone = process.env.NEXT_PUBLIC_STORE_PHONE_FORMATTED || '+91 82006 17009';
  const mapsUrl =
    process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
  const whatsappUrl = `https://wa.me/91${rawPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I am visiting Huma Hijab Collection and would like to inquire about current in-store piece availability.'
  )}`;

  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className="bg-gradient-to-b from-brand-ivory via-white to-brand-ivory rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-gold/40 shadow-luxury overflow-hidden relative"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Store Experience Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
              <Store className="w-3.5 h-3.5 text-brand-gold" />
              <span>Physical Boutique Experience</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-obsidian leading-tight">
              Visit Our Physical Store Boutique
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
              While our full online shopping experience launches in{' '}
              <strong className="text-brand-obsidian">November 2026</strong>, our physical doors
              are welcoming modest fashion lovers today. Touch and feel the imported Korean
              crepe, examine genuine zari embroidery, and enjoy personalized fit consultations.
            </p>

            {/* Owner & Contact Pill Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-sand/70 border border-brand-gold/30 flex items-center justify-center text-brand-obsidian flex-shrink-0">
                    <User className="w-6 h-6 text-brand-gold-dark" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Store Owner &amp; In-Store Stylist
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-obsidian">
                      {ownerName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-gold-dark" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:+91${rawPhone}`}
                      className="font-mono text-base font-bold text-brand-obsidian hover:text-brand-gold-dark transition-colors"
                    >
                      {formattedPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified Location Link */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Verified Google Maps Location
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-obsidian hover:text-brand-gold-dark underline decoration-brand-gold/40 hover:decoration-brand-gold transition-colors inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Open in Google Maps Application</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* In-Store Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                <span>100% Modest Fitting Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Custom Height Hemming</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Open All 7 Days</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Call-to-Actions & Location Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-brand-obsidian text-white rounded-2xl p-6 sm:p-8 space-y-5 border border-brand-gold/30 shadow-xl">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block">
                  Connect &amp; Visit
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Get Directions &amp; Contact Store
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Call ahead to inquire about specific design sizes or navigate directly using Google Maps.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* 1. Get Directions Button */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-obsidian font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-brand-obsidian" />
                  <span>Get Directions on Google Maps</span>
                </a>

                {/* 2. Call Store Button */}
                <a
                  href={`tel:+91${rawPhone}`}
                  className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-brand-cream text-brand-obsidian font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-brand-gold-dark" />
                  <span>Call Store: {formattedPhone}</span>
                </a>

                {/* 3. WhatsApp In-Store Inquiries */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Operating note */}
              <div className="pt-3 border-t border-stone-800 text-center">
                <p className="text-[11px] text-stone-400">
                  Online order checkout will launch in <strong>November 2026</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
