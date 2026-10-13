'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { RotateCw, MoveHorizontal, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { getMediaUrl } from '../../lib/media';

export interface ProductImageView {
  url: string;
  alt?: string;
  label?: string; // e.g. "Front", "Side", "Back", "Detail"
  viewType?: 'front' | 'back' | 'side' | 'detail' | '360' | string;
}

export type ProductImageInput = string | ProductImageView;

export interface InteractiveProductViewerProps {
  /**
   * Array of image URLs or image objects.
   * Supports front, back, side, detail views, or a 360-degree frame sequence.
   */
  images: ProductImageInput[];

  /**
   * Product name used for alt text and accessibility
   */
  productName?: string;

  /**
   * Container aspect ratio (e.g. 'aspect-[3/4]', 'aspect-square', etc.).
   * Defaults to 'aspect-[3/4]' matching the luxury store aesthetic.
   */
  aspectRatio?: string;

  /**
   * Object fit style ('cover' | 'contain'). Default: 'cover'
   */
  objectFit?: 'cover' | 'contain';

  /**
   * Object position style. Default: 'object-top'
   */
  objectPosition?: string;

  /**
   * Mode of interaction:
   * - 'auto': Automatically select based on view count:
   *     - 1 view: static display
   *     - 2 views: hover front/back transition
   *     - 3-7 views: multi-view hover scrubbing
   *     - 8+ views (or is360Sequence=true): genuine 360° turntable viewer
   * - 'scrub': Horizontal mouse/touch scrub across slices
   * - 'hover-flip': Smooth front/back transition on hover
   * - '360': True 360° rotation with drag and touch
   */
  mode?: 'auto' | 'scrub' | 'hover-flip' | '360';

  /**
   * Explicit flag indicating the images form a complete 360-degree rotation sequence
   */
  is360Sequence?: boolean;

  /**
   * Whether leaving the component returns to the default (first) view.
   * Default: true
   */
  returnToDefaultOnLeave?: boolean;

  /**
   * Display bottom segment indicators (dashes/dots for multi-view, or rotation dial for 360)
   * Default: true
   */
  showIndicators?: boolean;

  /**
   * Display interactive "360°" badge with rotation cue when in 360 mode
   * Default: true
   */
  show360Badge?: boolean;

  /**
   * Display angle label pill (e.g. "Front", "Back", "Side View") on hover
   * Default: false
   */
  showViewBadge?: boolean;

  /**
   * Show touch navigation arrows on touch/mobile
   * Default: false
   */
  showMobileNavArrows?: boolean;

  /**
   * Next.js Image priority flag for LCP optimization on primary views
   */
  priority?: boolean;

  /**
   * Responsive sizes attribute for Next.js Image
   */
  sizes?: string;

  /**
   * Additional container CSS classes
   */
  className?: string;

  /**
   * CSS classes applied directly to image elements
   */
  imageClassName?: string;

  /**
   * Controlled active index (e.g., synchronized with PDP thumbnail selector)
   */
  activeIndex?: number;

  /**
   * Callback fired whenever the active view index changes
   */
  onIndexChange?: (index: number) => void;

  /**
   * Pixel sensitivity per frame in 360 drag mode. Default: 12
   */
  dragSensitivity?: number;

  /**
   * Disable interactive hover/drag (behaves as a static image)
   */
  disabled?: boolean;
}

