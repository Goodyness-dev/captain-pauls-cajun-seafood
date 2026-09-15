import React from 'react';
import { Flame, CheckCircle2, Sparkles, ChevronRight } from '../common/Icons';

export default function BentoSpecSection({ onOpenWizard }) {
  return (
    <section id="flavors" className="py-16 sm:py-24 bg-obsidian-950" aria-label="Boil Flavors & Customization">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-cajun-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Signature Boil Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight uppercase">
            Craft Your Custom Bayou Boil
          </h2>
          <p className="text-neutral-400 mt-3 text-base sm:text-lg">
            Choose your signature garlic butter sauce, select your spice threshold, and pack in fresh Texas Gulf seafood.
          </p>
        </div>

        {/* 3-Column Dark Bento Card Matching Template Centerpiece */}
        <div className="bg-[#121218] border border-white/10 rounded-3xl sm:rounded-4xl card-thick p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Column 1: Signature Boil Sauces (4 cols on md) */}
            <div className="md:col-span-4 space-y-5 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight uppercase">
                  Boil Sauces
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Proprietary recipes steeped in clarified butter
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">Captain's Special</span>
                    <span className="text-[11px] text-neutral-400">Garlic butter + 14-spice Cajun blend</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">Louisiana Cajun</span>
                    <span className="text-[11px] text-neutral-400">Classic bayou black pepper & cayenne</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">Zesty Lemon Pepper</span>
                    <span className="text-[11px] text-neutral-400">Crushed peppercorns with citrus butter</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">Sweet Garlic Butter</span>
                    <span className="text-[11px] text-neutral-400">Slow-simmered aromatic garlic dip</span>
                  </div>
                </li>
              </ul>

              <button
                onClick={() => onOpenWizard('Seafood Boils', 'Boil Sauces')}
                className="w-full py-2.5 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-white font-bold text-xs border border-white/10 transition cursor-pointer"
              >
                Select Sauce
              </button>
            </div>

            {/* Column 2: Heat Levels & Customization (4 cols on md) */}
            <div className="md:col-span-4 space-y-5 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight uppercase">
                  Heat Levels & Add-ons
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Calibrated to your exact spice preference
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Mild', sub: 'Gentle warmth' },
                  { name: 'Medium', sub: 'Authentic kick' },
                  { name: 'Spicy', sub: 'Bayou fire' },
                  { name: 'Volcanic', sub: 'Chilihead proof' },
                ].map(h => (
                  <div key={h.name} className="p-2.5 rounded-xl bg-obsidian-800/80 border border-white/5 text-center">
                    <span className="block font-black text-xs text-white">{h.name}</span>
                    <span className="block text-[10px] text-neutral-400">{h.sub}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cajun-500" />
                  <span>Sweet corn on the cob & baby red potatoes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cajun-500" />
                  <span>Louisiana smoked andouille sausage slices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cajun-500" />
                  <span>Wok-tossed garlic butter noodles</span>
                </li>
              </ul>

              {/* Glowing Orange Button */}
              <button
                onClick={() => onOpenWizard('Seafood Boils', 'Custom Boil Combo')}
                className="w-full py-3 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-orange-700 text-white font-black text-xs sm:text-sm tracking-wide transition shadow-lg shadow-cajun-500/30 active:scale-95 cursor-pointer border border-orange-400/30"
              >
                Customize Your Boil
              </button>
            </div>

            {/* Column 3: Circular Dish Preview with Localized Ember Glow (4 cols on md) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-4 pt-2 md:pt-0">
              <div className="cajun-halo relative w-44 h-44 sm:w-52 sm:h-52 aspect-square rounded-full flex items-center justify-center">
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-cajun-500/50 shadow-xl">
                  <img
                    src="/images/crab-legs.jpg"
                    alt="Colossal Snow Crab Legs in Garlic Butter"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-cajun-400 uppercase tracking-wider block">
                  Best Seller Preview
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Colossal Snow Crab Feast
                </h4>
                <p className="text-[11px] text-neutral-400 max-w-[200px] mx-auto mt-0.5">
                  Steamed fresh & soaked in bubbling garlic butter
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
