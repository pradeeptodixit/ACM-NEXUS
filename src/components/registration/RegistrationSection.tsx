import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileSignature, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  Calendar, 
  User, 
  Mail, 
  GraduationCap, 
  Building, 
  ShieldCheck, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { RegistrationFormData, RegistrationRecord } from '../../types';
import { EVENTS_DATA, generateICalendarData } from '../../data/eventsData';
import { submitRegistration, checkServerHealth } from '../../utils/api';

interface RegistrationSectionProps {
  preselectedEventId: string;
  onClearPreselectedEvent: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  preselectedEventId,
  onClearPreselectedEvent,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    collegeEmail: '',
    academicYear: '2nd Year',
    department: 'Computer Science & Engineering',
    eventId: preselectedEventId || EVENTS_DATA[0]?.id || '',
    areaOfInterest: '',
    acceptedConsent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<RegistrationRecord | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [serverStatus, setServerStatus] = useState<{ isOnline: boolean; totalRegistrations: number }>({
    isOnline: false,
    totalRegistrations: 0,
  });

  // Sync when preselectedEventId changes
  useEffect(() => {
    if (preselectedEventId) {
      setFormData((prev) => ({ ...prev, eventId: preselectedEventId }));
      setSubmissionSuccess(null);
      setSubmissionError(null);
    }
  }, [preselectedEventId]);

  // Check server persistence status on mount
  useEffect(() => {
    checkServerHealth().then(setServerStatus);
  }, []);

