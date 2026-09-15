import React from 'react';
import { 
  CalendarCheck, 
  Fish, 
  Flame, 
  ShieldCheck,
  ShoppingBag,
  Sparkles
} from '../common/Icons';
import { AMENITIES_AVAILABLE, PAYMENT_METHODS } from '../../data/amenitiesData';

const FEATURES = [
  {
    num: 1,
    title: "Online Reservations & Feasts",
    description: "Reserve a family boil table or pre-order hot takeout in under 2 minutes.",
    icon: CalendarCheck,
  },
  {
    num: 2,
    title: "Daily Gulf Catches",
    description: "Texas Gulf flounder, fresh jumbo shrimp, and seasonal live crawfish.",
    icon: Fish,
  },
  {
    num: 3,
    title: "Proprietary Garlic Butter",
    description: "House-steeped Cajun butter sauce in Mild, Medium, Spicy, and Bayou Fire.",
    icon: Flame,
  },
  {
    num: 4,
    title: "Military & First Responder Savings",
    description: "Honoring active duty, military veterans, and local Coastal Bend heroes.",
    icon: ShieldCheck,
  },
];

export default function AmenitiesSection({ onOpenWizard }) {
  return (
    <section id="amenities" className="py-20 sm:py-28 bg-neutral-50 dark:bg-black transition-colors" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Cajun Feast Appetizer Feature */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden card-thick border-2 border-neutral-200/90 dark:border-neutral-800/90">
              <img
                src="/images/oysters-bites.jpg"
                alt="Crispy Cajun Gulf oysters, boudin balls, and gator bites at Captain Paul's Cajun Seafood in Corpus Christi"
                loading="lazy"
                decoding="async"
                width="640"
                height="420"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            <div className="bg-white dark:bg-neutral-900/90 p-7 rounded-3xl card-thick border-2 border-neutral-200/90 dark:border-neutral-800/90">
              <div className="flex items-center space-x-3 mb-2">
                <Sparkles className="w-6 h-6 text-amber-500 shrink-0" aria-hidden="true" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
                  The Complete Cajun Dining Experience
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                Spacious paper-lined boil tables, crab crackers, bibs, cold Texas beers, and Southern sweet tea. Perfect for date nights, lively family gatherings, and Coastal Bend celebrations.
              </p>
            </div>
          </div>

          {/* Right: Numbered Features Grid */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4" />
              <span>The Captain's Promise</span>
            </div>
            <h2 id="amenities-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-neutral-900 dark:text-white tracking-tight mb-4">
              Why Seafood Lovers Choose Captain Paul's
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed">
              We never cut corners on seafood freshness, spice intensity, or warm Southern hospitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.num} 
                    className="p-6 sm:p-7 rounded-3xl card-thick border-2 border-neutral-200/90 dark:border-neutral-800/90 hover:border-red-500 dark:hover:border-red-600 transition-all bg-white dark:bg-neutral-900/90"
                  >
                    <div className="flex items-center space-x-3.5 mb-3">
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center text-sm sm:text-base font-black shrink-0 shadow-md">
                        {feature.num}
                      </span>
                      <Icon className="w-6 h-6 text-red-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                    </div>
                    <h3 className="font-extrabold text-neutral-900 dark:text-white text-base sm:text-lg mb-1.5">{feature.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-base sm:text-lg transition-all shadow-xl active:scale-95 cursor-pointer"
                aria-label="Book your boil table or takeout order"
              >
                Book Table / Order Pickup
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
