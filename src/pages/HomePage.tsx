// ============================================
// HOME PAGE — Hero & Features
// ============================================

import { useEffect, useRef } from 'react';
import { 
  Signal, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  HandCoins, 
  Crown,
  ChevronRight,
  TrendingUp,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import type { Page } from '@/App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  const { formattedPrice, priceChange, priceHistory } = useGoldPrice();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw mini chart
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

    // Gradient fill
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

    // Line
    ctx.beginPath();
    priceHistory.forEach((v, i) => {
      if (i === 0) ctx.moveTo(getX(i), getY(v));
      else ctx.lineTo(getX(i), getY(v));
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [priceHistory]);

  const features = [
    {
      icon: Signal,
      title: 'Live Signals',
      description: 'Real-time XAUUSD signals with full entry, TP1, TP2, and SL. 87% win rate verified over 600+ signals.',
      action: () => onNavigate('signals'),
      color: 'gold',
    },
    {
      icon: GraduationCap,
      title: 'Trading Academy',
      description: '40+ structured lessons covering technical analysis, psychology, risk management, and advanced gold strategies.',
      action: () => onNavigate('education'),
      color: 'gold',
    },
    {
      icon: BookOpen,
      title: 'Trade Journal',
      description: 'Track every trade with a built-in calendar view showing daily P&L. Analyze your edge and improve your results.',
      action: () => onNavigate('journal'),
      color: 'green',
    },
    {
      icon: Calendar,
      title: 'Economic Calendar',
      description: 'Never get caught off guard. Track high-impact news events — NFP, CPI, FOMC — that move gold markets.',
      action: () => onNavigate('calendar'),
      color: 'blue',
    },
    {
      icon: HandCoins,
      title: 'Affiliate Program',
      description: 'Earn 40-50% recurring commission. Real-time dashboard, monthly payouts, and full marketing resources.',
      action: () => onNavigate('affiliate'),
      color: 'gold',
    },
    {
      icon: Crown,
      title: 'VIP Membership',
      description: 'Access all premium content, advanced strategies, 1-on-1 mentorship, and priority signal delivery.',
      action: () => onNavigate('vip'),
      color: 'gold',
    },
  ];

  const stats = [
    { value: '87%', label: 'Win Rate', icon: TrendingUp },
    { value: '347%', label: 'Avg Annual Return', icon: Zap },
    { value: '600+', label: 'Signals Delivered', icon: Signal },
    { value: '2,100+', label: 'Members', icon: Users },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-70px)] flex items-center overflow-hidden">
        <div className="grid-bg" />
        
        {/* Glow effects */}
        <div 
          className="absolute top-[20%] left-[55%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 70%)' }}
        />

        <div className="container relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-6"
                style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', color: 'var(--green)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#00e5a0] animate-pulse" />
                2,100+ Elite Members
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none mb-6">
                MASTER<br />
                <span className="text-gold">GOLD</span><br />
                <span className="text-green">TRADING.</span>
              </h1>

              <p className="text-lg text-white/70 max-w-lg mb-8">
                Professional XAUUSD signals, world-class trading education, economic calendar, 
                and a trade journal — built for serious traders and affiliate earners.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="https://t.me/theprofitscirclesupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-lg"
                >
                  Join Free Now
                </a>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('education')}
                  className="border-gold/30 text-gold hover:bg-gold/10"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="font-bebas text-3xl tracking-wider bg-gradient-to-r from-[#e8c068] to-[#d4a843] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 font-semibold tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Live Price Card */}
            <div className="hidden lg:block relative">
              <div 
                className="p-6 rounded-2xl"
                style={{ background: 'var(--black3)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-bold text-white/50 tracking-wider uppercase mb-1">
                      XAU / USD · Real-Time
                    </div>
                    <div className="flex items-baseline gap-3">
                      <div className="price-display">{formattedPrice}</div>
                      <div className={`price-change ${priceChange.direction}`}>
                        {priceChange.direction === 'up' ? '▲' : '▼'} 
                        {priceChange.percent > 0 ? '+' : ''}{priceChange.percent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-gold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    LIVE
                  </span>
                </div>

                <canvas 
                  ref={canvasRef}
                  className="w-full h-[180px] rounded-lg"
                />

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">24h High</div>
                    <div className="text-green font-mono font-bold text-sm">
                      {formattedPrice ? (parseFloat(formattedPrice.replace(/[$,]/g, '')) * 1.009).toFixed(2) : '--'}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">24h Low</div>
                    <div className="text-red font-mono font-bold text-sm">
                      {formattedPrice ? (parseFloat(formattedPrice.replace(/[$,]/g, '')) * 0.99).toFixed(2) : '--'}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ background: 'var(--black2)' }}>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Spread</div>
                    <div className="text-white/70 font-mono font-bold text-sm">0.35</div>
                  </div>
                </div>
              </div>

              {/* Floating Signal Cards */}
              <div 
                className="absolute -bottom-4 -right-4 p-4 rounded-xl animate-bounce"
                style={{ 
                  background: 'var(--black3)', 
                  border: '1px solid rgba(0,229,160,0.3)',
                  animationDuration: '4s'
                }}
              >
                <div className="text-[10px] text-white/50 mb-1">Latest Signal</div>
                <div className="font-bold text-sm">XAU/USD BUY</div>
                <div className="text-green text-sm font-bold">TP2 Hit ✓</div>
              </div>

              <div 
                className="absolute top-8 -left-4 p-4 rounded-xl"
                style={{ 
                  background: 'var(--black3)', 
                  border: '1px solid rgba(0,229,160,0.3)',
                  animation: 'float 4s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              >
                <div className="text-[10px] text-white/50 mb-1">Win Streak</div>
                <div className="font-bold text-sm">9 in a row</div>
                <div className="text-gold text-sm">🔥 On fire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="py-4 border-y border-white/5" style={{ background: 'var(--black2)' }}>
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['100% Free to Join', 'Real-Time Alerts', '87% Win Rate', 'Economic Calendar', 'Free Academy', 'Affiliate Program'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                <Award className="w-4 h-4 text-gold" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="section-pad" style={{ background: 'var(--black2)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-eyebrow justify-center">
              <Zap className="w-4 h-4" />
              Platform
            </div>
            <h2 className="section-title">
              Everything You Need to <span className="text-green">WIN</span>
            </h2>
            <div className="accent-line">
              <div className="al-diamond" />
            </div>
            <p className="section-sub mx-auto">
              The most complete gold trading platform. Signals, education, news, and tools — all in one place.
            </p>
          </div>

          <div className="grid-3">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="card cursor-pointer group"
                onClick={feature.action}
              >
                <div className={`card-icon ${feature.color === 'green' ? 'green' : feature.color === 'blue' ? 'blue' : ''}`}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color === 'gold' ? 'var(--gold)' : feature.color === 'green' ? 'var(--green)' : 'var(--blue)' }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all group-hover:bg-gold/20"
                  style={{ background: 'var(--black4)', border: '1px solid var(--border)' }}
                >
                  <span className="text-gold">Learn More</span>
                  <ChevronRight className="w-3 h-3 text-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pad">
        <div className="container">
          <div 
            className="max-w-2xl mx-auto p-12 rounded-2xl text-center relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, rgba(18,14,0,0.95), rgba(10,10,5,0.95))',
              border: '1px solid var(--gold-border)'
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08), transparent 60%)' }}
            />
            <div className="relative z-10">
              <div className="section-eyebrow justify-center mb-4">
                <Crown className="w-4 h-4" />
                Free VIP Access
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Get <span className="text-gold">FREE VIP</span> Today
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                No payment. No credit card. Just DM us and you'll be added in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://instagram.com/theprofitscircle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ig btn-lg"
                >
                  DM on Instagram
                </a>
                <a
                  href="https://t.me/theprofitscirclesupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-tg btn-lg"
                >
                  DM on Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <div className="risk-bar">
        <div className="container">
          <p className="risk-text">
            <span className="text-gold mr-2">⚠️</span>
            <strong className="text-gold">Risk Disclosure:</strong> Trading financial instruments involves 
            significant risk and is not suitable for all investors. Past performance is not indicative of 
            future results. Only trade with capital you can afford to lose. The Profits Circle does not 
            provide financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
