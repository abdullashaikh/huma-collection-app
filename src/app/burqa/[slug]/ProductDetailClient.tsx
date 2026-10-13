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
import { getMediaUrl } from '../../../lib/media';
import { WhatsAppIcon, buildProductWhatsAppUrl, openWhatsApp, STORE_OWNER_NAME } from '../../../lib/whatsapp';

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
    {
      id: 1,
      productId: product.id,
      s3Key: '',
      s3Url: getMediaUrl(
        (product as any).primaryImageUrl ||
        (product as any).primary_image_url ||
        'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85'
      ),
      altText: product.name,
      sortOrder: 1,
      isPrimary: true,
      viewType: 'Front View',
    },
  ];

  // Prepare views for interactive 360 / multi-view exploration
  const detailViewerImages = React.useMemo(() => {
    if (product.images_360 && product.images_360.length > 0) {
      return product.images_360.map((u) => getMediaUrl(u));
    }
    if (product.views) {
      const viewsList: { url: string; label: string }[] = [];
      if (product.views.front) viewsList.push({ url: getMediaUrl(product.views.front), label: 'Front View' });
      if (product.views.side) viewsList.push({ url: getMediaUrl(product.views.side), label: 'Side Angle' });
      if (product.views.back) viewsList.push({ url: getMediaUrl(product.views.back), label: 'Back View' });
      if (product.views.detail) viewsList.push({ url: getMediaUrl(product.views.detail), label: 'Fabric Detail' });
      if (viewsList.length > 0) return viewsList;
    }
    return images.map((img: any, idx: number) => ({
      url: getMediaUrl(img.s3Url),
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

  // Check if product belongs to a category where clothing sizing applies
  const isSizedCategory = useMemo(() => {
    const slug = (product.categorySlug || '').toLowerCase();
    const name = (product.categoryName || '').toLowerCase();
    if (
      slug.includes('perfume') ||
      slug.includes('attar') ||
      slug.includes('topi') ||
      slug.includes('tasbih') ||
      slug.includes('janamaz') ||
      slug.includes('miswak') ||
      slug.includes('rumal') ||
      slug.includes('jewellery') ||
      name.includes('perfume') ||
      name.includes('attar') ||
      name.includes('topi') ||
      name.includes('tasbih') ||
      name.includes('janamaz') ||
      name.includes('miswak') ||
      name.includes('rumal')
    ) {
      return false;
    }
    return true;
  }, [product]);

  // Extract variants that genuinely have explicit size specifications
  const validSizeVariants = useMemo(() => {
    if (!isSizedCategory || !product.variants || product.variants.length === 0) return [];
    return product.variants.filter((v) => {
      const s = v.size_value || v.attributes?.size;
      return Boolean(s && typeof s === 'string' && s.trim() !== '');
    });
  }, [product.variants, isSizedCategory]);

  const rawSelectedSize = selectedVariant?.size_value || selectedVariant?.attributes?.size;
  const selectedSizeLabel =
    isSizedCategory && rawSelectedSize && typeof rawSelectedSize === 'string' && rawSelectedSize.trim() !== ''
      ? rawSelectedSize.trim()
      : undefined;

  const whatsappOrderUrl = useMemo(() => {
    return buildProductWhatsAppUrl({
      name: product.name,
      slug: product.slug,
      sku: selectedVariant?.sku || product.skuBase,
      price: currentPrice,
      size: selectedSizeLabel,
      color: product.colors?.[0] || undefined,
    });
  }, [product, selectedVariant, currentPrice, selectedSizeLabel]);

  const handleOrderOnWhatsApp = () => {
    openWhatsApp(whatsappOrderUrl);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-28 lg:pb-12 space-y-16">
      {/* Dynamic Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-brand-obsidian">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collection" className="hover:text-brand-obsidian">Collections</Link>
        {product.categorySlug && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={product.categorySlug === 'burqa' ? '/burqa' : `/category/${product.categorySlug}`}
              className="hover:text-brand-obsidian font-medium"
            >
              {product.categoryName || product.categorySlug}
            </Link>
          </>
        )}
        {product.subcategoryName && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-stone-600 font-medium">{product.subcategoryName}</span>
          </>
        )}
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
                  src={getMediaUrl(img.s3Url)}
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
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                {product.categoryName || product.fabric || 'Modest Collection'}
              </span>
              {product.subcategoryName && (
                <span className="text-xs text-stone-400 font-medium">
                  • {product.subcategoryName}
                </span>
              )}
              {product.audience && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30">
                  {product.audience === 'MEN' ? 'Men' : product.audience === 'ALL' ? 'Shared Essential' : 'Women'}
                </span>
              )}
            </div>
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

          {/* Sizing & Variant Matrix (Only shown if genuine sizing exists) */}
          {validSizeVariants.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-200/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-700">
                  Available Sizes {product.categorySlug === 'burqa' ? '(Height)' : ''}
                </span>
                <span className="text-stone-500 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> In-store trial available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {validSizeVariants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  const label = v.size_value?.trim() || v.attributes?.size?.trim() || 'Standard';

                  return (
                    <button
                      key={v.id}
                      type="button"
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

          {/* Order Method Notice */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-200/80 text-emerald-950 space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-emerald-900">
                Direct WhatsApp Ordering Active
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We currently accept all orders and styling inquiries directly via <strong>WhatsApp</strong> and in-person at our Ahmedabad boutique. Tap below to chat with {STORE_OWNER_NAME} for instant size guidance, payment, and fast shipping!
            </p>
          </div>

          {/* Action CTAs: Primary WhatsApp Button + Secondary Call & Maps */}
          <div className="space-y-3 pt-2">
            {/* High-Converting WhatsApp Order CTA */}
            <button
              type="button"
              onClick={handleOrderOnWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 active:scale-[0.98] group"
            >
              <WhatsAppIcon className="w-6 h-6 text-white fill-white transition-transform group-hover:scale-110 flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">Order / Inquire on WhatsApp</span>
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold flex-shrink-0">
                    Instant Chat
                  </span>
                </div>
                <p className="text-[11px] font-normal text-white/90 truncate">
                  {selectedSizeLabel ? `Selected Size: ${selectedSizeLabel} • ` : ''}Chat with {STORE_OWNER_NAME}
                </p>
              </div>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:+91${phone}`}
                className="py-3.5 px-4 rounded-xl bg-brand-obsidian hover:bg-stone-900 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Boutique (+91 {phone})</span>
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-xl bg-brand-ivory hover:bg-brand-sand border border-brand-gold/40 text-brand-obsidian font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <MapPin className="w-4 h-4 text-brand-gold-dark" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>

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
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Fabric / Material</span>
            <span className="font-semibold text-brand-obsidian mt-1 block">
              {product.materials || product.fabric || 'Pure Modest Textile'}
            </span>
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
          {product.colors && (
            <div className="p-4 rounded-xl bg-stone-50">
              <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Available Colors</span>
              <span className="font-semibold text-brand-obsidian mt-1 block">
                {Array.isArray(product.colors) ? product.colors.join(', ') : String(product.colors)}
              </span>
            </div>
          )}
          {product.tags && (
            <div className="p-4 rounded-xl bg-stone-50">
              <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">Tags</span>
              <span className="font-semibold text-brand-obsidian mt-1 block">
                {Array.isArray(product.tags) ? product.tags.join(', ') : String(product.tags)}
              </span>
            </div>
          )}
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

      {/* Sticky Bottom Bar on Mobile Devices (Direct WhatsApp Order Action) */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-3.5 py-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0 pr-1 flex-shrink-0">
          <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block truncate">
            {selectedSizeLabel ? `Size: ${selectedSizeLabel}` : 'Price'}
          </span>
          <span className="font-bold text-base text-brand-obsidian leading-tight">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          {/* Quick Call icon button */}
          <a
            href={`tel:+91${phone}`}
            className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center flex-shrink-0 shadow-sm active:scale-95 transition-all border border-stone-200"
            title="Call Boutique"
            aria-label="Call Store"
          >
            <Phone className="w-4 h-4 text-brand-gold-dark" />
          </a>

          {/* Primary Mobile WhatsApp Order Button */}
          <button
            type="button"
            onClick={handleOrderOnWhatsApp}
            className="flex-1 py-3 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            title="Order this piece on WhatsApp"
            aria-label="Order on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-white fill-white flex-shrink-0" />
            <span className="truncate">Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
