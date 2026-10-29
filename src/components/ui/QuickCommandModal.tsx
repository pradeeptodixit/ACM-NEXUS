import React, { useEffect, useState } from 'react';
import { Search, X, Calendar, Compass, Layers, Users, HelpCircle, User, FileSignature } from 'lucide-react';
import { EVENTS_DATA } from '../../data/eventsData';

interface QuickCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (target: string) => void;
}

export const QuickCommandModal: React.FC<QuickCommandModalProps> = ({
  isOpen,
  onClose,
  onNavigateTo,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(); // toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultActions = [
    { label: 'Upcoming Events & Conclaves', icon: Calendar, target: '#events', category: 'Events' },
    { label: 'Intelligent Event Registration', icon: FileSignature, target: '#registration', category: 'Registration' },
    { label: 'Find Your Next Challenge (Pathways)', icon: Compass, target: '#pathways', category: 'Navigation' },
    { label: 'Activity Ecosystem & Labs', icon: Layers, target: '#activities', category: 'Navigation' },
    { label: 'Chapter Mission & Values', icon: HelpCircle, target: '#about', category: 'Navigation' },
    { label: 'Chapter Council & Roster Roles', icon: Users, target: '#team', category: 'Community' },
    { label: 'Crafted with Purpose (Creator Showcase)', icon: User, target: '#creator', category: 'Attribution' },
    { label: 'FAQ & Contact Desk', icon: HelpCircle, target: '#faq', category: 'Help' },
  ];

  const filteredActions = defaultActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const matchingEvents = EVENTS_DATA.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-nexus-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-title"
    >
      <div className="w-full max-w-xl glass-panel rounded-2xl border-cyan-500/30 shadow-2xl overflow-hidden text-slate-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            id="command-title"
            placeholder="Type a destination or search events (e.g., 'DevSprint', 'Registration')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {matchingEvents.length > 0 && query && (
            <div className="px-3 py-1 text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              Events
            </div>
          )}

          {matchingEvents.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => {
                onNavigateTo('#events');
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/80 flex items-center justify-between text-xs text-slate-200 hover:text-cyan-300 transition-colors"
            >
              <span className="truncate">{ev.title}</span>
              <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0 ml-2">
                {ev.category}
              </span>
            </button>
          ))}

          <div className="px-3 py-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-2">
            Quick Navigation
          </div>

          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.target}
                type="button"
                onClick={() => {
                  onNavigateTo(action.target);
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800/80 flex items-center gap-3 text-xs text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="flex-1 truncate">{action.label}</span>
                <span className="text-[10px] font-mono text-slate-500">{action.category}</span>
              </button>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-nexus-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Use ESC to exit</span>
          <span>ACM NEXUS · Pradeepto Dixit</span>
        </div>

      </div>
    </div>
  );
};
