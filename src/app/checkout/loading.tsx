import React from 'react';
import { Lock, ShieldCheck, Truck } from 'lucide-react';

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-obsidian">
      {/* Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200/60">
        <div className="flex items-center gap-2">
          <div className="w-12 h-3.5 bg-stone-200 rounded animate-pulse" />
          <span className="text-stone-300">/</span>
          <div className="w-20 h-3.5 bg-brand-gold/30 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="w-32 h-4 bg-brand-gold/20 rounded-full animate-pulse" />
          <div className="w-64 h-8 bg-stone-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
          <div className="w-96 h-4 bg-stone-200/70 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Form Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="w-40 h-5 bg-stone-200 rounded animate-pulse" />
                <Lock className="w-4 h-4 text-stone-300" />
              </div>

              {/* Form Input Skeletons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="w-20 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-full h-11 bg-stone-100 rounded-xl border border-stone-200" />
                </div>
                <div className="space-y-1.5">
                  <div className="w-24 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-full h-11 bg-stone-100 rounded-xl border border-stone-200" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="w-28 h-3 bg-stone-200 rounded animate-pulse" />
                <div className="w-full h-11 bg-stone-100 rounded-xl border border-stone-200" />
              </div>

              <div className="space-y-1.5">
                <div className="w-32 h-3 bg-stone-200 rounded animate-pulse" />
                <div className="w-full h-11 bg-stone-100 rounded-xl border border-stone-200" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="h-11 bg-stone-100 rounded-xl border border-stone-200" />
                <div className="h-11 bg-stone-100 rounded-xl border border-stone-200" />
                <div className="h-11 bg-stone-100 rounded-xl border border-stone-200" />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Skeleton */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury space-y-5">
              <div className="w-36 h-5 bg-stone-200 rounded animate-pulse pb-2 border-b border-stone-100" />

              {/* Item placeholders */}
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-stone-100">
                  <div className="w-14 h-18 bg-stone-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-3.5 bg-stone-200 rounded animate-pulse" />
                    <div className="w-1/2 h-3 bg-stone-100 rounded animate-pulse" />
                    <div className="w-16 h-3 bg-brand-gold/30 rounded animate-pulse" />
                  </div>
                </div>
              ))}

              {/* Price rows */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between">
                  <div className="w-16 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-14 h-3 bg-stone-200 rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="w-14 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-12 h-3 bg-emerald-100 rounded animate-pulse" />
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100 font-bold">
                  <div className="w-20 h-4 bg-stone-200 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-brand-gold/40 rounded animate-pulse" />
                </div>
              </div>

              {/* CTA button */}
              <div className="w-full h-13 rounded-xl bg-brand-obsidian/20 relative overflow-hidden mt-4">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>

            {/* Trust highlights */}
            <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
                <span>Encrypted 256-bit</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-gold-dark" />
                <span>Insured Delivery</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
