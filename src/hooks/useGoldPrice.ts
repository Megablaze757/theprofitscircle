// ============================================
// GOLD PRICE HOOK
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { getAllPrices, formatPrice, calculateChange, generatePriceHistory } from '@/services/goldApi';
import type { GoldPrice } from '@/types';

interface UseGoldPriceReturn {
  gold: GoldPrice | null;
  silver: GoldPrice | null;
  bitcoin: GoldPrice | null;
  loading: boolean;
  error: string | null;
  formattedPrice: string;
  priceChange: { value: number; percent: number; direction: 'up' | 'down' | 'neutral' };
  priceHistory: number[];
  refresh: () => Promise<void>;
}

export function useGoldPrice(): UseGoldPriceReturn {
  const [gold, setGold] = useState<GoldPrice | null>(null);
  const [silver, setSilver] = useState<GoldPrice | null>(null);
  const [bitcoin, setBitcoin] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const prices = await getAllPrices();
      setGold(prices.gold);
      setSilver(prices.silver);
      setBitcoin(prices.bitcoin);
      
      if (prices.gold) {
        setPriceHistory(generatePriceHistory(prices.gold.price));
      }
    } catch (err) {
      setError('Failed to fetch gold price');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const formattedPrice = gold ? `$${formatPrice(gold.price)}` : 'Loading...';
  const priceChange = gold ? calculateChange(gold.price) : { value: 0, percent: 0, direction: 'neutral' as const };

  return {
    gold,
    silver,
    bitcoin,
    loading,
    error,
    formattedPrice,
    priceChange,
    priceHistory,
    refresh: fetchPrices,
  };
}
