'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Filter,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { AudienceScope, Category, Product } from '../../types';
import { ProductCard } from '../../components/product/ProductCard';
import { FadeUp, StaggerContainer, StaggerItem } from '../../components/ui/Motion';

const STORE_PHONE = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
const OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';

interface CollectionClientProps {
  initialCategories: Category[];
  initialProducts: Product[];
}

export function CollectionClient({ initialCategories, initialProducts }: CollectionClientProps) {
  const searchParams = useSearchParams();

  const paramAudience = (searchParams.get('audience')?.toUpperCase() as AudienceScope) || 'ALL';
  const paramCategory = searchParams.get('category') || '';

  const [selectedAudience, setSelectedAudience] = useState<'ALL' | 'WOMEN' | 'MEN' | 'COMMON'>('ALL');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('');
  const [selectedSubcatId, setSelectedSubcatId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Sync from URL search params on mount or change
  useEffect(() => {
    if (paramAudience === 'WOMEN') setSelectedAudience('WOMEN');
    else if (paramAudience === 'MEN') setSelectedAudience('MEN');
    else if (paramAudience === 'ALL' && searchParams.has('audience')) setSelectedAudience('COMMON');
    else setSelectedAudience('ALL');

    if (paramCategory) setSelectedCategorySlug(paramCategory);
  }, [paramAudience, paramCategory]);

  // Categories matching the current audience
  const audienceCategories = useMemo(() => {
    return initialCategories.filter((c) => {
      if (c.parentId) return false; // root categories only
      if (selectedAudience === 'ALL') return true;
      if (selectedAudience === 'WOMEN') return c.audience === 'WOMEN' || c.audience === 'ALL';
      if (selectedAudience === 'MEN') return c.audience === 'MEN' || c.audience === 'ALL';
      if (selectedAudience === 'COMMON') return c.audience === 'ALL';
      return true;
    });
  }, [initialCategories, selectedAudience]);

  // Selected category object
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategorySlug) return null;
    return initialCategories.find((c) => c.slug === selectedCategorySlug) || null;
  }, [initialCategories, selectedCategorySlug]);

  // Available subcategories for the selected category
  const availableSubcategories = activeCategoryObj?.subcategories || [];

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // 1. Audience filter
    if (selectedAudience === 'WOMEN') {
      list = list.filter((p) => p.audience === 'WOMEN' || p.audience === 'ALL');
    } else if (selectedAudience === 'MEN') {
      list = list.filter((p) => p.audience === 'MEN' || p.audience === 'ALL');
    } else if (selectedAudience === 'COMMON') {
      list = list.filter((p) => p.audience === 'ALL');
    }

    // 2. Category slug filter
    if (selectedCategorySlug) {
      list = list.filter(
        (p) =>
          p.categorySlug === selectedCategorySlug ||
          (p as any).category_slug === selectedCategorySlug ||
          (activeCategoryObj && (p.categoryId === activeCategoryObj.id || (p as any).category_id === activeCategoryObj.id))
      );
    }

    // 3. Subcategory filter
    if (selectedSubcatId !== null) {
      list = list.filter((p) => p.subcategoryId === selectedSubcatId || (p as any).subcategory_id === selectedSubcatId);
    }

    // 4. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.skuBase.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q) ||
          p.categoryName?.toLowerCase().includes(q)
      );
    }

    // 5. Sorting
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
    } else {
      // featured / bestseller
      list.sort((a, b) => (b.isBestseller || b.isFeatured ? 1 : 0) - (a.isBestseller || a.isFeatured ? 1 : 0));
    }

    return list;
  }, [initialProducts, selectedAudience, selectedCategorySlug, activeCategoryObj, selectedSubcatId, searchQuery, sortBy]);

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum Hamid bhai (Huma Hijab Collection),\n\nI am browsing your online showcase catalog and would like to inquire about availability and fittings at your boutique.\n\nCould you please help me?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-brand-obsidian">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-obsidian font-semibold">Boutique Catalogue</span>
        {activeCategoryObj && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gold-dark font-medium">{activeCategoryObj.name}</span>
          </>
        )}
      </nav>

      {/* Header Banner */}
      <FadeUp className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold tracking-widest text-brand-gold-dark uppercase">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Curated Modest Fashion &amp; Sunnah Essentials</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian">
          Boutique Showcase Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Explore our complete collection of luxury burqas, breathable hijabs, artisanal non-alcoholic attars, men&apos;s prayer caps, and Hajj &amp; Umrah travel essentials.
        </p>
      </FadeUp>

      {/* Audience Scope Tabs (Smooth Edge-to-Edge Touch Scroll on Mobile) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { key: 'ALL', label: 'All Collections' },
          { key: 'WOMEN', label: '👑 Women\'s Modest Wear' },
          { key: 'MEN', label: '🕌 Men\'s Islamic Collection' },
          { key: 'COMMON', label: '✨ Shared Sunnah Essentials' },
        ].map((tab) => {
          const isSelected = selectedAudience === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedAudience(tab.key as any);
                setSelectedCategorySlug('');
                setSelectedSubcatId(null);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm min-h-[40px] ${
                isSelected
                  ? 'bg-brand-obsidian text-brand-gold shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:text-brand-obsidian hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Bar & Sort Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input with 16px font on mobile to prevent iOS auto-zoom */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, fabric, style, or SKU..."
              className="w-full pl-9 pr-8 py-2.5 sm:py-2 rounded-xl border border-stone-200 text-base sm:text-xs text-stone-800 focus:outline-none focus:border-brand-gold bg-stone-50/50 min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector with accessible touch target */}
          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-stone-500">
              Showing <strong className="text-brand-obsidian">{filteredProducts.length}</strong> items
            </span>
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="text-xs text-stone-500">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-base sm:text-xs rounded-xl border border-stone-200 bg-white px-3 py-2 sm:py-1.5 text-stone-800 focus:outline-none focus:border-brand-gold min-h-[40px]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Category Chips */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => {
                setSelectedCategorySlug('');
                setSelectedSubcatId(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategorySlug === ''
                  ? 'bg-brand-gold/20 text-brand-gold-dark border border-brand-gold/40'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All Categories
            </button>
            {audienceCategories.map((c) => {
              const isSelected = selectedCategorySlug === c.slug;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategorySlug(isSelected ? '' : c.slug);
                    setSelectedSubcatId(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-obsidian text-brand-gold shadow-sm'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {c.name}
                  {c.productCount !== undefined && Number(c.productCount) > 0 && (
                    <span className="ml-1.5 text-[10px] opacity-70">({c.productCount})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subcategories (if selected category has subcategories) */}
          {availableSubcategories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
              <span className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-wider pl-1 flex-shrink-0">
                Subcategories:
              </span>
              <button
                onClick={() => setSelectedSubcatId(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSubcatId === null
                    ? 'bg-stone-800 text-white'
                    : 'bg-white text-stone-600 border border-stone-200'
                }`}
              >
                All
              </button>
              {availableSubcategories.map((sub) => {
                const isSubSelected = selectedSubcatId === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcatId(isSubSelected ? null : sub.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isSubSelected
                        ? 'bg-stone-800 text-white'
                        : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 max-w-2xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-brand-sand/60 text-brand-obsidian flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-brand-gold-dark" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-obsidian">
              No matching pieces found
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We update our collection regularly with new shipments and master-tailored cuts. Contact store owner <strong>{OWNER_NAME}</strong> directly to inquire about incoming pieces or customized orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:+91${STORE_PHONE}`}
              className="py-3 px-4 rounded-xl bg-brand-obsidian hover:bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Call Boutique ({STORE_PHONE})</span>
            </a>
            <a
              href={`https://wa.me/91${STORE_PHONE.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              setSelectedAudience('ALL');
              setSelectedCategorySlug('');
              setSelectedSubcatId(null);
              setSearchQuery('');
            }}
            className="text-xs font-bold text-brand-gold-dark hover:text-brand-obsidian transition-colors underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
