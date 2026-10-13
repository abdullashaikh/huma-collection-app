import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Sparkles, Scissors, HeartHandshake } from 'lucide-react';

export const BrandCraftsmanshipSection: React.FC = () => {
  const highlights = [
    {
      title: 'Imported Korean & Saudi Crepe',
      description: 'Tested rigorously for complete opacity under harsh sunlight. Featherlight, breathable, and never clings.',
      icon: ShieldCheck,
    },
    {
      title: 'Wudu-Friendly & Smart Pockets',
      description: 'Discreet snap closures or gentle elasticated wrists that roll up effortlessly for ablution, plus 2 deep concealed pockets.',
      icon: Scissors,
    },
    {
      title: 'Artisanal Hand Embroidery',
      description: 'Delicate metallic gold and tone-on-tone embroidery crafted by master artisans in Dubai and Mumbai workshops.',
      icon: Sparkles,
    },
    {
      title: 'Generous Modest Drape & Lengths',
      description: 'Standard lengths 50 to 60 designed to sweep gracefully without dragging. Free styling assistance on WhatsApp.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-ivory/60 border-y border-stone-200/80 py-16 sm:py-24">
      {/* Background delicate radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Primary Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=85"
                  alt="Huma Collection Master Craftsmanship"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 420px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

                {/* Floating Seal Badge */}
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-gold/40 text-brand-obsidian shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/20 text-brand-gold-dark flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-bold text-brand-obsidian">100% Guaranteed Modesty</p>
                      <p className="text-xs text-stone-600">Zero cling, zero see-through compromise</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Mini Card */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-36 h-36 rounded-2xl overflow-hidden border-2 border-brand-gold shadow-xl bg-white rotate-3">
                <Image
                  src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=400&q=80"
                  alt="Fabric Texture Detail"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Values & Craftsmanship Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-dark text-xs font-bold tracking-widest uppercase mb-3">
                <Scissors className="w-3.5 h-3.5 text-brand-gold" />
                <span>The Art of Modest Tailoring</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian leading-tight">
                Designed For Devotion, <br />
                Tailored For Daily Life.
              </h2>
              <p className="text-sm text-stone-600 mt-3 max-w-xl leading-relaxed">
                For over a decade, Huma Collection has dressed thousands of sisters across India with modest silhouettes that honor Islamic tradition without sacrificing comfort or luxury.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-luxury hover:border-brand-gold/50 transition-all duration-300 space-y-2 group hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-sand/70 text-brand-gold-dark flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-sm font-bold text-brand-obsidian group-hover:text-brand-gold-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
