import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationLoading() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-obsidian">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="w-32 h-4 bg-emerald-200 rounded-full mx-auto animate-pulse" />
          <div className="w-64 h-8 bg-stone-200 rounded-lg mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
          <div className="w-80 h-4 bg-stone-200/70 rounded mx-auto animate-pulse" />
        </div>

        {/* Card skeleton */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury max-w-md mx-auto space-y-4">
          <div className="w-full h-10 bg-stone-100 rounded-xl animate-pulse" />
          <div className="w-full h-20 bg-stone-100 rounded-xl animate-pulse" />
          <div className="w-full h-12 bg-emerald-600/20 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
