import { ArrowRight, CheckCircle2, MessageCircle, Package, Truck } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { orderNumber: string };
}

export default function OrderConfirmationPage({ params }: Props) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '+919876543210';
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Assalamu Alaikum Huma Hijab Collection, I have placed order #${params.orderNumber}. Could you please send me tracking updates here?`
  )}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-brand-emerald-light border border-brand-emerald/30 text-brand-emerald flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-emerald">Order Confirmed</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian">
          JazakAllah Khair for Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Your order has been recorded successfully. Our master tailors and packing team are preparing your modest garments.
        </p>
      </div>

      {/* Order Badge Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury max-w-md mx-auto space-y-4 text-left">
        <div className="flex justify-between items-center pb-4 border-b border-stone-100">
          <div>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Order Reference</span>
            <span className="font-mono text-base font-bold text-brand-obsidian">{params.orderNumber}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
            Processing
          </span>
        </div>

        <div className="space-y-2 text-xs text-stone-600">
          <p className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-gold-dark" />
            <span>Estimated delivery in <strong>3 - 5 business days</strong></span>
          </p>
          <p className="flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-gold-dark" />
            <span>You will receive dispatch notifications via SMS & WhatsApp</span>
          </p>
        </div>

        {/* WhatsApp Direct Notification CTA */}
        <div className="pt-4 border-t border-stone-100">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Get WhatsApp Tracking Updates</span>
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href={`/track-order?orderNumber=${params.orderNumber}`}
          className="px-6 py-3 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
        >
          Track Shipment
        </Link>
        <Link
          href="/burqa"
          className="px-6 py-3 rounded-xl bg-brand-obsidian text-white font-semibold text-xs hover:bg-black transition-colors flex items-center gap-1.5"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
