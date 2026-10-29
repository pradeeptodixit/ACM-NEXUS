import React from 'react';
import { 
  Terminal, 
  BrainCircuit, 
  Cpu, 
  Microscope, 
  Sparkles, 
  Users, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { PATHWAYS_DATA } from '../../data/pathwaysData';
import { EventCategory } from '../../types';

interface PathwaysSectionProps {
  onSelectCategoryFilter: (category: EventCategory) => void;
}

const iconComponents: Record<string, React.ElementType> = {
  Terminal,
  BrainCircuit,
  Cpu,
  Microscope,
  Sparkles,
  Users
};

export const PathwaysSection: React.FC<PathwaysSectionProps> = ({ onSelectCategoryFilter }) => {
  return (
    <section id="pathways" className="py-24 bg-nexus-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>LEARNING DOMAINS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Find Your Next Challenge.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Select a specialized computing domain to discover tailored workshops, reading circles, and upcoming chapter hackathons.
            </p>
          </div>

          <div className="hidden md:block text-right">
            <span className="text-xs font-mono text-slate-400">
              6 SPECIALIZED TRACKS · DIRECT FILTERS
            </span>
          </div>
        </div>

        {/* Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PATHWAYS_DATA.map((pathway, idx) => {
            const Icon = iconComponents[pathway.iconName] || Terminal;
            
            // Asymmetric accent styling per pathway
            const accentBorders = [
              'hover:border-cyan-400/60',
              'hover:border-purple-400/60',
              'hover:border-emerald-400/60',
              'hover:border-blue-400/60',
              'hover:border-pink-400/60',
              'hover:border-amber-400/60',
            ];
            const borderClass = accentBorders[idx % accentBorders.length];

            return (
              <div
                key={pathway.id}
                className={`glass-panel p-7 rounded-2xl border-slate-800/80 transition-all duration-300 flex flex-col justify-between group ${borderClass} hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="tech-badge text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                      {pathway.verb}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {pathway.title}
                  </h3>

                  <p className="text-xs font-mono text-cyan-400/90 mb-3">
                    {pathway.tagline}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {pathway.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pathway.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-nexus-900 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Working Filter Action */}
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter(pathway.targetCategory)}
                  className="w-full mt-2 inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs font-semibold text-slate-200 group-hover:text-cyan-300 group-hover:border-cyan-500/40 group-hover:bg-slate-800/60 transition-all focus:outline-none"
                >
                  <span>Filter {pathway.targetCategory} Events</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
