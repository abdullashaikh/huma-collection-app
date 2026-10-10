'use client';

import { Heart, MapPin, Menu, Phone, Search, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../lib/cart-context';
import { OtpModal } from '../auth/OtpModal';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('huma_customer_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Burqa Collection', href: '/burqa', isPrimary: true },
    { name: 'Hijabs', href: '/category/hijab' },
    { name: 'Abayas', href: '/category/abaya' },
    { name: 'Niqabs & Nospice', href: '/category/niqab' },
    { name: 'Attars & Perfumes', href: '/category/perfume-attar' },
    { name: 'Janamaz & Mats', href: '/category/janamaz' },
  ];

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-brand-obsidian text-brand-gold-light py-2 px-4 text-center text-xs font-medium tracking-wide border-b border-brand-gold/20 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
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
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Wordmark */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-brand-obsidian uppercase block group-hover:text-brand-gold-dark transition-colors">
                  Huma
                </span>
                <span className="text-xs tracking-wider text-stone-500 font-medium block -mt-0.5 group-hover:text-brand-obsidian transition-colors">
                  Hijab Collection
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links with Persistent Active Signifier */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-xs tracking-wider transition-all duration-200 relative py-2 ${
                      isActive
                        ? 'text-brand-obsidian font-bold'
                        : link.isPrimary
                        ? 'text-brand-gold-dark hover:text-brand-obsidian font-semibold'
                        : 'text-stone-600 hover:text-brand-obsidian font-medium'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Direct Call Button (Desktop/Tablet) */}
              <a
                href={`tel:+91${STORE_PHONE}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-sand/80 hover:bg-brand-sand text-brand-obsidian transition-colors border border-stone-200"
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
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-obsidian text-brand-gold-light hover:bg-black transition-colors"
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
              className="overflow-hidden lg:hidden border-t border-stone-200 bg-brand-cream"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                      link.isPrimary
                        ? 'bg-brand-obsidian text-brand-gold'
                        : 'text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Physical Store Call & Directions CTA in Mobile Menu */}
                <div className="pt-3 pb-1 grid grid-cols-2 gap-2">
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
