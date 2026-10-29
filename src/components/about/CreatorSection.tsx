import React from 'react';
import { Sparkles, Code, Layout, ShieldCheck, HeartHandshake, Terminal } from 'lucide-react';
import { CHAPTER_CONFIG } from '../../data/chapterData';

export const CreatorSection: React.FC = () => {
  const { creator } = CHAPTER_CONFIG;

  const principleIcons = [
    Layout,
    ShieldCheck,
    Terminal,
    HeartHandshake,
  ];

  return (
    <section id="creator" className="py-24 bg-gradient-to-b from-nexus-900 to-nexus-950 relative border-t border-cyan-500/20 overflow-hidden">
      {/* Background aesthetic lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Creator Hero Block */}
        <div className="glass-panel p-8 sm:p-12 md:p-14 rounded-3xl border-cyan-400/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-nexus-900/90 via-nexus-850/90 to-nexus-900/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Monogram / Portrait Avatar */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-6">
                {/* Orbital glow rings */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-30 blur-lg" />
                
                {/* Tactile Monogram Plate */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-nexus-800 via-nexus-900 to-nexus-950 border-2 border-cyan-400/50 shadow-glow-cyan flex flex-col items-center justify-center p-4">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                    PD
                  </div>
                  <span className="mt-2 text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
                    ARCHITECT
                  </span>
                  <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 font-bold shadow-md">
                    2K26
                  </div>
                </div>
              </div>

              <div className="tech-badge text-xs px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                {creator.roleTag}
              </div>
            </div>

            {/* Right Editorial Copy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>SIGNATURE CREATOR SHOWCASE</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {creator.aboutHeadline}
              </h2>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Designed &amp; Engineered by
                </span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-cyan-300">
                  {creator.name}
                </div>
                <div className="text-sm font-mono text-slate-400">
                  {creator.title} · NAVROHAN 2K26 Submission
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                {creator.aboutDescription}
              </p>

              <div className="p-4 rounded-xl bg-nexus-950/80 border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed">
                <strong className="text-slate-300 font-semibold">Authorship Statement: </strong> 
                This web application represents an original independent engineering submission crafted by Pradeepto Dixit for the ABES ACM &amp; ACM-W chapter recruitment assignment.
              </div>
            </div>

          </div>

          {/* Implementation Principles Grid */}
          <div className="mt-14 pt-10 border-t border-slate-800/80">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Engineering &amp; Architectural Tenets
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {creator.engineeringPrinciples.map((principle, idx) => {
                const Icon = principleIcons[idx] || Code;
                return (
                  <div
                    key={principle.title}
                    className="p-5 rounded-xl bg-nexus-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
