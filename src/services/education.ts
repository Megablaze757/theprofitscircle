// ============================================
// EDUCATION SERVICE — Trading Academy Lessons
// ============================================

import type { Lesson, AffiliateLesson } from '@/types';

export const lessons: Lesson[] = [
  // FOUNDATIONS (Free)
  {
    id: 1,
    category: 'foundations',
    icon: '📊',
    title: 'What is Forex & Gold Trading?',
    description: 'Understand the global forex market, how gold is traded, and why XAUUSD is one of the best trading instruments.',
    difficulty: 'beginner',
    duration: '12 min',
    isFree: true,
    content: `
      <h3>What is Forex?</h3>
      <p>The foreign exchange market trades over $7.5 trillion per day — the world's largest financial market, open 24/5. It's where currencies are bought and sold against each other.</p>
      <h3>Why Gold (XAU/USD)?</h3>
      <p>Gold is one of the most predictable trending assets in forex. It correlates strongly with the US dollar, responds clearly to inflation and geopolitical events, and offers large price movements.</p>
      <h3>How Gold Trading Works</h3>
      <p>XAU/USD = the price of 1 troy ounce of gold in US dollars. If gold moves from $2,340 to $2,360, that's 2,000 pips — worth $200 per 0.10 lot.</p>
      <div style="background: var(--gold-dim); border: 1px solid var(--gold-border); border-radius: 8px; padding: 1rem; margin-top: 1rem;">
        💡 Gold trends more reliably than most forex pairs, making it easier to read technical setups consistently.
      </div>
    `,
    quiz: {
      question: 'What does XAU/USD represent?',
      options: ['Euro vs US Dollar', 'Gold ounce vs US Dollar', 'UK Pound vs Dollar', 'Silver vs Dollar'],
      correctIndex: 1,
    },
  },
  {
    id: 2,
    category: 'foundations',
    icon: '💱',
    title: 'Pips, Lots & Position Sizing',
    description: 'Master trading language — pips, lots, and how to calculate profit and loss for any trade.',
    difficulty: 'beginner',
    duration: '15 min',
    isFree: true,
    content: `
      <h3>What is a Pip?</h3>
      <p>For XAU/USD, 1 pip = $0.01 price movement. Gold moving from 2340.00 to 2341.00 = 100 pips.</p>
      <h3>Lot Sizes</h3>
      <p>Standard lot = 100 oz. Mini lot = 10 oz. Micro lot = 1 oz. On a 0.10 lot, each 100-pip move = $100 P&L.</p>
      <h3>Calculating P&L</h3>
      <p>P&L = (Exit − Entry) × Lot Size × 100. Entry 2340, Exit 2355, 0.10 lot = $150 profit.</p>
    `,
    quiz: {
      question: 'On a 0.10 lot XAU/USD, a 100-pip move equals...',
      options: ['$1,000', '$100', '$10', '$50'],
      correctIndex: 1,
    },
  },
  {
    id: 3,
    category: 'foundations',
    icon: '🏦',
    title: 'Choosing the Right Broker',
    description: 'Understand spreads, leverage, margin, and how to find a broker that maximises every signal profit.',
    difficulty: 'beginner',
    duration: '18 min',
    isFree: true,
    content: `
      <h3>What Makes a Good Broker?</h3>
      <p>For gold trading: regulated broker (FCA/ASIC/CySEC), tight XAU/USD spreads (under 25 pips), fast execution, and reliable platform (MT4/MT5).</p>
      <h3>Understanding Spread</h3>
      <p>The spread is the difference between buy (ask) and sell (bid) price. Tighter spreads = more profit from each signal.</p>
      <h3>Leverage & Margin</h3>
      <p>1:100 leverage = £100 controls £10,000 of gold. Powerful but dangerous — overleveraging is the #1 account killer.</p>
    `,
    quiz: {
      question: 'What does "spread" mean in forex?',
      options: ['Daily price range', 'Difference between buy and sell price', 'Total profit', 'Lot size'],
      correctIndex: 1,
    },
  },
  {
    id: 4,
    category: 'foundations',
    icon: '📈',
    title: 'Reading Charts & Candlesticks',
    description: 'Learn the universal language of trading — how to read price action through candlestick charts.',
    difficulty: 'beginner',
    duration: '20 min',
    isFree: true,
    content: `
      <h3>Why Candlestick Charts?</h3>
      <p>Candlestick charts show the most information: Open, High, Low, and Close for every time period. Green candle = price closed higher. Red candle = closed lower.</p>
      <h3>Timeframes for Gold</h3>
      <p>M15 for entries · H1 for structure · H4 for trend direction · D1 for the big picture. Always trade in the direction of the higher timeframe trend.</p>
    `,
    quiz: {
      question: 'What does a long upper wick on a candle indicate?',
      options: ['Strong buying', 'Price rejected from higher levels', 'Strong upward momentum', 'New uptrend'],
      correctIndex: 1,
    },
  },
  {
    id: 5,
    category: 'foundations',
    icon: '🎯',
    title: 'Support & Resistance Basics',
    description: 'The foundation of all technical analysis. Master these levels and you understand 80% of price movement.',
    difficulty: 'beginner',
    duration: '22 min',
    isFree: true,
    content: `
      <h3>Support</h3>
      <p>A price level where buying pressure prevents further decline — a "floor". The more times a level holds, the stronger the support.</p>
      <h3>Resistance</h3>
      <p>A "ceiling" where selling overwhelms buying. When broken, resistance often becomes new support — the key principle of polarity.</p>
    `,
    quiz: {
      question: 'When support breaks, it typically becomes...',
      options: ['New resistance', 'A buy zone', 'Irrelevant', 'Stronger support'],
      correctIndex: 0,
    },
  },
  {
    id: 6,
    category: 'foundations',
    icon: '🔄',
    title: 'Trend Identification',
    description: 'Learn to identify market direction and only trade with the momentum — not against it.',
    difficulty: 'beginner',
    duration: '16 min',
    isFree: true,
    content: `
      <h3>Three Market Conditions</h3>
      <p>Uptrend (higher highs + higher lows), downtrend (lower highs + lower lows), ranging (no clear direction). Your strategy changes completely based on which phase gold is in.</p>
      <h3>Moving Averages for Trend</h3>
      <p>50 EMA above 200 EMA = bullish bias. Below = bearish. Using these as a daily filter alone can significantly improve your win rate.</p>
    `,
    quiz: {
      question: 'What defines an uptrend?',
      options: ['Price above $2000', 'Higher highs and higher lows', '50 EMA crossed above 200', 'Increasing volume'],
      correctIndex: 1,
    },
  },
  {
    id: 7,
    category: 'foundations',
    icon: '⚡',
    title: 'Your First Gold Trade Walkthrough',
    description: 'Step-by-step execution of a complete XAUUSD trade — from signal to close with real numbers.',
    difficulty: 'beginner',
    duration: '25 min',
    isFree: true,
    content: `
      <h3>Reading a Signal</h3>
      <p>"XAU/USD BUY 2315.00 TP1: 2325 TP2: 2335 SL: 2305" — Entry at 2315, take profit at 2325 and 2335, stop loss at 2305.</p>
      <h3>Risk Calculation</h3>
      <p>If risking 1% of a £1,000 account = £10 max. With 100-pip SL on gold, a 0.01 lot risks ~£10.</p>
      <h3>Trade Management</h3>
      <p>Take 50% off at TP1, move stop to breakeven. This guarantees you can never lose on a trade once TP1 is hit.</p>
    `,
    quiz: {
      question: 'When should you move stop to breakeven?',
      options: ['When trade opens', 'After TP1 is hit', 'At end of day', 'Never'],
      correctIndex: 1,
    },
  },
  {
    id: 8,
    category: 'foundations',
    icon: '🗺️',
    title: 'Building a Professional Trading Routine',
    description: 'Structure your day like a professional: when to analyse, when to trade, and when to step away.',
    difficulty: 'beginner',
    duration: '14 min',
    isFree: true,
    content: `
      <h3>The Importance of Routine</h3>
      <p>Professionals don't stare at charts all day. They have structured windows for analysis, execution, and review.</p>
      <h3>Daily Gold Trader Schedule</h3>
      <p>7-8am: Check overnight price action, mark key levels. 8-10am: London open watch. 1-4pm: New York session — highest gold volume.</p>
    `,
    quiz: {
      question: 'When is the highest volume period for gold?',
      options: ['Asian session', 'London open', 'New York session', 'Weekend'],
      correctIndex: 2,
    },
  },

  // TECHNICAL ANALYSIS (Free)
  {
    id: 9,
    category: 'technical',
    icon: '🕯️',
    title: 'Advanced Candlestick Patterns',
    description: 'Master the 12 most reliable candlestick formations for high-probability gold entries.',
    difficulty: 'intermediate',
    duration: '28 min',
    isFree: true,
    content: `
      <h3>Pin Bars — Gold's Favourite Pattern</h3>
      <p>A pin bar has a long wick rejecting from a key S&R level with a small body. This signals overwhelmed buyers/sellers.</p>
      <h3>Engulfing Patterns</h3>
      <p>A bearish engulfing at resistance (large red candle body engulfs previous green) is one of the best sell setups on gold.</p>
      <h3>Doji Candles</h3>
      <p>A doji at a key level signals indecision. Combined with confluence, it often precedes a significant reversal.</p>
    `,
    quiz: {
      question: 'What is a "pin bar"?',
      options: ['A bar chart type', 'A candle with long wick and small body', 'A moving average cross', 'A Fibonacci level'],
      correctIndex: 1,
    },
  },
  {
    id: 10,
    category: 'technical',
    icon: '📐',
    title: 'Fibonacci Retracements',
    description: 'Draw Fibonacci levels correctly and use the 61.8% and 78.6% retracements for precise gold entries.',
    difficulty: 'intermediate',
    duration: '24 min',
    isFree: true,
    content: `
      <h3>The Mathematical Foundation</h3>
      <p>Fibonacci ratios appear throughout nature. In markets, price tends to retrace predictable amounts (38.2%, 50%, 61.8%, 78.6%) before continuing the trend.</p>
      <h3>Drawing Fibonacci on Gold</h3>
      <p>In an uptrend: draw from swing low to swing high. Key levels to watch are 61.8% (the golden ratio) and 78.6%.</p>
    `,
    quiz: {
      question: 'What is the "golden ratio" Fibonacci level?',
      options: ['38.2%', '50%', '61.8%', '78.6%'],
      correctIndex: 2,
    },
  },
  {
    id: 11,
    category: 'technical',
    icon: '〽️',
    title: 'Moving Average Strategies',
    description: 'Use EMAs as dynamic support/resistance, trend filters, and entry triggers for gold.',
    difficulty: 'intermediate',
    duration: '20 min',
    isFree: true,
    content: `
      <h3>The 20, 50, and 200 EMA</h3>
      <p>The 200 EMA is the most important level in all technical analysis. Price above = bullish bias. Price below = bearish.</p>
      <h3>Golden Cross & Death Cross</h3>
      <p>Golden cross = 50 EMA crosses above 200 EMA (bullish signal). Death cross = 50 crosses below 200 (bearish).</p>
    `,
    quiz: {
      question: 'What is a "golden cross"?',
      options: ['Gold at all-time high', '50 EMA crossing above 200 EMA', 'Price breaking resistance', 'Fibonacci 61.8% level'],
      correctIndex: 1,
    },
  },
  {
    id: 12,
    category: 'technical',
    icon: '📊',
    title: 'RSI & Momentum Indicators',
    description: 'Use RSI, MACD, and Stochastic correctly to confirm entries and filter false signals.',
    difficulty: 'intermediate',
    duration: '22 min',
    isFree: true,
    content: `
      <h3>RSI Fundamentals</h3>
      <p>RSI measures price change speed on a 0-100 scale. Above 70 = overbought. Below 30 = oversold.</p>
      <h3>RSI Divergence</h3>
      <p>Bearish divergence = price making higher highs while RSI makes lower highs. This often precedes 200-500 pip reversals on gold.</p>
    `,
    quiz: {
      question: 'What does RSI divergence mean?',
      options: ['RSI above 70', 'Price and RSI moving in opposite directions', 'RSI below 30', 'MACD crossover'],
      correctIndex: 1,
    },
  },
  {
    id: 13,
    category: 'technical',
    icon: '🔲',
    title: 'Chart Patterns: Flags, Triangles & More',
    description: 'Trade the most reliable chart patterns — bull flags, ascending triangles, and head & shoulders.',
    difficulty: 'intermediate',
    duration: '25 min',
    isFree: true,
    content: `
      <h3>Bull Flags — Our #1 Setup</h3>
      <p>Sharp move up (flagpole) then tight consolidation slightly downward (flag). On breakout, price typically continues for a distance equal to the flagpole.</p>
      <h3>Ascending Triangles</h3>
      <p>Higher lows against flat resistance = bullish accumulation. Price is building pressure.</p>
    `,
    quiz: {
      question: 'What is a "bull flag"?',
      options: ['Price at all-time high', 'Sharp move up then sideways consolidation', 'RSI overbought signal', 'Moving average crossover'],
      correctIndex: 1,
    },
  },
  {
    id: 14,
    category: 'technical',
    icon: '🎯',
    title: 'Precision Entry Techniques',
    description: 'Enter trades at optimal levels to minimise risk and maximise reward on every setup.',
    difficulty: 'intermediate',
    duration: '30 min',
    isFree: true,
    content: `
      <h3>Limit Order Entries</h3>
      <p>Professional traders set limit orders at exact desired prices and walk away. This removes emotional entry decisions.</p>
      <h3>The Retest Entry</h3>
      <p>Wait for price to break a level, then pull back to retest it before continuing. Better risk:reward and avoids buying at the top.</p>
    `,
    quiz: {
      question: 'What is a "retest entry"?',
      options: ['Entering at market price', 'Waiting for a breakout level to be retested', 'Using a stop order', 'Trading at session open'],
      correctIndex: 1,
    },
  },

  // GOLD TRADING (Free)
  {
    id: 15,
    category: 'gold',
    icon: '🥇',
    title: 'Why Gold Moves the Way It Does',
    description: 'The fundamental drivers of gold — USD correlation, inflation, interest rates, and global sentiment.',
    difficulty: 'beginner',
    duration: '20 min',
    isFree: true,
    content: `
      <h3>Gold as a Safe Haven</h3>
      <p>Gold is the world's oldest store of value. During uncertainty — wars, crises, recessions — investors flood into gold.</p>
      <h3>The USD Inverse Correlation</h3>
      <p>Gold and the Dollar Index (DXY) have a strong inverse relationship. Strong dollar = gold falls. Weak dollar = gold rises.</p>
      <h3>Real Interest Rates</h3>
      <p>Gold thrives in low real interest rate environments. Negative real rates = gold bull market.</p>
    `,
    quiz: {
      question: 'When the US Dollar strengthens, gold typically...',
      options: ['Rises', 'Falls', 'Stays flat', 'Becomes unpredictable'],
      correctIndex: 1,
    },
  },
  {
    id: 16,
    category: 'gold',
    icon: '🌍',
    title: 'Geopolitical Events & Gold',
    description: 'How to position correctly around wars, elections, and major global events that move gold.',
    difficulty: 'intermediate',
    duration: '16 min',
    isFree: true,
    content: `
      <h3>Gold as a Crisis Asset</h3>
      <p>Historically, gold rallies 8-15% in the first 3 months of major geopolitical conflicts.</p>
      <h3>How to React (Not Predict)</h3>
      <p>Don't try to predict events — react to them. When conflict escalates, look for a gold breakout from consolidation.</p>
    `,
    quiz: {
      question: 'During geopolitical crises, gold typically...',
      options: ['Drops sharply', 'Rallies as a safe haven', 'Stays unchanged', 'Follows stocks'],
      correctIndex: 1,
    },
  },
  {
    id: 17,
    category: 'gold',
    icon: '📅',
    title: 'Trading Gold Around NFP',
    description: 'The complete playbook for Non-Farm Payrolls day — the single most important monthly event for gold.',
    difficulty: 'intermediate',
    duration: '22 min',
    isFree: true,
    content: `
      <h3>Why NFP Is Critical</h3>
      <p>NFP is released the first Friday of every month at 1:30pm GMT. It's the most important US economic data point.</p>
      <h3>The NFP Playbook</h3>
      <p>Strong NFP (beats) = USD strengthens = initial gold sell. Weak NFP (misses) = USD weakens = gold rallies.</p>
      <h3>The Fade the Spike Strategy</h3>
      <p>NFP creates a sharp spike, then often reverses. Wait for the spike, then fade it back toward the pre-release range.</p>
    `,
    quiz: {
      question: 'When should you enter after NFP release?',
      options: ['Immediately on release', '15-30 minutes after', 'The day before', 'Avoid NFP day entirely'],
      correctIndex: 1,
    },
  },
  {
    id: 18,
    category: 'gold',
    icon: '🏛️',
    title: 'FOMC & Fed Decisions',
    description: 'Master the Federal Reserve\'s impact on gold and how to position correctly around rate decisions.',
    difficulty: 'intermediate',
    duration: '24 min',
    isFree: true,
    content: `
      <h3>Why the Fed Moves Gold</h3>
      <p>The Fed controls US interest rates. Higher rates make the dollar attractive, reducing demand for non-yielding gold.</p>
      <h3>Hawkish vs Dovish</h3>
      <p>Hawkish = Fed wants higher rates (negative for gold). Dovish = Fed wants lower rates (positive for gold).</p>
    `,
    quiz: {
      question: 'Dovish Fed language is generally... for gold',
      options: ['Negative', 'Positive', 'Neutral', 'Unpredictable'],
      correctIndex: 1,
    },
  },
  {
    id: 19,
    category: 'gold',
    icon: '💰',
    title: 'US CPI & Inflation Trading',
    description: 'How to trade gold around inflation data — the most consistent macro driver of gold direction.',
    difficulty: 'intermediate',
    duration: '20 min',
    isFree: true,
    content: `
      <h3>CPI and Gold</h3>
      <p>High CPI = more inflation = gold bullish (traditionally). But in a rate-hiking cycle, hot CPI = more rate hikes = gold headwind.</p>
      <h3>Core PCE — The Fed's Preferred Gauge</h3>
      <p>Core PCE is more important than CPI headline for gold traders because it's what the Fed actually targets.</p>
    `,
    quiz: {
      question: 'In a rate-cutting environment, high CPI is generally...',
      options: ['Positive for gold', 'Negative for gold', 'Neutral for gold', 'Unpredictable'],
      correctIndex: 1,
    },
  },

  // PSYCHOLOGY (Free)
  {
    id: 20,
    category: 'psychology',
    icon: '🧠',
    title: 'The Trader\'s Psychology Foundation',
    description: 'Why 90% of traders lose and the exact psychological traits that separate consistently profitable traders.',
    difficulty: 'beginner',
    duration: '22 min',
    isFree: true,
    content: `
      <h3>Why Traders Fail</h3>
      <p>Studies show 90% of retail traders lose money long-term. The reason is almost never their trading strategy — it's their psychology.</p>
      <h3>The Two Fatal Emotions</h3>
      <p>Fear (causing premature exits and missed trades) and greed (causing oversizing, holding past TP, and entering bad setups).</p>
    `,
    quiz: {
      question: 'What is the primary reason 90% of traders fail?',
      options: ['Bad strategies', 'Lack of capital', 'Poor psychology and discipline', 'Wrong broker'],
      correctIndex: 2,
    },
  },
  {
    id: 21,
    category: 'psychology',
    icon: '😰',
    title: 'Managing Fear in Trading',
    description: 'How to eliminate fear of loss, fear of missing out, and the paralysis that prevents good trade execution.',
    difficulty: 'intermediate',
    duration: '20 min',
    isFree: true,
    content: `
      <h3>Types of Fear in Trading</h3>
      <p>Fear of loss (not taking trades or exiting early), FOMO (chasing trades), and fear of being wrong (not cutting losers).</p>
      <h3>The 1% Rule</h3>
      <p>Risk no more than 1-2% of your account per trade. When you know you can survive 50 consecutive losses, fear of loss disappears.</p>
    `,
    quiz: {
      question: 'What is the most effective cure for fear of loss?',
      options: ['More practice', 'Proper position sizing (1-2% risk)', 'Bigger account', 'More confident entries'],
      correctIndex: 1,
    },
  },
  {
    id: 22,
    category: 'psychology',
    icon: '🔥',
    title: 'Overcoming Greed & Overtrading',
    description: 'Identify and eliminate the greed patterns that blow accounts — overtrading, oversizing, and holding past TPs.',
    difficulty: 'intermediate',
    duration: '18 min',
    isFree: true,
    content: `
      <h3>The Overtrading Trap</h3>
      <p>After a loss, many traders feel compelled to "make it back" immediately. This revenge trading leads to entering sub-optimal setups.</p>
      <h3>Trade Quota Rule</h3>
      <p>Set a maximum of 2-3 high-quality trades per day. If you've taken your quota, stop. Force yourself to be selective.</p>
    `,
    quiz: {
      question: 'What should you do after a losing streak?',
      options: ['Increase lot size to recover', 'Take a break, review rules, reduce size', 'Trade more to make it back', 'Switch strategy immediately'],
      correctIndex: 1,
    },
  },

  // RISK MANAGEMENT (Free)
  {
    id: 23,
    category: 'risk',
    icon: '🛡️',
    title: 'The 1% Rule — Never Blow an Account',
    description: 'The single most important risk management rule that guarantees account survival, no matter what.',
    difficulty: 'beginner',
    duration: '15 min',
    isFree: true,
    content: `
      <h3>Why 1% Risk Changes Everything</h3>
      <p>Risking 1% per trade means you can lose 100 trades in a row and still have 36% of your account. That's impossible with any positive-edge strategy.</p>
      <h3>How to Calculate 1% Risk</h3>
      <p>Account £1,000 × 1% = £10 max risk per trade. With a 100-pip stop on XAU/USD and a 0.01 lot, you risk approximately £10.</p>
    `,
    quiz: {
      question: 'Risking 1% per trade on a £1,000 account means a maximum of...',
      options: ['£1 per trade', '£10 per trade', '£100 per trade', '£50 per trade'],
      correctIndex: 1,
    },
  },
  {
    id: 24,
    category: 'risk',
    icon: '⚡',
    title: 'Stop Loss Placement Mastery',
    description: 'Where to place stop losses that give trades room to breathe without risking too much.',
    difficulty: 'intermediate',
    duration: '20 min',
    isFree: true,
    content: `
      <h3>Never Place Stops at Round Numbers</h3>
      <p>Most retail traders place stops at obvious levels — below round numbers, just below support. Institutional algorithms hunt these.</p>
      <h3>ATR-Based Stops</h3>
      <p>The Average True Range (ATR) measures typical daily volatility. Use ATR to size stops appropriately for current volatility.</p>
    `,
    quiz: {
      question: 'Why should you add buffer beyond a support level for your stop loss?',
      options: ['Larger profits', 'Institutional algorithms hunt obvious stops', 'Tighter risk', 'Better win rate'],
      correctIndex: 1,
    },
  },
  {
    id: 25,
    category: 'risk',
    icon: '📊',
    title: 'Risk:Reward Ratios & Expectancy',
    description: 'Why risk:reward determines long-term profitability — and how to calculate your true trading expectancy.',
    difficulty: 'intermediate',
    duration: '18 min',
    isFree: true,
    content: `
      <h3>What is Risk:Reward?</h3>
      <p>A 1:2 RR means you risk £50 to make £100. With a 50% win rate, you break even. With a 60% win rate at 1:2 RR, you have a serious edge.</p>
      <h3>Calculating Expectancy</h3>
      <p>Expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). This tells you your expected profit per trade.</p>
    `,
    quiz: {
      question: 'With a 50% win rate and 1:2 RR, you will...',
      options: ['Lose money', 'Break even', 'Make money', 'Stay flat'],
      correctIndex: 2,
    },
  },

  // AFFILIATE (Free)
  {
    id: 26,
    category: 'affiliate',
    icon: '📱',
    title: 'Building a Financial Audience',
    description: 'How to create and grow a following that converts into consistent affiliate referrals and passive income.',
    difficulty: 'beginner',
    duration: '25 min',
    isFree: true,
    content: `
      <h3>Why Content Works for Finance</h3>
      <p>Finance is one of the most lucrative niches for content creation. People searching for trading content have high buying intent.</p>
      <h3>Platform Strategy</h3>
      <p>TikTok and Instagram Reels for top-of-funnel reach. YouTube for deep trust-building. Telegram for direct community.</p>
    `,
    quiz: {
      question: 'Which platform is best for building the deepest trust with an audience?',
      options: ['TikTok', 'Instagram Stories', 'YouTube', 'Twitter'],
      correctIndex: 2,
    },
  },
  {
    id: 27,
    category: 'affiliate',
    icon: '💬',
    title: 'Creating Converting Content',
    description: 'The exact content formats and scripts that turn viewers into sign-ups and generate consistent commissions.',
    difficulty: 'intermediate',
    duration: '28 min',
    isFree: true,
    content: `
      <h3>The Hook Formula</h3>
      <p>The first 3 seconds determine if anyone watches. Proven hooks: "I made £X following these signals...", "The reason 90% of traders fail..."</p>
      <h3>The Results Post</h3>
      <p>Screenshot of a signal with entry/exit clearly shown, results in pips or £, and your referral link. These are the highest-converting posts.</p>
    `,
    quiz: {
      question: 'What makes a trading affiliate post convert best?',
      options: ['Lots of hashtags', 'Authentic results with specific numbers and proof', 'Professional graphics', 'Long-form explanations'],
      correctIndex: 1,
    },
  },
  {
    id: 28,
    category: 'affiliate',
    icon: '🚀',
    title: 'Scaling to £1,000+/Month in Commissions',
    description: 'The system for consistently growing your affiliate referrals from 0 to £1,000+ per month recurring.',
    difficulty: 'intermediate',
    duration: '30 min',
    isFree: true,
    content: `
      <h3>The Compound Referral Effect</h3>
      <p>10 referrals at £49/month with 40% commission = £196/month. Add 10 more next month: £392/month. Your income grows every month.</p>
      <h3>The Content Flywheel</h3>
      <p>Post signal results → People click your link → Referrals sign up → They see results → They share → You get organic referrals.</p>
    `,
    quiz: {
      question: 'Why do referral commissions compound over time?',
      options: ['Price increases', 'You earn on new AND previous referrals every month', 'Bigger lot sizes', 'Higher win rates'],
      correctIndex: 1,
    },
  },

  // ADVANCED (VIP Only)
  {
    id: 29,
    category: 'advanced',
    icon: '⚙️',
    title: 'Smart Money Concepts (SMC)',
    description: 'The institutional framework for reading price action — liquidity, order blocks, and market structure shifts.',
    difficulty: 'advanced',
    duration: '45 min',
    isFree: false,
    content: `
      <h3>What is Smart Money?</h3>
      <p>Smart money refers to institutional traders — banks, hedge funds, central banks — who have the power to move markets.</p>
      <h3>Market Structure & BOS</h3>
      <p>A Break of Structure (BOS) occurs when price breaks a previous swing high (in uptrend) or swing low (in downtrend).</p>
      <h3>Order Blocks & Fair Value Gaps</h3>
      <p>Order blocks are institutional price zones. Fair Value Gaps (FVGs) are price imbalances that the market tends to fill.</p>
    `,
    quiz: {
      question: 'What is a "Change of Character" (CHoCH) in SMC?',
      options: ['A trend continuation signal', 'A potential trend reversal signal', 'An order block', 'A Fibonacci level'],
      correctIndex: 1,
    },
  },
  {
    id: 30,
    category: 'advanced',
    icon: '💡',
    title: 'Liquidity Theory & Stop Hunting',
    description: 'How to identify where retail stops are clustered and use that knowledge to position ahead of institutional moves.',
    difficulty: 'advanced',
    duration: '40 min',
    isFree: false,
    content: `
      <h3>Where Liquidity Lives</h3>
      <p>Liquidity pools form wherever retail traders place their stops — below obvious support, above obvious resistance.</p>
      <h3>Equal Highs and Lows</h3>
      <p>When gold forms two equal highs or lows, retail traders place stops just beyond them. Institutions push price through these levels.</p>
      <h3>Trading the Reversal</h3>
      <p>After a liquidity grab (price spikes past a level, wicks heavily, then closes back), enter in the opposite direction.</p>
    `,
    quiz: {
      question: 'What is a "liquidity pool"?',
      options: ['A broker feature', 'An area where retail stops are clustered', 'A chart pattern', 'An order type'],
      correctIndex: 1,
    },
  },
  {
    id: 31,
    category: 'advanced',
    icon: '🎓',
    title: 'Building a Proprietary Trading Strategy',
    description: 'How to develop, test, and implement your own edge — combining everything learned into one cohesive approach.',
    difficulty: 'advanced',
    duration: '50 min',
    isFree: false,
    content: `
      <h3>The Elements of a Trading Strategy</h3>
      <p>A complete strategy has: entry criteria, filter criteria, risk rules, and exit rules. Every element must be specific.</p>
      <h3>Backtesting Your Edge</h3>
      <p>Before trading live, test your strategy on 100+ historical setups. Record entry, exit, P&L, and notes for each.</p>
      <h3>From Strategy to System</h3>
      <p>Once backtested, trade it in demo for 30 days. Then transition to small live size. Increase size only when profitable.</p>
    `,
    quiz: {
      question: 'How many historical setups should you test before trading live?',
      options: ['10+', '25+', '100+', '500+'],
      correctIndex: 2,
    },
  },
];

