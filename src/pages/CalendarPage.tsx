// ============================================
// ECONOMIC CALENDAR PAGE — Future Events
// ============================================

import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Filter, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { generateFutureEvents, filterEventsByImpact, getThisWeekEvents, formatEventDate } from '@/services/calendar';
import type { EconomicEvent } from '@/types';

function CalendarPage() {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EconomicEvent[]>([]);
  const [impactFilter, setImpactFilter] = useState<('high' | 'medium' | 'low')[]>(['high', 'medium', 'low']);
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);

  useEffect(() => {
    const allEvents = generateFutureEvents();
    setEvents(allEvents);
    setFilteredEvents(allEvents);
  }, []);

  useEffect(() => {
    setFilteredEvents(filterEventsByImpact(events, impactFilter));
  }, [impactFilter, events]);

  const toggleImpact = (impact: 'high' | 'medium' | 'low') => {
    if (impactFilter.includes(impact)) {
      setImpactFilter(impactFilter.filter(i => i !== impact));
    } else {
      setImpactFilter([...impactFilter, impact]);
    }
  };

  const thisWeekEvents = getThisWeekEvents(events);
  // const highImpactCount = events.filter(e => e.impact === 'high').length;

  // Group events by date
  const groupedEvents: Record<string, EconomicEvent[]> = {};
  filteredEvents.forEach(event => {
    if (!groupedEvents[event.date]) {
      groupedEvents[event.date] = [];
    }
    groupedEvents[event.date].push(event);
  });

  return (
    <div className="page-content">
      {/* Page Hero */}
      <div 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(77,159,255,0.07), transparent)',
          borderBottom: '1px solid rgba(77,159,255,0.2)'
        }}
      >
        <div className="grid-bg opacity-40" />
        <div className="container relative z-10">
          <div className="section-eyebrow">
            <Calendar className="w-4 h-4" />
            Economic Calendar
          </div>
          <h1 className="section-title">
            Gold Market <span className="text-blue">Calendar</span>
          </h1>
          <div className="accent-line">
            <div className="al-diamond" />
          </div>
          <p className="text-white/60 max-w-xl">
            Never get caught off guard. Track high-impact news events — NFP, CPI, FOMC — 
            that move gold markets. Plan your trades ahead.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              {/* This Week Summary */}
              <div className="card">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  This Week
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Total Events</span>
                    <span className="text-sm font-mono text-white/70">{thisWeekEvents.length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">High Impact</span>
                    <span className="text-sm font-mono text-red">
                      {thisWeekEvents.filter(e => e.impact === 'high').length}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/50">Medium Impact</span>
                    <span className="text-sm font-mono text-gold">
                      {thisWeekEvents.filter(e => e.impact === 'medium').length}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-white/50">Low Impact</span>
                    <span className="text-sm font-mono text-white/50">
                      {thisWeekEvents.filter(e => e.impact === 'low').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Impact Legend */}
              <div className="card">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                  Impact Levels
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'var(--black2)' }}>
                    <div className="w-3 h-3 rounded-full bg-red" />
                    <div>
                      <div className="text-sm font-medium">High Impact</div>
                      <div className="text-xs text-white/50">NFP, CPI, FOMC — Major moves</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'var(--black2)' }}>
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <div>
                      <div className="text-sm font-medium">Medium Impact</div>
                      <div className="text-xs text-white/50">PMI, Retail Sales — Moderate</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'var(--black2)' }}>
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div>
                      <div className="text-sm font-medium">Low Impact</div>
                      <div className="text-xs text-white/50">Minor data releases</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Tips */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}
              >
                <div className="text-xs font-bold text-gold mb-2">
                  <Info className="w-3 h-3 inline mr-1" />
                  Trading Tips
                </div>
                <ul className="text-xs text-white/50 space-y-1.5">
                  <li>• Avoid trading 30 min before/after NFP</li>
                  <li>• Wait for the initial spike to settle</li>
                  <li>• Use wider stops on high-impact days</li>
                  <li>• Check the forecast vs actual</li>
                </ul>
              </div>
            </div>

            {/* Events List */}
            <div>
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['high', 'medium', 'low'] as const).map((impact) => (
                  <button
                    key={impact}
                    onClick={() => toggleImpact(impact)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                      impactFilter.includes(impact)
                        ? impact === 'high' 
                          ? 'bg-red/10 text-red border border-red/30'
                          : impact === 'medium'
                            ? 'bg-gold/10 text-gold border border-gold/30'
                            : 'bg-white/10 text-white/70 border border-white/20'
                        : 'bg-transparent text-white/30 border border-white/10'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      impact === 'high' ? 'bg-red' : impact === 'medium' ? 'bg-gold' : 'bg-white/30'
                    }`} />
                    {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
                  </button>
                ))}
              </div>

              {/* Events */}
              <div className="space-y-6">
                {Object.entries(groupedEvents).length === 0 ? (
                  <div className="card text-center py-16">
                    <Filter className="w-12 h-12 mx-auto mb-4 text-white/20" />
                    <div className="font-bebas text-xl tracking-wider mb-2">No Events Found</div>
                    <p className="text-sm text-white/50">
                      No events match your current filter. Try selecting different impact levels.
                    </p>
                  </div>
                ) : (
                  Object.entries(groupedEvents).map(([date, dayEvents]) => (
                    <div key={date}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue/20 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue" />
                        </div>
                        <div>
                          <div className="font-bold">{formatEventDate(date)}</div>
                          <div className="text-xs text-white/50">{date}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {dayEvents.map((event) => (
                          <div 
                            key={event.id}
                            className="card cursor-pointer hover:border-blue/30 transition-all"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="text-2xl">{event.currency}</div>
                                <div>
                                  <div className="font-medium mb-1">{event.title}</div>
                                  <div className="flex items-center gap-3 text-sm text-white/50">
                                    <span>{event.time} GMT</span>
                                    <Badge 
                                      variant="outline"
                                      className={
                                        event.impact === 'high' ? 'border-red text-red' :
                                        event.impact === 'medium' ? 'border-gold text-gold' :
                                        'border-white/30 text-white/50'
                                      }
                                    >
                                      {event.impact.toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                {event.previous && (
                                  <div className="text-center">
                                    <div className="text-[10px] text-white/40 uppercase">Previous</div>
                                    <div className="font-mono text-white/70">{event.previous}</div>
                                  </div>
                                )}
                                {event.forecast && (
                                  <div className="text-center">
                                    <div className="text-[10px] text-white/40 uppercase">Forecast</div>
                                    <div className="font-mono text-blue">{event.forecast}</div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {event.goldImpact && (
                              <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-white/60">{event.goldImpact}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay open" onClick={() => setSelectedEvent(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{selectedEvent.currency}</span>
                  <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                </div>
                <div className="text-sm text-white/50">
                  {formatEventDate(selectedEvent.date)} at {selectedEvent.time} GMT
                </div>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="modal-close">
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div 
                  className="flex-1 p-4 rounded-xl text-center"
                  style={{ background: 'var(--black2)' }}
                >
                  <div className="text-[10px] text-white/40 uppercase mb-1">Previous</div>
                  <div className="font-mono font-bold text-lg">{selectedEvent.previous || '—'}</div>
                </div>
                <div 
                  className="flex-1 p-4 rounded-xl text-center"
                  style={{ background: 'var(--black2)' }}
                >
                  <div className="text-[10px] text-white/40 uppercase mb-1">Forecast</div>
                  <div className="font-mono font-bold text-lg text-blue">{selectedEvent.forecast || '—'}</div>
                </div>
                <div 
                  className="flex-1 p-4 rounded-xl text-center"
                  style={{ background: 'var(--black2)' }}
                >
                  <div className="text-[10px] text-white/40 uppercase mb-1">Impact</div>
                  <Badge 
                    variant="outline"
                    className={
                      selectedEvent.impact === 'high' ? 'border-red text-red' :
                      selectedEvent.impact === 'medium' ? 'border-gold text-gold' :
                      'border-white/30 text-white/50'
                    }
                  >
                    {selectedEvent.impact.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {selectedEvent.goldImpact && (
                <div 
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}
                >
                  <div className="flex items-center gap-2 text-gold font-bold mb-2">
                    <TrendingUp className="w-4 h-4" />
                    Gold Impact Analysis
                  </div>
                  <p className="text-sm text-white/70">{selectedEvent.goldImpact}</p>
                </div>
              )}

              <div className="p-4 rounded-xl" style={{ background: 'var(--black2)' }}>
                <div className="flex items-center gap-2 text-blue font-bold mb-2">
                  <Info className="w-4 h-4" />
                  Trading Strategy
                </div>
                <ul className="text-sm text-white/60 space-y-1.5">
                  <li>• Wait for the initial reaction to settle (15-30 min)</li>
                  <li>• Trade in the direction of the trend post-news</li>
                  <li>• Use wider stops during high volatility</li>
                  <li>• Consider staying out if you're unsure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
