import React from 'react';
import { ChevronRight, Phone, Flame, Sparkles, Star } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 sm:pb-24 lg:pb-32 bg-stone-texture" aria-label="Introduction & Signature Boils">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-cajun-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cajun-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetrical Split Hero Layout matching template */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (5 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Top small badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-obsidian-800 border border-white/10 text-cajun-400 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cajun-500 animate-pulse" />
              <span>Corpus Christi, Texas • Airline Rd</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[1.08]">
                Authentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cajun-400 via-cajun-500 to-amber-300">Louisiana Boils</span> & Fresh Gulf Seafood
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
              Steaming live crawfish, colossal snow crab clusters, and hand-battered Gulf flounder tossed in our proprietary 14-spice bayou seasoning and rich garlic butter.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-orange-700 text-white font-black text-base transition-all shadow-xl shadow-cajun-500/30 hover:shadow-cajun-500/60 active:scale-95 flex items-center justify-center space-x-2.5 border border-orange-400/40 cursor-pointer"
                aria-label="Order Seafood Feast Online"
              >
                <Flame className="w-5 h-5 text-amber-300" />
                <span>Order Feast / Book Table</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-6 py-3.5 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-neutral-200 font-bold text-sm sm:text-base border border-white/10 transition flex items-center justify-center space-x-2.5 active:scale-95 cursor-pointer"
                aria-label={`Call Captain Paul's Cajun Seafood at ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-4 h-4 text-cajun-400" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Template-Inspired Garnish / Dip Accent Thumbnail */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cajun-500/60 shadow-lg shadow-cajun-500/20 shrink-0 bg-obsidian-800 p-0.5">
                <img 
                  src="/images/template-hero-skillet.jpg" 
                  alt="House Remoulade Dip and Lemon" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-extrabold text-white">Signature Bayou Garlic Butter & Remoulade</p>
                <p className="text-neutral-400">Slow-simmered daily in 4 custom heat levels</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Circular Cast Iron Skillet Plate with Glowing Halo (6 cols on lg) */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-6 lg:py-0">
            <div className="cajun-halo-lg relative w-[320px] sm:w-[460px] lg:w-[530px] aspect-square rounded-full flex items-center justify-center">
              {/* Circular Plate Image with subtle drop shadow and thin border */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-obsidian-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/template-hero-skillet.jpg"
                  alt="Cast iron skillet loaded with golden french fries and succulent Cajun spiced shrimp"
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating review badge */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 z-20 bg-obsidian-900/95 backdrop-blur-md rounded-2xl border border-white/10 px-4 py-3 shadow-2xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cajun-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                  4.8★
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Yelp & Google Top Rated</div>
                  <div className="text-[11px] text-neutral-400">Corpus Christi Local Favorite</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
