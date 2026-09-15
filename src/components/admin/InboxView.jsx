import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Send, Phone, Mail, Clock, CheckCircle2, 
  DollarSign, ArrowUpRight, Loader2, MessageSquare, 
  AlertCircle, User, ShieldCheck, ChevronRight, Flame, UtensilsCrossed
} from '../common/Icons';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function InboxView({ onOpenFullQuote }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Reply Composer State
  const [replyText, setReplyText] = useState('');
  const [attachPrice, setAttachPrice] = useState(false);
  const [quotePrice, setQuotePrice] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadThreads();
    const interval = setInterval(loadThreads, 10000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadThreads = async () => {
    try {
      const res = await quotesApi.getInbox({ status: statusFilter, search: searchTerm });
      const threadList = res.threads || [];
      setThreads(threadList);

      // Default select first thread if none selected
      if (!selectedThread && threadList.length > 0) {
        selectThread(threadList[0]);
      } else if (selectedThread) {
        const updated = threadList.find(t => t.id === selectedThread.id);
        if (updated) setSelectedThread(updated);
      }
    } catch (err) {
      console.warn('Error loading inbox threads:', err);
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const selectThread = async (thread) => {
    setSelectedThread(thread);
    setIsLoadingMessages(true);
    setSendError('');
    try {
      const res = await quotesApi.getMessages(thread.id);
      setMessages(res.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error('Error loading messages for thread:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSendReply = async (e) => {
    e?.preventDefault();
    if (!replyText.trim() && !quotePrice.trim()) return;

    setIsSending(true);
    setSendError('');

    try {
      const res = await quotesApi.sendMessage(selectedThread.id, {
        message: replyText.trim(),
        quotePrice: attachPrice && quotePrice ? quotePrice.trim() : null
      });

      if (res.message) {
        setMessages(prev => [...prev, res.message]);
        setReplyText('');
        if (attachPrice) {
          setQuotePrice('');
          setAttachPrice(false);
        }
        scrollToBottom();
        loadThreads();
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedThread) return;
    try {
      await quotesApi.updateStatus(selectedThread.id, newStatus);
      setSelectedThread(prev => ({ ...prev, status: newStatus }));
      setThreads(prev => prev.map(t => t.id === selectedThread.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const filteredThreads = threads.filter(t => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      t.name?.toLowerCase().includes(s) ||
      t.email?.toLowerCase().includes(s) ||
      t.make?.toLowerCase().includes(s) ||
      t.detailedService?.toLowerCase().includes(s) ||
      t.id?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="bg-[#0f1015] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[80vh] min-h-[580px]">
      {/* ------------------------------------------------------------- */}
      {/* LEFT PANE: CONVERSATION LIST                                  */}
      {/* ------------------------------------------------------------- */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col bg-[#0b0c10] ${selectedThread ? 'hidden md:flex' : 'flex'}`}>
        {/* Search & Header */}
        <div className="p-4 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-cajun-400" />
              <h2 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                Guest Messages
              </h2>
            </div>
            <span className="text-[11px] font-bold text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              {threads.length} tickets
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest or seafood..."
              className="w-full bg-[#14141b] border border-white/10 focus:border-cajun-500 focus:bg-[#181922] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 outline-none transition"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px]">
            {['all', 'pending', 'quoted', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded-lg font-bold transition capitalize cursor-pointer ${
                  statusFilter === f
                    ? 'bg-cajun-500 text-white shadow-xs shadow-cajun-500/30'
                    : 'bg-[#14141b] text-neutral-400 hover:text-neutral-200 hover:bg-[#1a1b24] border border-white/5'
                }`}
              >
                {f === 'pending' ? 'Review' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {isLoadingThreads ? (
            <div className="p-8 text-center text-neutral-500 text-xs flex flex-col items-center space-y-2">
              <Loader2 className="w-5 h-5 animate-spin text-cajun-500" />
              <span>Loading messages...</span>
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-xs">
              No orders found in inbox.
            </div>
          ) : (
            filteredThreads.map(thread => {
              const isSelected = selectedThread?.id === thread.id;
              const status = thread.status || 'pending';
              const initials = (thread.name || 'G')
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={thread.id}
                  onClick={() => selectThread(thread)}
                  className={`p-3.5 cursor-pointer transition flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-cajun-500/10 border-l-4 border-l-cajun-500'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Initials Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-cajun-500 text-white shadow-sm shadow-cajun-500/30'
                      : 'bg-white/5 text-neutral-300 border border-white/10'
                  }`}>
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                        {thread.name}
                      </h4>
                      <span className="text-[10px] text-neutral-500 shrink-0 ml-1">
                        {new Date(thread.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="text-[11px] text-cajun-400 font-medium truncate mt-0.5">
                      {thread.make || 'Cajun Boil'}
                    </div>

                    <p className="text-[11px] text-neutral-400 truncate mt-1">
                      {thread.lastMessage ? thread.lastMessage.preview : (thread.detailedService || thread.serviceCategory || 'Party booking details')}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        status === 'quoted' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                        status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-white/10 text-neutral-400 border-white/10'
                      }`}>
                        {status === 'pending' ? 'Review' : status === 'quoted' ? 'Quoted' : status}
                      </span>

                      {thread.quotedPrice && (
                        <span className="font-mono text-[11px] font-bold text-emerald-400">
                          ${thread.quotedPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT PANE: ACTIVE THREAD & COMPOSER                          */}
      {/* ------------------------------------------------------------- */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col bg-[#070709]">
          {/* Thread Header */}
          <div className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#0f1015]">
            {/* Back button for mobile */}
            <button
              onClick={() => setSelectedThread(null)}
              className="md:hidden text-xs text-neutral-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              <span>← Back</span>
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-black text-base sm:text-lg text-white">
                  {selectedThread.name}
                </h3>
                <span className="font-mono text-xs font-bold text-cajun-400 bg-cajun-500/10 px-2 py-0.5 rounded-md border border-cajun-500/20">
                  #{selectedThread.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mt-1">
                <span className="font-medium text-neutral-300">{selectedThread.make || 'Cajun Seafood Boil'}</span>
                <span>•</span>
                <a href={`tel:${selectedThread.phone?.replace(/[^0-9]/g, '')}`} className="text-cajun-400 hover:underline flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{selectedThread.phone || 'No phone'}</span>
                </a>
                <span>•</span>
                <span className="truncate max-w-[180px]">{selectedThread.email}</span>
              </div>
            </div>

            {/* Status Control */}
            <div className="flex items-center space-x-2">
              <select
                value={selectedThread.status || 'pending'}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-[#14141b] border border-white/10 text-xs font-bold rounded-xl px-3 py-2 text-white outline-none cursor-pointer hover:border-cajun-500/40 transition"
              >
                <option value="pending">⏳ Pending Review</option>
                <option value="in_review">🔍 In Prep</option>
                <option value="quoted">📧 Quoted</option>
                <option value="completed">✅ Fulfilled</option>
                <option value="archived">📦 Archived</option>
              </select>

              {onOpenFullQuote && (
                <button
                  onClick={() => onOpenFullQuote(selectedThread)}
                  className="py-2 px-3.5 rounded-xl bg-cajun-500 hover:bg-cajun-600 text-white font-bold text-xs transition shadow-sm shadow-cajun-500/20 cursor-pointer"
                >
                  Order Studio
                </button>
              )}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Customer Inquiry Summary Banner Card */}
            <div className="p-4 rounded-2xl bg-[#0f1015] border border-white/10 text-xs text-neutral-300 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between font-bold text-white border-b border-white/10 pb-2">
                <div className="flex items-center space-x-2">
                  <UtensilsCrossed className="w-4 h-4 text-cajun-400" />
                  <span>Guest Order & Reservation Details</span>
                </div>
                <span className="text-[11px] text-neutral-500 font-normal">
                  {new Date(selectedThread.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Selection</span>
                  <span className="text-white font-medium">{selectedThread.detailedService || selectedThread.serviceCategory || 'Louisiana Boil'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Dining Time</span>
                  <span className="text-white font-medium">{selectedThread.timeline || 'Tonight'} {selectedThread.specificDate ? `(${selectedThread.specificDate})` : ''}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Party / Pick-up</span>
                  <span className="text-white font-medium">{selectedThread.location || 'Corpus Christi Dine-In / Takeout'}</span>
                </div>
              </div>
            </div>

            {/* Conversation Messages */}
            {isLoadingMessages ? (
              <div className="py-8 text-center text-xs text-neutral-500 flex flex-col items-center space-y-2">
                <Loader2 className="w-5 h-5 animate-spin text-cajun-500" />
                <span>Loading messages...</span>
              </div>
            ) : (
              messages.map(msg => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 px-1 text-[11px] text-neutral-400">
                      <span className="font-bold text-neutral-200">{isAdmin ? (msg.senderName || BUSINESS_INFO.owner?.name || BUSINESS_INFO.name) : selectedThread.name}</span>
                      <span>•</span>
                      <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isAdmin
                        ? 'bg-gradient-to-r from-cajun-600 to-cajun-700 text-white rounded-tr-xs shadow-md shadow-cajun-500/20'
                        : 'bg-[#0f1015] border border-white/10 text-neutral-200 rounded-tl-xs shadow-md'
                    }`}>
                      {msg.isQuote && (
                        <div className={`inline-flex items-center space-x-1.5 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 ${
                          isAdmin ? 'bg-black/20 text-white' : 'bg-cajun-500/20 text-cajun-300 border border-cajun-500/30'
                        }`}>
                          <DollarSign className="w-3 h-3" />
                          <span>Official Estimate Attached</span>
                        </div>
                      )}
                      <p>{msg.message}</p>
                    </div>

                    <span className="text-[10px] text-neutral-500 px-1 mt-1">
                      {isAdmin ? `Delivered via Email to ${selectedThread.email}` : 'Received via Website'}
                    </span>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Reply Composer Bar */}
          <div className="p-4 border-t border-white/10 bg-[#0f1015] space-y-3">
            {sendError && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{sendError}</span>
              </div>
            )}

            {/* Quick Price Quote Tool Toggle */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer text-neutral-400 hover:text-neutral-200 transition">
                <input
                  type="checkbox"
                  checked={attachPrice}
                  onChange={(e) => setAttachPrice(e.target.checked)}
                  className="rounded bg-[#14141b] border-white/20 text-cajun-500 focus:ring-cajun-500"
                />
                <span className="font-bold flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Attach Estimate / Total ($)</span>
                </span>
              </label>

              {attachPrice && (
                <div className="flex items-center space-x-1.5">
                  <span className="text-neutral-400 font-bold">$</span>
                  <input
                    type="text"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="e.g. 85.00"
                    className="w-24 bg-[#14141b] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono font-bold outline-none focus:border-cajun-500"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Composer Input Form */}
            <form onSubmit={handleSendReply} className="flex items-end space-x-2">
              <textarea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSendReply(e);
                  }
                }}
                placeholder={`Reply to ${selectedThread.name}... (Press Ctrl+Enter to send)`}
                className="flex-1 bg-[#14141b] border border-white/10 focus:border-cajun-500 focus:bg-[#181922] rounded-2xl p-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none resize-none leading-relaxed transition"
              />

              <button
                type="submit"
                disabled={isSending || (!replyText.trim() && !quotePrice.trim())}
                className="py-3 px-5 bg-gradient-to-r from-cajun-500 to-cajun-600 hover:from-cajun-600 hover:to-cajun-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-lg shadow-cajun-500/25 flex items-center space-x-2 shrink-0 active:scale-95 cursor-pointer"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
              <span>Guest receives notification directly via email / text.</span>
              <span className="hidden sm:inline font-mono">Ctrl + Enter to send</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-neutral-500 space-y-2 bg-[#070709]">
          <MessageSquare className="w-10 h-10 text-white/10" />
          <h4 className="text-sm font-bold text-neutral-300">No Ticket Selected</h4>
          <p className="text-xs max-w-xs text-center text-neutral-500">
            Pick a guest inquiry from the list on the left to review boil selections and reply directly.
          </p>
        </div>
      )}
    </div>
  );
}
