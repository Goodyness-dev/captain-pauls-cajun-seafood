import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, MessageSquare, 
  Settings, LogOut, ExternalLink, Search, 
  Bell, Mail, Menu, X, Plus, Calendar, ShieldCheck, Flame
} from '../common/Icons';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

function getInitials(name) {
  if (!name) return 'CP';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'inbox' | 'settings'
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Boils & Orders', icon: ClipboardList, badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Guest Messages', icon: MessageSquare, badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans flex antialiased">
      {/* Backdrop for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR (Dark Obsidian Palette) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c0c12] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Logo Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-cajun-600 to-cajun-500 text-white flex items-center justify-center shadow-lg shadow-cajun-500/30">
                <Flame className="w-5 h-5 text-amber-300" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-heading font-black text-sm tracking-tight text-white block leading-tight truncate" title={BUSINESS_INFO.name}>
                  Captain Paul's
                </span>
                <span className="text-[10px] text-cajun-400 font-extrabold uppercase tracking-widest block">
                  Kitchen Portal
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MENU Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-3 block">
              Operations
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cajun-500 to-cajun-600 text-white shadow-lg shadow-cajun-500/25'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-cajun-500/20 text-cajun-400 border border-cajun-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* GENERAL Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-3 block">
              Preferences
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-cajun-500 to-cajun-600 text-white shadow-lg shadow-cajun-500/25'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-neutral-400'}`} />
                <span>Settings & Alerts</span>
              </button>

              <button
                onClick={onBackToSite}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-neutral-300 hover:bg-white/5 hover:text-white transition cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-4 h-4 text-cajun-400" />
                  <span>View Customer Site</span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-red-400 hover:bg-red-500/10 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* BOTTOM USER PROFILE */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cajun-600/30 border border-cajun-500/50 flex items-center justify-center font-bold text-cajun-400 text-xs">
              {getInitials(user?.username || 'Paul')}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block truncate">
                {user?.username || 'Captain Paul'}
              </span>
              <span className="text-[10px] text-neutral-400 block truncate">
                Corpus Christi Kitchen
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP APP BAR */}
        <header className="h-16 border-b border-white/10 bg-[#0c0c12]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 text-white font-black text-xs flex items-center space-x-1.5 shadow-md shadow-cajun-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Record Walk-In Feast</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('inbox')}
              className="p-2 rounded-xl bg-obsidian-800 border border-white/10 text-neutral-300 hover:text-white relative cursor-pointer"
              title="Guest Inbox"
            >
              <Mail className="w-4 h-4" />
              {stats.pending > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cajun-500 text-white text-[10px] font-black flex items-center justify-center">
                  {stats.pending}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className="p-2 rounded-xl bg-obsidian-800 border border-white/10 text-neutral-300 hover:text-white relative cursor-pointer"
              title="Boil Orders"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cajun-500" />
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectQuote={(q) => setModalQuote(q)}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && <OrdersView />}

          {activeTab === 'inbox' && (
            <InboxView onOpenFullQuote={(q) => setModalQuote(q)} />
          )}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Quote Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdate={(updated) => setModalQuote(updated)}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={() => {
          quotesApi.getStats().then(setStats).catch(() => {});
        }}
      />
    </div>
  );
}
