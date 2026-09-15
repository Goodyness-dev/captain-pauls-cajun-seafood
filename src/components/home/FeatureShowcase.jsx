import React from 'react';
import { Flame, Sparkles, ChevronRight, CheckCircle2 } from '../common/Icons';

export default function FeatureShowcase({ onOpenWizard }) {
  return (
    <section className="py-16 sm:py-24 bg-obsidian-950 space-y-24 sm:space-y-32">
      
      {/* ------------------------------------------------------------- */}
      {/* FEATURE 1: Left Circular Dish + Right Info (Matching Template) */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Circular Dish with Ambient Ember Halo */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="cajun-halo relative w-[280px] sm:w-[380px] lg:w-[440px] aspect-square rounded-full flex items-center justify-center">
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-obsidian-700/70 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/crawfish-boil.jpg"
                  alt="Louisiana Crawfish & Snow Crab boil platter in garlic butter"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Text Information with Spice Pill */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-cajun-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Catch of the Day</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight uppercase leading-tight">
              Live Louisiana Crawfish & Sweet Snow Crab
            </h2>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              Hand-selected daily catches boiled in our rolling aromatics kettle. Each pound is drenched in house garlic butter, fresh cracked peppers, and lemon wedges, served steaming hot in food-grade boil bags.
            </p>

            {/* Template Spice Tag Pill */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-obsidian-800/90 border border-cajun-500/30 text-xs sm:text-sm font-semibold text-neutral-200">
              <span className="text-cajun-500 font-bold">Heat Profile:</span>
              <span className="text-amber-300">Mild • Medium • Bayou Fire</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenWizard('Seafood Boils', 'Live Louisiana Crawfish Boil')}
                className="px-7 py-3 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-white font-bold text-sm sm:text-base border border-white/15 hover:border-cajun-500/60 transition-all flex items-center space-x-2 cursor-pointer active:scale-95 shadow-lg"
              >
                <span>Customize Boil Bag</span>
                <ChevronRight className="w-4 h-4 text-cajun-400" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE 2: Right Text + Left Circular Dish (Matching Template) */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Circular Skillet Dish with Ambient Ember Halo */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="cajun-halo relative w-[280px] sm:w-[380px] lg:w-[440px] aspect-square rounded-full flex items-center justify-center">
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-obsidian-700/70 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/fried-flounder.jpg"
                  alt="Crispy golden fried Gulf flounder and jumbo butterfly shrimp basket"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Story & Craftsmanship with Bullet Points */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-cajun-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Crispy Fried Baskets</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight uppercase leading-tight">
              Crispy Golden Gulf Flounder & Jumbo Shrimp
            </h2>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              Corpus Christi’s beloved local catch! Fresh flaky white flounder fillets and butterfly Gulf shrimp dipped in seasoned buttermilk and flash-fried in golden cornmeal crust.
            </p>

            {/* Checklist items matching template layout */}
            <ul className="space-y-2.5 text-sm sm:text-base text-neutral-300">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0" />
                <span>Served with hot crispy Cajun-seasoned fries</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0" />
                <span>House-made sweet corn hushpuppies & remoulade</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-cajun-500 shrink-0" />
                <span>Fresh lemons, cocktail sauce, and bayou tartar dip</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onOpenWizard('Fried Baskets', 'Crispy Golden Fried Gulf Flounder')}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-orange-700 text-white font-black text-sm sm:text-base transition-all shadow-xl shadow-cajun-500/30 active:scale-95 flex items-center space-x-2.5 border border-orange-400/40 cursor-pointer"
              >
                <span>Order Fried Basket</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
