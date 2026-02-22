// ============================================
// THE PROFITS CIRCLE — TYPE DEFINITIONS
// ============================================

// ─── USER & AUTH ───
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'vip' | 'affiliate' | 'user';
  plan?: 'free' | 'pro' | 'elite';
  createdAt: string;
  affiliateCode?: string;
  referrals?: number;
  commission?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ─── GOLD PRICE ───
export interface GoldPrice {
  symbol: string;
  name: string;
  price: number;
  updatedAt: string;
  updatedAtReadable: string;
}

export interface PriceData {
  gold: GoldPrice | null;
  silver: GoldPrice | null;
  bitcoin: GoldPrice | null;
  loading: boolean;
  error: string | null;
}

// ─── TRADING SIGNAL ───
export interface TradingSignal {
  id: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  tp1: number;
  tp2: number;
  sl: number;
  status: 'open' | 'win' | 'loss' | 'pending';
  date: string;
  result?: number;
  pips?: number;
  note?: string;
}

// ─── TRADE JOURNAL ───
export interface Trade {
  id: string;
  date: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  exit?: number;
  lot: number;
  result: 'WIN' | 'LOSS' | 'BE';
  pnl: number;
  strategy: string;
  notes?: string;
}

export interface JournalStats {
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  bestDay: number;
  currentStreak: number;
}

// ─── ECONOMIC EVENT ───
export interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  currency: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  forecast?: string;
  previous?: string;
  actual?: string;
  goldImpact?: string;
}

// ─── EDUCATION ───
export interface Lesson {
  id: number;
  category: LessonCategory;
  icon: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  isFree: boolean;
  content: string;
  quiz?: Quiz;
}

export type LessonCategory = 
  | 'foundations' 
  | 'technical' 
  | 'gold' 
  | 'psychology' 
  | 'risk' 
  | 'affiliate' 
  | 'advanced';

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
}

// ─── AFFILIATE ───
export interface AffiliateTier {
  name: string;
  range: string;
  commission: number;
  features: string[];
  featured?: boolean;
}

export interface AffiliateResource {
  icon: string;
  title: string;
  description: string;
}

export interface AffiliateLesson {
  id: number;
  title: string;
  content: string;
  duration: string;
}

// ─── VIP PLANS ───
export interface Plan {
  id: string;
  name: string;
  badge: string;
  price: number;
  period: string;
  features: PlanFeature[];
  featured?: boolean;
  buttonStyle: 'gold' | 'green' | 'outline';
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

// ─── ADMIN ───
export interface AdminStats {
  totalUsers: number;
  vipUsers: number;
  affiliates: number;
  monthlyRevenue: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: 'active' | 'inactive';
  joinedAt: string;
}
