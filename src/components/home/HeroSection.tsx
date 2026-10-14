import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '../../types';
import { getMediaUrl } from '../../lib/media';
import { WhatsAppIcon, buildProductWhatsAppUrl, openWhatsApp } from '../../lib/whatsapp';

export interface HeroSectionProps {
  heroProduct?: Product | null;
}

const DEFAULT_HERO_ABAYA = {
  name: 'Classic Shirt-Collar Button-Down Abaya',
  slug: 'classic-shirt-collar-button-down-abaya',
  categorySlug: 'abaya',
  categoryName: 'Abaya',
  fabric: 'Premium Soft Korean Crepe',
  basePrice: 2299,
  salePrice: 1699,
  imageUrl: 'https://api.humacollection.in/api/v1/media/file/products/abaya-classic-shirt-collar-button-down-abaya-b24b1f70.webp',
};

export const HeroSection: React.FC<HeroSectionProps> = ({ heroProduct }) => {
  const isBurqa = (heroProduct?.categorySlug || (heroProduct as any)?.category_slug) === 'burqa';
  const productHref = heroProduct
    ? (isBurqa ? `/burqa/${heroProduct.slug}` : `/product/${heroProduct.slug}`)
    : `/product/${DEFAULT_HERO_ABAYA.slug}`;

  const rawBase = heroProduct?.basePrice ?? (heroProduct as any)?.base_price ?? DEFAULT_HERO_ABAYA.basePrice;
  const rawSale = heroProduct?.salePrice ?? (heroProduct as any)?.sale_price ?? DEFAULT_HERO_ABAYA.salePrice;
  const basePrice = Number(rawBase || 0);
  const salePrice = rawSale !== undefined && rawSale !== null && Number(rawSale) > 0 ? Number(rawSale) : null;
  const displayPrice = salePrice && salePrice > 0 ? salePrice : basePrice;

  const rawImage = heroProduct?.primary_image_url || heroProduct?.images?.[0]?.s3Url;
  const imageSrc = (rawImage ? getMediaUrl(rawImage) : null) || DEFAULT_HERO_ABAYA.imageUrl;
  const title = heroProduct?.name || DEFAULT_HERO_ABAYA.name;
  const fabricText = heroProduct?.fabric || heroProduct?.materials || DEFAULT_HERO_ABAYA.fabric;
  const categoryTag = heroProduct?.categoryName ? `Featured ${heroProduct.categoryName}` : 'Featured Abaya Masterpiece';
  const heroWhatsAppUrl = buildProductWhatsAppUrl({
    name: title,
    slug: heroProduct?.slug || DEFAULT_HERO_ABAYA.slug,
    price: displayPrice,
  });

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold-dark text-xs font-semibold tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
              <span>Royal Abaya &amp; Modest Collection 2026</span>
            </div>

            {/* Main Headline (LCP Element - Statically rendered HTML for instant mobile paint) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-obsidian leading-[1.12]">
              Grace In Every Fold, <br />
              <span className="italic font-serif text-brand-gold-dark">
                Pure Modesty
              </span>{' '}
              In Every Thread.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl">
              Master-crafted with authentic imported Korean Crepe and Saudi Nida matte fabrics. Generous modest flare, wudu-friendly snap cuffs, and discreet deep pockets for timeless elegance.
            </p>

            {/* CTA Buttons for Product Showcase */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
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
            </div>

            {/* Showcase Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 border-t border-stone-200/80 text-xs text-stone-600">
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
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Card with smooth depth */}
          <div className="lg:col-span-5 block relative mt-6 lg:mt-0 max-w-sm mx-auto w-full">
            {/* Subtle backlight halo */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-brand-gold/25 via-brand-sand to-transparent rounded-[4.5rem] blur-xl opacity-80" />

            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl bg-white block group">
              <div className="relative aspect-[3/4] w-full group">
                <Link href={productHref} className="block w-full h-full" title={`View ${title} Details`}>
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </Link>

                {/* Floating Product Highlight Tag */}
                <div className="absolute bottom-4 inset-x-3 sm:inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-gold/30 text-brand-obsidian shadow-xl transition-colors">
                  <Link href={productHref} className="flex items-start justify-between gap-3 group/info">
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold tracking-wider text-brand-gold-dark block uppercase">
                        {categoryTag}
                      </span>
                      <p className="font-serif text-base sm:text-lg font-bold text-brand-obsidian mt-0.5 leading-snug line-clamp-2 group-hover/info:text-brand-gold-dark transition-colors">
                        {title}
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">{fabricText}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-base sm:text-lg font-bold text-brand-obsidian block">
                        ₹{displayPrice.toLocaleString('en-IN')}
                      </span>
                      {salePrice && basePrice > salePrice && (
                        <span className="block text-xs text-stone-400 line-through">
                          ₹{basePrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Standardized Prominent WhatsApp Order CTA (Issue 10 & 11) */}
                  <div className="mt-3 pt-2.5 border-t border-stone-100">
                    <a
                      href={heroWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[38px] sm:min-h-[40px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm hover:shadow transition-all active:scale-[0.98] group/wa"
                      title={`Order ${title} on WhatsApp`}
                      aria-label={`Order ${title} on WhatsApp`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white fill-white transition-transform group-hover/wa:scale-110" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Floating Craftsmanship Quality Seal */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brand-gold/40 flex items-center gap-2 text-xs text-brand-obsidian shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span className="font-bold text-stone-800">100% Modest Cut</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-600 font-medium">Boutique Exclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
