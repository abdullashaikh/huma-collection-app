import React from 'react';
import { WhatsAppIcon } from '../../lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const phone = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');

  const message = encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I am visiting the Huma Hijab Collection website and would like to inquire about ordering boutique pieces.'
  );

  return (
    <aside className="hidden lg:flex fixed bottom-8 right-6 z-40 items-center gap-2.5 pointer-events-auto">
      {/* Tooltip badge */}
      <span className="hidden xl:inline-block px-3 py-1.5 rounded-full bg-white text-stone-800 text-xs font-bold shadow-lg border border-stone-200">
        Order on WhatsApp
      </span>

      {/* Persistent WhatsApp CTA Button */}
      <a
        href={`https://wa.me/${phone.startsWith('91') ? phone : `91${phone}`}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order & Inquire on WhatsApp with Hamid Shaikh"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <WhatsAppIcon className="w-7 h-7 text-white fill-white" />
      </a>
    </aside>
  );
};
