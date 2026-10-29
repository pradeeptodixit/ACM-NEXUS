import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  ListChecks, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { EventItem } from '../../types';
import { generateICalendarData } from '../../data/eventsData';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegister: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onRegister }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleDownloadCalendar = () => {
    const icsContent = generateICalendarData(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nexus-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border-cyan-500/30 shadow-2xl p-6 sm:p-8 text-slate-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors focus:outline-none"
          aria-label="Close Event Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="tech-badge text-xs px-2.5 py-1 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/30">
            {event.category}
          </span>
          <span className="tech-badge text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700">
            {event.format}
          </span>
          <span className={`tech-badge text-xs px-2.5 py-1 rounded border ${
            event.status === 'Open'
              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
              : event.status === 'Filling Fast'
              ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
              : 'bg-rose-950/60 text-rose-400 border-rose-500/30'
          }`}>
            Status: {event.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <h2 id="modal-event-title" className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 pr-8">
          {event.title}
        </h2>
        <p className="text-sm font-mono text-cyan-400/90 mb-6">
          {event.tagline}
        </p>

        {/* Logistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-nexus-900/90 border border-slate-800 text-xs mb-6">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Date:</strong> {event.date}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Time:</strong> {event.time}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300 sm:col-span-2">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Venue:</strong> {event.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-400 sm:col-span-2 pt-1 border-t border-slate-800/60">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong>Registration Deadline:</strong> {event.registrationDeadline}</span>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-semibold">
            Event Overview
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {event.description}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            {event.fullDetails}
          </p>
        </div>

        {/* Prerequisites */}
        {event.prerequisites && event.prerequisites.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-cyan-400" />
              Recommended Prerequisites
            </h3>
            <ul className="space-y-1.5">
              {event.prerequisites.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Takeaways */}
        {event.takeaways && event.takeaways.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Participant Takeaways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {event.takeaways.map((takeaway, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample disclaimer */}
        {event.isSampleData && (
          <div className="mb-6 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400">
            * Sample event announcement configured for NAVROHAN 2K26 review.
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 transition-colors focus:outline-none"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download .ics Calendar Invite</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onRegister(event.id);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 text-sm font-bold shadow-glow-cyan hover:from-cyan-400 hover:to-blue-500 transition-all focus:outline-none"
          >
            <span>Proceed to Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
