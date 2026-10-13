import React from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-obsidian pb-16">
      {/* Category Hero Banner Skeleton */}
      <div className="relative py-12 sm:py-16 bg-gradient-to-b from-brand-ivory via-brand-cream to-brand-sand/30 border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-dark text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>Loading Collection...</span>
          </div>

          <div className="w-64 sm:w-96 h-9 sm:h-12 bg-stone-200/90 rounded-xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          <div className="w-72 sm:w-80 h-4 bg-stone-200/70 rounded-full mx-auto" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Toolbar Skeleton */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200/80">
          <div className="w-28 h-4 bg-stone-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="w-28 h-9 rounded-xl bg-stone-200/80" />
            <div className="w-32 h-9 rounded-xl bg-stone-200/80" />
          </div>
        </div>

        {/* 8-Card Product Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-luxury space-y-3 p-3 flex flex-col"
            >
              {/* Media Aspect Container */}
              <div className="relative aspect-[3/4] w-full rounded-xl bg-stone-200/80 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>

              {/* Title & Price Skeletons */}
              <div className="space-y-2 pt-1 flex-1">
                <div className="w-3/4 h-4 bg-stone-200 rounded" />
                <div className="w-1/2 h-3.5 bg-stone-100 rounded" />
                <div className="w-1/3 h-4 bg-brand-gold/30 rounded mt-2" />
              </div>

              {/* Button Skeleton */}
              <div className="w-full h-9 rounded-xl bg-stone-200/70 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
