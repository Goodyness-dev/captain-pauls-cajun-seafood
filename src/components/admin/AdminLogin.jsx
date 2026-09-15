import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Flame, AlertCircle, ArrowLeft, Loader2, ShieldCheck } from '../common/Icons';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your admin password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(password);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Please check your password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Back to Site Button */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition px-3 py-1.5 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customer Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl relative z-10 card-thick">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-600 text-white mb-4 shadow-lg shadow-red-600/30">
            <Flame className="w-7 h-7 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
            Executive Portal & Boil Order Dispatch
          </p>
          <div className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full mt-3 text-[11px] text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
            <span className="font-semibold">Protected Management Suite</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Admin Access Key / Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition font-medium"
                required
                autoFocus
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Default demo key configured in environment.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            {BUSINESS_INFO.legalName} • 2743 Airline Rd, Corpus Christi
          </p>
        </div>
      </div>
    </div>
  );
}
