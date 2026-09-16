import React from 'react';
import { SERVICES } from '../../data/servicesData';
import { ArrowRight, LayoutGrid, Flame, Sparkles } from '../common/Icons';

const FEATURED_SEAFOOD_IMAGES = [
  '/images/crawfish-boil.jpg',
  '/images/crab-legs.jpg',
  '/images/fried-flounder.jpg',
  '/images/gumbo-etouffee.jpg',
];

export default function ServicesSection({ onOpenWizard, onViewAllServices }) {
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <section id="services" className="py-20 sm:py-28 bg-neutral-50 dark:bg-black transition-colors" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cajun-100 dark:bg-cajun-950/60 text-cajun-800 dark:text-cajun-300 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 transition-colors">
            <span className="w-2 h-2 rounded-full bg-cajun-500" />
            <span>Signature Specialties</span>
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-neutral-900 dark:text-white tracking-tight transition-colors">
            Bayou Boils & Gulf Coast Favorites
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base sm:text-xl leading-relaxed transition-colors">
            Dine-in at our boil tables or pre-order hot takeout feasts prepared with our signature garlic butter and secret 14-spice Cajun blend.
          </p>
        </div>

        {/* Thick & Alive Seafood Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14">
          {featuredServices.map((service, index) => (
            <article
              key={service.id}
              className="group relative rounded-3xl overflow-hidden card-thick-hover border-2 border-neutral-200/90 dark:border-neutral-800/90 cursor-pointer bg-neutral-900"
              onClick={() => onOpenWizard(service.category, service.subType)}
            >
              {/* Card Image */}
              <div className="relative h-80 sm:h-96 lg:h-[440px] w-full">
                <img
                  src={FEATURED_SEAFOOD_IMAGES[index] || '/images/hero-seafood.jpg'}
                  alt={`${service.title} - Captain Paul's Cajun Seafood Corpus Christi`}
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="440"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 flex flex-col justify-end">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider">
                    {service.category}
                  </span>
                  {service.popular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-xs font-extrabold">
                      ★ Best Seller
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2 group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
                  {service.description}
                </p>

                {/* CTA Button */}
                <button
                  className="w-full py-3.5 rounded-2xl bg-white/20 hover:bg-red-600 text-white font-bold text-sm sm:text-base transition-all border border-white/30 hover:border-red-600 flex items-center justify-center space-x-2 backdrop-blur-md cursor-pointer"
                  aria-label={`Order or customize ${service.title}`}
                >
                  <span>Select & Order</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Menu Items */}
        <div className="text-center">
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-neutral-900 dark:bg-neutral-900 hover:bg-red-700 dark:hover:bg-red-700 text-white font-extrabold text-base sm:text-lg transition-all shadow-xl active:scale-95 border-2 border-neutral-700 hover:border-red-600 cursor-pointer"
            aria-label="View complete Cajun seafood menu and boils"
          >
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <span>Explore Full Cajun Menu (20+ Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
