import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import FeatureShowcase from './components/home/FeatureShowcase';
import BentoSpecSection from './components/home/BentoSpecSection';
import ServicesSection from './components/home/ServicesSection';
import AboutSection from './components/home/AboutSection';
import AmenitiesSection from './components/home/AmenitiesSection';
import LocationHoursSection from './components/home/LocationHoursSection';
import ReviewsSection from './components/home/ReviewsSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { Phone, Calendar, Flame } from './components/common/Icons';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'services' | 'admin'
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);
  const [wizardService, setWizardService] = useState(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Dark Mode default true
  const [darkMode, setDarkMode] = useState(true);

  // Check stored auth token on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => {
          if (res.authenticated) {
            setIsAdminAuthenticated(true);
            setAdminUser(res.user);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, []);

  // Sync with browser URL hash for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '#/services' || hash === '#services-all') {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'services') {
      window.location.hash = '#/services';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      if (window.location.hash.startsWith('#/services') || window.location.hash.startsWith('#/admin')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWizard = (category = null, service = null) => {
    setWizardCategory(category);
    setWizardService(service);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardCategory(null);
    setWizardService(null);
  };

  // If on Admin route, render full-screen Admin portal
  if (currentPage === 'admin') {
    return isAdminAuthenticated ? (
      <AdminLayout
        user={adminUser}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAdminAuthenticated(true);
          setAdminUser(user);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-white flex flex-col font-sans selection:bg-cajun-500 selection:text-white">
      {/* Global Navbar */}
      <Navbar 
        onOpenWizard={() => handleOpenWizard()} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => {}}
      />

      {/* Main View */}
      <main className="flex-grow">
        {currentPage === 'services' ? (
          <AllServicesPage 
            onOpenWizard={handleOpenWizard}
            onBackToHome={() => handleNavigate('home')}
          />
        ) : (
          <>
            <Hero onOpenWizard={handleOpenWizard} />
            <FeatureShowcase onOpenWizard={handleOpenWizard} />
            <BentoSpecSection onOpenWizard={handleOpenWizard} />
            <ServicesSection 
              onOpenWizard={handleOpenWizard}
              onViewAllServices={() => handleNavigate('services')}
            />
            <AboutSection onOpenWizard={() => handleOpenWizard()} />
            <AmenitiesSection onOpenWizard={() => handleOpenWizard()} />
            <ReviewsSection onOpenWizard={() => handleOpenWizard()} />
            <LocationHoursSection onOpenWizard={() => handleOpenWizard()} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenWizard={() => handleOpenWizard()} 
        onNavigate={handleNavigate}
      />

      {/* Seafood Boil Request Wizard Modal */}
      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialCategory={wizardCategory}
        initialService={wizardService}
      />

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-obsidian-950/95 border-t border-white/10 backdrop-blur-md p-2.5 flex items-center gap-2.5 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
          className="flex-1 py-3 px-3.5 rounded-full bg-obsidian-800 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 border border-white/10 active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5 text-cajun-400" />
          <span>Call Us</span>
        </a>
        <button
          onClick={() => handleOpenWizard()}
          className="flex-1 py-3 px-3.5 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-cajun-500/30 active:scale-95 transition"
        >
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span>Order Feast</span>
        </button>
      </div>
    </div>
  );
}
