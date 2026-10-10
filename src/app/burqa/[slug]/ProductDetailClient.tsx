'use client';

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Heart,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Truck,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { ProductCard } from '../../../components/product/ProductCard';
import { InteractiveProductViewer } from '../../../components/product/InteractiveProductViewer';
import { fetchApi } from '../../../lib/api';
import { useCart } from '../../../lib/cart-context';
import { ProductItem } from '../../../types';

export function ProductDetailClient({ product }: { product: ProductItem }) {
  const router = useRouter();
  const { addToCart, isLoading: isCartLoading } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [
    { id: 1, productId: product.id, s3Key: '', s3Url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85', altText: product.name, sortOrder: 1, isPrimary: true }
  ];

  // Prepare views for interactive 360 / multi-view exploration
  const detailViewerImages = React.useMemo(() => {
    if (product.images_360 && product.images_360.length > 0) {
      return product.images_360;
    }
    if (product.views) {
      const viewsList: { url: string; label: string }[] = [];
      if (product.views.front) viewsList.push({ url: product.views.front, label: 'Front View' });
      if (product.views.side) viewsList.push({ url: product.views.side, label: 'Side Angle' });
      if (product.views.back) viewsList.push({ url: product.views.back, label: 'Back View' });
      if (product.views.detail) viewsList.push({ url: product.views.detail, label: 'Fabric Detail' });
      if (viewsList.length > 0) return viewsList;
    }
    return images.map((img, idx) => ({
      url: img.s3Url,
      alt: img.altText || `${product.name} view ${idx + 1}`,
      label: img.viewType || (idx === 0 ? 'Front View' : idx === 1 ? 'Back View' : `View ${idx + 1}`),
    }));
  }, [product, images]);

  const fallbackBase = Number(product.basePrice ?? (product as any).base_price ?? 0);
  const fallbackSale = product.salePrice ?? (product as any).sale_price ? Number(product.salePrice ?? (product as any).sale_price) : null;
  const currentPrice = selectedVariant?.price ? Number(selectedVariant.price) : (fallbackSale || fallbackBase || 0);
  const comparePrice = selectedVariant?.compareAtPrice ? Number(selectedVariant.compareAtPrice) : (fallbackSale ? fallbackBase : null);
  const discountPercent = comparePrice && comparePrice > currentPrice
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : null;


  const phone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, quantity);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, quantity);
    router.push('/checkout');
  };

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[1-9][0-9]{5}$/.test(pincode.trim())) {
      setPincodeError('Please enter a valid 6-digit Indian pincode.');
      setPincodeResult(null);
      return;
    }
    setIsPincodeLoading(true);
    setPincodeError('');
    try {
      const res = await fetchApi<any>(`/shipping/pincode/${pincode.trim()}?subtotal=${currentPrice}`);
      if (res.success && res.data) {
        setPincodeResult(res.data);
      }
    } catch (err: any) {
      setPincodeError(err.message || 'Unable to verify pincode');
    } finally {
      setIsPincodeLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Assalamu Alaikum Hamid bhai (Huma Hijab Collection),\n\nI am viewing this piece in your online showcase and would like to inquire about visiting or checking in-store availability:\n*${product.name}*\nSKU: ${selectedVariant?.sku || product.skuBase}\nEstimated Price: ₹${currentPrice}\n\nCould you please help confirm availability at the store?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-brand-obsidian">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/burqa" className="hover:text-brand-obsidian">Burqa Collection</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-obsidian font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery + Purchasing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] scrollbar-none flex-shrink-0">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-stone-100 ${
                  activeImageIndex === idx
                    ? 'border-brand-obsidian shadow-md'
                    : 'border-transparent hover:border-stone-300 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.s3Url}
                  alt={img.altText || `${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>

          {/* Main Selected Image with Interactive Product Viewer */}
          <div className="relative flex-1 aspect-[3/4] max-h-[620px] rounded-3xl overflow-hidden bg-stone-100 shadow-luxury border border-stone-200/80 group">
            <InteractiveProductViewer
              images={detailViewerImages}
              productName={product.name}
              aspectRatio="aspect-[3/4]"
              priority
              is360Sequence={Boolean(product.is_360 || (product.images_360 && product.images_360.length > 0))}
              activeIndex={activeImageIndex}
              onIndexChange={setActiveImageIndex}
              showIndicators={images.length > 1}
              show360Badge={Boolean(product.is_360 || (product.images_360 && product.images_360.length > 0))}
              showViewBadge={true}
              showMobileNavArrows={true}
              returnToDefaultOnLeave={false}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 z-20 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-obsidian text-brand-gold rounded-full shadow-md flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Purchasing Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
              {product.fabric || 'Pure Korean Crepe'}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-obsidian mt-1 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-mono">SKU: {selectedVariant?.sku || product.skuBase}</p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-brand-obsidian">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {comparePrice && comparePrice > currentPrice && (
                <span className="text-base text-stone-400 line-through">
                  ₹{comparePrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent && (
                <span className="px-2.5 py-0.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-full">
                  Save {discountPercent}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">In-Store Boutique Showcase • Online Shopping Launches November 2026</p>
          </div>

          {/* Sizing & Variant Matrix */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-200/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-700">Available Sizes (Height)</span>
                <span className="text-stone-500 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> In-store trial available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  const label = v.attributes?.size || v.size_value || v.sku.split('-')[3] || 'Standard';

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-brand-obsidian bg-brand-obsidian text-white shadow-md'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-brand-gold'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">{label}</div>
                      <div className="text-[10px] mt-0.5 opacity-80">
                        In Boutique
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Online Shopping Coming Soon Notice */}
          <div className="p-4 rounded-2xl bg-brand-gold/15 border border-brand-gold/40 text-brand-obsidian space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold-dark" />
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-brand-gold-dark">
                Product Showcase Mode • Online Store Nov 2026
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Explore this piece in-store today. Online shopping &amp; nationwide delivery will launch in November 2026. Please call or visit our boutique for immediate availability and custom fittings.
            </p>
          </div>

          {/* Action CTAs: Call Store & Inquire */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:+91${phone}`}
                className="py-4 px-5 rounded-xl bg-brand-obsidian hover:bg-stone-900 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-luxury transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Store ({phone})</span>
              </a>

              <a
                href={`https://wa.me/91${phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="py-4 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-brand-ivory hover:bg-brand-sand border border-brand-gold/40 text-brand-obsidian font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-brand-gold-dark" />
              <span>Get Directions to Boutique (Google Maps)</span>
            </a>

            {/* Share link */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleShare}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
              </button>
            </div>
          </div>

          {/* Physical Store Contact & Location Card */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
                <Store className="w-4 h-4 text-brand-gold-dark" />
                <span>Physical Store Information</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Open for Visits
              </span>
            </div>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Store Owner:</span>
                <span className="font-bold text-brand-obsidian">{ownerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Direct Telephone:</span>
                <a
                  href={`tel:+91${phone}`}
                  className="font-bold text-brand-obsidian hover:text-brand-gold-dark underline font-mono"
                >
                  +91 {phone}
                </a>
              </div>
              <div className="flex items-start justify-between gap-3 pt-2 border-t border-stone-100">
                <span className="text-stone-500 flex-shrink-0">Directions:</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-obsidian hover:text-brand-gold-dark underline text-right inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Description Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl font-bold text-brand-obsidian">About This Piece</h2>
        <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-stone-600 space-y-4">
          <p>{product.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-100 text-xs">
          <div className="p-4 rounded-xl bg-stone-50">
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Fabric Drape</span>
            <span className="font-semibold text-brand-obsidian mt-1 block">{product.fabric || 'Pure Korean Crepe'}</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50">
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Cut & Silhouette</span>
            <span className="font-semibold text-brand-obsidian mt-1 block">{product.style || 'Front Open Abaya-Cut'}</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50">
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Care Instructions</span>
            <span className="font-semibold text-brand-obsidian mt-1 block">{product.careInstructions || 'Gentle wash cold / steam reverse'}</span>
          </div>
          <div className="p-4 rounded-xl bg-stone-50">
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Exchange Policy</span>
            <span className="font-semibold text-brand-obsidian mt-1 block">7-Day Free Size Exchange</span>
          </div>
        </div>
      </div>

      {/* Recommended Related Pieces */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-brand-obsidian">You May Also Admire</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {product.relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Bar on Mobile Devices */}
      <div className="fixed bottom-12 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-luxury flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Total</span>
          <span className="font-bold text-base text-brand-obsidian">₹{currentPrice.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isCartLoading || !selectedVariant || selectedVariant.stockQuantity <= 0}
            className="px-4 py-2.5 rounded-xl border border-brand-obsidian text-brand-obsidian font-semibold text-xs"
          >
            Add to Bag
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isCartLoading || !selectedVariant || selectedVariant.stockQuantity <= 0}
            className="px-5 py-2.5 rounded-xl bg-brand-obsidian text-white font-semibold text-xs shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
