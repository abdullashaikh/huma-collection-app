'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle2,
  Truck,
} from 'lucide-react';

import { AnimatedCounter, LUXURY_EASE } from '../ui/Motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-ivory via-brand-cream to-brand-sand/30 text-brand-obsidian min-h-[640px] sm:min-h-[700px] flex items-center border-b border-brand-gold/20">
      {/* Ambient Luxury Radial Flares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-200/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-xs font-semibold tracking-wider shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
              <span>Royal Burqa & Modest Collection 2026</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: LUXURY_EASE }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-obsidian leading-[1.12]"
            >
              Grace In Every Fold, <br />
              <span className="italic font-serif text-brand-gold-dark">
                Pure Modesty
              </span>{' '}
              In Every Thread.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: LUXURY_EASE }}
              className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl"
            >
              Master-crafted with authentic imported Korean Crepe and Saudi Nida matte fabrics. Generous modest flare, wudu-friendly snap cuffs, and discreet deep pockets for timeless elegance.
            </motion.p>

            {/* CTA Buttons for Product Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: LUXURY_EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <a
                href="#collection"
                className="px-8 py-4 bg-brand-obsidian hover:bg-stone-900 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-brand-gold-light group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white hover:bg-brand-ivory text-brand-obsidian border border-stone-300 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 hover:border-brand-gold/60 active:scale-[0.98] shadow-sm"
              >
                <span>Get Store Directions</span>
                <ChevronRight className="w-4 h-4 text-brand-gold-dark" />
              </a>
            </motion.div>

            {/* Showcase Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42, ease: LUXURY_EASE }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 border-t border-stone-200/80 text-[11px] sm:text-xs text-stone-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-dark flex-shrink-0" />
                <span className="font-semibold text-stone-800">100% Modest Cut</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-dark flex-shrink-0" />
                <span className="font-semibold text-stone-800">In-Store Discovery</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Star className="w-4 h-4 text-brand-gold-dark flex-shrink-0 fill-brand-gold" />
                <span className="font-semibold text-stone-800">Online Store Nov 2026</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Showcase Card with smooth depth */}
          <div className="lg:col-span-5 block relative mt-6 lg:mt-0 max-w-sm mx-auto w-full">
            {/* Subtle backlight halo */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-brand-gold/25 via-brand-sand to-transparent rounded-[4.5rem] blur-xl opacity-80" />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: LUXURY_EASE }}
              className="relative mx-auto max-w-sm rounded-t-[4rem] sm:rounded-t-[5rem] rounded-b-2xl sm:rounded-b-3xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl bg-white"
            >
              <div className="relative aspect-[3/4] w-full group">
                <Image
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=85"
                  alt="Royal Emirati Gold Trim Burqa"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Floating Product Highlight Tag */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-gold/30 text-brand-obsidian shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold tracking-widest text-brand-gold-dark block uppercase">
                        Signature Masterpiece
                      </span>
                      <p className="font-serif text-sm font-bold text-brand-obsidian mt-0.5 leading-snug truncate">
                        Royal Emirati Gold-Trim Burqa
                      </p>
                      <p className="text-[11px] text-stone-500">Pure Saudi Nida Crepe</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold text-brand-obsidian">₹2,799</span>
                      <span className="block text-[11px] text-stone-400 line-through">₹3,499</span>
                    </div>
                  </div>
                </div>

                {/* Floating Rating Pill with Animated Review Counter */}
                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brand-gold/40 flex items-center gap-1.5 text-xs text-brand-obsidian shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold">4.9</span>
                  <span className="text-stone-500">
                    (<AnimatedCounter target={480} suffix="+ Reviews" />)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
