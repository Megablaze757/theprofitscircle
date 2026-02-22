// ============================================
// GOLD API SERVICE — Live Price Data
// Using gold-api.com (Free, No Rate Limits)
// ============================================

import type { GoldPrice } from '@/types';

const BASE_URL = 'https://api.gold-api.com';

// Cache for price data
let priceCache: {
  gold: GoldPrice | null;
  silver: GoldPrice | null;
  bitcoin: GoldPrice | null;
  lastUpdated: number;
} = {
  gold: null,
  silver: null,
  bitcoin: null,
  lastUpdated: 0,
};

const CACHE_DURATION = 5000; // 5 seconds

// Fetch price for a symbol
async function fetchPrice(symbol: string): Promise<GoldPrice | null> {
  try {
    const response = await fetch(`${BASE_URL}/price/${symbol}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${symbol} price:`, error);
    return null;
  }
}

// Get all prices (with caching)
export async function getAllPrices(): Promise<{
  gold: GoldPrice | null;
  silver: GoldPrice | null;
  bitcoin: GoldPrice | null;
}> {
  const now = Date.now();
  
  // Return cached data if fresh
  if (now - priceCache.lastUpdated < CACHE_DURATION && priceCache.gold) {
    return {
      gold: priceCache.gold,
      silver: priceCache.silver,
      bitcoin: priceCache.bitcoin,
    };
  }

  // Fetch fresh data
  const [gold, silver, bitcoin] = await Promise.all([
    fetchPrice('XAU'),
    fetchPrice('XAG'),
    fetchPrice('BTC'),
  ]);

  priceCache = {
    gold,
    silver,
    bitcoin,
    lastUpdated: now,
  };

  return { gold, silver, bitcoin };
}

// Get gold price only
export async function getGoldPrice(): Promise<GoldPrice | null> {
  const now = Date.now();
  
  if (now - priceCache.lastUpdated < CACHE_DURATION && priceCache.gold) {
    return priceCache.gold;
  }

  const gold = await fetchPrice('XAU');
  priceCache.gold = gold;
  priceCache.lastUpdated = now;
  return gold;
}

// Format price for display
export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Calculate price change (simulated since API doesn't provide it)
export function calculateChange(currentPrice: number, previousPrice?: number): {
  value: number;
  percent: number;
  direction: 'up' | 'down' | 'neutral';
} {
  if (!previousPrice) {
    // Generate a small random change for demo
    const change = (Math.random() - 0.5) * 20;
    const percent = (change / currentPrice) * 100;
    return {
      value: change,
      percent: percent,
      direction: change >= 0 ? 'up' : 'down',
    };
  }

  const change = currentPrice - previousPrice;
  const percent = (change / previousPrice) * 100;
  
  return {
    value: change,
    percent: percent,
    direction: change >= 0 ? 'up' : 'down',
  };
}

// Generate mock historical data for charts
export function generatePriceHistory(basePrice: number, points: number = 50): number[] {
  const data: number[] = [basePrice];
  let currentPrice = basePrice;

  for (let i = 1; i < points; i++) {
    const change = (Math.random() - 0.48) * (basePrice * 0.005);
    currentPrice += change;
    data.push(currentPrice);
  }

  return data;
}
