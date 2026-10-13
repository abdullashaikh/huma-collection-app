import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-obsidian">
      {/* 1. Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200/60">
        <div className="flex items-center gap-2">
          <div className="w-12 h-3.5 bg-stone-200 rounded animate-pulse" />
          <span className="text-stone-300">/</span>
          <div className="w-20 h-3.5 bg-stone-200 rounded animate-pulse" />
          <span className="text-stone-300">/</span>
          <div className="w-32 h-3.5 bg-brand-gold/30 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Gallery Frame */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-stone-200/80 border border-brand-gold/30 shadow-luxury flex flex-col items-center justify-center">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              {/* Central Luxury Medallion */}
              <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-obsidian border border-brand-gold/60 flex items-center justify-center shadow-xl mb-3 animate-luxuryGlow">
                  <span className="font-serif text-2xl font-bold bg-gradient-to-b from-brand-gold-light via-brand-gold to-brand-gold-dark bg-clip-text text-transparent">
                    H
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-brand-gold/40 text-brand-gold-dark text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
                  <span>Loading Piece Details...</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Row Skeleton */}
            <div className="flex gap-3 overflow-x-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 sm:w-24 aspect-[3/4] rounded-xl bg-stone-200/80 border border-stone-300 relative overflow-hidden flex-shrink-0"
                >
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Specs & CTAs Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category tag & Title skeleton */}
            <div className="space-y-3">
              <div className="w-24 h-4 bg-brand-gold/20 rounded-full animate-pulse" />
              <div className="w-4/5 h-8 sm:h-10 bg-stone-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <div className="w-2/3 h-5 bg-stone-200/80 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>

            {/* Price Pill Skeleton */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2">
              <div className="w-32 h-7 bg-brand-obsidian/10 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
              <div className="w-48 h-3.5 bg-stone-200 rounded animate-pulse" />
            </div>

            {/* Sizing options skeleton */}
            <div className="space-y-2.5">
              <div className="w-36 h-4 bg-stone-200 rounded animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-10 rounded-xl bg-stone-200/80 border border-stone-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="space-y-3 pt-2">
              <div className="w-full h-14 rounded-xl bg-brand-obsidian/20 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
              <div className="w-full h-12 rounded-xl bg-emerald-600/20 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>

            {/* Trust highlights skeleton */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200/80">
              <div className="p-3 rounded-xl bg-white border border-stone-200 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-gold-dark" />
                <div className="space-y-1">
                  <div className="w-16 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-20 h-2.5 bg-stone-100 rounded" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200 flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-brand-gold-dark" />
                <div className="space-y-1">
                  <div className="w-16 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-20 h-2.5 bg-stone-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
