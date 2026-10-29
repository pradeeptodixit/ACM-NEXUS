import React from 'react';
import { Search, CheckCircle2, FileSignature, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    name: 'Discover',
    icon: Search,
    title: 'Explore Chapter Catalog',
    desc: 'Browse domain tracks across Engineering, AI/ML, Algorithms, Research, and ACM-W events with clear prerequisites.'
  },
  {
    step: '02',
    name: 'Choose',
    icon: CheckCircle2,
    title: 'Select Your Challenge',
    desc: 'Inspect technical takeaways, scheduled timings, speaker profiles, and format (In-Person, Hybrid, or Virtual).'
  },
  {
    step: '03',
    name: 'Register',
    icon: FileSignature,
    title: 'Instant Verified Entry',
    desc: 'Provide your academic details. Receive an authentic confirmation code, seat reservation, and one-click .ics calendar invite.'
  },
  {
    step: '04',
    name: 'Participate',
    icon: Rocket,
    title: 'Collaborate & Build',
    desc: 'Attend hands-on labs, connect with peer mentors, deploy code, and earn verifiable chapter credentials.'
  }
];

export const EventJourney: React.FC = () => {
  return (
    <div className="py-12 border-y border-slate-800/80 bg-nexus-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="tech-badge text-cyan-400">STUDENT PARTICIPATION WORKFLOW</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            The Event Journey
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            A frictionless, transparent progression designed for students to join technical cohorts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="relative glass-panel p-6 rounded-xl border-slate-800 flex flex-col group hover:border-cyan-500/40 transition-colors"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <span className="tech-badge text-xs text-slate-400 font-semibold mb-1">
                  STAGE {item.name}
                </span>

                <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