// Get lessons by category
export function getLessonsByCategory(category: string): Lesson[] {
  return lessons.filter(l => l.category === category);
}

// Get all free lessons
export function getFreeLessons(): Lesson[] {
  return lessons.filter(l => l.isFree);
}

// Get VIP lessons
export function getVIPLessons(): Lesson[] {
  return lessons.filter(l => !l.isFree);
}

// Get lesson by ID
export function getLessonById(id: number): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

// Get categories
export const lessonCategories = [
  { id: 'all', name: 'All Lessons', count: lessons.length },
  { id: 'foundations', name: 'Foundations', count: lessons.filter(l => l.category === 'foundations').length },
  { id: 'technical', name: 'Technical Analysis', count: lessons.filter(l => l.category === 'technical').length },
  { id: 'gold', name: 'Gold Trading', count: lessons.filter(l => l.category === 'gold').length },
  { id: 'psychology', name: 'Psychology', count: lessons.filter(l => l.category === 'psychology').length },
  { id: 'risk', name: 'Risk Management', count: lessons.filter(l => l.category === 'risk').length },
  { id: 'affiliate', name: 'Affiliate', count: lessons.filter(l => l.category === 'affiliate').length },
  { id: 'advanced', name: 'Advanced ★', count: lessons.filter(l => l.category === 'advanced').length },
];

