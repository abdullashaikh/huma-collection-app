'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Filter, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { Category, Product } from '../../../types';
import { ProductCard } from '../../../components/product/ProductCard';
import { FadeUp } from '../../../components/ui/Motion';

const STORE_PHONE = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
const OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';

interface CategoryPageClientProps {
  category: Category;
  initialProducts: Product[];
}

export function CategoryPageClient({ category, initialProducts }: CategoryPageClientProps) {
  const [selectedSubcatId, setSelectedSubcatId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const subcategories = category.subcategories || [];

  // Filter products by selected subcategory
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedSubcatId !== null) {
      list = list.filter((p) => p.subcategoryId === selectedSubcatId || (p as any).subcategory_id === selectedSubcatId);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => {
        const pA = a.salePrice || a.basePrice || 0;
        const pB = b.salePrice || b.basePrice || 0;
        return pA - pB;
      });
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => {
        const pA = a.salePrice || a.basePrice || 0;
        const pB = b.salePrice || b.basePrice || 0;
        return pB - pA;
      });
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return list;
  }, [initialProducts, selectedSubcatId, sortBy]);

  const audienceLabel =
    category.audience === 'MEN'
      ? 'Men\'s Collection'
      : category.audience === 'ALL'
      ? 'Shared & Sunnah Essentials'
      : 'Women\'s Modest Fashion';

  const whatsappInquiryMessage = encodeURIComponent(
    `Assalamu Alaikum Hamid bhai (Huma Hijab Collection),\n\nI am viewing your online showcase for the *${category.name}* category and would like to inquire about current stock, sizes, and new arrivals at your boutique.\n\nCould you please assist me?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-brand-obsidian">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collection" className="hover:text-brand-obsidian">Collections</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-gold-dark font-medium">{audienceLabel}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-obsidian font-semibold truncate max-w-xs">{category.name}</span>
      </nav>

      {/* Category Header Banner */}
      <FadeUp className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>{audienceLabel}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {category.description}
          </p>
        )}
      </FadeUp>

      {/* Subcategory Pills & Sorting Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-b border-stone-200/80 pb-4">
        {/* Subcategories (if available) */}
        {subcategories.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedSubcatId(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[38px] ${
                selectedSubcatId === null
                  ? 'bg-brand-obsidian text-brand-gold shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              All Designs ({initialProducts.length})
            </button>
            {subcategories.map((sub) => {
              const isSelected = selectedSubcatId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcatId(sub.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[38px] ${
                    isSelected
                      ? 'bg-brand-obsidian text-brand-gold shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-brand-obsidian">{filteredProducts.length}</strong> designs in {category.name}
          </div>
        )}

        {/* Sort Filter with safe font size for iOS */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="cat-sort" className="text-xs text-stone-500 whitespace-nowrap">Sort:</label>
          <select
            id="cat-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-base sm:text-xs rounded-xl border border-stone-200 bg-white px-3 py-2 sm:py-1.5 text-stone-800 focus:outline-none focus:border-brand-gold min-h-[40px]"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">New Arrivals First</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Meaningful Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 max-w-2xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-brand-sand/60 text-brand-obsidian flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-brand-gold-dark" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-obsidian">
              Fresh Designs Arriving Soon for {category.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We are curating exquisite new pieces for this collection. You can also visit our physical boutique in person to view exclusive unlisted stock or speak directly with store owner <strong>{OWNER_NAME}</strong>.
            </p>
          </div>

          {/* Boutique Contact CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:+91${STORE_PHONE}`}
              className="py-3 px-4 rounded-xl bg-brand-obsidian hover:bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Call Boutique ({STORE_PHONE})</span>
            </a>
            <a
              href={`https://wa.me/91${STORE_PHONE.replace(/[^0-9]/g, '')}?text=${whatsappInquiryMessage}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

          <div>
            <Link
              href="/collection"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-dark hover:text-brand-obsidian transition-colors underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse All Collections</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
