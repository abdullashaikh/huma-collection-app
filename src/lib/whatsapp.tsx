import React from 'react';

export const STORE_PHONE_NUMBER = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
export const STORE_WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');
export const STORE_OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
export const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humacollection.in';

/**
 * Universally recognized WhatsApp SVG Icon
 */
export function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411z" />
    </svg>
  );
}

export interface ProductWhatsAppOptions {
  name: string;
  slug?: string;
  sku?: string;
  price?: number;
  size?: string;
  color?: string;
}

/**
 * Generates an official WhatsApp URL with pre-filled order/inquiry details
 */
export function buildProductWhatsAppUrl(opts: ProductWhatsAppOptions): string {
  const num = STORE_WHATSAPP_NUMBER || '918200617009';
  const cleanNum = num.startsWith('91') ? num : `91${num}`;

  const productUrl = opts.slug ? `${SITE_BASE_URL}/product/${opts.slug}` : SITE_BASE_URL;
  const priceText = opts.price ? `₹${opts.price.toLocaleString('en-IN')}` : 'Check Price';

  const lines = [
    `Assalamu Alaikum ${STORE_OWNER_NAME} (Huma Hijab Collection),`,
    '',
    `I would like to order / inquire about this piece:`,
    `🛍️ *${opts.name}*`,
  ];

  if (opts.size) {
    lines.push(`📏 Size: *${opts.size}*`);
  }
  if (opts.color) {
    lines.push(`🎨 Color: *${opts.color}*`);
  }
  if (opts.sku) {
    lines.push(`🏷️ SKU: ${opts.sku}`);
  }
  lines.push(`💰 Price: ${priceText}`);
  lines.push(`🔗 Link: ${productUrl}`);
  lines.push('');
  lines.push('Please confirm availability, payment options (UPI/Cash), and delivery details.');

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanNum}?text=${encoded}`;
}

/**
 * Generates a WhatsApp order URL for an entire cart bag
 */
export function buildCartWhatsAppUrl(
  items: Array<{ productName: string; quantity: number; attributes?: Record<string, string>; subtotal: number }>,
  totalAmount: number
): string {
  const num = STORE_WHATSAPP_NUMBER || '918200617009';
  const cleanNum = num.startsWith('91') ? num : `91${num}`;

  const lines = [
    `Assalamu Alaikum ${STORE_OWNER_NAME} (Huma Hijab Collection),`,
    '',
    `I would like to place an order for the following pieces:`,
    '',
  ];

  items.forEach((item, idx) => {
    const attrStr = item.attributes && Object.keys(item.attributes).length > 0
      ? ` (${Object.entries(item.attributes).map(([k, v]) => `${k}: ${v}`).join(', ')})`
      : '';
    lines.push(`${idx + 1}. *${item.productName}*${attrStr} x ${item.quantity} = ₹${item.subtotal.toLocaleString('en-IN')}`);
  });

  lines.push('');
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`💵 *Total Valuation: ₹${totalAmount.toLocaleString('en-IN')}*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push('');
  lines.push('Please confirm availability, UPI/Bank payment details, and shipping timeline to my address.');

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanNum}?text=${encoded}`;
}

/**
 * Safely opens a WhatsApp link in a new window/tab
 */
export function openWhatsApp(url: string) {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