// Affiliate lessons (enhanced)
export const affiliateLessons: AffiliateLesson[] = [
  {
    id: 1,
    title: 'Affiliate Marketing Fundamentals',
    duration: '20 min',
    content: 'Learn the basics of affiliate marketing in the trading niche. Understand commission structures, cookie durations, and how to position yourself for success.',
  },
  {
    id: 2,
    title: 'Content Strategy for Trading Affiliates',
    duration: '25 min',
    content: 'Develop a content calendar that consistently drives referrals. Learn what types of posts convert best and how to maintain engagement.',
  },
  {
    id: 3,
    title: 'Social Media Growth Tactics',
    duration: '30 min',
    content: 'Proven strategies to grow your following on Instagram, TikTok, and Twitter. Learn hashtag strategies, posting times, and engagement techniques.',
  },
  {
    id: 4,
    title: 'YouTube for Affiliate Marketers',
    duration: '35 min',
    content: 'Create high-converting YouTube content. From video scripts to thumbnails, learn what makes trading content successful on YouTube.',
  },
  {
    id: 5,
    title: 'Email Marketing for Referrals',
    duration: '25 min',
    content: 'Build and nurture an email list that converts. Learn email sequences, subject lines, and how to avoid the spam folder.',
  },
  {
    id: 6,
    title: 'Paid Advertising Strategies',
    duration: '40 min',
    content: 'Scale your affiliate income with paid ads. Learn Facebook Ads, Google Ads, and native advertising for trading offers.',
  },
  {
    id: 7,
    title: 'Building a Personal Brand',
    duration: '30 min',
    content: 'Establish yourself as a trusted voice in the trading community. Learn brand positioning, storytelling, and authority building.',
  },
  {
    id: 8,
    title: 'Analytics & Optimization',
    duration: '25 min',
    content: 'Track what matters and optimize for better results. Learn which metrics to focus on and how to improve conversion rates.',
  },
];
