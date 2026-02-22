// ============================================
// TRADE JOURNAL PAGE
// ============================================

import { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, TrendingDown, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTrades, addTrade, deleteTrade, type Trade } from '@/services/storage';
import { useToast } from '@/hooks/useToast';

function JournalPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { showToast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    pair: 'XAU/USD',
    direction: 'BUY' as 'BUY' | 'SELL',
    entry: '',
    exit: '',
    lot: '',
    result: 'WIN' as 'WIN' | 'LOSS' | 'BE',
    pnl: '',
    strategy: '',
    notes: '',
  });

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const handleAddTrade = () => {
    if (!formData.entry || !formData.lot || !formData.pnl) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newTrade: Trade = {
      id: Date.now().toString(),
      date: selectedDate || new Date().toISOString().split('T')[0],
      pair: formData.pair,
      direction: formData.direction,
      entry: parseFloat(formData.entry),
      exit: formData.exit ? parseFloat(formData.exit) : undefined,
      lot: parseFloat(formData.lot),
      result: formData.result,
      pnl: parseFloat(formData.pnl),
      strategy: formData.strategy,
      notes: formData.notes,
    };

    addTrade(newTrade);
    setTrades(getTrades());
    setShowModal(false);
    showToast('Trade added successfully!');
    
    // Reset form
    setFormData({
      pair: 'XAU/USD',
      direction: 'BUY',
      entry: '',
      exit: '',
      lot: '',
      result: 'WIN',
      pnl: '',
      strategy: '',
      notes: '',
    });
  };

  const handleDeleteTrade = (id: string) => {
    deleteTrade(id);
    setTrades(getTrades());
    showToast('Trade deleted');
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTradesForDate = (dateStr: string) => {
    return trades.filter(t => t.date === dateStr);
  };

  const getDailyPnl = (dateStr: string) => {
    const dayTrades = getTradesForDate(dateStr);
    return dayTrades.reduce((sum, t) => sum + t.pnl, 0);
  };

  // Stats
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winningTrades = trades.filter(t => t.pnl > 0).length;
  const losingTrades = trades.filter(t => t.pnl < 0).length;
  const totalTrades = trades.length;
  const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="page-content">
      {/* Page Hero */}
      <div 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,229,160,0.07), transparent)',
          borderBottom: '1px solid var(--green-border)'
        }}
      >
        <div className="grid-bg opacity-40" />
        <div className="container relative z-10">
          <div className="section-eyebrow">
            <BookOpen className="w-4 h-4" />
            Trade Journal
          </div>
          <h1 className="section-title">
            Your Trading <span className="text-green">Journal</span>
          </h1>
          <div className="accent-line">
            <div className="al-diamond" />
          </div>
          <p className="text-white/60 max-w-xl">
            Track every trade with a built-in calendar view showing daily P&L. 
            Analyze your edge and improve your results.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="card">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  Your Stats
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Total P&L</span>
                    <span className={`text-sm font-mono font-bold ${totalPnl >= 0 ? 'text-green' : 'text-red'}`}>
                      {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Win Rate</span>
                    <span className="text-sm font-mono text-gold">{winRate}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Total Trades</span>
                    <span className="text-sm font-mono text-white/70">{totalTrades}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-white/50">Wins / Losses</span>
                    <span className="text-sm font-mono text-white/70">
                      <span className="text-green">{winningTrades}</span> / <span className="text-red">{losingTrades}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-1 rounded hover:bg-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </div>
                  <button 
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-1 rounded hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/40 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                    const day = i + 1;
                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayTrades = getTradesForDate(dateStr);
                    const pnl = getDailyPnl(dateStr);
                    const isToday = new Date().toISOString().split('T')[0] === dateStr;
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${
                          isSelected 
                            ? 'bg-blue/20 border border-blue' 
                            : isToday 
                              ? 'bg-gold text-black font-bold' 
                              : dayTrades.length > 0
                                ? pnl >= 0 
                                  ? 'bg-green/10 border border-green/30 text-green' 
                                  : 'bg-red/10 border border-red/30 text-red'
                                : 'hover:bg-white/5'
                        }`}
                      >
                        <span>{day}</span>
                        {dayTrades.length > 0 && (
                          <span className="text-[8px] mt-0.5">
                            {pnl >= 0 ? '+' : ''}{pnl.toFixed(0)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Trade Button */}
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full btn btn-green btn-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Trade
              </Button>
            </div>

            {/* Trades List */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {selectedDate ? `Trades for ${selectedDate}` : 'All Trades'}
                </h2>
                {selectedDate && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedDate(null)}
                  >
                    View All
                  </Button>
                )}
              </div>

              {trades.length === 0 ? (
                <div className="card text-center py-16">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-white/20" />
                  <div className="font-bebas text-xl tracking-wider mb-2">No Trades Yet</div>
                  <p className="text-sm text-white/50 mb-4">
                    Start tracking your trades to analyze your performance.
                  </p>
                  <Button onClick={() => setShowModal(true)} className="btn btn-green">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Trade
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(selectedDate ? getTradesForDate(selectedDate) : trades).map((trade) => (
                    <div key={trade.id} className="card">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold">{trade.pair}</span>
                          <Badge 
                            variant={trade.direction === 'BUY' ? 'default' : 'destructive'}
                            className={trade.direction === 'BUY' ? 'bg-green/20 text-green border-green/30' : 'bg-red/20 text-red border-red/30'}
                          >
                            {trade.direction === 'BUY' ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {trade.direction}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-white/50">{trade.date}</span>
                          <Badge 
                            variant="outline"
                            className={
                              trade.result === 'WIN' ? 'border-green text-green' :
                              trade.result === 'LOSS' ? 'border-red text-red' :
                              'border-white/30 text-white/50'
                            }
                          >
                            {trade.result}
                          </Badge>
                          <button
                            onClick={() => handleDeleteTrade(trade.id)}
                            className="p-1 rounded hover:bg-red/20 text-red/50 hover:text-red transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Entry</div>
                          <div className="font-mono font-bold text-white">{trade.entry.toFixed(2)}</div>
                        </div>
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Exit</div>
                          <div className="font-mono font-bold text-white">{trade.exit?.toFixed(2) || '--'}</div>
                        </div>
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Lot Size</div>
                          <div className="font-mono font-bold text-white">{trade.lot.toFixed(2)}</div>
                        </div>
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">P&L</div>
                          <div className={`font-mono font-bold ${trade.pnl >= 0 ? 'text-green' : 'text-red'}`}>
                            {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {trade.strategy && (
                        <div className="text-xs text-white/40 mb-2">
                          Strategy: <span className="text-white/60">{trade.strategy}</span>
                        </div>
                      )}
                      {trade.notes && (
                        <div className="text-xs text-white/40 italic">{trade.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Add Trade Modal */}
      {showModal && (
        <div className="modal-overlay open" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-xl font-bold">Add New Trade</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Pair</label>
                  <select 
                    className="form-select"
                    value={formData.pair}
                    onChange={e => setFormData({ ...formData, pair: e.target.value })}
                  >
                    <option value="XAU/USD">XAU/USD</option>
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Direction</label>
                  <select 
                    className="form-select"
                    value={formData.direction}
                    onChange={e => setFormData({ ...formData, direction: e.target.value as 'BUY' | 'SELL' })}
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Entry Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="2345.50"
                    value={formData.entry}
                    onChange={e => setFormData({ ...formData, entry: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Exit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="2350.00"
                    value={formData.exit}
                    onChange={e => setFormData({ ...formData, exit: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Lot Size *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="0.10"
                    value={formData.lot}
                    onChange={e => setFormData({ ...formData, lot: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Result</label>
                  <select 
                    className="form-select"
                    value={formData.result}
                    onChange={e => setFormData({ ...formData, result: e.target.value as 'WIN' | 'LOSS' | 'BE' })}
                  >
                    <option value="WIN">WIN</option>
                    <option value="LOSS">LOSS</option>
                    <option value="BE">BREAK EVEN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">P&L ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="150.00"
                  value={formData.pnl}
                  onChange={e => setFormData({ ...formData, pnl: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Strategy</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Support Bounce, Breakout"
                  value={formData.strategy}
                  onChange={e => setFormData({ ...formData, strategy: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Any additional notes about this trade..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <Button onClick={handleAddTrade} className="w-full btn btn-green btn-lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Trade
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JournalPage;
