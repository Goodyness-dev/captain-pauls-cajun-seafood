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
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 dark:bg-obsidian-800 border border-neutral-300 dark:border-white/10 text-cajun-700 dark:text-cajun-400 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors">
              <span className="w-2 h-2 rounded-full bg-cajun-500 animate-pulse" />
              <span>Corpus Christi, Texas • Airline Rd</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black font-heading tracking-tight text-neutral-900 dark:text-white uppercase leading-[1.08] transition-colors">
                Authentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cajun-500 via-cajun-600 to-amber-500">Louisiana Boils</span> & Fresh Gulf Seafood
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl font-medium transition-colors">
              Steaming live crawfish, colossal snow crab clusters, and hand-battered Gulf flounder tossed in our proprietary 14-spice bayou seasoning and rich garlic butter.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-orange-700 text-white font-black text-base transition-all duration-300 shadow-xl shadow-cajun-500/25 hover:shadow-cajun-500/45 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2.5 border border-orange-400/40 cursor-pointer"
                aria-label="Order Seafood Feast Online"
              >
                <span>Order Feast / Book Table</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-6 py-3.5 rounded-full bg-white dark:bg-obsidian-800 hover:bg-neutral-100 dark:hover:bg-obsidian-700 text-neutral-800 dark:text-neutral-200 font-bold text-sm sm:text-base border border-neutral-200 dark:border-white/10 transition-all duration-300 flex items-center justify-center space-x-2.5 active:scale-95 cursor-pointer shadow-sm hover:-translate-y-0.5"
                aria-label={`Call Captain Paul's Cajun Seafood at ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-4 h-4 text-cajun-600 dark:text-cajun-400" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Fresh Garnish / Dip Accent Thumbnail */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cajun-500/60 shadow-lg shadow-cajun-500/20 shrink-0 bg-white dark:bg-obsidian-800 p-0.5 group">
                <img 
                  src="/images/template-hero-skillet.jpg" 
                  alt="House Remoulade Dip and Lemon" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-extrabold text-neutral-900 dark:text-white transition-colors">Signature Bayou Garlic Butter & Remoulade</p>
                <p className="text-neutral-500 dark:text-neutral-400 transition-colors">Slow-simmered daily in 4 custom heat levels</p>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Cast Iron Skillet Plate with Floating Animation */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-6 lg:py-0">
            <div className="cajun-halo-lg relative w-[320px] sm:w-[460px] lg:w-[530px] aspect-square rounded-full flex items-center justify-center animate-float">
              {/* Circular Plate Image with subtle drop shadow and thin border */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white/60 dark:border-obsidian-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] hover:scale-[1.03] transition-transform duration-700 ease-out">
                <img
                  src="/images/template-hero-skillet.jpg"
                  alt="Cast iron skillet loaded with golden french fries and succulent Cajun spiced shrimp"
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating review badge */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-white/10 px-4 py-3 shadow-xl flex items-center space-x-3 transition-colors">
                <div className="w-10 h-10 rounded-full bg-cajun-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                  4.8★
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">Yelp & Google Top Rated</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Corpus Christi Local Favorite</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
