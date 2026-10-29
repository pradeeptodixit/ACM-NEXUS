import React from 'react';
import { 
  Code2, 
  Lightbulb, 
  Users, 
  ShieldAlert, 
  BookOpen, 
  Award,
  Globe,
  HeartHandshake,
  FileCheck2
} from 'lucide-react';
import { CHAPTER_CONFIG } from '../../data/chapterData';

const iconMap = [
  Code2,
  Lightbulb,
  Users,
  ShieldAlert,
  BookOpen,
  Award
];

export const MissionSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-nexus-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNITY FOUNDATIONS</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {CHAPTER_CONFIG.mission.title}
          </h2>
          
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            {CHAPTER_CONFIG.mission.subtitle}
          </p>

          {/* Transparent Draft Label */}
          <div className="mt-4 inline-block px-3 py-1 rounded text-xs font-mono bg-slate-900/80 text-slate-400 border border-slate-800">
            Notice: {CHAPTER_CONFIG.mission.draftDisclaimer}
          </div>
        </div>

        {/* Narrative Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CHAPTER_CONFIG.mission.paragraphs.map((para, idx) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800">
              <p className="text-slate-300 leading-relaxed text-base">
                {para}
              </p>
            </div>
          ))}
        </div>

        {/* 6 Value Pillars */}
        <div className="mb-20">
          <h3 className="text-xl font-display font-semibold text-white mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Core Pillars of Student Engagement</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTER_CONFIG.mission.pillars.map((pillar, idx) => {
              const Icon = iconMap[idx] || Code2;
              return (
                <div
                  key={pillar.title}
                  className="glass-panel glass-panel-hover p-6 rounded-xl border-slate-800/80 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 group-hover:border-cyan-400/50 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACM & ACM-W Dual Ecosystem Context (Section 9) */}
        <div className="rounded-2xl glass-panel p-8 sm:p-10 border-cyan-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-8">
            <span className="tech-badge text-cyan-400">ORGANIZATIONAL REACH</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              The ABES ACM &amp; ACM-W Ecosystem
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              {CHAPTER_CONFIG.acmContext.chapterRole}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ACM Chapter */}
            <div className="p-6 rounded-xl bg-nexus-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">ABES ACM Student Chapter</h4>
                  <span className="text-xs text-slate-400">Computing Excellence &amp; Systems Craft</span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {CHAPTER_CONFIG.acmContext.acmSummary}
              </p>
            </div>

            {/* ACM-W Chapter */}
            <div className="p-6 rounded-xl bg-nexus-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">ABES ACM-W Student Chapter</h4>
                  <span className="text-xs text-slate-400">Empowering Women in Computing</span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {CHAPTER_CONFIG.acmContext.acmwSummary}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
