// ============================================
// LOCAL STORAGE SERVICE
// ============================================

import type { User } from '@/types';

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

const KEYS = {
  USER: 'tpc_user',
  TRADES: 'tpc_trades',
  LESSONS: 'tpc_lessons',
  ADMIN_SESSION: 'tpc_admin_session',
  VIP_USERS: 'tpc_vip_users',
  AFFILIATE_USERS: 'tpc_affiliate_users',
};

// ─── USER ───
export function getCurrentUser(): User | null {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.USER);
  }
}

// ─── TRADES ───
export function getTrades(): Trade[] {
  const data = localStorage.getItem(KEYS.TRADES);
  return data ? JSON.parse(data) : [];
}

export function addTrade(trade: Trade): void {
  const trades = getTrades();
  trades.push(trade);
  localStorage.setItem(KEYS.TRADES, JSON.stringify(trades));
}

export function updateTrade(updatedTrade: Trade): void {
  const trades = getTrades();
  const index = trades.findIndex(t => t.id === updatedTrade.id);
  if (index !== -1) {
    trades[index] = updatedTrade;
    localStorage.setItem(KEYS.TRADES, JSON.stringify(trades));
  }
}

export function deleteTrade(tradeId: string): void {
  const trades = getTrades();
  const filtered = trades.filter(t => t.id !== tradeId);
  localStorage.setItem(KEYS.TRADES, JSON.stringify(filtered));
}

// ─── LESSONS ───
export function getCompletedLessons(): number[] {
  const data = localStorage.getItem(KEYS.LESSONS);
  return data ? JSON.parse(data) : [];
}

export function markLessonComplete(lessonId: number): void {
  const completed = getCompletedLessons();
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
    localStorage.setItem(KEYS.LESSONS, JSON.stringify(completed));
  }
}

// ─── ADMIN ───
export interface AdminSession {
  isAuthenticated: boolean;
  email: string;
  loginTime: string;
}

export function getAdminSession(): AdminSession | null {
  const data = localStorage.getItem(KEYS.ADMIN_SESSION);
  return data ? JSON.parse(data) : null;
}

export function setAdminSession(session: AdminSession | null): void {
  if (session) {
    localStorage.setItem(KEYS.ADMIN_SESSION, JSON.stringify(session));
  } else {
    localStorage.removeItem(KEYS.ADMIN_SESSION);
  }
}

export function isAdminAuthenticated(): boolean {
  const session = getAdminSession();
  if (!session?.isAuthenticated) return false;
  
  // Check if session is less than 24 hours old
  const loginTime = new Date(session.loginTime).getTime();
  const now = Date.now();
  const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
  
  return hoursSinceLogin < 24;
}

// ─── VIP USERS (Admin Management) ───
export interface VIPUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'elite';
  status: 'active' | 'inactive';
  joinedAt: string;
  expiresAt?: string;
}

export function getVIPUsers(): VIPUser[] {
  const data = localStorage.getItem(KEYS.VIP_USERS);
  if (data) return JSON.parse(data);
  
  // Return mock data if none exists
  const mockUsers: VIPUser[] = [
    {
      id: '1',
      name: 'Michael Chen',
      email: 'michael@example.com',
      plan: 'elite',
      status: 'active',
      joinedAt: '2025-01-15',
      expiresAt: '2025-04-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      plan: 'pro',
      status: 'active',
      joinedAt: '2025-02-01',
      expiresAt: '2025-05-01',
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james@example.com',
      plan: 'free',
      status: 'active',
      joinedAt: '2025-02-10',
    },
  ];
  localStorage.setItem(KEYS.VIP_USERS, JSON.stringify(mockUsers));
  return mockUsers;
}

export function addVIPUser(user: VIPUser): void {
  const users = getVIPUsers();
  users.push(user);
  localStorage.setItem(KEYS.VIP_USERS, JSON.stringify(users));
}

export function updateVIPUser(updatedUser: VIPUser): void {
  const users = getVIPUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem(KEYS.VIP_USERS, JSON.stringify(users));
  }
}

export function deleteVIPUser(userId: string): void {
  const users = getVIPUsers();
  const filtered = users.filter(u => u.id !== userId);
  localStorage.setItem(KEYS.VIP_USERS, JSON.stringify(filtered));
}

// ─── AFFILIATE USERS (Admin Management) ───
export interface AffiliateUser {
  id: string;
  name: string;
  email: string;
  tier: 'starter' | 'pro' | 'elite';
  commission: number;
  referrals: number;
  earnings: number;
  status: 'active' | 'inactive';
  joinedAt: string;
  affiliateCode: string;
}

export function getAffiliateUsers(): AffiliateUser[] {
  const data = localStorage.getItem(KEYS.AFFILIATE_USERS);
  if (data) return JSON.parse(data);
  
  // Return mock data if none exists
  const mockAffiliates: AffiliateUser[] = [
    {
      id: '1',
      name: 'David Thompson',
      email: 'david@example.com',
      tier: 'elite',
      commission: 50,
      referrals: 28,
      earnings: 5420,
      status: 'active',
      joinedAt: '2024-11-20',
      affiliateCode: 'DAVID28',
    },
    {
      id: '2',
      name: 'Emma Davis',
      email: 'emma@example.com',
      tier: 'pro',
      commission: 45,
      referrals: 12,
      earnings: 2150,
      status: 'active',
      joinedAt: '2025-01-05',
      affiliateCode: 'EMMA12',
    },
    {
      id: '3',
      name: 'Alex Martinez',
      email: 'alex@example.com',
      tier: 'starter',
      commission: 40,
      referrals: 4,
      earnings: 380,
      status: 'active',
      joinedAt: '2025-02-15',
      affiliateCode: 'ALEX04',
    },
  ];
  localStorage.setItem(KEYS.AFFILIATE_USERS, JSON.stringify(mockAffiliates));
  return mockAffiliates;
}

export function addAffiliateUser(user: AffiliateUser): void {
  const users = getAffiliateUsers();
  users.push(user);
  localStorage.setItem(KEYS.AFFILIATE_USERS, JSON.stringify(users));
}

export function updateAffiliateUser(updatedUser: AffiliateUser): void {
  const users = getAffiliateUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem(KEYS.AFFILIATE_USERS, JSON.stringify(users));
  }
}

export function deleteAffiliateUser(userId: string): void {
  const users = getAffiliateUsers();
  const filtered = users.filter(u => u.id !== userId);
  localStorage.setItem(KEYS.AFFILIATE_USERS, JSON.stringify(filtered));
}
