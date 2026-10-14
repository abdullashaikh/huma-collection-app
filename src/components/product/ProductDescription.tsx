'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ProductDescriptionProps {
  description?: string | null;
  shortDescription?: string | null;
}

export function ProductDescription({ description, shortDescription }: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const rawText = (description || shortDescription || '').trim();

  if (!rawText) {
    return (
      <p className="font-sans text-xs sm:text-sm text-stone-500 italic">
        Handcrafted luxury modest piece. Inquire with our boutique concierge for custom garment details.
      </p>
    );
  }

  // Helper to format inline bold like "**Color:** Sage Green" -> <strong>Color:</strong> Sage Green
  const renderFormattedInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanBold = part.slice(2, -2).trim();
        return (
          <span key={idx} className="font-semibold text-stone-900">
            {cleanBold}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Check if text contains structured "**Product Highlights:**"
  const highlightsRegex = /\*\*Product Highlights:\*\*(.*?)(?=\n\n|\.\s+[A-Z]|$)/is;
  const highlightsMatch = rawText.match(highlightsRegex);

  let introText = rawText;
  let highlights: string[] = [];
  let closingText = '';

  if (highlightsMatch) {
    introText = rawText.slice(0, highlightsMatch.index).trim();
    const rawHighlightsBlock = highlightsMatch[1] || '';
    const afterHighlights = rawText.slice((highlightsMatch.index || 0) + highlightsMatch[0].length).trim();

    // Extract bullet points formatted as "- **Key:** Value" or " - **Key:** Value"
    const bulletItems = rawHighlightsBlock
      .split(/(?:^|\n|\s)-\s+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    highlights = bulletItems;
    closingText = afterHighlights;
  }

  // Clean text for teaser (removes raw markdown asterisks)
  const cleanTeaser = (introText || rawText).replace(/\*\*/g, '').trim();

  // If text is short (fits in 2-3 lines naturally), no need for toggle button
  const isExpandable = rawText.length > 180 || highlights.length > 0;

  return (
    <div className="space-y-3">
      {/* 2-3 Lines Mode (Default for both mobile and laptop/desktop view) */}
      {!isExpanded ? (
        <div className="space-y-2">
          <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
            {cleanTeaser}
          </p>

          {isExpandable && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-gold-dark hover:text-stone-900 transition-colors py-1 group cursor-pointer focus:outline-none"
              aria-label="View more description"
            >
              <span>View more</span>
              <ChevronDown className="w-3.5 h-3.5 text-brand-gold-dark transition-transform group-hover:translate-y-0.5" />
            </button>
          )}
        </div>
      ) : (
        /* Expanded Full Description with Clean Formatting */
        <div className="space-y-4 animate-fadeIn">
          {/* Main narrative paragraphs */}
          {introText && (
            <div className="space-y-3">
              {introText.split(/\n\s*\n/).map((para, idx) => (
                <p key={idx} className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {renderFormattedInline(para.trim())}
                </p>
              ))}
            </div>
          )}

          {/* Structured Highlights Grid */}
          {highlights.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 my-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Product Highlights</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-dark flex-shrink-0 mt-2" />
                    <span className="leading-relaxed">{renderFormattedInline(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Closing remark / styling recommendation */}
          {closingText && (
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed italic pt-1">
              {renderFormattedInline(closingText)}
            </p>
          )}

          {/* View less toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-gold-dark hover:text-stone-900 transition-colors py-1 group cursor-pointer focus:outline-none"
            aria-label="View less description"
          >
            <span>View less</span>
            <ChevronUp className="w-3.5 h-3.5 text-brand-gold-dark transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
