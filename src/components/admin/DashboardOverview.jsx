import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Plus, Clock, CheckCircle2, 
  Send, Calendar, Play, Pause, RotateCcw, 
  ChevronRight, Phone, Mail, User, Flame, UtensilsCrossed, Sparkles
} from '../common/Icons';
import { quotesApi } from '../../services/api';

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Kitchen Live Boil & Prep Timer
  const [timerSeconds, setTimerSeconds] = useState(1320); // 22:00 boil time
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ limit: 10 }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Dashboard load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const urgentOrder = quotes.find(q => q.status === 'pending') || quotes[0];

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER: Title & Quick Actions                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cajun-500/10 text-cajun-400 border border-cajun-500/20">
              <Flame className="w-3 h-3 text-cajun-500" />
              <span>Live Kitchen & Bookings</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
            Captain's Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-0.5">
            Real-time seafood boil tickets, catering quotes, and table reservations.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenNewOrder}
            className="py-2.5 px-4 bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-cajun-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-cajun-500/25 flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Order / Table</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="py-2.5 px-4 bg-[#14141b] hover:bg-[#1a1b24] text-neutral-200 border border-white/10 font-bold text-xs sm:text-sm rounded-xl transition shadow-sm active:scale-95 cursor-pointer"
          >
            All Orders Table
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 STAT CARDS (Obsidian Dark Theme with Glowing Orange Ember) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Solid Hero Ember Card */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-gradient-to-br from-cajun-600 to-cajun-800 text-white rounded-3xl p-6 shadow-xl shadow-cajun-500/20 cursor-pointer transition hover:scale-[1.01] flex flex-col justify-between border border-cajun-400/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cajun-100">Total Boil Inquiries</span>
            <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading tracking-tight">{stats.total}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-cajun-100 bg-black/25 px-2.5 py-1 rounded-full w-max font-medium backdrop-blur-xs">
            <span>↑ 28%</span>
            <span>growth this month</span>
          </div>
        </div>

        {/* Card 2: Completed / Served */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md hover:border-cajun-500/30 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Fulfilled & Served</span>
            <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
              <ArrowUpRight className="w-4 h-4 text-neutral-300" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-white">{stats.completed}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-max font-medium">
            <span>✓ 100%</span>
            <span>guest satisfaction</span>
          </div>
        </div>

        {/* Card 3: Quotes / Custom Boil Preps */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md hover:border-cajun-500/30 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Quotes In Flight</span>
            <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
              <ArrowUpRight className="w-4 h-4 text-neutral-300" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-white">{stats.quoted}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full w-max font-medium">
            <span>📧 In Discussion</span>
            <span>catering & party packages</span>
          </div>
        </div>

        {/* Card 4: Pending Kitchen Requests */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-[#0f1015] border border-cajun-500/30 rounded-3xl p-6 shadow-md hover:border-cajun-500/50 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cajun-400">Pending Review</span>
            <div className="w-8 h-8 rounded-full border border-cajun-500/20 bg-cajun-500/10 flex items-center justify-center hover:opacity-80 transition">
              <ArrowUpRight className="w-4 h-4 text-cajun-400" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-cajun-400">{stats.pending}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full w-max font-medium">
            <span>⏳ Needs Review</span>
            <span>awaiting kitchen approval</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECOND ROW: Weekly Analytics + Priority Boil Ticket + Quick List */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Boil Volume (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
              Weekly Boil & Dining Volume
            </h3>
            <span className="text-xs text-neutral-400 font-bold">This Week</span>
          </div>

          {/* Bar Chart Visual */}
          <div className="flex items-end justify-between gap-3 h-40 pt-4 px-2">
            {[
              { day: 'M', height: '45%', count: 18, solid: false },
              { day: 'T', height: '60%', count: 24, solid: true },
              { day: 'W', height: '75%', count: 35, solid: true, highlight: '+42%' },
              { day: 'T', height: '90%', count: 48, solid: true },
              { day: 'F', height: '100%', count: 62, solid: true },
              { day: 'S', height: '95%', count: 58, solid: true },
              { day: 'S', height: '70%', count: 32, solid: false }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {bar.highlight && (
                  <span className="absolute -top-7 text-[10px] font-bold text-cajun-300 bg-cajun-500/20 border border-cajun-500/40 px-1.5 py-0.5 rounded-full shadow-xs">
                    {bar.highlight}
                  </span>
                )}
                <div 
                  className={`w-full max-w-[36px] rounded-full transition-all duration-300 ${
                    bar.solid 
                      ? 'bg-gradient-to-t from-cajun-700 to-cajun-500 shadow-lg shadow-cajun-500/20' 
                      : 'bg-white/5 border border-white/10'
                  }`}
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] font-bold text-neutral-400 mt-2">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10 mt-2 text-xs">
            <span className="flex items-center space-x-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-cajun-500" />
              <span>Served Crawfish / Crab</span>
            </span>
            <span className="flex items-center space-x-2 text-neutral-500">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span>Reservations</span>
            </span>
          </div>
        </div>

        {/* Middle: Priority Ticket (3 Cols) */}
        <div className="lg:col-span-3 bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-cajun-400 uppercase tracking-wider mb-3">
              <span>Priority Ticket</span>
              <span className="w-2 h-2 rounded-full bg-cajun-500 animate-ping" />
            </div>

            {urgentOrder ? (
              <div className="space-y-2">
                <h4 className="text-base font-black font-heading text-white leading-tight">
                  {urgentOrder.make || urgentOrder.name || 'Boil Feast Order'}
                </h4>
                <div className="text-xs text-cajun-400 font-bold">
                  {urgentOrder.detailedService || urgentOrder.serviceCategory || 'Louisiana Crawfish Boil'}
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {urgentOrder.details || urgentOrder.customIssue || 'Spicy garlic butter seasoning with corn & sausage.'}
                </p>
                <div className="text-[11px] text-neutral-400 flex items-center space-x-1 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Desired Time: {urgentOrder.timeline || 'ASAP / Tonight'}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-500 py-6">No pending tickets in queue.</div>
            )}
          </div>

          <button
            onClick={() => urgentOrder && onSelectQuote(urgentOrder)}
            className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-cajun-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-cajun-500/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Open Order Details</span>
          </button>
        </div>

        {/* Right: Quick Recent Orders List (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
              Recent Tickets
            </h3>
            <button
              onClick={onOpenNewOrder}
              className="text-xs font-bold text-cajun-400 hover:text-cajun-300 flex items-center space-x-1 bg-cajun-500/10 border border-cajun-500/20 px-2.5 py-1 rounded-lg transition"
            >
              <Plus className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>

          <div className="divide-y divide-white/5 flex-1">
            {quotes.slice(0, 4).map(q => (
              <div 
                key={q.id}
                onClick={() => onSelectQuote(q)}
                className="py-2.5 flex items-center justify-between hover:bg-white/5 rounded-xl px-2 -mx-2 transition cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-xs text-white truncate">
                    {q.name}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">
                    {q.detailedService || q.serviceCategory || 'Cajun Seafood Boil'}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                  q.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  q.status === 'quoted' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                  q.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  'bg-white/10 text-neutral-300'
                }`}>
                  {q.status || 'Pending'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="w-full text-center text-xs font-bold text-cajun-400 hover:text-cajun-300 pt-3 border-t border-white/10 mt-2 flex items-center justify-center space-x-1 transition cursor-pointer"
          >
            <span>View all {quotes.length} tickets & orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* THIRD ROW: Customer Inquiries + Quality Gauge + Live Boil Timer */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
              Guest Inquiries & Catering
            </h3>
            <button
              onClick={() => onNavigateTab('inbox')}
              className="text-xs font-bold text-neutral-300 hover:text-cajun-400 flex items-center space-x-1 border border-white/10 px-2.5 py-1 rounded-xl bg-white/5 transition"
            >
              <span>Open Inbox</span>
            </button>
          </div>

          <div className="space-y-3">
            {quotes.slice(0, 4).map(q => {
              const initials = (q.name || 'Guest').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div 
                  key={q.id}
                  onClick={() => onSelectQuote(q)}
                  className="p-3 bg-[#14141b] hover:bg-[#1a1b24] border border-white/5 rounded-2xl flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-cajun-500/20 border border-cajun-500/30 text-cajun-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-white truncate">{q.name}</h5>
                      <span className="text-[11px] text-neutral-400 truncate block">
                        {q.phone || q.email || 'Corpus Christi Guest'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    q.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    q.status === 'quoted' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {q.status === 'completed' ? 'Fulfilled' : q.status === 'quoted' ? 'Quoted' : 'Review'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle: Fresh Catch & Satisfaction Gauge (3 Cols) */}
        <div className="lg:col-span-3 bg-[#0f1015] border border-white/10 rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white mb-2">
            Freshness & Rating
          </h3>

          <div className="relative flex flex-col items-center justify-center py-2">
            {/* SVG Arc Gauge */}
            <svg className="w-36 h-20" viewBox="0 0 100 50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#262626"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 10 50 A 40 40 0 0 1 78 18"
                fill="none"
                stroke="#ea580c"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center -mt-6">
              <div className="text-3xl font-black font-heading text-white">4.8★</div>
              <span className="text-[11px] font-bold text-neutral-400">Yelp & Google Score</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-white/10">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-cajun-500" />
              <span>5-Star Praise</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span>Verified Local</span>
            </span>
          </div>
        </div>

        {/* Right: Live Kitchen Boil Timer (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0c0c14] to-[#14121a] text-white border border-cajun-500/30 rounded-3xl p-6 shadow-xl shadow-cajun-500/10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cajun-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider relative">
            <span className="text-cajun-300 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-cajun-400" />
              <span>Kitchen Boil Clock</span>
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">● ACTIVE</span>
          </div>

          <div className="my-4 text-center relative">
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-cajun-100">
              {formatTimer(timerSeconds)}
            </div>
            <span className="text-xs text-neutral-400 mt-1 block">Live Crawfish & Crab Pot Steeping Clock</span>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2 relative">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="w-10 h-10 rounded-2xl bg-cajun-500 text-white flex items-center justify-center hover:bg-cajun-600 transition active:scale-95 shadow-md shadow-cajun-500/30 cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setTimerSeconds(0)}
              className="w-10 h-10 rounded-2xl bg-white/10 text-neutral-300 hover:text-white flex items-center justify-center hover:bg-white/20 transition active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