  const selectedEvent = EVENTS_DATA.find((e) => e.id === formData.eventId);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.collegeEmail.trim()) {
      newErrors.collegeEmail = 'College email is required.';
    } else if (!emailRegex.test(formData.collegeEmail.trim())) {
      newErrors.collegeEmail = 'Please enter a valid email address (e.g., student@abes.ac.in).';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Academic department or branch is required.';
    }

    if (!formData.eventId) {
      newErrors.eventId = 'Please select an event to register.';
    }

    if (!formData.acceptedConsent) {
      newErrors.acceptedConsent = 'You must confirm attendance and agree to chapter conduct rules.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitRegistration(formData);

      if (res.success && res.record) {
        setSubmissionSuccess(res.record);
        // Confetti effect
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#06B6D4', '#38BDF8', '#818CF8', '#FFFFFF'],
          });
        } catch {
          // Ignore confetti errors if disabled
        }
        // Refresh server stats
        checkServerHealth().then(setServerStatus);
      } else {
        setSubmissionError(res.error || res.message || 'Registration failed.');
      }
    } catch {
      setSubmissionError('An unexpected network error occurred. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (!submissionSuccess) return;
    navigator.clipboard.writeText(submissionSuccess.referenceNumber);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleDownloadCalendar = () => {
    if (!selectedEvent) return;
    const ics = generateICalendarData(selectedEvent);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedEvent.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetForAnother = () => {
    setSubmissionSuccess(null);
    setSubmissionError(null);
    onClearPreselectedEvent();
    setFormData((prev) => ({
      ...prev,
      acceptedConsent: false,
    }));
  };

  return (
    <section id="registration" className="py-24 bg-nexus-900/60 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 mb-4">
            <FileSignature className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTELLIGENT REGISTRATION</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Event Registration Portal
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Secure your participation in ABES ACM &amp; ACM-W workshops and hackathons. Real-time validation and verified entry pass issuance.
          </p>

          {/* Genuine Persistence Status Banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-700 text-slate-300">
            <span className={`w-2 h-2 rounded-full ${serverStatus.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>
              {serverStatus.isOnline
                ? `Active Ledger: Express API · ${serverStatus.totalRegistrations} Registrations Verified`
                : 'Session Demonstration Ledger · Ready for Local Evaluation'}
            </span>
          </div>
        </div>

        {/* Form Card or Success View */}
        {submissionSuccess ? (
          /* SUCCESS STATE */
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border-cyan-400/40 shadow-2xl bg-gradient-to-b from-nexus-900 to-nexus-850 animate-fade-in">
            <div className="text-center max-w-lg mx-auto mb-8">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-300 mb-4 shadow-glow-cyan">
                <CheckCircle2 className="w-9 h-9 text-cyan-400" />
              </div>

              <span className="tech-badge text-xs text-cyan-300 font-bold uppercase tracking-widest">
                REGISTRATION CONFIRMED
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                You&rsquo;re Registered!
              </h3>

              <p className="text-sm text-slate-300 mt-2">
                Your entry has been recorded in the chapter registry for <strong>{submissionSuccess.fullName}</strong>.
              </p>
            </div>

            {/* Reference Ticket Plate */}
            <div className="p-6 rounded-xl bg-nexus-950/80 border border-cyan-500/30 mb-8 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Official Reference Code
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-300 tracking-wider">
                    {submissionSuccess.referenceNumber}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Event Details recap */}
              <div className="pt-4 space-y-2 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-500">Event:</span> {submissionSuccess.eventTitle}
                </div>
                <div>
                  <span className="text-slate-500">Participant:</span> {submissionSuccess.fullName} ({submissionSuccess.academicYear}, {submissionSuccess.department})
                </div>
                <div>
                  <span className="text-slate-500">Registered Email:</span> {submissionSuccess.collegeEmail}
                </div>
                {selectedEvent && (
                  <div>
                    <span className="text-slate-500">Schedule:</span> {selectedEvent.date} · {selectedEvent.time}
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-8 text-xs text-slate-400 space-y-1.5">
              <h4 className="font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                What to Expect Next
              </h4>
              <p>• Keep this reference ID handy for campus hall or virtual stream check-in.</p>
              <p>• Make sure to review the event prerequisites and set up your development environment before arriving.</p>
              <p>• Add the event to your personal calendar using the download button below.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-xs font-bold text-slate-200 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download .ics Calendar File</span>
              </button>

              <button
                type="button"
                onClick={handleResetForAnother}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 text-xs font-bold shadow-glow-cyan hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Register for Another Event</span>
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="glass-panel p-6 sm:p-10 rounded-2xl border-slate-800 shadow-2xl">
            
            {/* Error Announcement */}
            {submissionError && (
              <div 
                className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-3"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Submission Notice: </strong>
                  <span>{submissionError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Event Selection */}
              <div>
                <label htmlFor="reg-event" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Event <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="reg-event"
                    value={formData.eventId}
                    onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-nexus-950 border border-slate-700 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors appearance-none"
                    aria-invalid={!!errors.eventId}
                  >
                    {EVENTS_DATA.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title} ({ev.date})
                      </option>
                    ))}
                  </select>
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {selectedEvent && (
                  <p className="mt-2 text-xs font-mono text-cyan-400/90">
                    Format: {selectedEvent.format} · Venue: {selectedEvent.location}
                  </p>
                )}
                {errors.eventId && <p className="mt-1 text-xs text-rose-400 font-mono">{errors.eventId}</p>}
              </div>

              {/* Full Name & College Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="e.g. Alex Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-nexus-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                      aria-invalid={!!errors.fullName}
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.fullName && <p className="mt-1 text-xs text-rose-400 font-mono">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    College / Student Email <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="student@abes.ac.in"
                      value={formData.collegeEmail}
                      onChange={(e) => setFormData({ ...formData, collegeEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-nexus-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                      aria-invalid={!!errors.collegeEmail}
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.collegeEmail && <p className="mt-1 text-xs text-rose-400 font-mono">{errors.collegeEmail}</p>}
                </div>
              </div>

              {/* Academic Year & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reg-year" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Academic Year <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="reg-year"
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-nexus-950 border border-slate-700 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                      <option value="Postgraduate">Postgraduate / MCA</option>
                    </select>
                    <GraduationCap className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-dept" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Department / Branch <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-dept"
                      type="text"
                      placeholder="e.g. CSE, CSE-AIML, IT, ECE"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-nexus-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                      aria-invalid={!!errors.department}
                    />
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.department && <p className="mt-1 text-xs text-rose-400 font-mono">{errors.department}</p>}
                </div>
              </div>

              {/* Area of Interest / Expectations (Optional) */}
              <div>
                <label htmlFor="reg-interest" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Area of Interest / What do you hope to learn? (Optional)
                </label>
                <textarea
                  id="reg-interest"
                  rows={2}
                  maxLength={200}
                  placeholder="e.g. Curious about microservices profiling or hands-on machine learning..."
                  value={formData.areaOfInterest}
                  onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-nexus-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                />
                <span className="text-[11px] font-mono text-slate-500 float-right">
                  {formData.areaOfInterest.length}/200
                </span>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.acceptedConsent}
                    onChange={(e) => setFormData({ ...formData, acceptedConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded bg-nexus-950 border-slate-700 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-nexus-900 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                    I confirm that I am a student of ABES Engineering College, agree to adhere to the ACM Chapter Code of Conduct, and commit to attending the registered session.
                  </span>
                </label>
                {errors.acceptedConsent && (
                  <p className="mt-1.5 text-xs text-rose-400 font-mono">{errors.acceptedConsent}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 text-nexus-950 font-bold text-base shadow-glow-cyan hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-nexus-950 border-t-transparent rounded-full animate-spin" />
                      <span>Verifying &amp; Registering Entry...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-nexus-950" />
                      <span>Submit Verified Event Registration</span>
                      <ArrowRight className="w-5 h-5 text-nexus-950" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] font-mono text-slate-500 pt-1">
                Zero spam · Confidential student record · Designed &amp; Engineered by Pradeepto Dixit
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
