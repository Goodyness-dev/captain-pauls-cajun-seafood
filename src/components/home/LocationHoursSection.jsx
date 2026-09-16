import React from 'react';
import { MapPin, Clock, Navigation, Phone, ExternalLink, Flame } from '../common/Icons';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const shopOpen = isOpenNow();
  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  return (
    <section id="location" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cajun-100 dark:bg-cajun-950/60 text-cajun-800 dark:text-cajun-300 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 transition-colors">
            <span className="w-2 h-2 rounded-full bg-cajun-500" />
            <span>Corpus Christi, Texas</span>
          </div>
          <h2 id="location-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-900 dark:text-white tracking-tight">
            Hours & Restaurant Location
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base sm:text-xl leading-relaxed">
            Located right on Airline Road in Corpus Christi. Walk-ins welcome for boils, or reserve your feast ahead!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Hours & Contact Card */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900/90 border-2 border-neutral-200/90 dark:border-neutral-800/90 rounded-3xl p-7 sm:p-9 space-y-6 card-thick flex flex-col justify-between transition-colors">
            <div>
              {/* Open/Closed Status */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 mb-6">
                <div className="flex items-center space-x-3.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} aria-hidden="true" />
                  <div>
                    <span className={`font-extrabold text-base sm:text-lg block ${shopOpen ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {shopOpen ? 'Open for Boils & Dining' : 'Currently Closed'}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Today is {currentDayName}</span>
                  </div>
                </div>
                <Clock className="w-6 h-6 text-neutral-400" aria-hidden="true" />
              </div>

              {/* Hours Table */}
              <div>
                <h3 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                  Weekly Operating Hours
                </h3>
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-sm sm:text-base">
                  {BUSINESS_INFO.hours.map((h) => {
                    const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
                    return (
                      <div
                        key={h.day}
                        className={`py-3 px-3 flex justify-between items-center rounded-xl ${
                          isToday 
                            ? 'bg-red-50 dark:bg-red-950/40 font-bold border border-red-200 dark:border-red-900/50' 
                            : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span className={isToday ? 'text-red-700 dark:text-red-400 font-extrabold' : ''}>
                          {h.day}
                          {isToday && (
                            <span className="ml-2 text-[10px] uppercase px-2 py-0.5 rounded-md bg-red-600 text-white font-black">
                              Today
                            </span>
                          )}
                        </span>
                        <div className="text-right">
                          <span className={h.open === 'Closed' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-neutral-900 dark:text-white font-semibold'}>
                            {h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`}
                          </span>
                          {h.note && (
                            <span className="text-xs text-amber-600 dark:text-amber-400 block font-medium">({h.note})</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Address & Direct Call */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base">
                  <p className="font-bold text-neutral-900 dark:text-white">{BUSINESS_INFO.address.street}</p>
                  <p className="text-neutral-500 dark:text-neutral-400">{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Phone className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                <a 
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} 
                  className="font-extrabold text-neutral-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-sm flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-red-600" />
                  <span>Get Driving Directions</span>
                </a>
                <button
                  onClick={() => onOpenWizard()}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-orange-700 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer border border-orange-400/30 hover:-translate-y-0.5"
                >
                  <span>Reserve Table / Order</span>
                </button>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps card */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900/90 border-2 border-neutral-200/90 dark:border-neutral-800/90 rounded-3xl overflow-hidden card-thick flex flex-col transition-colors min-h-[420px]">
            <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-neutral-900 dark:text-white text-lg sm:text-xl">
                  {BUSINESS_INFO.name} Map
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  {BUSINESS_INFO.address.formatted}
                </p>
              </div>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:underline flex items-center space-x-1"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex-1 w-full h-full min-h-[380px] relative">
              <iframe
                title="Captain Paul's Cajun Seafood Google Maps Location"
                src={BUSINESS_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
