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
    <footer className="bg-neutral-100 dark:bg-[#040405] text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm border-t border-neutral-200 dark:border-white/5 pt-16 pb-12 transition-colors duration-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-neutral-200 dark:border-white/5">
          
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2.5">
              <img 
                src="/images/captain-logo.png" 
                alt="Captain Paul's Logo" 
                className="w-9 h-9 rounded-full object-cover border-2 border-cajun-500/80 shadow-sm" 
              />
              <span className="font-heading font-black text-neutral-900 dark:text-white text-sm tracking-wider uppercase transition-colors">
                Captain Paul's
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              Authentic Louisiana Cajun seafood boils, crispy Gulf flounder, and savory gumbo in Corpus Christi, TX.
            </p>
          </div>

          {/* Col 2: Menu */}
          <div className="space-y-2.5">
            <h4 className="text-neutral-900 dark:text-white font-extrabold text-xs uppercase tracking-wider transition-colors">Menu</h4>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li><button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Seafood Boils</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Fried Baskets</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Seafood Gumbo</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Po' Boys</button></li>
            </ul>
          </div>

          {/* Col 3: Experience */}
          <div className="space-y-2.5">
            <h4 className="text-neutral-900 dark:text-white font-extrabold text-xs uppercase tracking-wider transition-colors">Experience</h4>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li><button onClick={(e) => handleLinkClick(e, '#flavors')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Boil Flavors</button></li>
              <li><button onClick={(e) => handleLinkClick(e, '#flavors')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Heat Profiles</button></li>
              <li><button onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Bayou Heritage</button></li>
              <li><button onClick={(e) => handleLinkClick(e, '#reviews')} className="hover:text-cajun-600 dark:hover:text-cajun-400 transition cursor-pointer">Guest Reviews</button></li>
            </ul>
          </div>

          {/* Col 4: Location */}
          <div className="space-y-2.5">
            <h4 className="text-neutral-900 dark:text-white font-extrabold text-xs uppercase tracking-wider transition-colors">Visit Us</h4>
            <div className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[11px]">
              <p className="text-neutral-800 dark:text-neutral-200 font-semibold">{BUSINESS_INFO.address.street}</p>
              <p>{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}</p>
              <p className="pt-1 text-cajun-600 dark:text-cajun-400 font-bold">{BUSINESS_INFO.phone}</p>
            </div>
          </div>

          {/* Col 5: Hours & Admin */}
          <div className="space-y-2.5">
            <h4 className="text-neutral-900 dark:text-white font-extrabold text-xs uppercase tracking-wider transition-colors">Boil Hours</h4>
            <div className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[11px]">
              <p>Mon–Wed: 4 PM – 10:30 PM</p>
              <p>Thu: 11 AM – 10:30 PM</p>
              <p>Fri–Sat: 11 AM – 11 PM</p>
              <p>Sun: 11 AM – 10 PM</p>
              <div className="pt-2">
                <a href="#/admin" className="text-[10px] text-neutral-500 dark:text-neutral-500 hover:text-cajun-600 dark:hover:text-cajun-400 transition">
                  Staff Portal
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600 gap-3">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.</p>
          <p>Crafted with authentic Louisiana Cajun pride • Corpus Christi, TX</p>
        </div>

      </div>
    </footer>
  );
}
