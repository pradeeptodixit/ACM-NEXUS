import React from 'react';
import { Users2, Info } from 'lucide-react';
import { CHAPTER_TEAM_DATA } from '../../data/teamData';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-nexus-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
            <Users2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORGANIZATIONAL GOVERNANCE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Chapter Council &amp; Roles
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            The student chapter executive leadership structure and faculty advisory framework governing ABES ACM and ACM-W initiatives.
          </p>

          {/* Transparent Notice */}
          <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note on Roster Information:</strong> The official executive council for the 2026–2027 term is currently in nomination and review under NAVROHAN 2K26. Role placeholders below outline the official governance architecture and will be populated upon final ratification by the faculty sponsor.
            </span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTER_TEAM_DATA.map((member) => (
            <div
              key={member.id}
              className="glass-panel p-6 rounded-2xl border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* Monogram Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexus-850 to-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-300 text-sm shadow-inner">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base">
                      {member.name}
                    </h3>
                    <span className="text-xs text-cyan-400/90 font-mono">
                      {member.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{member.wing}</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  Role Descriptor
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
