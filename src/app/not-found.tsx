import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Compass, Home, Search, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: 'Page Not Found | Huma Collection',
  },
  description: 'The requested modest fashion page or piece could not be located.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] max-w-3xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shadow-sm">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark block">
          404 Error • Page Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian">
          Piece or Page Unavailable
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          The page you are searching for might have been moved, renamed, or is temporarily unavailable in our current catalogue.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-brand-obsidian hover:bg-stone-900 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-brand-gold" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/burqa"
          className="px-6 py-3 rounded-xl bg-white border border-stone-300 hover:border-brand-gold/60 text-brand-obsidian font-semibold text-xs transition-colors shadow-sm flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-brand-gold-dark" />
          <span>Explore Burqa Collection</span>
        </Link>
        <Link
          href="/collection"
          className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-brand-obsidian font-semibold text-xs transition-colors"
        >
          View All Collections
        </Link>
      </div>
    </div>
  );
}
