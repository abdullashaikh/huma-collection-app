import { Award, Compass, Heart, Instagram, MapPin, MessageCircle, Phone, Sparkles, Store } from 'lucide-react';
import Link from 'next/link';
import { BrandLogo } from '../ui/BrandLogo';

const OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
const STORE_PHONE = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
const STORE_PHONE_FORMATTED = process.env.NEXT_PUBLIC_STORE_PHONE_FORMATTED || '+91 82006 17009';
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
const LAUNCH_DATE = process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026';
const WHATSAPP_NUM = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-obsidian text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-brand-gold/20 overflow-hidden">
      <div>
        {/* 1. Value Proposition Pillars (Showcase Mode) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-white">100% Modest Cut</h3>
                <p className="text-xs text-stone-400 mt-0.5">Generous silhouettes & zero translucence</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-white">Physical Boutique</h3>
                <p className="text-xs text-stone-400 mt-0.5">Touch & experience Korean crepe fabrics in person</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-white">Online Launch {LAUNCH_DATE}</h3>
                <p className="text-xs text-stone-400 mt-0.5">Digital showcase today • Online orders start next month</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-white">Direct Stylist Hotline</h3>
                <p className="text-xs text-stone-400 mt-0.5">Call or WhatsApp for custom sizing & boutique visits</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          {/* Brand & Store Contact Column */}
          <div className="space-y-4">
            <BrandLogo size="md" variant="light" />
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Rooted in timeless elegance, Huma Hijab Collection creates high-grade modest wear specializing in luxury Burqas, Abayas, Hijabs, and Islamic essentials.
            </p>

            {/* Official Store Information */}
            <div className="pt-2 text-stone-300 space-y-2 border-t border-stone-800">
              <div>
                <p className="text-[11px] text-stone-400 font-medium">Boutique Owner</p>
                <p className="text-sm font-bold text-white tracking-wide">{OWNER_NAME}</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 font-medium">Store Telephone</p>
                <a
                  href={`tel:+91${STORE_PHONE}`}
                  className="text-sm font-bold text-brand-gold hover:text-amber-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{STORE_PHONE_FORMATTED}</span>
                </a>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 font-medium">Store Location</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-brand-gold transition-colors underline decoration-brand-gold/50 hover:decoration-brand-gold"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Open in Google Maps &amp; Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/burqa" className="hover:text-brand-gold transition-colors font-medium">Burqa Collection (Primary)</Link></li>
              <li><Link href="/category/hijab" className="hover:text-brand-gold transition-colors">Premium Hijabs</Link></li>
              <li><Link href="/category/abaya" className="hover:text-brand-gold transition-colors">Designer Abayas</Link></li>
              <li><Link href="/category/niqab" className="hover:text-brand-gold transition-colors">Saudi Niqabs</Link></li>
              <li><Link href="/category/perfume-attar" className="hover:text-brand-gold transition-colors">Artisanal Non-Alcoholic Attar</Link></li>
              <li><Link href="/category/janamaz" className="hover:text-brand-gold transition-colors">Orthopedic Janamaz</Link></li>
              <li><Link href="/category/jewellery" className="hover:text-brand-gold transition-colors">Islamic Jewellery</Link></li>
              <li><Link href="/category/hajj-umrah" className="hover:text-brand-gold transition-colors">Hajj &amp; Umrah Essentials</Link></li>
            </ul>
          </div>

          {/* Customer Care / In-Store Discovery */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4">
              Help &amp; Customer Care
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Huma Collection</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Boutique</Link></li>
              <li><Link href="/size-guide" className="hover:text-brand-gold transition-colors font-medium">Burqa Size &amp; Height Guide</Link></li>
              <li><Link href="/faq" className="hover:text-brand-gold transition-colors font-medium">Frequently Asked Questions</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-brand-gold transition-colors">Shipping &amp; Delivery Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-brand-gold transition-colors">7-Day Size Exchange &amp; Returns</Link></li>
              <li><Link href="/track-order" className="hover:text-brand-gold transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Direct Actions Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-white mb-4">
              Connect With Hamid Shaikh
            </h3>
            <p className="text-stone-400">
              Have questions about fabrics, custom heights, or want to check piece availability before visiting?
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href={`tel:+91${STORE_PHONE}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-obsidian font-bold transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4 text-brand-obsidian" />
                <span>Call Store ({STORE_PHONE})</span>
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition-colors border border-stone-700 active:scale-95"
              >
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Get Google Maps Directions</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent('Assalamu Alaikum Hamid bhai, I would like to inquire about Huma Collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Hamid Shaikh</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Legal Links & Copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800 text-xs text-stone-500 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-stone-400">
            <Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link>
            <Link href="/shipping-policy" className="hover:text-brand-gold transition-colors">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:text-brand-gold transition-colors">Return Policy</Link>
            <Link href="/privacy-policy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms &amp; Conditions</Link>
            <Link href="/faq" className="hover:text-brand-gold transition-colors">FAQ</Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-900 text-stone-500">
            <p>© {currentYear} Huma Collection • Owner: {OWNER_NAME}. All Rights Reserved.</p>
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" /> for modest elegance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
