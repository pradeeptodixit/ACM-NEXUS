import React from 'react';
import { CHAPTER_CONFIG } from '../../data/chapterData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-nexus-950 border-t border-slate-800 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Chapter Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-nexus-850 border border-cyan-400/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                ACM NEXUS
              </span>
              <span className="tech-badge text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                2K26
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              &ldquo;Where Curiosity Becomes Creation.&rdquo; An experiential digital gateway uniting computing scholarship, practical engineering, and community cohorts for the ABES ACM &amp; ACM-W Student Chapters.
            </p>

            <div className="text-xs font-mono text-cyan-400/90 pt-1">
              Recruitment Context: NAVROHAN 2K26
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">Mission &amp; Pillars</a>
              </li>
              <li>
                <a href="#pathways" className="hover:text-cyan-300 transition-colors">Learning Pathways</a>
              </li>
              <li>
                <a href="#activities" className="hover:text-cyan-300 transition-colors">Activity Ecosystem</a>
              </li>
              <li>
                <a href="#events" className="hover:text-cyan-300 transition-colors">Upcoming Events &amp; Conclaves</a>
              </li>
              <li>
                <a href="#registration" className="hover:text-cyan-300 transition-colors">Intelligent Registration</a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-300 transition-colors">Chapter Roles &amp; Council</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">FAQ &amp; Contact Desk</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Creator Notice */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Project Governance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              ACM NEXUS is an independent student-built concept website created by Pradeepto Dixit for NAVROHAN 2K26. ACM and ACM-W marks and emblems belong to the Association for Computing Machinery.
            </p>
            <div className="p-3 rounded-lg bg-nexus-900/90 border border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="text-cyan-300 font-semibold mb-0.5">Website Creator &amp; Architect:</div>
              <div>{CHAPTER_CONFIG.creator.name}</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Non-Negotiable Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          
          {/* Creator Attribution */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="font-semibold text-slate-200">
              {CHAPTER_CONFIG.creator.footerAttribution}
            </span>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>

        </div>

      </div>
    </footer>
  );
};
