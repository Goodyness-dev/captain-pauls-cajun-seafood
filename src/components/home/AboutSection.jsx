import React from 'react';
import { Quote, Flame, Sparkles } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenWizard }) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image with Thick & Alive styling */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden card-thick border-2 border-neutral-200/90 dark:border-neutral-800/90">
              <img
                src="/images/interior-vibe.jpg"
                alt="Captain Paul's Cajun Seafood dining room and boil tables on Airline Rd in Corpus Christi, Texas"
                loading="lazy"
                decoding="async"
                width="640"
                height="440"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-6 right-4 sm:right-8 bg-neutral-900 text-white rounded-2xl card-thick border-2 border-red-600/80 px-6 py-4 transition-colors">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span className="text-2xl sm:text-3xl font-black font-heading text-amber-400">100%</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-200 font-bold">Gulf Catches & Bayou Flavors</div>
            </div>
          </div>

          {/* Right: Text with Thick & Alive aesthetic */}
          <div className="space-y-6 sm:space-y-7">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Our Story & Boil Heritage</span>
            </div>

            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-neutral-900 dark:text-white tracking-tight leading-tight">
              Bayou Traditions Meet the Texas Coastal Bend
            </h2>

            {/* Owner Quote */}
            <div className="border-l-4 border-red-600 dark:border-red-500 pl-5 sm:pl-6 py-2 bg-neutral-50 dark:bg-neutral-900/60 rounded-r-2xl border-y border-r border-neutral-200/60 dark:border-neutral-800/60 p-4">
              <Quote className="w-6 h-6 text-red-500 dark:text-red-400 mb-2" aria-hidden="true" />
              <p className="text-neutral-700 dark:text-neutral-200 text-base sm:text-lg italic leading-relaxed font-medium">
                "{BUSINESS_INFO.owner.quote}"
              </p>
              <div className="mt-3 text-sm sm:text-base font-extrabold text-red-600 dark:text-red-400">
                — {BUSINESS_INFO.owner.name}
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              At Captain Paul's Cajun Seafood, we believe great seafood boils bring people together. We slow-simmer our rich garlic butter, hand-mix our 14-spice bayou seasoning, and serve generous portions of fresh Gulf flounder, Louisiana crawfish, and sweet snow crab clusters steaming hot to your table.
            </p>

            {/* Key milestones */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-3 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-medium">
                <span className="font-extrabold text-red-600 dark:text-red-400 text-base">2021</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Bayou boil recipe perfected</span>
              </div>
              <div className="flex items-center space-x-3 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-medium">
                <span className="font-extrabold text-red-600 dark:text-red-400 text-base">2023</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Airline Rd location opened</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-base sm:text-lg transition-all shadow-lg active:scale-95 cursor-pointer"
                aria-label="Reserve a table or order online"
              >
                Reserve Table / Order Feast
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
