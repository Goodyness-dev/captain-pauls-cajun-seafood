import React from 'react';
import { Phone, MapPin, ChevronRight, Flame } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-black text-neutral-400 text-sm sm:text-base pb-16 sm:pb-0 border-t border-neutral-900" role="contentinfo">
      {/* Pre-footer CTA Bar */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-orange-700 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
              Ready for an authentic Louisiana Cajun seafood feast?
            </h3>
            <p className="text-red-100 mt-2 text-base sm:text-lg">
              Book a boil table or pre-order hot takeout in under 2 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenWizard()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-red-700 font-extrabold text-base hover:bg-neutral-100 transition shadow-xl active:scale-95 text-center cursor-pointer"
              aria-label="Order Seafood Feast Online"
            >
              Order Online / Book Table
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-red-950/60 hover:bg-red-900 text-white font-bold text-base transition border border-red-500/40 flex items-center justify-center space-x-2.5 active:scale-95 text-center cursor-pointer shadow-lg"
              aria-label={`Call Captain Paul's Cajun Seafood at ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-5 h-5 text-amber-400" aria-hidden="true" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/captain-logo.png" 
              alt="Captain Paul's Cajun Seafood Logo" 
              width="50"
              height="50"
              loading="lazy"
              decoding="async"
              className="h-12 w-12 rounded-full object-cover border border-red-600/50" 
            />
            <span className="font-heading font-black text-white text-base sm:text-lg tracking-tight">
              CAPTAIN PAUL'S CAJUN SEAFOOD
            </span>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Authentic Louisiana Cajun boils, crispy Gulf flounder, jumbo shrimp, and slow-simmered seafood gumbo. Proudly serving Corpus Christi and Coastal Texas.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm sm:text-base">
            {[
              { label: 'Full Cajun Menu & Boils', target: 'services' },
              { label: 'Our Cajun Heritage', target: '#about' },
              { label: 'Restaurant Amenities', target: '#amenities' },
              { label: 'Airline Rd Hours & Map', target: '#location' },
              { label: 'Verified Guest Reviews', target: '#reviews' },
            ].map(link => (
              <li key={link.label}>
                <button 
                  onClick={(e) => handleLinkClick(e, link.target)} 
                  className="hover:text-red-400 transition text-neutral-300 hover:underline text-left cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">Boil Hours</h4>
          <div className="space-y-1.5 text-xs sm:text-sm text-neutral-400">
            <p><span className="text-neutral-200 font-semibold">Mon – Wed:</span> 4:00 PM – 10:30 PM</p>
            <p><span className="text-neutral-200 font-semibold">Thursday:</span> 11:00 AM – 10:30 PM</p>
            <p><span className="text-neutral-200 font-semibold">Fri – Sat:</span> 11:00 AM – 11:00 PM</p>
            <p><span className="text-neutral-200 font-semibold">Sunday:</span> 11:00 AM – 10:00 PM</p>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h4 className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">Visit Us</h4>
          <div className="flex items-start space-x-3 text-neutral-300 text-sm">
            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span>{BUSINESS_INFO.address.formatted}</span>
          </div>
          <div className="flex items-center space-x-3 text-neutral-300 text-sm">
            <Phone className="w-5 h-5 text-red-500 shrink-0" />
            <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white transition font-bold">
              {BUSINESS_INFO.phone}
            </a>
          </div>
          <div className="pt-2">
            <a
              href="/admin"
              className="inline-block text-xs text-neutral-600 hover:text-neutral-400 transition"
            >
              Staff Portal Access
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All Rights Reserved. Crafted with authentic Cajun pride in Corpus Christi, TX.</p>
      </div>
    </footer>
  );
}
