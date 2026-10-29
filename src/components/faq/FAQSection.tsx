import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { FAQ_DATA } from '../../data/faqData';
import { CHAPTER_CONFIG } from '../../data/chapterData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);
  const [contactSubject, setContactSubject] = useState('Event Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleSimulatedContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSentNotice(true);
    setTimeout(() => {
      setContactMessage('');
      setSentNotice(false);
    }, 4000);
  };

  return (
    <section id="faq" className="py-24 bg-nexus-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Clarifications &amp; Guidance
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Essential questions regarding chapter events, student eligibility, and registration operations.
              </p>
            </div>

            <div className="space-y-3 pt-4" role="region" aria-label="FAQ Accordion">
              {FAQ_DATA.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="glass-panel rounded-xl border-slate-800/80 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(item.id)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="font-display font-medium text-sm sm:text-base text-slate-100 hover:text-cyan-300 transition-colors">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${item.id}`}
                        className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact & Chapter Desk */}
          <div id="contact" className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/20 shadow-xl bg-gradient-to-b from-nexus-900 to-nexus-950">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>COMMUNITY DESK</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Contact Chapter Desk
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Have specific queries regarding technical workshop participation or student chapter activities?
              </p>

              {/* Campus Contact Details */}
              <div className="space-y-3 mb-6 p-4 rounded-xl bg-nexus-950/90 border border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>ABES Engineering College, NH-24, Ghaziabad, UP, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Student Chapter Secretariat: info@acm-abes.org (Sample)</span>
                </div>
              </div>

              {/* In-app Message Dispatch */}
              {sentNotice ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-mono text-center">
                  Message logged for demonstration purposes. Organizer response will follow.
                </div>
              ) : (
                <form onSubmit={handleSimulatedContact} className="space-y-3">
                  <div>
                    <label htmlFor="contact-sub" className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Subject
                    </label>
                    <select
                      id="contact-sub"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-nexus-950 border border-slate-700 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Event Inquiry">Upcoming Event Inquiry</option>
                      <option value="ACM-W Initiative">ACM-W Chapter Programs</option>
                      <option value="Technical Feedback">Website Engineering Feedback</option>
                      <option value="Speaker/Mentor">Mentor or Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Type your message or inquiry here..."
                      className="w-full px-3 py-2 rounded-lg bg-nexus-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Organizers</span>
                  </button>
                </form>
              )}

              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 text-center">
                Creator &amp; Developer: {CHAPTER_CONFIG.creator.name}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
