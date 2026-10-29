import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { NexusCanvas } from './NexusCanvas';
import { CHAPTER_CONFIG } from '../../data/chapterData';

interface NexusHeroProps {
  onExploreEvents: () => void;
  onExploreCommunity: () => void;
}

export const NexusHero: React.FC<NexusHeroProps> = ({
  onExploreEvents,
  onExploreCommunity,
}) => {
  return (
    <section 
      id="hero"
      aria-label="Introduction" 
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center bg-grid-pattern overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Copy & Authorship */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>NAVROHAN 2K26 · STUDENT COMPUTING COMMUNITY</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Where Curiosity <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Becomes Creation.
              </span>
            </h1>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Discover computing, build practical skills, collaborate on ambitious ideas, and turn curiosity into meaningful experiences with the student technology community.
            </p>

            {/* NON-NEGOTIABLE HERO-SECTION CREATOR ATTRIBUTION */}
            <div className="pt-1 pb-1">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nexus-900/90 via-nexus-850 to-nexus-900/90 border border-cyan-400/40 shadow-glow-cyan/50 backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold">
                  PD
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                    Creator Attribution
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-300">Designed &amp; Engineered by</span>
                    <span className="text-sm font-bold text-cyan-300 tracking-wide hover:text-white transition-colors">
                      {CHAPTER_CONFIG.creator.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreEvents}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 font-bold hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
              >
                <span>Discover Upcoming Events</span>
                <ArrowRight className="w-4 h-4 text-nexus-950" />
              </button>

              <button
                type="button"
                onClick={onExploreCommunity}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-panel text-slate-200 font-semibold hover:text-white hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all focus:outline-none"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Explore Our Community</span>
              </button>
            </div>

            {/* Trust line */}
            <div className="pt-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Student-built website concept for ABES ACM &amp; ACM-W Chapters</span>
            </div>

          </div>

          {/* Right Hero Column: Interactive Nexus Network Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl glass-panel p-2 sm:p-4 overflow-hidden border-cyan-500/20 shadow-2xl">
              <NexusCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
