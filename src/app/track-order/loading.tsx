import React from 'react';
import { Package, Search, Truck } from 'lucide-react';

export default function TrackOrderLoading() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-obsidian">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-brand-gold-dark animate-pulse" />
          </div>
          <div className="w-48 h-8 bg-stone-200 rounded-lg mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
          <div className="w-72 h-4 bg-stone-200/70 rounded mx-auto animate-pulse" />
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="w-28 h-3.5 bg-stone-200 rounded animate-pulse" />
              <div className="w-full h-12 bg-stone-100 rounded-xl border border-stone-200" />
            </div>
            <div className="space-y-1.5">
              <div className="w-24 h-3.5 bg-stone-200 rounded animate-pulse" />
              <div className="w-full h-12 bg-stone-100 rounded-xl border border-stone-200" />
            </div>
            <div className="w-full h-12 rounded-xl bg-brand-obsidian/20 relative overflow-hidden mt-2">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
