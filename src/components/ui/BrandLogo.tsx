import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  href = '/',
}) => {
  const isDark = variant === 'dark';

  // Dimension scaling
  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] sm:text-xs tracking-[0.22em]',
    lg: 'text-xs sm:text-sm tracking-[0.25em]',
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* Luxury Gold & Obsidian Emblem Icon */}
      <div className={`relative ${emblemSizes[size]} rounded-full flex-shrink-0 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
        <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="brandLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F3E7C4" />
              <stop offset="35%" stop-color="#C5A880" />
              <stop offset="70%" stop-color="#9E7D47" />
              <stop offset="100%" stop-color="#E5D3A3" />
            </linearGradient>
            <radialGradient id="brandLogoDark" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stop-color="#2A2826" />
              <stop offset="60%" stop-color="#1C1B1A" />
              <stop offset="100%" stop-color="#100F0E" />
            </radialGradient>
          </defs>

          {/* Background & Outer Rings */}
          <circle cx="256" cy="256" r="246" fill="url(#brandLogoDark)" />
          <circle cx="256" cy="256" r="240" fill="none" stroke="url(#brandLogoGold)" strokeWidth="8" />
          <circle cx="256" cy="256" r="226" fill="none" stroke="url(#brandLogoGold)" strokeWidth="2.5" strokeDasharray="8,5" opacity="0.7" />

          {/* Mihrab Arch */}
          <path
            d="M 160 380 L 160 250 C 160 170, 210 120, 256 90 C 302 120, 352 170, 352 250 L 352 380 Z"
            fill="none"
            stroke="url(#brandLogoGold)"
            strokeWidth="5"
          />

          {/* Star Crest */}
          <polygon
            points="256,66 261,78 274,82 261,86 256,98 251,86 238,82 251,78"
            fill="url(#brandLogoGold)"
          />

          {/* Letter H Monogram */}
          <path
            d="M 194 195 L 226 195 L 226 205 L 216 205 L 216 335 L 226 335 L 226 345 L 194 345 L 194 335 L 204 335 L 204 205 L 194 205 Z"
            fill="url(#brandLogoGold)"
          />
          <path
            d="M 286 195 L 318 195 L 318 205 L 308 205 L 308 335 L 318 335 L 318 345 L 286 345 L 286 335 L 296 335 L 296 205 L 286 205 Z"
            fill="url(#brandLogoGold)"
          />
          <path d="M 204 265 L 308 265 L 308 275 L 204 275 Z" fill="url(#brandLogoGold)" />
          <polygon points="256,260 264,270 256,280 248,270" fill="#FFF" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col text-left">
        <span
          className={`font-serif ${titleSizes[size]} font-bold tracking-[0.2em] uppercase leading-none transition-colors ${
            isDark
              ? 'text-brand-obsidian group-hover:text-brand-gold-dark'
              : 'text-white group-hover:text-brand-gold-light'
          }`}
        >
          Huma
        </span>
        <span
          className={`font-sans ${subtitleSizes[size]} font-semibold uppercase mt-0.5 transition-colors ${
            isDark
              ? 'text-brand-gold-dark group-hover:text-brand-obsidian'
              : 'text-brand-gold-light/90 group-hover:text-white'
          }`}
        >
          Hijab Collection
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Huma Hijab Collection — Return to Homepage">
        {content}
      </Link>
    );
  }

  return content;
};
