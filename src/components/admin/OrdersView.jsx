import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, Plus, Clock, CheckCircle2, 
  Send, AlertCircle, Phone, Mail, ArrowUpRight, 
  Filter, ChevronRight, Loader2, Flame, UtensilsCrossed, Sparkles
} from '../common/Icons';
import { quotesApi } from '../../services/api';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';

export default function OrdersView() {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ status: statusFilter, search: searchTerm }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Error fetching orders (checking fallback):', err);
      try {
        const local = JSON.parse(localStorage.getItem('biz_quotes') || '[]');
        setQuotes(local);
        setStats({
          total: local.length,
          pending: local.filter(q => q.status === 'pending' || !q.status).length,
          quoted: local.filter(q => q.status === 'quoted').length,
          completed: local.filter(q => q.status === 'completed').length
        });
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleQuoteUpdated = (updatedQuote) => {
    if (updatedQuote._deleted) {
      setQuotes(prev => prev.filter(q => q.id !== updatedQuote.id));
    } else {
      setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    }
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const handleNewOrderCreated = (newQuote) => {
    setQuotes(prev => [newQuote, ...prev]);
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const filteredQuotes = quotes.filter(q => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (q.name && q.name.toLowerCase().includes(term)) ||
      (q.email && q.email.toLowerCase().includes(term)) ||
      (q.phone && q.phone.includes(term)) ||
      (q.make && q.make.toLowerCase().includes(term)) ||
      (q.detailedService && q.detailedService.toLowerCase().includes(term)) ||
      (q.id && q.id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 pb-16">
      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Quotes */}
        <div className="bg-[#0f1015] border border-white/10 rounded-2xl p-5 shadow-md hover:border-cajun-500/30 transition">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cajun-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white">{stats.total}</div>
          <span className="text-[11px] text-neutral-400 mt-1 block">All incoming boil & table orders</span>
        </div>

        {/* Pending Awaiting Review */}
        <div className="bg-[#0f1015] border border-amber-500/30 rounded-2xl p-5 shadow-md hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Awaiting Review</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-400">{stats.pending}</div>
          <span className="text-[11px] text-amber-400/80 mt-1 block font-medium">Needs kitchen confirmation</span>
        </div>

        {/* Quoted */}
        <div className="bg-[#0f1015] border border-sky-500/30 rounded-2xl p-5 shadow-md hover:border-sky-500/50 transition">
          <div className="flex items-center justify-between text-sky-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Quotes Sent</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-sky-400">{stats.quoted}</div>
          <span className="text-[11px] text-sky-400/80 mt-1 block font-medium">Catering pricing emailed</span>
        </div>

        {/* Completed */}
        <div className="bg-[#0f1015] border border-emerald-500/30 rounded-2xl p-5 shadow-md hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Fulfilled & Served</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-400">{stats.completed}</div>
          <span className="text-[11px] text-emerald-400/80 mt-1 block font-medium">Seafood prepared & enjoyed</span>
        </div>
      </div>

      {/* Control Bar: Search, Filter Tabs, Action CTAs */}
      <div className="bg-[#0f1015] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest, seafood item, sauce, or #ID..."
              className="w-full bg-[#14141b] border border-white/10 focus:border-cajun-500 focus:bg-[#181922] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
            />
          </form>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setIsLoading(true); loadData(); }}
              className="p-2.5 rounded-xl bg-[#14141b] hover:bg-[#1a1b24] border border-white/10 text-neutral-300 hover:text-white transition cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cajun-500' : ''}`} />
            </button>

            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="py-2.5 px-4 bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-cajun-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-cajun-500/25 flex items-center space-x-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Record Order / Reservation</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Orders', count: stats.total },
            { id: 'pending', label: '⏳ Needs Review', count: stats.pending },
            { id: 'quoted', label: '📧 Quoted', count: stats.quoted },
            { id: 'completed', label: '✅ Fulfilled', count: stats.completed },
            { id: 'archived', label: '📦 Archived' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1.5 cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-cajun-500 text-white shadow-md shadow-cajun-500/30'
                  : 'bg-[#14141b] hover:bg-[#1a1b24] text-neutral-400 hover:text-neutral-200 border border-white/5'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  statusFilter === tab.id ? 'bg-white/25 text-white' : 'bg-white/10 text-neutral-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#0f1015] border border-white/10 rounded-2xl text-neutral-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-cajun-500" />
          <span className="text-sm font-medium">Retrieving seafood orders from database...</span>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#0f1015] border border-white/10 rounded-2xl text-neutral-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cajun-400 mx-auto">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Order Requests Found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {searchTerm ? 'No results matched your search query.' : 'When guests submit boil orders or party reservations, they will appear here in real-time.'}
          </p>
          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-cajun-400 hover:text-cajun-300 pt-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create a manual ticket entry</span>
          </button>
        </div>
      ) : (
        <div className="bg-[#0f1015] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-[#14141b] text-neutral-400 uppercase tracking-wider font-bold border-b border-white/10 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Ticket ID / Date</th>
                  <th className="py-3.5 px-4">Guest</th>
                  <th className="py-3.5 px-4">Seafood Selection</th>
                  <th className="py-3.5 px-4">Sauce & Heat</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Est. Total ($)</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQuotes.map((q) => {
                  const status = q.status || 'pending';
                  return (
                    <tr 
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className="hover:bg-white/5 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-cajun-400 text-xs block">#{q.id}</span>
                        <span className="text-[11px] text-neutral-500">
                          {new Date(q.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{q.name}</div>
                        <div className="flex items-center space-x-2 text-[11px] text-neutral-400 mt-0.5">
                          {q.phone && <span>{q.phone}</span>}
                          {q.phone && q.email && <span>•</span>}
                          <span className="truncate max-w-[140px]">{q.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-200">{q.make || 'Cajun Feast'}</div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-[160px]">{q.modelAndYear || 'Crawfish & Crab Boil'}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-neutral-200 font-medium">{q.detailedService || q.serviceCategory || 'Garlic Butter Cajun Special'}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] bg-cajun-500/10 text-cajun-400 px-2 py-0.5 rounded border border-cajun-500/20 font-bold">
                            Boil Prep
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          status === 'quoted' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                          status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-white/10 text-neutral-400 border-white/10'
                        }`}>
                          {status === 'pending' ? '⏳ Pending' :
                           status === 'quoted' ? '📧 Quoted' :
                           status === 'completed' ? '✅ Fulfilled' : '📦 Archived'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-sm">
                        {q.quotedPrice ? (
                          <span className="text-emerald-400">${q.quotedPrice}</span>
                        ) : (
                          <span className="text-neutral-600">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuote(q);
                          }}
                          className="py-1.5 px-3.5 rounded-xl bg-white/5 hover:bg-cajun-500/20 hover:text-cajun-300 hover:border-cajun-500/30 border border-white/10 text-xs font-bold transition text-neutral-300 cursor-pointer"
                        >
                          {status === 'pending' ? 'Review & Quote' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="block md:hidden divide-y divide-white/5">
            {filteredQuotes.map((q) => {
              const status = q.status || 'pending';
              return (
                <div 
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className="p-4 active:bg-white/5 transition cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-cajun-400 text-xs">#{q.id}</span>
                      <h4 className="font-bold text-white text-base mt-0.5">{q.name}</h4>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      status === 'quoted' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                      status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-white/10 text-neutral-400 border-white/10'
                    }`}>
                      {status === 'pending' ? 'Pending' : status === 'quoted' ? 'Quoted' : status}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-300">
                    <strong className="text-white">{q.make || 'Cajun Seafood'}</strong> • {q.modelAndYear || 'Crawfish & Crab'}
                  </div>

                  <div className="text-xs text-neutral-400 flex items-center justify-between pt-1">
                    <span>{q.detailedService || q.serviceCategory || 'Garlic Butter Special'}</span>
                    {q.quotedPrice ? (
                      <span className="font-mono font-bold text-emerald-400">${q.quotedPrice}</span>
                    ) : (
                      <span className="text-neutral-500">Not quoted yet</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onUpdate={handleQuoteUpdated}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={handleNewOrderCreated}
      />
    </div>
  );
}
