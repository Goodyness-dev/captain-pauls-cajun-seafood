import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  MapPin, 
  Mail, 
  User, 
  Phone, 
  AlertCircle, 
  Loader2,
  CheckCircle2,
  Flame,
  Utensils,
  Fish,
  Calendar,
  Sparkles
} from '../common/Icons';
import { submitQuoteRequest } from '../../services/quoteService';

const SEAFOOD_EXPERIENCES = [
  { id: 'dine-in-table', title: 'Dine-In Boil Table', desc: 'Paper-lined table with bibs, crackers, and hot steaming boil bags' },
  { id: 'takeout-feast', title: 'Hot Takeout Feast', desc: 'Packaged hot and fresh for quick pickup and beach dinners' },
  { id: 'catering-party', title: 'Catering & Large Group', desc: 'Massive family boils, corporate parties, and celebrations' },
];

const BOIL_FLAVORS = [
  { id: 'captains-special', title: "Captain's Special", desc: 'Rich garlic butter infused with 14-spice Cajun seasoning' },
  { id: 'louisiana-cajun', title: 'Traditional Louisiana Cajun', desc: 'Bayou black pepper, cayenne, and Creole herbs' },
  { id: 'lemon-pepper', title: 'Garlic Lemon Pepper', desc: 'Zesty citrus punch with crushed black peppercorn & butter' },
  { id: 'pure-garlic-butter', title: 'Sweet Garlic Butter', desc: 'Slow-simmered aromatic garlic and melted butter' },
];

const HEAT_LEVELS = [
  { id: 'mild', label: 'Mild', desc: 'Gentle warmth, kid-friendly' },
  { id: 'medium', label: 'Medium', desc: 'The authentic Cajun kick' },
  { id: 'spicy', label: 'Spicy', desc: 'Bayou fire with real heat' },
  { id: 'fire', label: 'Volcanic Fire', desc: 'For seasoned chiliheads only' },
];

const SIGNATURE_DISHES = [
  "Captain's Ultimate Seafood Boil Combo",
  "Colossal Snow Crab Clusters",
  "Live Louisiana Crawfish Boil",
  "Alaskan King Crab Feast",
  "Jumbo Gulf Coast Shrimp Boil",
  "Crispy Golden Fried Gulf Flounder Basket",
  "Southern Delta Catfish Platter",
  "Crispy Jumbo Butterfly Shrimp Basket",
  "Authentic Bayou Seafood Gumbo",
  "Classic Crawfish Étouffée",
  "Famous New Orleans Po' Boys",
  "Cajun Garlic Butter Noodles"
];

