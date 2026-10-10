'use client';

import { Home, Layers, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileBottomNav() {
  const pathname = usePathname();

  const phone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
  const whatsappNum = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I would like to inquire about Huma Hijab Collection.'
  )}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-luxury py-1.5 px-3">
      <div className="flex items-center justify-around">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
            pathname === '/' ? 'text-brand-obsidian font-bold' : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* 2. Burqa Catalog */}
        <Link
          href="/burqa"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
            pathname.startsWith('/burqa') ? 'text-brand-gold-dark font-bold' : 'text-stone-500'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span>Burqa</span>
        </Link>

        {/* 3. Central WhatsApp Inquiries Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-emerald-600"
          title="Direct WhatsApp Inquiry with Hamid Shaikh"
        >
          <div className="w-10 h-10 -mt-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border-2 border-white">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <span className="mt-0.5">WhatsApp</span>
        </a>

        {/* 4. Direct Call Store */}
        <a
          href={`tel:+91${phone}`}
          className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-brand-gold-dark hover:text-brand-obsidian transition-colors"
          title={`Call Boutique: ${phone}`}
        >
          <Phone className="w-5 h-5 mb-0.5 text-brand-gold-dark" />
          <span>Call Store</span>
        </a>

        {/* 5. Store Directions via Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-stone-700 hover:text-brand-obsidian transition-colors"
          title="Get Directions in Google Maps"
        >
          <MapPin className="w-5 h-5 mb-0.5 text-brand-obsidian" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
}
