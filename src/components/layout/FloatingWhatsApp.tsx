'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009';

  const message = encodeURIComponent(
    'Assalamu Alaikum Hamid bhai, I would like to inquire about Huma Hijab Collection boutique pieces.'
  );

  return (
    <aside className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 pointer-events-auto">
      {/* Persistent WhatsApp CTA Button */}
      <a
        href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Huma Hijab Stylist"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 pointer-events-none" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-emerald-600" />
      </a>
    </aside>
  );
};