const PARTY_SIZES = [
  '1 - 2 Guests',
  '3 - 4 Guests',
  '5 - 8 Guests (Family Boil)',
  '9+ Guests (Large Party)'
];

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null, initialService = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    experienceType: 'Dine-In Boil Table',
    primaryDish: "Captain's Ultimate Seafood Boil Combo",
    boilFlavor: "Captain's Special",
    heatLevel: 'Medium',
    partySize: '3 - 4 Guests',
    addOns: ['Extra Corn & Potatoes'],
    timeline: 'Today / As soon as possible',
    specificDate: '',
    specialNotes: '',
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialService) {
        setFormData(prev => ({
          ...prev,
          primaryDish: initialService
        }));
      }
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setCurrentStep(1);
        setSubmissionResult(null);
        setErrorMsg('');
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const toggleAddOn = (addon) => {
    setFormData(prev => {
      const exists = prev.addOns.includes(addon);
      return {
        ...prev,
        addOns: exists ? prev.addOns.filter(a => a !== addon) : [...prev.addOns, addon]
      };
    });
  };

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!formData.experienceType) {
        setErrorMsg('Please select an experience type.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.primaryDish) {
        setErrorMsg('Please choose your primary dish or boil.');
        return;
      }
    } else if (currentStep === 3) {
      if (formData.timeline === 'Specific date & time' && !formData.specificDate) {
        setErrorMsg('Please choose your preferred reservation date and time.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setErrorMsg('Please provide at least a phone number or email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: '2743 Airline Rd, Corpus Christi, TX',
        make: formData.experienceType,
        modelAndYear: `Party: ${formData.partySize} | Spice: ${formData.boilFlavor} (${formData.heatLevel})`,
        serviceCategory: 'Seafood Order / Reservation',
        detailedService: formData.primaryDish,
        engineType: `Add-ons: ${formData.addOns.join(', ') || 'None'}`,
        customIssue: formData.specialNotes || 'No special instructions',
        details: `Experience: ${formData.experienceType}, Dish: ${formData.primaryDish}, Flavor: ${formData.boilFlavor}, Heat: ${formData.heatLevel}, Add-ons: ${formData.addOns.join(', ')}`,
        needsTowing: false,
        needsShuttle: false,
        timeline: formData.timeline,
        specificDate: formData.specificDate
      };

      const result = await submitQuoteRequest(payload);
      setSubmissionResult(result);
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please call the restaurant directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 card-thick overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-red-600 text-white">
              <Flame className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white">
                Captain Paul's Boil & Table Wizard
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Step {currentStep} of 4 — {currentStep === 1 ? 'Select Experience' : currentStep === 2 ? 'Choose Boil & Flavor' : currentStep === 3 ? 'Date & Party Size' : 'Contact & Confirm'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5">
          <div 
            className="bg-gradient-to-r from-red-600 to-orange-500 h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submissionResult ? (
            /* Success State */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center border-2 border-green-500/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                Seafood Feast Request Confirmed!
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-base max-w-md mx-auto">
                Thank you, <span className="font-bold text-neutral-900 dark:text-white">{formData.name}</span>. Our crew at 2743 Airline Rd has received your order/reservation.
              </p>
              <div className="bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 text-left max-w-md mx-auto space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Order/Ticket ID:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">{submissionResult.quoteId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Experience:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.experienceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Primary Selection:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.primaryDish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Flavor / Heat:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.boilFlavor} ({formData.heatLevel})</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-md cursor-pointer"
              >
                Close & Return to Menu
              </button>
            </div>
          ) : (
            /* Wizard Steps */
            <div>
              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/80 text-red-600 dark:text-red-400 text-sm flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: Experience Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    How would you like to enjoy your seafood today?
                  </h3>
                  <div className="grid grid-cols-1 gap-3.5">
                    {SEAFOOD_EXPERIENCES.map(exp => (
                      <div
                        key={exp.id}
                        onClick={() => setFormData(p => ({ ...p, experienceType: exp.title }))}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          formData.experienceType === exp.title
                            ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base sm:text-lg">{exp.title}</h4>
                          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-0.5">{exp.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.experienceType === exp.title ? 'border-red-600 bg-red-600 text-white' : 'border-neutral-400'
                        }`}>
                          {formData.experienceType === exp.title && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Seafood Dish, Flavor & Heat */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      Primary Seafood Selection
                    </label>
                    <select
                      value={formData.primaryDish}
                      onChange={(e) => setFormData(p => ({ ...p, primaryDish: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium text-sm focus:border-red-500 focus:outline-none cursor-pointer"
                    >
                      {SIGNATURE_DISHES.map(dish => (
                        <option key={dish} value={dish}>{dish}</option>
                      ))}
                    </select>
                  </div>

                  {/* Flavor Selection */}
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      Boil Sauce / Flavor
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BOIL_FLAVORS.map(flavor => (
                        <div
                          key={flavor.id}
                          onClick={() => setFormData(p => ({ ...p, boilFlavor: flavor.title }))}
                          className={`p-3 rounded-xl border-2 transition cursor-pointer ${
                            formData.boilFlavor === flavor.title
                              ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                              : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                        >
                          <span className="block font-bold text-sm text-neutral-900 dark:text-white">{flavor.title}</span>
                          <span className="block text-xs text-neutral-500 dark:text-neutral-400">{flavor.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Heat Level */}
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      Spice / Heat Level
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {HEAT_LEVELS.map(heat => (
                        <button
                          key={heat.id}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, heatLevel: heat.label }))}
                          className={`p-2.5 rounded-xl border-2 text-center transition cursor-pointer ${
                            formData.heatLevel === heat.label
                              ? 'border-red-600 bg-red-600 text-white font-bold'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <span className="block font-bold text-sm">{heat.label}</span>
                          <span className="block text-[10px] opacity-80">{heat.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Party Size & Date */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      Party Size / Servings
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {PARTY_SIZES.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, partySize: size }))}
                          className={`p-3 rounded-xl border-2 text-sm font-bold transition cursor-pointer ${
                            formData.partySize === size
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      When would you like your feast?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {['Today / As soon as possible', 'Specific date & time'].map(timeOption => (
                        <button
                          key={timeOption}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, timeline: timeOption }))}
                          className={`p-3 rounded-xl border-2 text-sm font-bold transition cursor-pointer ${
                            formData.timeline === timeOption
                              ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                              : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {timeOption}
                        </button>
                      ))}
                    </div>
                    {formData.timeline === 'Specific date & time' && (
                      <input
                        type="datetime-local"
                        value={formData.specificDate}
                        onChange={(e) => setFormData(p => ({ ...p, specificDate: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium text-sm focus:border-red-500 focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Add-ons */}
                  <div>
                    <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">
                      Popular Boil Add-Ons
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Extra Corn & Potatoes',
                        'Smoked Andouille Sausage Link',
                        'Extra Garlic Butter Cup',
                        'Steamed Jasmine Rice',
                        'French Bread Baguette',
                        'Boudin Balls (3 pcs)'
                      ].map(addon => {
                        const active = formData.addOns.includes(addon);
                        return (
                          <button
                            key={addon}
                            type="button"
                            onClick={() => toggleAddOn(addon)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                              active
                                ? 'bg-red-600 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                            }`}
                          >
                            {active ? '✓ ' : '+ '} {addon}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Contact & Final Review */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Where should we send your booking/order confirmation?
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        required
                        placeholder="Captain Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-medium focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="tel"
                        required
                        placeholder="(361) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-medium focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address (optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-medium focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Special Requests / Seating Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Booth requested, extra lemons, celebrating birthday"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData(p => ({ ...p, specialNotes: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-medium focus:border-red-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center space-x-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition flex items-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-sm transition flex items-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4" />
                        <span>Confirming Feast...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4 text-amber-300" />
                        <span>Confirm Boil Feast</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
