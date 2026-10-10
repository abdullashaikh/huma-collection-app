'use client';

import { Home, Layers, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../../lib/cart-context';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();

  // On Product Detail Pages, the dedicated Product Action Bar handles the bottom area
  const isPdpPage = pathname.startsWith('/product/') || (pathname.startsWith('/burqa/') && pathname !== '/burqa');
  if (isPdpPage) return null;

  const phone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const whatsappNum = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I would like to inquire about Huma Hijab Collection boutique pieces.'
  )}`;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-luxury pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-2"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors min-w-[56px] min-h-[44px] justify-center ${
            pathname === '/' ? 'text-brand-obsidian font-bold' : 'text-stone-500 hover:text-brand-obsidian'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* 2. Catalogue */}
        <Link
          href="/collection"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors min-w-[56px] min-h-[44px] justify-center ${
            pathname.startsWith('/collection') || pathname === '/burqa' ? 'text-brand-gold-dark font-bold' : 'text-stone-500 hover:text-brand-obsidian'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span>Catalog</span>
        </Link>

        {/* 3. Central WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-emerald-600 min-w-[56px] min-h-[44px] justify-center"
          title="Direct WhatsApp Inquiry with Hamid Shaikh"
        >
          <div className="w-11 h-11 -mt-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border-2 border-white">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <span className="mt-0.5">WhatsApp</span>
        </a>

        {/* 4. Inquiry Bag / Cart with Live Badge */}
        <button
          onClick={openDrawer}
          className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-stone-600 hover:text-brand-obsidian transition-colors relative min-w-[56px] min-h-[44px] justify-center"
          title="View Inquiry Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 font-mono text-[9px] font-bold bg-brand-obsidian text-brand-gold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

        {/* 5. Call Boutique Store */}
        <a
          href={`tel:+91${phone}`}
          className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-brand-gold-dark hover:text-brand-obsidian transition-colors min-w-[56px] min-h-[44px] justify-center"
          title={`Call Boutique: ${phone}`}
        >
          <Phone className="w-5 h-5 mb-0.5 text-brand-gold-dark" />
          <span>Call</span>
        </a>
      </div>
    </nav>
  );
}
