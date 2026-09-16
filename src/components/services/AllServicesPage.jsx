import React, { useState, useEffect } from 'react';
import { 
  SERVICES, 
  SERVICE_CATEGORIES 
} from '../../data/servicesData';
import { 
  Flame,
  Sparkles,
  Utensils,
  Fish,
  Waves,
  Shell,
  Crown,
  Soup,
  Sandwich,
  Award,
  ArrowRight, 
  ArrowLeft,
  Search,
  Phone
} from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

const ICON_MAP = {
  Flame,
  Sparkles,
  Utensils,
  Fish,
  Waves,
  Shell,
  Crown,
  Soup,
  Sandwich,
  Award
};

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All Menu Items');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All Menu Items' || service.category === selectedCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="py-12 sm:py-16 bg-neutral-50 dark:bg-black min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4" />
            <span>Full Restaurant Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-neutral-900 dark:text-white tracking-tight">
            Captain Paul's Full Cajun Menu
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 mt-4 text-base sm:text-xl leading-relaxed">
            Authentic Louisiana seafood boils, golden-fried Gulf baskets, rich dark-roux gumbo, and savory bayou sides prepared fresh daily.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search crawfish, snow crab, flounder, gumbo, po' boys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors text-base font-medium shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-white px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-center text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-8">
          Showing {filteredServices.length} {filteredServices.length === 1 ? 'dish' : 'dishes'}
        </div>

        {/* Dishes Grid (Thick & Alive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Flame;
            return (
              <article
                key={service.id}
                className="bg-white dark:bg-neutral-900/90 rounded-3xl p-7 card-thick-hover border-2 border-neutral-200/90 dark:border-neutral-800/90 flex flex-col justify-between transition-all"
              >
                <div>
                  {service.image && (
                    <div className="relative w-full h-48 mb-5 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-950 group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10 shadow-sm">
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black shadow-md">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {!service.image && (
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-amber-400 shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mb-2.5 leading-snug">
                    {service.title}
                  </h2>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-400">
                    {service.subType}
                  </span>
                  <button
                    onClick={() => onOpenWizard(service.category, service.subType)}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    <span>Order / Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-red-700 to-orange-600 rounded-3xl p-8 sm:p-12 text-center text-white card-thick space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Planning a Seafood Boil Party or Large Group?
          </h2>
          <p className="max-w-2xl mx-auto text-red-100 text-base sm:text-lg">
            We cater family reunions, beach parties, and corporate events with giant crawfish, crab, and shrimp boil platters.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenWizard('Seafood Boils', 'Large Party Boil')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-red-700 font-extrabold text-base hover:bg-neutral-100 transition shadow-lg cursor-pointer"
            >
              Reserve Large Group Boil
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-red-900/60 hover:bg-red-900 text-white font-bold text-base transition border border-red-400/40 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call Us: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
