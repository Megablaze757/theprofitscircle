// ============================================
// TRADING SIGNALS SERVICE
// ============================================

import type { TradingSignal } from '@/types';

// Mock signals data - in production this would come from your backend
const mockSignals: TradingSignal[] = [
  {
    id: '1',
    pair: 'XAU/USD',
    direction: 'BUY',
    entry: 2341.50,
    tp1: 2350.00,
    tp2: 2360.00,
    sl: 2332.00,
    status: 'win',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    pips: 185,
    note: 'TP2 Hit - Strong momentum after NFP',
  },
  {
    id: '2',
    pair: 'XAU/USD',
    direction: 'SELL',
    entry: 2365.00,
    tp1: 2355.00,
    tp2: 2345.00,
    sl: 2375.00,
    status: 'win',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    pips: 200,
    note: 'TP2 Hit - Resistance rejection',
  },
  {
    id: '3',
    pair: 'XAU/USD',
    direction: 'BUY',
    entry: 2325.00,
    tp1: 2335.00,
    tp2: 2345.00,
    sl: 2315.00,
    status: 'win',
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    pips: 200,
    note: 'TP2 Hit - Support bounce',
  },
  {
    id: '4',
    pair: 'XAU/USD',
    direction: 'SELL',
    entry: 2380.00,
    tp1: 2370.00,
    tp2: 2360.00,
    sl: 2390.00,
    status: 'loss',
    date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
    pips: -100,
    note: 'Stopped out - Unexpected bullish move',
  },
  {
    id: '5',
    pair: 'XAU/USD',
    direction: 'BUY',
    entry: 2335.00,
    tp1: 2345.00,
    tp2: 2355.00,
    sl: 2325.00,
    status: 'win',
    date: new Date(Date.now() - 432000000).toISOString().split('T')[0],
    pips: 200,
    note: 'TP2 Hit - Trend continuation',
  },
  {
    id: '6',
    pair: 'XAU/USD',
    direction: 'BUY',
    entry: 2345.00,
    tp1: 2355.00,
    tp2: 2365.00,
    sl: 2335.00,
    status: 'open',
    date: new Date().toISOString().split('T')[0],
    note: 'Active signal - Watch for TP1',
  },
  {
    id: '7',
    pair: 'XAU/USD',
    direction: 'SELL',
    entry: 2370.00,
    tp1: 2360.00,
    tp2: 2350.00,
    sl: 2380.00,
    status: 'pending',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    note: 'Pending - Waiting for entry',
  },
];

// Get all signals
export function getAllSignals(): TradingSignal[] {
  return [...mockSignals];
}

// Get signals by status
export function getSignalsByStatus(status: TradingSignal['status'][]): TradingSignal[] {
  return mockSignals.filter(s => status.includes(s.status));
}

// Get open signals count
export function getOpenSignalsCount(): number {
  return mockSignals.filter(s => s.status === 'open').length;
}

// Calculate win rate
export function calculateWinRate(): number {
  const closedSignals = mockSignals.filter(s => s.status === 'win' || s.status === 'loss');
  if (closedSignals.length === 0) return 0;
  const wins = closedSignals.filter(s => s.status === 'win').length;
  return Math.round((wins / closedSignals.length) * 100);
}

// Calculate total pips
export function calculateTotalPips(): number {
  return mockSignals.reduce((total, s) => total + (s.pips || 0), 0);
}

// Get average risk:reward ratio
export function getAverageRR(): string {
  return '1:2.4';
}

// Generate a new signal (for admin use)
export function generateSignal(
  pair: string,
  direction: 'BUY' | 'SELL',
  entry: number,
  tp1: number,
  tp2: number,
  sl: number
): TradingSignal {
  return {
    id: Date.now().toString(),
    pair,
    direction,
    entry,
    tp1,
    tp2,
    sl,
    status: 'open',
    date: new Date().toISOString().split('T')[0],
  };
}
