import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, Sun, Moon, Flame } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Menu & Boils', target: 'services' },
    { name: 'Our Heritage', target: '#about' },
    { name: 'Amenities', target: '#amenities' },
    { name: 'Hours & Location', target: '#location' },
    { name: 'Reviews', target: '#reviews' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md border-b border-neutral-200 dark:border-neutral-800' 
          : 'bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Logo & Brand */}
        <button 
          onClick={(e) => handleNavClick(e, '#')} 
          className="flex items-center space-x-3.5 group text-left cursor-pointer"
          aria-label="Captain Paul's Cajun Seafood Home"
        >
          <img 
            src="/images/captain-logo.png" 
            alt="Captain Paul's Cajun Seafood Logo - Corpus Christi TX" 
            width="48"
            height="48"
            decoding="async"
            className="h-12 w-12 rounded-full object-cover border-2 border-red-600 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
              Captain Paul's <span className="text-red-600">Cajun Seafood</span>
            </span>
            <span className="text-xs sm:text-sm tracking-wider uppercase text-neutral-500 dark:text-neutral-400 hidden xs:block font-bold">
              Corpus Christi, Texas
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = link.target === 'services' && currentPage === 'services';
            return (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`text-base font-bold transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-red-600 dark:text-red-400 font-extrabold' 
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right CTA + Dark Mode */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Direct Phone Call */}
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="hidden xl:flex items-center space-x-2 text-sm font-bold text-neutral-800 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <Phone className="w-4 h-4 text-red-600" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenWizard()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-95 flex items-center space-x-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Order / Book Table</span>
          </button>
        </div>

        {/* Mobile Menu & Dark Mode Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-4 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className="text-left py-2 px-3 rounded-xl text-base font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="py-3 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-center font-bold text-neutral-900 dark:text-white flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-extrabold text-center shadow-md flex items-center justify-center space-x-2"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Order Feast / Book Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
