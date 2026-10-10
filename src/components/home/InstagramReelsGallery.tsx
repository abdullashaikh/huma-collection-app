'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Play, Heart, ShoppingBag, Sparkles, ExternalLink } from 'lucide-react';

import { FadeUp, LUXURY_EASE } from '../ui/Motion';

interface ReelItem {
  id: string;
  creator: string;
  handle: string;
  productName: string;
  productSlug: string;
  price: number;
  coverImage: string;
  views: string;
  likes: string;
}

export const InstagramReelsGallery: React.FC = () => {
  const [activeReel, setActiveReel] = useState<string | null>(null);

  const reels: ReelItem[] = [
    {
      id: 'reel-1',
      creator: 'Huma Signature',
      handle: '@humahijabcollection',
      productName: 'Royal Black Dubai Crepe Burqa',
      productSlug: 'royal-black-dubai-crepe-front-open-burqa',
      price: 2799,
      coverImage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=85',
      views: '48.2K',
      likes: '3.4K',
    },
    {
      id: 'reel-2',
      creator: 'Modest Atelier',
      handle: '@humahijabcollection',
      productName: 'Emirati Gold Thread Butterfly Burqa',
      productSlug: 'emirati-hand-embroidered-butterfly-flare-burqa',
      price: 3199,
      coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85',
      views: '62.8K',
      likes: '5.1K',
    },
    {
      id: 'reel-3',
      creator: 'Zahra Style',
      handle: '@humahijabcollection',
      productName: 'Minimalist Front-Open Dubai Abaya',
      productSlug: 'burqa',
      price: 2499,
      coverImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=85',
      views: '35.4K',
      likes: '2.8K',
    },
    {
      id: 'reel-4',
      creator: 'Pure Modesty',
      handle: '@humahijabcollection',
      productName: 'Turkish Silk Hijab & Saudi Niqab',
      productSlug: 'burqa',
      price: 1899,
      coverImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=600&q=85',
      views: '54.1K',
      likes: '4.6K',
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with FadeUp entrance */}
      <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 text-brand-obsidian text-xs font-bold tracking-widest uppercase mb-2">
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span>Seen On Instagram • #HumaModest</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
            Modest Elegance In Motion
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Watch real drapes, natural flow, and wudu-friendly cuff styling captured in natural daylight.
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-obsidian hover:text-brand-gold-dark transition-colors self-start md:self-end"
        >
          <span>Follow @humahijabcollection</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </FadeUp>

      {/* 9:16 Video / Reel Cards Carousel */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {reels.map((reel, idx) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: LUXURY_EASE }}
            className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-brand-obsidian border border-stone-200/80 shadow-luxury hover:shadow-2xl transition-all duration-500"
          >
            {/* Reel Cover Photo */}
            <Image
              src={reel.coverImage}
              alt={reel.productName}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-85 transition-opacity" />

            {/* Top Bar: Instagram Badge & Views */}
            <div className="absolute top-2.5 inset-x-2 sm:top-3.5 sm:inset-x-3.5 flex items-center justify-between text-white text-[10px] sm:text-xs z-10">
              <span className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-medium">
                <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" />
                <span>{reel.views}</span>
              </span>

              <span className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-rose-300 font-medium">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-400 text-rose-400" />
                <span>{reel.likes}</span>
              </span>
            </div>

            {/* Center Play Button Pulse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
              </div>
            </div>

            {/* Bottom Product Details & Direct Link */}
            <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white z-10 transition-all duration-300 group-hover:bg-black/85">
              <span className="text-[10px] sm:text-xs text-brand-gold-light font-medium block truncate">
                {reel.handle}
              </span>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                {reel.productName}
              </h3>

              <div className="flex items-center justify-between mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-white/15 gap-1">
                <span className="text-xs sm:text-xs font-bold text-brand-gold">₹{reel.price}</span>
                <Link
                  href={`/burqa/${reel.productSlug}`}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-brand-gold hover:bg-white text-brand-dark text-[11px] sm:text-xs font-bold transition-colors flex items-center gap-1 shadow-sm flex-shrink-0"
                >
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Shop<span className="hidden sm:inline"> Look</span></span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
