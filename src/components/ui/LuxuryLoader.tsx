import React from 'react';
import { Sparkles } from 'lucide-react';

interface LuxuryLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({
  title = 'Curating Modest Masterpiece',
  subtitle = 'Huma Collection • Pure Saudi Nida & Korean Crepe',
  fullScreen = false,
  className = '',
}) => {
  const content = (
    <div className={`flex flex-col items-center justify-center text-center p-8 select-none ${className}`}>
      {/* Luxury Gold Monogram Emblem with Concentric Shimmer Rings */}
      <div className="relative mb-6">
        {/* Ambient golden glow halo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-brand-gold/30 via-amber-300/20 to-brand-gold-dark/30 rounded-full blur-xl animate-pulse" />

        {/* Outer spinning decorative orbit */}
        <div className="absolute -inset-2 rounded-full border border-brand-gold/40 border-dashed animate-spin-slow" />

        {/* Central Obsidian & Gold Medallion */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-stone-900 via-brand-obsidian to-black border-2 border-brand-gold/60 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Subtle inner metallic radial flare */}
          <div className="absolute inset-0 bg-radial-gradient from-brand-gold/20 via-transparent to-transparent opacity-60" />

          {/* Luxury Monogram "H" */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-wider bg-gradient-to-b from-brand-gold-light via-brand-gold to-brand-gold-dark bg-clip-text text-transparent drop-shadow-sm">
              H
            </span>
            <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mt-0.5" />
          </div>

          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        </div>

        {/* Little floating sparkles accent */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/60 flex items-center justify-center text-brand-gold animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="space-y-1.5 max-w-sm">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-brand-gold-dark block">
          Huma Collection
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-obsidian leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-stone-500 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Luxury Progress Shimmer Bar */}
      <div className="w-48 sm:w-56 h-1 bg-stone-200/80 rounded-full mt-6 overflow-hidden relative border border-brand-gold/20">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-amber-200 rounded-full w-full -translate-x-full animate-shimmer" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-cream/80 backdrop-blur-md transition-opacity duration-300">
        {content}
      </div>
    );
  }

  return content;
};
