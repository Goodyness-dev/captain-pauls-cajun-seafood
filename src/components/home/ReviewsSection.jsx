import React from 'react';
import { Star, Flame } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReviewsSection({ onOpenWizard }) {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4" />
            <span>Customer Love & Social Proof</span>
          </div>
          <h2 id="reviews-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-900 dark:text-white tracking-tight">
            Loved Across Corpus Christi & Coastal Texas
          </h2>
          <div className="flex items-center justify-center space-x-2.5 mt-4">
            <div className="flex text-amber-400" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>
            <span className="text-neutral-700 dark:text-neutral-200 text-base sm:text-lg font-extrabold">
              4.8 Star Rating on Yelp & Google
            </span>
          </div>
        </div>

        {/* Thick & Alive Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {BUSINESS_INFO.reviews.map((rev, idx) => (
            <article
              key={idx}
              className="bg-neutral-50 dark:bg-neutral-900/90 border-2 border-neutral-200/90 dark:border-neutral-800/90 rounded-3xl p-7 sm:p-9 card-thick hover:border-red-500/60 dark:hover:border-red-600/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars + Source */}
                <div className="flex justify-between items-center mb-5">
                  <div className="flex text-amber-400" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-1 rounded-full shadow-sm">
                    {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-neutral-800 dark:text-neutral-200 text-base sm:text-lg leading-relaxed mb-6 italic font-medium">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-neutral-900 dark:text-white text-base sm:text-lg">{rev.author}</h3>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">{rev.location}</span>
                </div>
                <span className="text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm font-medium">{rev.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-18 text-center">
          <button
            onClick={() => onOpenWizard()}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-base sm:text-lg transition-all shadow-xl active:scale-95 cursor-pointer"
            aria-label="Order your Cajun seafood boil today"
          >
            Taste the Difference — Book Boil Table / Order
          </button>
        </div>
      </div>
    </section>
  );
}
