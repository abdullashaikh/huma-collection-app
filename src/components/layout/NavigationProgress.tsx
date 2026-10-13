'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { LuxuryLoader } from '../ui/LuxuryLoader';

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetType, setTargetType] = useState<'product' | 'catalog' | 'general'>('general');

  // Detect when route change has successfully finished
  useEffect(() => {
    if (isLoading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Global click interceptor to catch any link navigation across the whole website
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore modified clicks (new tab, new window, downloads, tel/mailto/whatsapp)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('https://wa.me') ||
        href.startsWith('https://api.whatsapp')
      ) {
        return;
      }

      // Ignore hash links on the same page (#collection, #reviews, etc.)
      if (href.startsWith('#')) return;

      // Check if it's an internal link
      try {
        const url = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Ignore external domains
        if (url.origin !== currentUrl.origin) return;

        // Ignore same exact URL (same path + search)
        if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
          if (url.hash) return;
        }

        // Determine destination type
        const isProduct =
          url.pathname.startsWith('/product/') ||
          (url.pathname.startsWith('/burqa/') && url.pathname !== '/burqa');

        const isCatalog =
          url.pathname === '/collection' ||
          url.pathname === '/burqa' ||
          url.pathname.startsWith('/category/');

        if (isProduct) {
          setTargetType('product');
        } else if (isCatalog) {
          setTargetType('catalog');
        } else {
          setTargetType('general');
        }

        setIsLoading(true);
        setProgress(25);

        // Progressive trickling progress animation
        const timer1 = setTimeout(() => setProgress((p) => Math.max(p, 55)), 120);
        const timer2 = setTimeout(() => setProgress((p) => Math.max(p, 82)), 350);

        // Fallback safety timeout so loader never gets stuck
        const timeoutSafety = setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 7000);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timeoutSafety);
        };
      } catch (err) {
        // Invalid URL, do nothing
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, []);

  if (!isLoading && progress === 0) return null;

  return (
    <>
      {/* 1. Sleek Top Luxury Metallic Gold Progress Bar (Sitewide) */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 z-[99999] h-[3px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: isLoading ? 1 : 0 }}
      >
        <div
          className="h-full bg-gradient-to-r from-brand-gold-dark via-amber-300 to-brand-gold-light shadow-[0_0_14px_rgba(197,168,128,0.95)] transition-all ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: progress === 100 ? '200ms' : '400ms',
          }}
        >
          {/* Glowing head pulse */}
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/80 blur-[3px]" />
        </div>
      </div>

      {/* 2. Fancy Centered Luxury Loader (Specifically when moving to Product pages by clicking anything) */}
      {targetType === 'product' && isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[99998] flex items-center justify-center bg-brand-obsidian/60 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative mx-4 p-6 sm:p-8 rounded-3xl bg-brand-cream/95 border border-brand-gold/50 shadow-2xl max-w-sm sm:max-w-md w-full text-center overflow-hidden backdrop-blur-md">
            {/* Ambient gold background aura flares */}
            <div className="absolute -top-16 -left-16 w-44 h-44 bg-brand-gold/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

            <LuxuryLoader
              title="Opening Modest Piece"
              subtitle="Huma Collection • Pure Saudi Nida & Korean Crepe"
            />
          </div>
        </div>
      )}

      {/* 3. Sleek Floating Luxury Badge (For Catalog & Category Transitions) */}
      {targetType === 'catalog' && isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[99998] pointer-events-none animate-fadeIn"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-obsidian/95 backdrop-blur-md border border-brand-gold/50 shadow-2xl text-white">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold animate-spin-slow">
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                Huma Collection
              </p>
              <p className="font-serif text-xs sm:text-sm font-semibold text-white">
                Exploring Modest Catalogue...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Minimal Floating Badge (For Other Sitewide Transitions) */}
      {targetType === 'general' && isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[99998] pointer-events-none animate-fadeIn"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-obsidian/90 backdrop-blur-md border border-brand-gold/30 shadow-lg text-white">
            <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold animate-spin-slow">
              <Sparkles className="w-3 h-3 text-brand-gold" />
            </div>
            <p className="font-serif text-xs text-white">
              Loading...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
