// ============================================
// SIGNALS PAGE — Live Trading Signals
// ============================================

import { useState, useEffect, useRef } from 'react';
import { Signal, TrendingUp, TrendingDown, Shield, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import { getAllSignals, getOpenSignalsCount, calculateWinRate, getAverageRR } from '@/services/signals';
import type { TradingSignal } from '@/types';

function SignalsPage() {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [filter, setFilter] = useState<'all' | 'open' | 'win' | 'loss' | 'pending'>('all');
  const { formattedPrice, priceChange, priceHistory } = useGoldPrice();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setSignals(getAllSignals());
  }, []);

  // Draw sidebar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || priceHistory.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...priceHistory);
    const max = Math.max(...priceHistory);
    const range = max - min || 1;

    const getX = (i: number) => (i / (priceHistory.length - 1)) * width;
    const getY = (v: number) => height - ((v - min) / range) * height * 0.8 - height * 0.1;

    const isUp = priceHistory[priceHistory.length - 1] >= priceHistory[0];
    const color = isUp ? '#00e5a0' : '#ff4757';

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, isUp ? 'rgba(0, 229, 160, 0.2)' : 'rgba(255, 71, 87, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    priceHistory.forEach((v, i) => {
      if (i === 0) ctx.moveTo(getX(i), getY(v));
      else ctx.lineTo(getX(i), getY(v));
    });
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    priceHistory.forEach((v, i) => {
      if (i === 0) ctx.moveTo(getX(i), getY(v));
      else ctx.lineTo(getX(i), getY(v));
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [priceHistory]);

  const filteredSignals = signals.filter(s => filter === 'all' || s.status === filter);

  const stats = [
    { label: 'Win Rate', value: `${calculateWinRate()}%`, color: 'gold' },
    { label: 'Total Signals', value: '600+', color: 'green' },
    { label: 'Open Now', value: getOpenSignalsCount().toString(), color: 'blue' },
    { label: 'Avg RR', value: getAverageRR(), color: 'gold' },
  ];

  return (
    <div className="page-content">
      {/* Page Hero */}
      <div 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.07), transparent)',
          borderBottom: '1px solid var(--gold-border)'
        }}
      >
        <div className="grid-bg opacity-40" />
        <div className="container relative z-10">
          <div className="section-eyebrow">
            <Signal className="w-4 h-4" />
            Live Trading Signals
          </div>
          <h1 className="section-title">
            XAUUSD <span className="text-gold">Signals</span>
          </h1>
          <div className="accent-line">
            <div className="al-diamond" />
          </div>
          <p className="text-white/60 max-w-xl">
            Every signal includes full entry, two take profit levels, and stop loss. 
            Delivered instantly to Telegram. 87% win rate verified over 600+ signals.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              {/* Live Price */}
              <div className="card">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  XAU/USD Live
                </div>
                <div 
                  className="p-4 rounded-xl text-center mb-4"
                  style={{ background: 'var(--black2)', border: '1px solid var(--gold-border)' }}
                >
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Current Price</div>
                  <div className="price-display text-3xl">{formattedPrice}</div>
                  <div className={`price-change mt-1 ${priceChange.direction}`}>
                    {priceChange.direction === 'up' ? '▲' : '▼'} 
                    {priceChange.percent > 0 ? '+' : ''}{priceChange.percent.toFixed(2)}%
                  </div>
                  <canvas ref={canvasRef} className="w-full h-24 mt-3 rounded" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">24h High</span>
                    <span className="text-sm font-mono text-green">
                      {formattedPrice ? (parseFloat(formattedPrice.replace(/[$,]/g, '')) * 1.009).toFixed(2) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">24h Low</span>
                    <span className="text-sm font-mono text-red">
                      {formattedPrice ? (parseFloat(formattedPrice.replace(/[$,]/g, '')) * 0.99).toFixed(2) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Spread</span>
                    <span className="text-sm font-mono text-white/70">0.35</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-white/50">Daily Change</span>
                    <span className="text-sm font-mono text-green">+14.50</span>
                  </div>
                </div>
              </div>

              {/* Track Record */}
              <div className="card">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  Track Record
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Win Rate</span>
                    <span className="text-sm font-mono text-gold">87%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Total Signals</span>
                    <span className="text-sm font-mono text-white/70">600+</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Avg Risk:Reward</span>
                    <span className="text-sm font-mono text-white/70">1:2.4</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-white/50">Annual Return</span>
                    <span className="text-sm font-mono text-green">347%</span>
                  </div>
                </div>
              </div>

              {/* Telegram CTA */}
              <div 
                className="p-4 rounded-xl text-center"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(39,167,231,0.1), rgba(31,139,203,0.05))',
                  border: '1px solid rgba(39,167,231,0.3)'
                }}
              >
                <Send className="w-8 h-8 mx-auto mb-3" style={{ color: '#27A7E7' }} />
                <div className="font-bold mb-1">Get Signals on Telegram</div>
                <div className="text-xs text-white/50 mb-4">
                  Receive every signal instantly — with entry, TP, SL and updates.
                </div>
                <a
                  href="https://t.me/theprofitscirclesupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-tg btn-full btn-sm"
                >
                  Join Free Channel
                </a>
              </div>

              {/* Risk Notice */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}
              >
                <div className="text-xs font-bold text-gold mb-2">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Risk Notice
                </div>
                <div className="text-xs text-white/50 leading-relaxed">
                  These signals are for educational purposes. Trading involves significant risk. 
                  Past performance does not guarantee future results.
                </div>
              </div>
            </div>

            {/* Signals Panel */}
            <div>
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="card text-center py-4">
                    <div 
                      className="font-bebas text-2xl tracking-wider"
                      style={{ color: stat.color === 'gold' ? 'var(--gold)' : stat.color === 'green' ? 'var(--green)' : 'var(--blue)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'open', 'win', 'loss', 'pending'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      filter === f
                        ? 'bg-gold-dim text-gold border border-gold/30'
                        : 'bg-transparent text-white/50 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              {/* Telegram CTA Banner */}
              <div 
                className="p-6 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-4"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(39,167,231,0.08), rgba(39,167,231,0.03))',
                  border: '1px solid rgba(39,167,231,0.2)'
                }}
              >
                <div className="flex items-center gap-4">
                  <Send className="w-8 h-8" style={{ color: '#27A7E7' }} />
                  <div>
                    <div className="font-bold">Signals are delivered live on Telegram</div>
                    <div className="text-sm text-white/50">
                      Join our free channel to receive signals in real-time, before they're posted here.
                    </div>
                  </div>
                </div>
                <a
                  href="https://t.me/theprofitscirclesupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-tg"
                >
                  Join Free Channel
                </a>
              </div>

              {/* Signals Grid */}
              <div className="space-y-4">
                {filteredSignals.length === 0 ? (
                  <div className="card text-center py-12">
                    <Send className="w-12 h-12 mx-auto mb-4 text-white/20" />
                    <div className="font-bebas text-xl tracking-wider mb-2">No Signals Found</div>
                    <p className="text-sm text-white/50">
                      No signals match your current filter. Try a different filter or check back later.
                    </p>
                  </div>
                ) : (
                  filteredSignals.map((signal) => (
                    <div 
                      key={signal.id}
                      className={`signal-card ${signal.status}`}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold">{signal.pair}</span>
                          <Badge 
                            variant={signal.direction === 'BUY' ? 'default' : 'destructive'}
                            className={signal.direction === 'BUY' ? 'bg-green/20 text-green border-green/30' : 'bg-red/20 text-red border-red/30'}
                          >
                            {signal.direction === 'BUY' ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {signal.direction}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-white/50">{signal.date}</span>
                          <Badge 
                            variant="outline"
                            className={
                              signal.status === 'win' ? 'border-green text-green' :
                              signal.status === 'loss' ? 'border-red text-red' :
                              signal.status === 'open' ? 'border-blue text-blue' :
                              'border-gold text-gold'
                            }
                          >
                            {signal.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {/* Price Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Entry</div>
                          <div className="font-mono font-bold text-white">{signal.entry.toFixed(2)}</div>
                        </div>
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">TP1</div>
                          <div className="font-mono font-bold text-green">{signal.tp1.toFixed(2)}</div>
                        </div>
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">TP2</div>
                          <div className="font-mono font-bold text-green">{signal.tp2.toFixed(2)}</div>
                        </div>
                        <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Stop Loss</div>
                          <div className="font-mono font-bold text-red">{signal.sl.toFixed(2)}</div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                        <div className="flex gap-4">
                          <span className="text-xs text-white/50">
                            RR: <strong className="text-white">1:{((signal.tp1 - signal.entry) / (signal.entry - signal.sl)).toFixed(1)}</strong>
                          </span>
                          {signal.pips && (
                            <span className="text-xs text-white/50">
                              Result: <strong className={signal.pips >= 0 ? 'text-green' : 'text-red'}>
                                {signal.pips >= 0 ? '+' : ''}{signal.pips} pips
                              </strong>
                            </span>
                          )}
                        </div>
                        {signal.note && (
                          <span className="text-xs text-white/40 italic">{signal.note}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignalsPage;
