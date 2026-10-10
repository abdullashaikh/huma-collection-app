'use client';

import { ArrowRight, ChevronDown, ChevronRight, Heart, MapPin, Menu, Phone, Search, ShoppingBag, Sparkles, User, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../lib/cart-context';
import { OtpModal } from '../auth/OtpModal';

import { Category } from '../../types';
import { FALLBACK_CATEGORIES } from '../../lib/fallback-data';
import { BrandLogo } from '../ui/BrandLogo';

const STORE_PHONE = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
const LAUNCH_DATE = process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026';

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuKey: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Auto-close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem('huma_customer_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
  }, []);

  // Fetch live categories from backend API
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/categories`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setCategories(json.data);
          }
        }
      } catch (err) {
        console.warn('API error fetching navigation categories, keeping fallback list.');
      }
    }
    loadCategories();
  }, []);

  // Filter root categories by audience scope
  const womenCategories = categories.filter(
    (c) => (c.audience === 'WOMEN' || c.audience === 'ALL') && !c.parentId
  );
  const menCategories = categories.filter(
    (c) => (c.audience === 'MEN' || c.audience === 'ALL') && !c.parentId
  );
  const commonCategories = categories.filter(
    (c) => c.audience === 'ALL' && !c.parentId
  );
  const primaryCategory = categories.find((c) => c.slug === 'burqa') || categories[0];

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-brand-obsidian text-brand-gold-light py-2 px-3 sm:px-4 text-center text-[11px] sm:text-xs font-medium tracking-wide border-b border-brand-gold/20 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>
          🏛️ <strong>Physical Store Showcase:</strong> Online Shopping Launches{' '}
          <strong className="text-white underline decoration-brand-gold">{LAUNCH_DATE}</strong>
        </span>
        <div className="flex items-center gap-3">
          <a
            href={`tel:+91${STORE_PHONE}`}
            className="hover:text-white transition-colors flex items-center gap-1 font-semibold underline decoration-brand-gold/40 hover:decoration-white"
          >
            <Phone className="w-3 h-3 text-brand-gold" />
            <span>Call: {STORE_PHONE}</span>
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 font-semibold underline decoration-brand-gold/40 hover:decoration-white"
          >
            <MapPin className="w-3 h-3 text-brand-gold" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>

      {/* 2. Main Navigation Header with Smooth Scroll Depth Transition */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200'
            : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Trigger with accessible 44px touch target */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Wordmark */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <BrandLogo size="md" variant="dark" />
            </div>

            {/* Desktop Navigation Links with Dynamic Category Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6" aria-label="Main Navigation">
              {/* Home */}
              <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`text-xs tracking-wider transition-all duration-200 relative py-2 ${
                  pathname === '/'
                    ? 'text-brand-obsidian font-bold'
                    : 'text-stone-600 hover:text-brand-obsidian font-medium'
                }`}
              >
                Home
                {pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                )}
              </Link>

              {/* Women Dropdown (Luxury Mega-Menu) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('women')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/collection?audience=WOMEN"
                  className={`text-xs tracking-wider transition-all duration-200 py-2 inline-flex items-center gap-1.5 ${
                    activeDropdown === 'women' || (pathname === '/collection' && pathname?.includes('WOMEN'))
                      ? 'text-brand-obsidian font-bold'
                      : 'text-stone-600 hover:text-brand-obsidian font-medium'
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'women' ? 'rotate-180 text-brand-gold-dark' : 'text-stone-400 group-hover:text-brand-obsidian'
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {activeDropdown === 'women' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full -left-2 sm:left-0 pt-2.5 z-50 pointer-events-auto"
                    >
                      <div className="w-[580px] lg:w-[620px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(28,27,26,0.22)] border border-stone-200/90 overflow-hidden ring-1 ring-black/5">
                        <div className="grid grid-cols-12 divide-x divide-stone-100">
                          {/* Categories List (7 Cols) */}
                          <div className="col-span-7 p-5 bg-white">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-brand-gold-dark">
                                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                                <span>Women&apos;s Modest Wardrobe</span>
                              </div>
                              <Link
                                href="/collection?audience=WOMEN"
                                className="text-[11px] font-semibold text-stone-500 hover:text-brand-obsidian flex items-center gap-1 group/all transition-colors"
                              >
                                <span>View All</span>
                                <ArrowRight className="w-3 h-3 group-hover/all:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              {womenCategories.map((c) => (
                                <Link
                                  key={c.id}
                                  href={c.slug === 'burqa' ? '/burqa' : `/category/${c.slug}`}
                                  className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-brand-sand/50 transition-all text-xs text-stone-700 hover:text-brand-obsidian"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover/item:bg-brand-gold group-hover/item:scale-125 transition-all" />
                                    <span className="font-medium group-hover/item:font-semibold transition-all">
                                      {c.name}
                                    </span>
                                  </div>
                                  {c.slug === 'burqa' ? (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-gold/20 text-brand-gold-dark uppercase tracking-wider">
                                      Flagship
                                    </span>
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-stone-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-brand-gold-dark transition-all" />
                                  )}
                                </Link>
                              ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                              <span>✨ Bespoke tailoring &amp; custom sizing</span>
                              <span className="font-semibold text-brand-obsidian">Available In-Store</span>
                            </div>
                          </div>

                          {/* Curated Spotlight Card (5 Cols) */}
                          <div className="col-span-5 p-4 bg-brand-ivory/60 flex flex-col justify-between">
                            <div className="relative h-44 rounded-xl overflow-hidden group/card shadow-sm border border-stone-200/80">
                              <Image
                                src="https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=600&q=80"
                                alt="Royal Burqa Line"
                                fill
                                sizes="240px"
                                className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold-light block mb-0.5">
                                  Signature Flagship
                                </span>
                                <h4 className="font-serif text-sm font-bold text-white leading-tight">
                                  Royal Saudi Nida Burqas
                                </h4>
                                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                                  360° Flare cuts with wudu-friendly cuffs
                                </p>
                              </div>
                            </div>

                            <div className="mt-3">
                              <Link
                                href="/burqa"
                                className="w-full py-2 px-3 rounded-xl bg-brand-obsidian hover:bg-black text-brand-gold-light text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                              >
                                <span>Explore Burqa Showcase</span>
                                <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Men Dropdown (Luxury Mega-Menu) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('men')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/collection?audience=MEN"
                  className={`text-xs tracking-wider transition-all duration-200 py-2 inline-flex items-center gap-1.5 ${
                    activeDropdown === 'men' || (pathname === '/collection' && pathname?.includes('MEN'))
                      ? 'text-brand-obsidian font-bold'
                      : 'text-stone-600 hover:text-brand-obsidian font-medium'
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'men' ? 'rotate-180 text-brand-gold-dark' : 'text-stone-400 group-hover:text-brand-obsidian'
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {activeDropdown === 'men' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full -left-16 lg:-left-12 pt-2.5 z-50 pointer-events-auto"
                    >
                      <div className="w-[560px] lg:w-[600px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(28,27,26,0.22)] border border-stone-200/90 overflow-hidden ring-1 ring-black/5">
                        <div className="grid grid-cols-12 divide-x divide-stone-100">
                          {/* Categories List (7 Cols) */}
                          <div className="col-span-7 p-5 bg-white">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-brand-gold-dark">
                                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                                <span>Men&apos;s Islamic Wear</span>
                              </div>
                              <Link
                                href="/collection?audience=MEN"
                                className="text-[11px] font-semibold text-stone-500 hover:text-brand-obsidian flex items-center gap-1 group/all transition-colors"
                              >
                                <span>View All</span>
                                <ArrowRight className="w-3 h-3 group-hover/all:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              {menCategories.map((c) => (
                                <Link
                                  key={c.id}
                                  href={`/category/${c.slug}`}
                                  className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-brand-sand/50 transition-all text-xs text-stone-700 hover:text-brand-obsidian"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover/item:bg-brand-gold group-hover/item:scale-125 transition-all" />
                                    <span className="font-medium group-hover/item:font-semibold transition-all">
                                      {c.name}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-stone-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-brand-gold-dark transition-all" />
                                </Link>
                              ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                              <span>🌿 100% Non-Alcoholic Concentrated Attars</span>
                              <span className="font-semibold text-brand-obsidian">Authentic</span>
                            </div>
                          </div>

                          {/* Curated Spotlight Card (5 Cols) */}
                          <div className="col-span-5 p-4 bg-brand-ivory/60 flex flex-col justify-between">
                            <div className="relative h-44 rounded-xl overflow-hidden group/card shadow-sm border border-stone-200/80">
                              <Image
                                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
                                alt="Men's Sunnah Collection"
                                fill
                                sizes="240px"
                                className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold-light block mb-0.5">
                                  Sunnah Heritage
                                </span>
                                <h4 className="font-serif text-sm font-bold text-white leading-tight">
                                  Artisanal Kufis &amp; Oud
                                </h4>
                                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                                  Handcrafted embroidery &amp; pure Arabian scents
                                </p>
                              </div>
                            </div>

                            <div className="mt-3">
                              <Link
                                href="/collection?audience=MEN"
                                className="w-full py-2 px-3 rounded-xl bg-brand-obsidian hover:bg-black text-brand-gold-light text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                              >
                                <span>Discover Men&apos;s Wear</span>
                                <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shared Essentials Dropdown (Luxury Mega-Menu) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('common')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/collection?audience=ALL"
                  className={`text-xs tracking-wider transition-all duration-200 py-2 inline-flex items-center gap-1.5 ${
                    activeDropdown === 'common' || (pathname === '/collection' && pathname?.includes('ALL'))
                      ? 'text-brand-obsidian font-bold'
                      : 'text-stone-600 hover:text-brand-obsidian font-medium'
                  }`}
                >
                  <span>Shared Essentials</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'common' ? 'rotate-180 text-brand-gold-dark' : 'text-stone-400 group-hover:text-brand-obsidian'
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {activeDropdown === 'common' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full -left-44 lg:-left-40 pt-2.5 z-50 pointer-events-auto"
                    >
                      <div className="w-[560px] lg:w-[600px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(28,27,26,0.22)] border border-stone-200/90 overflow-hidden ring-1 ring-black/5">
                        <div className="grid grid-cols-12 divide-x divide-stone-100">
                          {/* Categories List (7 Cols) */}
                          <div className="col-span-7 p-5 bg-white">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-brand-gold-dark">
                                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                                <span>Sunnah &amp; Pilgrimage</span>
                              </div>
                              <Link
                                href="/collection?audience=ALL"
                                className="text-[11px] font-semibold text-stone-500 hover:text-brand-obsidian flex items-center gap-1 group/all transition-colors"
                              >
                                <span>View All</span>
                                <ArrowRight className="w-3 h-3 group-hover/all:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              {commonCategories.map((c) => (
                                <Link
                                  key={c.id}
                                  href={`/category/${c.slug}`}
                                  className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-brand-sand/50 transition-all text-xs text-stone-700 hover:text-brand-obsidian"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 group-hover/item:bg-brand-gold group-hover/item:scale-125 transition-all" />
                                    <span className="font-medium group-hover/item:font-semibold transition-all">
                                      {c.name}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-stone-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-brand-gold-dark transition-all" />
                                </Link>
                              ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                              <span>🕋 Complete Hajj &amp; Umrah Travel Packs</span>
                              <span className="font-semibold text-brand-obsidian">Pilgrimage</span>
                            </div>
                          </div>

                          {/* Curated Spotlight Card (5 Cols) */}
                          <div className="col-span-5 p-4 bg-brand-ivory/60 flex flex-col justify-between">
                            <div className="relative h-44 rounded-xl overflow-hidden group/card shadow-sm border border-stone-200/80">
                              <Image
                                src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80"
                                alt="Hajj and Umrah Essentials"
                                fill
                                sizes="240px"
                                className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold-light block mb-0.5">
                                  Sacred Journey
                                </span>
                                <h4 className="font-serif text-sm font-bold text-white leading-tight">
                                  Hajj &amp; Umrah Essentials
                                </h4>
                                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                                  Ihram sets, prayer beads &amp; jacquard rugs
                                </p>
                              </div>
                            </div>

                            <div className="mt-3">
                              <Link
                                href="/collection?audience=ALL"
                                className="w-full py-2 px-3 rounded-xl bg-brand-obsidian hover:bg-black text-brand-gold-light text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                              >
                                <span>Explore Sacred Gifts</span>
                                <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Burqa Flagship Link */}
              <Link
                href="/burqa"
                aria-current={pathname === '/burqa' || pathname?.startsWith('/burqa/') ? 'page' : undefined}
                className={`text-xs tracking-wider transition-all duration-200 relative py-2 inline-flex items-center gap-1.5 ${
                  pathname === '/burqa' || pathname?.startsWith('/burqa/')
                    ? 'text-brand-obsidian font-bold'
                    : 'text-brand-gold-dark hover:text-brand-obsidian font-semibold'
                }`}
              >
                <span>Burqa Flagship</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark uppercase tracking-wider hidden xl:inline">
                  Bespoke
                </span>
                {(pathname === '/burqa' || pathname?.startsWith('/burqa/')) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                )}
              </Link>

              {/* All Collections Link */}
              <Link
                href="/collection"
                className={`text-xs tracking-wider transition-all duration-200 relative py-2 ${
                  pathname === '/collection' && !pathname?.includes('audience=')
                    ? 'text-brand-obsidian font-bold'
                    : 'text-stone-600 hover:text-brand-obsidian font-medium'
                }`}
              >
                All Collections
              </Link>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Direct Call Button (Desktop/Tablet) */}
              <a
                href={`tel:+91${STORE_PHONE}`}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-sand/80 hover:bg-brand-sand text-brand-obsidian transition-colors border border-stone-200"
                title={`Call Boutique: ${STORE_PHONE}`}
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span>Call Store</span>
              </a>

              {/* Get Directions Button (Desktop) */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-obsidian text-brand-gold-light hover:bg-black transition-colors"
                title="Open Location in Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                <span>Directions</span>
              </a>

              {/* Account / Login Trigger */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 rounded-full text-stone-700 hover:bg-stone-100 transition-colors relative flex items-center gap-1.5"
                title={user ? `Signed in as ${user.firstName || user.phone}` : 'Sign In'}
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="hidden lg:inline text-xs font-semibold text-brand-obsidian">
                    {user.firstName || 'Account'}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 rounded-full text-stone-700 hover:bg-stone-100 transition-colors hidden sm:inline-block"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Showcase Bag Trigger */}
              <button
                onClick={openDrawer}
                className="p-2 rounded-full bg-brand-sand/60 hover:bg-brand-sand text-brand-obsidian transition-colors relative flex items-center gap-2"
                title="View In-Store Inquiry Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-mono text-xs font-bold bg-brand-obsidian text-white rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Smooth AnimatePresence Transition */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden border-t border-stone-200 bg-brand-cream max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]"
            >
              <div className="px-4 pt-3 pb-6 space-y-4">
                {/* Fast Primary Links */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wider text-stone-800 bg-white border border-stone-200"
                  >
                    Home
                  </Link>
                  <Link
                    href="/burqa"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wider bg-brand-obsidian text-brand-gold text-center"
                  >
                    Burqa Collection
                  </Link>
                </div>

                <Link
                  href="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-xl text-xs font-bold tracking-wider text-brand-obsidian bg-brand-sand/70 border border-stone-200 text-center"
                >
                  Browse Complete Catalogue →
                </Link>

                {/* Women's Section */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark px-1">
                    <span>👑 Women&apos;s Modest Collection</span>
                    <Link
                      href="/collection?audience=WOMEN"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-stone-500 hover:text-brand-obsidian underline text-[10px] normal-case"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {womenCategories.map((c) => (
                      <Link
                        key={c.id}
                        href={c.slug === 'burqa' ? '/burqa' : `/category/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-1.5 px-3 rounded-lg text-xs font-medium bg-white border border-stone-200 text-stone-700 hover:border-brand-gold"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Men's Section */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark px-1">
                    <span>🕌 Men&apos;s Islamic Wear</span>
                    <Link
                      href="/collection?audience=MEN"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-stone-500 hover:text-brand-obsidian underline text-[10px] normal-case"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {menCategories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/category/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-1.5 px-3 rounded-lg text-xs font-medium bg-white border border-stone-200 text-stone-700 hover:border-brand-gold"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Shared Essentials Section */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark px-1">
                    <span>✨ Common &amp; Sunnah Essentials</span>
                    <Link
                      href="/collection?audience=ALL"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-stone-500 hover:text-brand-obsidian underline text-[10px] normal-case"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {commonCategories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/category/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-1.5 px-3 rounded-lg text-xs font-medium bg-white border border-stone-200 text-stone-700 hover:border-brand-gold"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Physical Store Call & Directions CTA in Mobile Menu */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:+91${STORE_PHONE}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-brand-sand text-brand-obsidian border border-stone-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <span>Call Store</span>
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-brand-obsidian text-brand-gold-light"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Get Directions</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-xs text-stone-600">
                  <span className="text-[11px] text-stone-500">
                    Online store launches {LAUNCH_DATE}
                  </span>
                  <a
                    href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand-emerald flex items-center gap-1"
                  >
                    WhatsApp Help
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* OTP Authentication Modal */}
      <OtpModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />
    </>
  );
}
