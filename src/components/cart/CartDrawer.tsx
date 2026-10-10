'use client';

import { MapPin, MessageCircle, Minus, Phone, Plus, ShoppingBag, Sparkles, Store, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useCart } from '../../lib/cart-context';

export function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, updateQuantity, removeItem, isLoading } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
  const whatsappNum = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
  const launchDate = process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026';

  const itemNames = items.map((i) => `${i.productName} (x${i.quantity})`).join(', ');
  const whatsappInquiryUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    `Assalamu Alaikum Hamid bhai, I am interested in these pieces from Huma Hijab Collection: ${itemNames || 'your collection'}. Please let me know availability in-store.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-brand-cream border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-obsidian" />
              <h2 className="font-serif text-lg font-bold text-brand-obsidian">Boutique Inquiry Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-sand font-bold text-brand-obsidian">
                {cart?.totalQuantity || 0}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Showcase Announcement Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-stone-50 px-6 py-3 border-b border-amber-200/60">
            <div className="flex items-start gap-2.5 text-xs text-stone-700">
              <Store className="w-4 h-4 text-brand-gold-dark flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-obsidian block">In-Store Showcase Mode</span>
                <span className="text-[11px] text-stone-600">
                  Online orders launch in <strong>{launchDate}</strong>. Reserve or purchase these pieces directly at our physical boutique.
                </span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-brand-obsidian">Your showcase bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Browse our handcrafted modest catalogue and explore pieces with interactive front &amp; back views.
                </p>
                <div className="mt-6 flex flex-col gap-2.5 max-w-xs mx-auto">
                  <Link
                    href="/burqa"
                    onClick={closeDrawer}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-obsidian text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
                  >
                    Explore Burqa Collection
                  </Link>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:border-brand-gold transition-all"
                  >
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span>Get Boutique Directions</span>
                  </a>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/70 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=300&q=80'}
                      alt={item.productName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-semibold text-brand-obsidian line-clamp-1">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant attribute chips */}
                      <div className="flex gap-1.5 mt-1 flex-wrap">
                        {Object.entries(item.attributes).map(([k, v]) => (
                          <span
                            key={k}
                            className="text-[10px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded"
                          >
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quantity & Reference Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading || item.quantity >= item.stockAvailable}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-brand-obsidian">
                        ₹{item.subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Direct Store Contact Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] bg-white border-t border-stone-200 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Selected Pieces</span>
                  <span className="font-semibold text-brand-obsidian">{items.length} designs</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Showcase Valuation</span>
                  <span className="font-bold text-brand-obsidian">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  Owner: <strong>{ownerName}</strong> • Phone:{' '}
                  <a href={`tel:+91${storePhone}`} className="underline font-bold text-brand-gold-dark">
                    {storePhone}
                  </a>
                </p>
              </div>

              {/* Showcase Action Buttons */}
              <div className="space-y-2">
                <a
                  href={`tel:+91${storePhone}`}
                  className="w-full py-3.5 bg-brand-obsidian text-brand-gold-light rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>Call Store for Piece Availability ({storePhone})</span>
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 border border-stone-200 active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-brand-gold-dark" />
                  <span>Get Directions to Boutique (Google Maps)</span>
                </a>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 text-white hover:bg-emerald-500 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire via WhatsApp with Hamid Shaikh</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
