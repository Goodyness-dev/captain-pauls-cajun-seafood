import React from 'react';
import { ChevronRight, Phone, Flame, MapPin, Sparkles } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';
import { imageManifest } from '../../data/imageManifest';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative overflow-hidden" aria-label="Welcome to Captain Paul's Cajun Seafood">
      {/* Full-width Hero with Coastal Cajun Imagery */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        {/* Background Image with optimized contrast gradient */}
        <div 
          className="absolute inset-0 overflow-hidden bg-neutral-950 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageManifest.hero.poster}')` }}
        >
          {/* Multi-layered dark bayou vignette for ultra-crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
          <div className="max-w-3xl space-y-6 sm:space-y-7">
            {/* Small badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-red-950/80 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold border border-red-700/60 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span>Corpus Christi’s Premier Cajun Seafood Destination</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.1]">
              Authentic Louisiana <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">Cajun Boils</span> & Gulf Seafood
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl text-neutral-200 max-w-2xl leading-relaxed font-normal">
              Steaming crawfish, colossal snow crab clusters, hand-battered Gulf flounder, and slow-simmered dark roux gumbo drenched in signature garlic butter.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-lg transition-all flex items-center justify-center space-x-3 shadow-xl hover:shadow-red-900/50 active:scale-95 border border-red-500/30 cursor-pointer"
                aria-label="Reserve Boil Table & Order Online"
              >
                <Flame className="w-5 h-5 text-amber-300" />
                <span>Order Feast / Book Table</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-7 py-4 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-lg border border-white/20 transition flex items-center justify-center space-x-3 active:scale-95 cursor-pointer shadow-lg"
                aria-label={`Call Captain Paul's Cajun Seafood at ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Trust proof */}
            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-neutral-300 pt-2 font-medium">
              <div className="flex text-amber-400 text-lg" aria-label="5 out of 5 stars rating">
                {'★★★★★'.split('').map((_, i) => (
                  <span key={i} className="leading-none">★</span>
                ))}
              </div>
              <span className="font-semibold text-white">4.8 Rating</span>
              <span className="text-neutral-400">•</span>
              <span>Yelp & Google Verified Reviews</span>
              <span className="text-neutral-400">•</span>
              <span className="text-amber-300 font-semibold">Fresh Daily Gulf Catches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Action Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 pb-8 sm:pb-10">
        <div className="bg-white dark:bg-black rounded-3xl card-thick border-2 border-neutral-200/90 dark:border-neutral-800/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3.5 transition-colors">
          <div 
            className="flex items-center space-x-3 flex-1 w-full cursor-pointer"
            onClick={() => onOpenWizard()}
          >
            <div className="flex items-center space-x-3 px-5 py-3.5 bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex-1 hover:border-red-500 dark:hover:border-red-600 transition">
              <Flame className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
              <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-semibold truncate">
                Snow Crab, Crawfish, Fried Flounder, Gumbo...
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 px-5 py-3.5 bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex-1">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-medium truncate">
                2743 Airline Rd, Corpus Christi
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenWizard()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition flex items-center justify-center space-x-2 shrink-0 active:scale-95 cursor-pointer shadow-md"
          >
            <span>Start Order</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
