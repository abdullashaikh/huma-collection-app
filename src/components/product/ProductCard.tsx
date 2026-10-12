'use client';

import { ArrowRight, Check, Eye, Heart, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '../../lib/cart-context';
import { Product } from '../../types';
import { InteractiveProductViewer } from './InteractiveProductViewer';
import { getMediaUrl } from '../../lib/media';
import { WhatsAppIcon, buildProductWhatsAppUrl, openWhatsApp } from '../../lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : null
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const rawPrimary =
    product.primary_image_url ||
    (product as any).primaryImageUrl ||
    product.images?.find((img) => img.isPrimary)?.s3Url ||
    product.images?.[0]?.s3Url ||
    'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=800&q=80';
  const primaryImage = getMediaUrl(rawPrimary);

  const rawSecondary =
    product.secondary_image_url ||
    (product as any).secondaryImageUrl ||
    product.images?.find((img) => !img.isPrimary)?.s3Url ||
    product.images?.[1]?.s3Url ||
    rawPrimary;
  const secondaryImage = getMediaUrl(rawSecondary);

  // Collect all available views for the interactive viewer
  const viewerImages = React.useMemo(() => {
    // 1. If explicit 360 sequence is configured
    if (product.images_360 && product.images_360.length > 0) {
      return product.images_360.map((u) => getMediaUrl(u));
    }

    // 2. If configured with structured views object
    if (product.views) {
      const viewsList: string[] = [];
      if (product.views.front) viewsList.push(getMediaUrl(product.views.front));
      if (product.views.side) viewsList.push(getMediaUrl(product.views.side));
      if (product.views.back) viewsList.push(getMediaUrl(product.views.back));
      if (product.views.detail) viewsList.push(getMediaUrl(product.views.detail));
      if (viewsList.length > 0) return viewsList;
    }

    // 3. If product has multiple images in images array
    if (product.images && product.images.length > 0) {
      const sorted = [...product.images].sort((a, b) => {
        if (a.isPrimary) return -1;
        if (b.isPrimary) return 1;
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      });
      return sorted.map((img) => ({
        url: getMediaUrl(img.s3Url),
        alt: img.altText || product.name,
        label: img.viewType || (img.isPrimary ? 'Front View' : undefined),
      }));
    }

    // 4. Default to primary and secondary
    const list: string[] = [primaryImage];
    if (secondaryImage && secondaryImage !== primaryImage) {
      list.push(secondaryImage);
    }
    return list;
  }, [product, primaryImage, secondaryImage]);

  const handleQuickAdd = async (e: React.MouseEvent, variantId: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(variantId, 1);
      setIsAddedRecently(true);
      setTimeout(() => setIsAddedRecently(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Extract and normalize pricing safely
  const rawBase = product.basePrice ?? (product as any).base_price;
  const rawSale = product.salePrice ?? (product as any).sale_price;
  const basePrice = rawBase !== undefined && rawBase !== null ? Number(rawBase) : 0;
  const salePrice = rawSale !== undefined && rawSale !== null ? Number(rawSale) : null;
  const displayPrice = salePrice && salePrice > 0 ? salePrice : basePrice;

  const skuCode = product.skuBase || (product as any).sku_base || '';
  const shortDesc = product.shortDescription || (product as any).short_description || '';

  // WhatsApp Pre-filled order/inquiry generator
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
    const sizeLabel = selectedVariant?.size_value ? selectedVariant.size_value.split(' ')[0] : undefined;
    const url = buildProductWhatsAppUrl({
      name: product.name,
      slug: product.slug,
      sku: selectedVariant?.sku || skuCode,
      price: displayPrice,
      size: sizeLabel,
    });
    openWhatsApp(url);
  };

  const discountPercent =
    salePrice && basePrice > salePrice
      ? Math.round(((basePrice - salePrice) / basePrice) * 100)
      : null;

  // Deduplicate variants by unique size label to eliminate duplicate buttons
  const uniqueVariants = React.useMemo(() => {
    if (!product.variants || product.variants.length === 0) return [];
    const seen = new Set<string>();
    const list: typeof product.variants = [];
    for (const v of product.variants) {
      const label = v.size_value ? v.size_value.split(' ')[0] : v.sku.split('-')[3] || 'STD';
      if (!seen.has(label)) {
        seen.add(label);
        list.push(v);
      }
    }
    return list.slice(0, 4);
  }, [product.variants]);

  const productHref = `/product/${product.slug}`;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-500">
      {/* Media Container (3:4 aspect ratio) */}
      <Link href={productHref} className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 block">
        {/* Interactive Multi-View & 360 Product Image Viewer */}
        <InteractiveProductViewer
          images={viewerImages}
          productName={product.name}
          aspectRatio="aspect-[3/4]"
          priority={product.isFeatured}
          is360Sequence={Boolean(product.is_360 || (product.images_360 && product.images_360.length > 0))}
          showIndicators={viewerImages.length > 1}
          show360Badge={Boolean(product.is_360 || (product.images_360 && product.images_360.length > 0))}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          returnToDefaultOnLeave={true}
        />

        {/* Floating Priority Badge (Consolidated - Max 1 priority badge to prevent visual clutter) */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          {product.isBestseller ? (
            <span className="px-3 py-1.5 text-xs font-semibold bg-brand-obsidian text-brand-gold rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> Bestseller
            </span>
          ) : product.isNewArrival ? (
            <span className="px-3 py-1.5 text-xs font-semibold bg-brand-emerald text-white rounded-full shadow-md backdrop-blur-sm">
              New Arrival
            </span>
          ) : null}
        </div>

        {/* Wishlist Action (Standalone, comfortable touch target min 40px) */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md hover:bg-white text-stone-700 hover:text-red-500 transition-all flex items-center justify-center active:scale-95"
            title="Add to Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Available Sizes Badge on Hover (Showcase Mode) */}
        {uniqueVariants.length > 0 && (
          <div className="absolute inset-x-2 bottom-2 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-stone-200 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Available In-Store Sizing
              </p>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {uniqueVariants.map((v) => {
                  const sizeLabel = v.size_value ? v.size_value.split(' ')[0] : v.sku.split('-')[3] || 'STD';
                  return (
                    <span
                      key={v.id}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200"
                    >
                      {sizeLabel}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Link>

      {/* Information Container */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category / Fabric label + Audience Badge */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold text-brand-gold-dark tracking-wide truncate">
              {product.categoryName || (product.fabric && product.fabric !== 'N/A' ? product.fabric : 'Modest Essential')}
            </span>
            {product.audience && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-sand text-stone-700 border border-stone-200 uppercase flex-shrink-0">
                {product.audience === 'MEN' ? 'Men' : product.audience === 'ALL' ? 'Shared' : 'Women'}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={productHref} className="block mt-1">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-brand-obsidian line-clamp-1 group-hover:text-brand-gold-dark transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          {shortDesc && (
            <p className="text-[11px] sm:text-xs text-stone-600 line-clamp-1 mt-0.5 sm:mt-1">
              {shortDesc}
            </p>
          )}
        </div>

        {/* Pricing & Primary CTAs */}
        <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-stone-100 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-bold text-sm sm:text-base text-brand-obsidian">
                  ₹{displayPrice.toLocaleString('en-IN')}
                </span>
                {salePrice && basePrice > salePrice && (
                  <span className="text-[10px] sm:text-xs text-stone-400 line-through truncate">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {discountPercent && (
                <span className="text-[10px] sm:text-[11px] font-bold text-red-600">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <Link
              href={productHref}
              className="min-h-[32px] sm:min-h-[36px] px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-brand-obsidian transition-colors flex-shrink-0"
              title="View Piece Details"
              aria-label={`View details for ${product.name}`}
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 text-stone-500" />
            </Link>
          </div>

          {/* Dedicated WhatsApp Inquiry & Order Button */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full min-h-[38px] sm:min-h-[40px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm hover:shadow transition-all active:scale-[0.98] group/wa"
            title="Inquire & Order on WhatsApp"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <WhatsAppIcon className="w-4 h-4 text-white fill-white transition-transform group-hover/wa:scale-110" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
