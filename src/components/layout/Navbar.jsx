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
    { name: 'Menu', target: 'services' },
    { name: 'Boil Flavors', target: '#flavors' },
    { name: 'Our Story', target: '#about' },
    { name: 'Hours & Location', target: '#location' },
    { name: 'Reviews', target: '#reviews' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-obsidian-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-white/10 shadow-lg' 
          : 'bg-transparent border-b border-neutral-200/40 dark:border-white/5'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Monogram Brand */}
        <button 
          onClick={(e) => handleNavClick(e, '#')} 
          className="flex items-center space-x-3.5 group text-left cursor-pointer"
          aria-label="Captain Paul's Cajun Seafood Home"
        >
          <img 
            src="/images/captain-logo.png" 
            alt="Captain Paul's Cajun Seafood Logo" 
            width="44"
            height="44"
            decoding="async"
            className="h-11 w-11 rounded-full object-cover border-2 border-cajun-500/80 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-black tracking-wider text-neutral-900 dark:text-white uppercase leading-tight">
              Captain Paul's
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-cajun-600 dark:text-cajun-400 font-extrabold">
              Cajun Seafood & Boils
            </span>
          </div>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-neutral-100 dark:bg-obsidian-800/80 px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 backdrop-blur-sm shadow-inner" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = link.target === 'services' && currentPage === 'services';
            return (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'text-white bg-cajun-600 dark:bg-cajun-600/40 border border-cajun-500/60 shadow-sm' 
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right CTA + Theme Toggle */}
        <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-full bg-neutral-100 dark:bg-obsidian-800 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="hidden lg:flex items-center space-x-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-cajun-600 dark:hover:text-cajun-400 transition"
          >
            <Phone className="w-3.5 h-3.5 text-cajun-600 dark:text-cajun-500" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* Glowing Orange Pill Button matching template */}
          <button
            onClick={() => onOpenWizard()}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-orange-700 text-white font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-cajun-500/30 hover:shadow-cajun-500/50 active:scale-95 flex items-center space-x-2 cursor-pointer border border-orange-400/30"
          >
            <span>Order Feast</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button + Mobile Theme Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-obsidian-800 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-amber-400 transition cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-obsidian-800 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-obsidian-900 border-b border-neutral-200 dark:border-white/10 px-4 py-6 space-y-4 shadow-2xl transition-colors">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className="text-left py-2.5 px-3 rounded-xl text-sm font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-obsidian-800 hover:text-cajun-600 dark:hover:text-cajun-400 transition"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex flex-col space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="py-3 px-4 rounded-full bg-neutral-100 dark:bg-obsidian-800 text-center font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-center space-x-2 text-sm border border-neutral-200 dark:border-white/10"
            >
              <Phone className="w-4 h-4 text-cajun-600 dark:text-cajun-500" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWizard();
              }}
              className="py-3.5 px-4 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 text-white font-extrabold text-center shadow-lg shadow-cajun-500/30 flex items-center justify-center space-x-2 text-sm"
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
