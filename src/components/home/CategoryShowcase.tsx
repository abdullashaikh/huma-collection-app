'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import { Category } from '../../types';

import { AnimatedCounter, FadeUp, LUXURY_EASE } from '../ui/Motion';

interface CategoryShowcaseProps {
  categories: Category[];
}

const CATEGORY_META: Record<string, { image: string; tag: string; subtitle: string }> = {
  burqa: {
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    tag: 'Flagship Collection',
    subtitle: 'Saudi Nida & Korean Crepe',
  },
  hijab: {
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80',
    tag: 'Everyday Luxury',
    subtitle: 'Turkish Silk & Modal Chiffon',
  },
  abaya: {
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    tag: 'Contemporary Cut',
    subtitle: 'Minimalist Dubai Silhouettes',
  },
  niqab: {
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    tag: 'Pure Comfort',
    subtitle: 'Breathable Saudi Multi-Layer',
  },
  nospice: {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    tag: 'Modest Essential',
    subtitle: 'Skin-Friendly Soft Cotton',
  },
  'perfume-attar': {
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    tag: 'Non-Alcoholic',
    subtitle: 'Pure Dehn Al Oud & Musk Oils',
  },
  janamaz: {
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    tag: 'Sacred Comfort',
    subtitle: 'Orthopedic Padded Velvet Mats',
  },
  topi: {
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    tag: 'Handcrafted',
    subtitle: 'Embroidered Prayer Caps',
  },
  'hajj-umrah': {
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    tag: 'Pilgrimage Kit',
    subtitle: '100% Terry Cotton Ihram Sets',
  },
  tasbih: {
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    tag: 'Artisanal Beads',
    subtitle: 'Olive Wood & Agate Counters',
  },
  miswak: {
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    tag: 'Sunnah Care',
    subtitle: 'Vacuum-Sealed Fresh Olive Root',
  },
  rumal: {
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    tag: 'Classic Weave',
    subtitle: 'Pure Cotton Embroidered Rumal',
  },
};

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Take top 6 prioritized categories or all available
  const fallbackCategories: Partial<Category>[] = [
    { id: 1, name: 'Burqa Collection', slug: 'burqa', productCount: 18, imageUrl: null },
    { id: 2, name: 'Luxury Hijabs', slug: 'hijab', productCount: 12, imageUrl: null },
    { id: 3, name: 'Designer Abayas', slug: 'abaya', productCount: 15, imageUrl: null },
    { id: 4, name: 'Saudi Niqabs', slug: 'niqab', productCount: 8, imageUrl: null },
    { id: 5, name: 'Artisanal Attar', slug: 'perfume-attar', productCount: 9, imageUrl: null },
    { id: 6, name: 'Padded Janamaz', slug: 'janamaz', productCount: 6, imageUrl: null },
  ];
  const displayCategories: (Category | Partial<Category>)[] = categories.length > 0 ? categories.slice(0, 6) : fallbackCategories;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Decorative Islamic Arch Watermark Backdrop */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-brand-gold/10 via-brand-sand/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Section Header with smooth entrance */}
      <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold-dark text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Curated Modest Wardrobe</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-obsidian tracking-tight">
            Explore Our Modest World
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-xl">
            Each category represents master craftsmanship, non-translucent luxury textiles, and modest silhouettes tailored for effortless everyday grace.
          </p>
        </div>

        <Link
          href="/burqa"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-obsidian hover:text-brand-gold-dark tracking-wide uppercase group self-start md:self-end md:mb-1"
        >
          <span>View All Collections</span>
          <span className="w-7 h-7 rounded-full bg-brand-sand/80 flex items-center justify-center text-brand-obsidian group-hover:bg-brand-gold group-hover:text-white transition-all">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </FadeUp>

      {/* Luxury Arched Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {displayCategories.map((cat, index) => {
          const slug = cat.slug || 'burqa';
          const meta = CATEGORY_META[slug] || {
            image: cat.imageUrl || (cat as any).image_url || 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=800&q=80',
            tag: 'Exclusive',
            subtitle: 'Premium Modest Wear',
          };

          const cardImg = cat.imageUrl || (cat as any).image_url || meta.image;
          const pieceCount = cat.productCount || (cat as any).product_count || 12;

          return (
            <motion.div
              key={cat.id || slug || index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: LUXURY_EASE }}
              onHoverStart={() => setHoveredSlug(slug)}
              onHoverEnd={() => setHoveredSlug(null)}
            >
              <Link
                href={slug === 'burqa' ? '/burqa' : `/category/${slug}`}
                className="group relative flex flex-col h-[320px] sm:h-[360px] rounded-t-[3.5rem] rounded-b-2xl overflow-hidden border border-stone-200/90 hover:border-brand-gold/70 shadow-luxury hover:shadow-2xl transition-all duration-500 bg-white"
              >
                {/* Image Container with Luxury Arched Silhouette */}
                <div className="relative w-full h-full overflow-hidden bg-stone-900">
                  <Image
                    src={cardImg}
                    alt={cat.name || 'Huma Hijab Category'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                  />

                  {/* Top Architectural Islamic Arch Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Dark Vignette Gradient Overlay for Typography Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Floating Badge (High contrast semi-opaque dark pill to guarantee legibility) */}
                  <div className="absolute top-3.5 inset-x-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-white shadow-sm">
                      {meta.tag}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-brand-gold/90 text-brand-dark flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>

                  {/* Bottom Content Card (Comfortable vertical breathing room & padding) */}
                  <div className="absolute inset-x-0 bottom-0 p-5 pb-6 text-white z-10 transform transition-transform duration-300">
                    <span className="text-xs text-brand-gold font-medium tracking-wide uppercase block mb-1.5">
                      <AnimatedCounter target={Number(pieceCount)} suffix="+ Designs" />
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors leading-tight line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-200 line-clamp-1 mt-1 font-light">
                      {meta.subtitle}
                    </p>

                    {/* Animated Gold Divider on Hover */}
                    <div className="w-8 h-0.5 bg-brand-gold mt-3.5 group-hover:w-full transition-all duration-500 origin-left" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