export function InteractiveProductViewer({
  images,
  productName = 'Product',
  aspectRatio = 'aspect-[3/4]',
  objectFit = 'cover',
  objectPosition = 'object-top',
  mode = 'auto',
  is360Sequence = false,
  returnToDefaultOnLeave = true,
  showIndicators = true,
  show360Badge = true,
  showViewBadge = false,
  showMobileNavArrows = false,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  imageClassName = '',
  activeIndex: controlledIndex,
  onIndexChange,
  dragSensitivity = 12,
  disabled = false,
}: InteractiveProductViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize image items to standard ProductImageView structure
  const normalizedImages: ProductImageView[] = useMemo(() => {
    if (!images || images.length === 0) {
      return [
        {
          url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=800&q=80',
          alt: productName,
          label: 'Default View',
        },
      ];
    }
    return images.map((item, idx) => {
      if (typeof item === 'string') {
        let label = `View ${idx + 1}`;
        if (images.length === 2) {
          label = idx === 0 ? 'Front View' : 'Back View';
        } else if (images.length === 3) {
          label = idx === 0 ? 'Front' : idx === 1 ? 'Back' : 'Side Detail';
        } else if (images.length === 4) {
          label = idx === 0 ? 'Front' : idx === 1 ? 'Side' : idx === 2 ? 'Back' : 'Detail';
        }
        return {
          url: getMediaUrl(item),
          alt: `${productName} - ${label}`,
          label,
        };
      }
      return {
        url: getMediaUrl(item.url),
        alt: item.alt || `${productName} - ${item.label || `View ${idx + 1}`}`,
        label: item.label || `View ${idx + 1}`,
        viewType: item.viewType,
      };
    });
  }, [images, productName]);

  const totalViews = normalizedImages.length;

  // Determine effective interaction mode
  const effectiveMode = useMemo<'static' | 'hover-flip' | 'scrub' | '360'>(() => {
    if (disabled || totalViews <= 1) return 'static';
    if (mode === '360' || is360Sequence || (mode === 'auto' && totalViews >= 8)) return '360';
    if (mode === 'hover-flip' || (mode === 'auto' && totalViews === 2)) return 'hover-flip';
    if (mode === 'scrub' || (mode === 'auto' && totalViews >= 3)) return 'scrub';
    return 'scrub';
  }, [disabled, totalViews, mode, is360Sequence]);

  // Internal active index state
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const currentIndex = isControlled ? Math.max(0, Math.min(totalViews - 1, controlledIndex)) : internalIndex;

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // for smooth 360 degree display

  // Drag tracking refs
  const dragStartRef = useRef<{ x: number; index: number }>({ x: 0, index: 0 });
  const hasMovedRef = useRef<boolean>(false);

  // Update active index safely and notify consumer
  const updateIndex = useCallback(
    (newIndex: number) => {
      const clamped = Math.max(0, Math.min(totalViews - 1, newIndex));
      if (!isControlled) {
        setInternalIndex(clamped);
      }
      if (onIndexChange && clamped !== currentIndex) {
        onIndexChange(clamped);
      }
    },
    [totalViews, isControlled, onIndexChange, currentIndex]
  );

  // Wrap-around update for 360 turntable
  const update360Index = useCallback(
    (delta: number) => {
      const wrapped = ((currentIndex + delta) % totalViews + totalViews) % totalViews;
      if (!isControlled) {
        setInternalIndex(wrapped);
      }
      if (onIndexChange && wrapped !== currentIndex) {
        onIndexChange(wrapped);
      }
    },
    [totalViews, currentIndex, isControlled, onIndexChange]
  );

  // Preload secondary images on-demand only when user hovers or interacts with the card
  useEffect(() => {
    if (typeof window === 'undefined' || totalViews <= 1 || (!isHovered && !hasInteracted && !isDragging)) return;
    normalizedImages.forEach((img) => {
      if (img.url) {
        const imageObj = new window.Image();
        imageObj.src = img.url;
      }
    });
  }, [normalizedImages, totalViews, isHovered, hasInteracted, isDragging]);

  // Keep internal state aligned if totalViews shrinks
  useEffect(() => {
    if (internalIndex >= totalViews) {
      setInternalIndex(0);
    }
  }, [totalViews, internalIndex]);

  // Pointer / Mouse Scrubbing Logic
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || totalViews <= 1) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const currentX = e.clientX;

      if (effectiveMode === '360') {
        if (isDragging) {
          const deltaX = currentX - dragStartRef.current.x;
          if (Math.abs(deltaX) > 3) {
            hasMovedRef.current = true;
          }
          const framesToShift = Math.floor(deltaX / dragSensitivity);
          if (framesToShift !== 0) {
            const newIndex =
              ((dragStartRef.current.index + framesToShift) % totalViews + totalViews) % totalViews;
            updateIndex(newIndex);
            dragStartRef.current.x = currentX;
            dragStartRef.current.index = newIndex;
            setDragProgress((prev) => (prev + framesToShift * (360 / totalViews)) % 360);
          }
        } else if (!isHovered) {
          setIsHovered(true);
        }
        return;
      }

      if (effectiveMode === 'scrub') {
        // Multi-view: divide container into equal horizontal sections
        const relativeX = Math.max(0, Math.min(1, (currentX - rect.left) / rect.width));
        const targetIndex = Math.min(totalViews - 1, Math.floor(relativeX * totalViews));
        if (targetIndex !== currentIndex) {
          updateIndex(targetIndex);
          setHasInteracted(true);
        }
      }
    },
    [disabled, totalViews, effectiveMode, isDragging, dragSensitivity, isHovered, updateIndex, currentIndex]
  );

  // Pointer Down (Start Drag / Touch)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || totalViews <= 1) return;

      // Only engage drag for left click or touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      if (effectiveMode === '360') {
        setIsDragging(true);
        hasMovedRef.current = false;
        dragStartRef.current = { x: e.clientX, index: currentIndex };
        // Capture pointer to receive move events even outside container
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore if unsupported
        }
      }
    },
    [disabled, totalViews, effectiveMode, currentIndex]
  );

  // Pointer Up / Cancel
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (effectiveMode === '360' && isDragging) {
        setIsDragging(false);
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    },
    [effectiveMode, isDragging]
  );

  // Mouse Enter
  const handleMouseEnter = useCallback(() => {
    if (disabled || totalViews <= 1) return;
    setIsHovered(true);
    setHasInteracted(true);

    if (effectiveMode === 'hover-flip' && totalViews >= 2) {
      updateIndex(1); // Flip to secondary (back) view
    }
  }, [disabled, totalViews, effectiveMode, updateIndex]);

  // Mouse Leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsDragging(false);

    if (returnToDefaultOnLeave && !isControlled) {
      // Smoothly return to front/default view
      updateIndex(0);
    }
  }, [returnToDefaultOnLeave, isControlled, updateIndex]);

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || totalViews <= 1) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (effectiveMode === '360') {
          update360Index(-1);
        } else {
          updateIndex(Math.max(0, currentIndex - 1));
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (effectiveMode === '360') {
          update360Index(1);
        } else {
          updateIndex(Math.min(totalViews - 1, currentIndex + 1));
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        updateIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        updateIndex(totalViews - 1);
      }
    },
    [disabled, totalViews, effectiveMode, update360Index, updateIndex, currentIndex]
  );

  // Approximate rotation angle in degrees for 360 mode
  const currentDegrees = Math.round((currentIndex / totalViews) * 360);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`${productName} interactive product viewer. ${
        effectiveMode === '360'
          ? 'Use left and right arrow keys or drag horizontally to rotate 360 degrees.'
          : 'Move mouse across image to explore available views.'
      }`}
      aria-roledescription={effectiveMode === '360' ? '360 degree turntable viewer' : 'multi-view image explorer'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerEnter={handleMouseEnter}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${aspectRatio} overflow-hidden bg-stone-100 select-none group/viewer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
        effectiveMode === '360' ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
      } ${className}`}
      style={{ touchAction: effectiveMode === '360' ? 'pan-y' : 'auto' }}
    >
      {/* Stacked Images for Zero-Flicker Preloaded Display */}
      {normalizedImages.map((img, idx) => {
        const isActive = idx === currentIndex;
        // Determine whether to use soft cross-fade (multi-view / 2-view) or crisp cut (360 sequence)
        const isSmoothFlip = effectiveMode === 'hover-flip' || (effectiveMode === 'scrub' && totalViews <= 4);

        return (
          <div
            key={`${img.url}-${idx}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 w-full h-full ${
              isSmoothFlip
                ? 'transition-opacity duration-500 ease-out'
                : 'transition-opacity duration-150'
            } ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <Image
              src={img.url}
              alt={img.alt || productName}
              fill
              priority={priority && idx === 0}
              sizes={sizes}
              className={`w-full h-full object-${objectFit} ${objectPosition} ${
                isSmoothFlip ? 'transition-transform duration-700 ease-out group-hover/viewer:scale-[1.03]' : ''
              } ${imageClassName}`}
            />
          </div>
        );
      })}

      {/* 360° Turntable Mode Badge */}
      {effectiveMode === '360' && show360Badge && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none transition-all duration-300">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-md border transition-all ${
              isDragging || isHovered
                ? 'bg-brand-obsidian/90 text-brand-gold border-brand-gold/50 shadow-gold-glow scale-105'
                : 'bg-white/90 text-brand-obsidian border-stone-200/90'
            }`}
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-brand-gold transition-transform duration-500 ${
                isDragging ? 'rotate-180 animate-spin-slow' : ''
              }`}
            />
            <span>360° VIEW</span>
            <span className="text-[10px] text-stone-400 font-mono ml-0.5">{currentDegrees}°</span>
          </div>
        </div>
      )}

      {/* View Label Pill (e.g. "Front View", "Back View", "Side Angle") */}
      {showViewBadge && normalizedImages[currentIndex]?.label && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/viewer:opacity-100">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-obsidian/85 text-brand-gold backdrop-blur-md shadow-sm border border-brand-gold/30 flex items-center gap-1">
            <Eye className="w-3 h-3 text-brand-gold" />
            <span>{normalizedImages[currentIndex].label}</span>
          </span>
        </div>
      )}

      {/* 360 Rotation Drag Hint Overlay on First Hover */}
      {effectiveMode === '360' && isHovered && !hasInteracted && (
        <div className="absolute inset-x-0 bottom-12 z-20 flex justify-center pointer-events-none animate-fadeIn">
          <div className="bg-brand-obsidian/80 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-brand-gold/30 flex items-center gap-2">
            <MoveHorizontal className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span>Drag horizontally to rotate 360°</span>
          </div>
        </div>
      )}

      {/* Bottom Segment Indicators for Multi-View (Dashes) */}
      {showIndicators && totalViews > 1 && effectiveMode !== '360' && (
        <div className="absolute inset-x-3 bottom-3 z-20 pointer-events-auto transition-opacity duration-300 opacity-0 group-hover/viewer:opacity-100 focus-within:opacity-100">
          <div className="flex items-center justify-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md max-w-fit mx-auto border border-white/20 shadow-sm">
            {normalizedImages.map((img, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={`indicator-${idx}`}
                  type="button"
                  aria-label={`Switch to ${img.label || `view ${idx + 1}`}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-6 bg-brand-gold shadow-sm'
                      : 'w-2 bg-white/60 hover:bg-white hover:w-3.5'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom 360 Rotational Progress Track */}
      {showIndicators && effectiveMode === '360' && (
        <div className="absolute inset-x-6 bottom-3 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/viewer:opacity-100">
          <div className="h-1 w-full bg-white/30 backdrop-blur-md rounded-full overflow-hidden border border-black/10">
            <div
              className="h-full bg-brand-gold rounded-full transition-[width] duration-75"
              style={{ width: `${((currentIndex + 1) / totalViews) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Mobile/Touch Arrow Navigation (Optional or on small screens) */}
      {showMobileNavArrows && totalViews > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous product view"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (effectiveMode === '360') {
                update360Index(-1);
              } else {
                updateIndex(Math.max(0, currentIndex - 1));
              }
            }}
            className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 shadow-md flex items-center justify-center active:scale-95 border border-stone-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Next product view"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (effectiveMode === '360') {
                update360Index(1);
              } else {
                updateIndex(Math.min(totalViews - 1, currentIndex + 1));
              }
            }}
            className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 shadow-md flex items-center justify-center active:scale-95 border border-stone-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}

export default InteractiveProductViewer;
