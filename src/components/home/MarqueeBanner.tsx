'use client';

import React from 'react';
import { Sparkles, Shield, Heart, Truck, Gift } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const announcements = [
    { text: 'Ramadan & Eid 2026 Signature Burqa Collection Live', icon: Sparkles },
    { text: 'Free Express Shipping Across India Over ₹1,499', icon: Truck },
    { text: '100% Pure Saudi Nida & Korean Matte Crepe Fabrics', icon: Shield },
    { text: 'Cash on Delivery (COD) Available Nationwide', icon: Gift },
    { text: 'Wudu-Friendly Elasticated Cuffs & Concealed Pockets', icon: Heart },
    { text: 'Exclusive Launch Code: WELCOME10 for 10% OFF', icon: Sparkles },
  ];

  return (
    <div className="relative overflow-hidden bg-brand-sand/80 py-3.5 border-y border-brand-gold/30 text-brand-obsidian select-none backdrop-blur-sm shadow-sm">
      <div className="flex w-max animate-marquee space-x-8">
        {[...announcements, ...announcements].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 text-xs tracking-wide font-semibold text-stone-800">
              <Icon className="w-3.5 h-3.5 text-brand-gold-dark shrink-0 animate-spin-slow" />
              <span>{item.text}</span>
              <span className="text-brand-gold/60 mx-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
