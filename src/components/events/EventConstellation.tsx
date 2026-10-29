import React, { useState } from 'react';
import { EventItem } from '../../types';
import { Calendar, MapPin, ArrowRight, Eye } from 'lucide-react';

interface EventConstellationProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onRegisterEvent: (eventId: string) => void;
}

export const EventConstellation: React.FC<EventConstellationProps> = ({
  events,
  onSelectEvent,
  onRegisterEvent,
}) => {
  const [activeEventId, setActiveEventId] = useState<string>(events[0]?.id || '');
  const activeEvent = events.find((e) => e.id === activeEventId) || events[0];

  // Coordinates for constellation nodes in a 600x420 viewBox
  const nodePositions = [
    { x: 300, y: 190 }, // Center-ish
    { x: 130, y: 100 }, // Top-left
    { x: 470, y: 110 }, // Top-right
    { x: 100, y: 310 }, // Bottom-left
    { x: 490, y: 300 }, // Bottom-right
    { x: 300, y: 360 }, // Bottom-center
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/20 shadow-2xl">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Constellation SVG Diagram */}
        <div className="w-full lg:w-7/12 relative flex items-center justify-center">
          <div className="w-full max-w-[560px] aspect-[4/3] relative">
            <svg
              viewBox="0 0 600 420"
              className="w-full h-full drop-shadow-lg"
              role="img"
              aria-label="Event Constellation Diagram: Interactive node network representing upcoming chapter events."
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting lines between nodes */}
              {events.map((_, i) => {
                const posA = nodePositions[i % nodePositions.length];
                return events.map((_, j) => {
                  if (j <= i) return null;
                  const posB = nodePositions[j % nodePositions.length];
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={posA.x}
                      y1={posA.y}
                      x2={posB.x}
                      y2={posB.y}
                      stroke="url(#lineGrad)"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />
                  );
                });
              })}

              {/* Orbital guide ring */}
              <circle cx="300" cy="210" r="160" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" fill="none" />

              {/* Event Nodes */}
              {events.map((ev, idx) => {
                const pos = nodePositions[idx % nodePositions.length];
                const isActive = ev.id === activeEventId;

                return (
                  <g
                    key={ev.id}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setActiveEventId(ev.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${ev.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveEventId(ev.id);
                      }
                    }}
                  >
                    {/* Pulsing ring for active node */}
                    {isActive && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="24"
                        fill="rgba(6, 182, 212, 0.2)"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? '18' : '14'}
                      fill={isActive ? '#06B6D4' : '#0F1D3D'}
                      stroke={isActive ? '#38BDF8' : '#1E3A75'}
                      strokeWidth="2.5"
                      filter={isActive ? 'url(#glowFilter)' : undefined}
                    />

                    {/* Center point */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill={isActive ? '#FFFFFF' : '#38BDF8'}
                    />

                    {/* Node label */}
                    <text
                      x={pos.x}
                      y={pos.y + 28}
                      textAnchor="middle"
                      fill={isActive ? '#22D3EE' : '#94A3B8'}
                      fontSize={isActive ? '11' : '10'}
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight={isActive ? '600' : '400'}
                    >
                      {ev.category.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Event Preview Card */}
        {activeEvent && (
          <div className="w-full lg:w-5/12 bg-nexus-900/90 p-6 rounded-xl border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="tech-badge text-[11px] px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                {activeEvent.category}
              </span>
              <span className="tech-badge text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                {activeEvent.format}
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white leading-snug">
              {activeEvent.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeEvent.description}
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeEvent.date} · {activeEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">{activeEvent.location}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => onSelectEvent(activeEvent)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:border-cyan-500/40 hover:text-white transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Details &amp; Agenda</span>
              </button>

              <button
                type="button"
                onClick={() => onRegisterEvent(activeEvent.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 font-bold text-xs shadow-glow-cyan hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
