import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Search, 
  Grid, 
  Download, 
  Eye, 
  Sparkles,
  AlertCircle,
  Network
} from 'lucide-react';
import { EventItem, EventCategory } from '../../types';
import { EVENTS_DATA, EVENT_CATEGORIES, generateICalendarData } from '../../data/eventsData';
import { EventDetailModal } from './EventDetailModal';
import { EventConstellation } from './EventConstellation';

interface EventsSectionProps {
  selectedCategory: EventCategory;
  onSelectCategory: (category: EventCategory) => void;
  onRegisterEvent: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onRegisterEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'constellation'>('grid');
  const [inspectedEvent, setInspectedEvent] = useState<EventItem | null>(null);

  // Filter logic
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured event (DevSprint)
  const featuredEvent = useMemo(() => {
    return EVENTS_DATA.find((e) => e.featured) || EVENTS_DATA[0];
  }, []);

  const handleDownloadCalendar = (e: React.MouseEvent, event: EventItem) => {
    e.stopPropagation();
    const ics = generateICalendarData(event);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="events" className="py-24 bg-nexus-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>CHAPTER CALENDAR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Upcoming Events &amp; Conclaves
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300">
              Discover student-led engineering sprints, research colloquiums, and competitive arenas hosted under NAVROHAN 2K26.
            </p>
          </div>

          {/* View mode toggle (Grid vs Constellation) */}
          <div className="flex items-center gap-2 self-start lg:self-auto p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Card Grid</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('constellation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'constellation'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Constellation</span>
            </button>
          </div>
        </div>

        {/* Featured Flagship Event Card (DevSprint) */}
        {featuredEvent && (
          <div className="mb-14 relative rounded-2xl overflow-hidden glass-panel border-cyan-400/30 p-6 sm:p-8 md:p-10 shadow-2xl bg-gradient-to-r from-nexus-900 via-nexus-850 to-nexus-900">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="tech-badge text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/40 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                FEATURED FLAGSHIP SPRINT
              </span>
              <span className="tech-badge text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                {featuredEvent.category}
              </span>
              <span className="tech-badge text-xs px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                Registration Open
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {featuredEvent.title}
                </h3>
                <p className="text-sm font-mono text-cyan-300/90">
                  {featuredEvent.tagline}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {featuredEvent.description}
                </p>

                {/* Logistics tags */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => onRegisterEvent(featuredEvent.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 font-bold shadow-glow-cyan hover:from-cyan-400 hover:to-blue-500 transition-all text-sm focus:outline-none"
                >
                  <span>Register for DevSprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectedEvent(featuredEvent)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-cyan-500/40 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inspect Agenda</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDownloadCalendar(e, featuredEvent)}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                    title="Add to Calendar (.ics)"
                    aria-label="Download .ics Calendar Invite"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Event Count */}
            <div className="text-xs font-mono text-slate-400 self-center sm:self-auto">
              Showing <span className="text-cyan-300 font-bold">{filteredEvents.length}</span> of {EVENTS_DATA.length} events
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
            {EVENT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-nexus-950 font-bold shadow-glow-cyan'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Switching: Grid or Constellation */}
        {viewMode === 'constellation' ? (
          <EventConstellation
            events={filteredEvents}
            onSelectEvent={(ev) => setInspectedEvent(ev)}
            onRegisterEvent={(id) => onRegisterEvent(id)}
          />
        ) : (
          /* Cards Grid */
          filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border-slate-800 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top Meta */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="tech-badge text-[10px] px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        {event.category}
                      </span>
                      <span className={`tech-badge text-[10px] px-2 py-0.5 rounded border ${
                        event.status === 'Open'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                      }`}>
                        {event.status}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-xs font-mono text-cyan-400/80 mb-3 line-clamp-1">
                      {event.tagline}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <div className="space-y-1 text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setInspectedEvent(event)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                        title="View Agenda & Details"
                        aria-label={`View Details for ${event.title}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownloadCalendar(e, event)}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-colors"
                        title="Download .ics Calendar Invite"
                        aria-label={`Download calendar file for ${event.title}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onRegisterEvent(event.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 font-bold text-xs shadow-glow-cyan hover:from-cyan-400 hover:to-blue-500 transition-all focus:outline-none"
                      >
                        <span>Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Smart Empty State */
            <div className="glass-panel p-12 rounded-2xl border-slate-800 text-center max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">No Matching Events Found</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                There are currently no events matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try clearing your search term or switching to &ldquo;All&rdquo; categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('All');
                }}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-semibold hover:border-cyan-500/40"
              >
                Reset All Filters
              </button>
            </div>
          )
        )}

        {/* Modal Inspector */}
        <EventDetailModal
          event={inspectedEvent}
          onClose={() => setInspectedEvent(null)}
          onRegister={(id) => onRegisterEvent(id)}
        />

      </div>
    </section>
  );
};
