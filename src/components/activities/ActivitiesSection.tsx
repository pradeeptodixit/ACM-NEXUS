import React from 'react';
import { Layers, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { ACTIVITIES_DATA } from '../../data/activitiesData';

export const ActivitiesSection: React.FC = () => {
  return (
    <section id="activities" className="py-24 bg-nexus-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNITY ECOSYSTEM</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Activities &amp; Learning Cohorts
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A comprehensive recurring calendar of developer labs, peer study circles, and competitive coding marathons engineered for collective student growth.
          </p>

          <div className="mt-3 inline-block px-3 py-0.5 rounded text-xs font-mono bg-slate-900 text-slate-400 border border-slate-800">
            * Proposed chapter activity framework for NAVROHAN 2K26 review
          </div>
        </div>

        {/* Asymmetrical Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES_DATA.map((activity, idx) => {
            // Give first card featured spanning or distinct treatment
            const isFirst = idx === 0;

            return (
              <div
                key={activity.id}
                className={`glass-panel p-6 sm:p-7 rounded-2xl border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 ${
                  isFirst ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-b from-nexus-850 to-nexus-900/90' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="tech-badge text-[10px] px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                      {activity.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {activity.cadence}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {activity.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <h4 className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Key Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {activity.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
