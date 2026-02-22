// ============================================
// ECONOMIC CALENDAR SERVICE
// Future events data for gold traders
// ============================================

import type { EconomicEvent } from '@/types';

// Generate future economic events based on typical schedule
export function generateFutureEvents(): EconomicEvent[] {
  const events: EconomicEvent[] = [];
  const today = new Date();
  
  // High impact events that move gold
  const highImpactEvents = [
    { title: 'Non-Farm Payrolls (NFP)', currency: '🇺🇸', goldImpact: 'Strong USD rally on beat → GOLD bearish. Miss → GOLD bullish. Biggest monthly mover.' },
    { title: 'Fed Interest Rate Decision (FOMC)', currency: '🇺🇸', goldImpact: 'Hawkish language → GOLD sells. Dovish pivot → GOLD rallies. Watch the statement, not just the rate.' },
    { title: 'US CPI (Consumer Price Index)', currency: '🇺🇸', goldImpact: 'Hot CPI = more hikes = GOLD pressure. Cool CPI = rate cut hopes = GOLD rally.' },
    { title: 'US Core PCE Price Index', currency: '🇺🇸', goldImpact: 'Fed\'s preferred inflation gauge. Key for gold direction heading into FOMC.' },
    { title: 'Initial Jobless Claims', currency: '🇺🇸', goldImpact: 'Rising claims = weak economy = possible rate cuts = GOLD support.' },
    { title: 'Federal Reserve Meeting Minutes', currency: '🇺🇸', goldImpact: 'Look for mentions of "data-dependent" or pivot signals. Can create sharp GOLD moves.' },
    { title: 'US GDP (Preliminary)', currency: '🇺🇸', goldImpact: 'Weak GDP = recession fears = safe haven GOLD demand.' },
    { title: 'US ADP Employment Change', currency: '🇺🇸', goldImpact: 'Preview of NFP. Markets trade it as a clue ahead of Friday\'s print.' },
  ];

  const mediumImpactEvents = [
    { title: 'US ISM Manufacturing PMI', currency: '🇺🇸', goldImpact: 'Below 50 = contraction = risk off = modest GOLD support.' },
    { title: 'UK CPI (Inflation)', currency: '🇬🇧', goldImpact: 'GBP/USD move can affect GOLD correlations indirectly.' },
    { title: 'ECB Interest Rate Decision', currency: '🇪🇺', goldImpact: 'EUR strength/weakness affects DXY, which is inversely correlated with GOLD.' },
    { title: 'US Retail Sales', currency: '🇺🇸', goldImpact: 'Strong consumer = stronger USD = slight GOLD headwind.' },
    { title: 'US PPI (Producer Price Index)', currency: '🇺🇸', goldImpact: 'Leading indicator of consumer inflation. Directional for Fed expectations.' },
    { title: 'University of Michigan Sentiment', currency: '🇺🇸', goldImpact: 'Contains inflation expectations — key for GOLD short-term positioning.' },
    { title: 'US Factory Orders', currency: '🇺🇸', goldImpact: 'Economic health indicator. Weak data supports GOLD.' },
    { title: 'German ZEW Economic Sentiment', currency: '🇪🇺', goldImpact: 'Eurozone sentiment affects EUR/USD and indirectly GOLD.' },
  ];

  const lowImpactEvents = [
    { title: 'US JOLTS Job Openings', currency: '🇺🇸' },
    { title: 'UK GDP Monthly', currency: '🇬🇧' },
    { title: 'Euro Zone Unemployment Rate', currency: '🇪🇺' },
    { title: 'Canadian Employment Change', currency: '🇨🇦' },
    { title: 'Australian RBA Rate Decision', currency: '🇦🇺' },
    { title: 'US Housing Starts', currency: '🇺🇸' },
    { title: 'US Building Permits', currency: '🇺🇸' },
  ];

  // Generate events for next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Add high impact events (1-2 per week)
    if (i % 4 === 0) {
      const event = highImpactEvents[Math.floor(i / 4) % highImpactEvents.length];
      events.push({
        id: `high-${i}`,
        date: dateStr,
        time: getRandomTime(),
        currency: event.currency,
        title: event.title,
        impact: 'high',
        forecast: generateForecast(event.title),
        previous: generatePrevious(event.title),
        goldImpact: event.goldImpact,
      });
    }

    // Add medium impact events (2-3 per week)
    if (i % 3 === 1) {
      const event = mediumImpactEvents[Math.floor(i / 3) % mediumImpactEvents.length];
      events.push({
        id: `med-${i}`,
        date: dateStr,
        time: getRandomTime(),
        currency: event.currency,
        title: event.title,
        impact: 'medium',
        forecast: generateForecast(event.title),
        previous: generatePrevious(event.title),
        goldImpact: event.goldImpact,
      });
    }

    // Add low impact events (occasional)
    if (i % 5 === 2) {
      const event = lowImpactEvents[Math.floor(i / 5) % lowImpactEvents.length];
      events.push({
        id: `low-${i}`,
        date: dateStr,
        time: getRandomTime(),
        currency: event.currency,
        title: event.title,
        impact: 'low',
        forecast: generateForecast(event.title),
        previous: generatePrevious(event.title),
      });
    }
  }

  return events.sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());
}

function getRandomTime(): string {
  const hours = [8, 9, 10, 12, 13, 14, 15, 16, 17];
  const mins = ['00', '15', '30', '45'];
  const hour = hours[Math.floor(Math.random() * hours.length)];
  const min = mins[Math.floor(Math.random() * mins.length)];
  return `${hour.toString().padStart(2, '0')}:${min}`;
}

function generateForecast(title: string): string {
  if (title.includes('NFP')) return '185K';
  if (title.includes('CPI')) return '3.2%';
  if (title.includes('FOMC') || title.includes('Rate')) return '5.50%';
  if (title.includes('GDP')) return '2.1%';
  if (title.includes('PMI')) return '48.5';
  if (title.includes('Claims')) return '215K';
  return '—';
}

function generatePrevious(title: string): string {
  if (title.includes('NFP')) return '227K';
  if (title.includes('CPI')) return '3.4%';
  if (title.includes('FOMC') || title.includes('Rate')) return '5.50%';
  if (title.includes('GDP')) return '3.2%';
  if (title.includes('PMI')) return '47.8';
  if (title.includes('Claims')) return '208K';
  return '—';
}

// Filter events by date range
export function filterEventsByDateRange(
  events: EconomicEvent[],
  startDate: string,
  endDate: string
): EconomicEvent[] {
  return events.filter(e => e.date >= startDate && e.date <= endDate);
}

// Filter events by impact
export function filterEventsByImpact(
  events: EconomicEvent[],
  impacts: ('high' | 'medium' | 'low')[]
): EconomicEvent[] {
  return events.filter(e => impacts.includes(e.impact));
}

// Get events for a specific date
export function getEventsForDate(events: EconomicEvent[], date: string): EconomicEvent[] {
  return events.filter(e => e.date === date);
}

// Get this week's events
export function getThisWeekEvents(events: EconomicEvent[]): EconomicEvent[] {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return events.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate >= monday && eventDate <= sunday;
  });
}

// Format date for display
export function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
