import { EventItem } from '../types';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'nexus-devsprint-2026',
    title: 'Nexus DevSprint 2026: Modern Systems & Distributed Architecture',
    category: 'Engineering',
    tagline: 'Deep dive into performant web applications, microservices, and edge deployment.',
    description: 'A 6-hour intensive hands-on engineering sprint where student developers design, construct, and profile micro-services with real-time streaming interfaces.',
    fullDetails: 'Led by senior student peers and alumni mentors, DevSprint focuses on industry-grade patterns: reactive frontend state, low-latency API contracts, and observability. Participants work in pairs to architect a resilient telemetry dashboard.',
    date: 'Saturday, November 14, 2026',
    time: '10:00 AM – 04:30 PM IST',
    isoDate: '2026-11-14T10:00:00+05:30',
    location: 'B-Block Advanced Computing Lab & Virtual Stream',
    format: 'Hybrid',
    registrationDeadline: 'November 12, 2026 at 11:59 PM',
    status: 'Open',
    featured: true,
    prerequisites: ['Basic JavaScript / TypeScript or Python familiarity', 'Personal laptop with Node.js installed', 'Curiosity for systems engineering'],
    takeaways: ['Working distributed web app', 'Automated CI/CD workflow template', 'Verified chapter certificate of completion'],
    isSampleData: true,
    coordinatorContact: 'Student Tech Lead (Domain: Engineering)'
  },
  {
    id: 'deepvision-ai-summit',
    title: 'Cognitive Computing & Foundation Models Conclave',
    category: 'AI & Machine Learning',
    tagline: 'Practical explorations into prompt tuning, agentic reasoning, and tensor optimizations.',
    description: 'An interactive exploration of cutting-edge neural architectures and multi-agent coordination. Includes a live code-along for fine-tuning open-weights models.',
    fullDetails: 'Participants will dissect how transformer attention mechanisms operate under memory constraints and deploy a quantized model pipeline on localized edge devices.',
    date: 'Wednesday, November 18, 2026',
    time: '02:00 PM – 05:30 PM IST',
    isoDate: '2026-11-18T14:00:00+05:30',
    location: 'Seminar Hall 2, Ramanujan Block',
    format: 'In-Person',
    registrationDeadline: 'November 16, 2026 at 06:00 PM',
    status: 'Filling Fast',
    prerequisites: ['Foundations of Python & Linear Algebra', 'Google Colab account ready'],
    takeaways: ['End-to-end multi-agent pipeline codebase', 'Model quantization toolkit cheat-sheet'],
    isSampleData: true,
    coordinatorContact: 'Student AI/ML Research Coordinator'
  },
  {
    id: 'algorithmika-conclave-2026',
    title: 'Algorithmika 2K26: Advanced Graph Theory & Competitive Conclave',
    category: 'Competitive',
    tagline: 'Speed, rigor, and combinatorial problem solving in an ICPC-style arena.',
    description: 'Sharpen your algorithmic intuition across segment trees, network flows, and dynamic programming on trees with timed speed drills.',
    fullDetails: 'Designed for competitive programming enthusiasts preparing for ICPC, Google Code Jam style challenges, and high-performance engineering interviews.',
    date: 'Sunday, November 22, 2026',
    time: '11:00 AM – 03:00 PM IST',
    isoDate: '2026-11-22T11:00:00+05:30',
    location: 'Online Contest Arena (Virtual)',
    format: 'Virtual',
    registrationDeadline: 'November 21, 2026 at 08:00 PM',
    status: 'Open',
    prerequisites: ['Familiarity with C++, Java, or Python', 'Basic data structures (Arrays, Trees, Graphs)'],
    takeaways: ['Detailed editorial analyses for all problems', 'National competitive ranking certificate'],
    isSampleData: true,
    coordinatorContact: 'Competitive Programming SIG Lead'
  },
  {
    id: 'acmw-empowertech-2026',
    title: 'ACM-W EmpowerTech: Systems Security & Diversity in Tech',
    category: 'Community',
    tagline: 'Celebrating women technologists through reverse engineering and cryptographic fundamentals.',
    description: 'Organized by the ABES ACM-W Student Chapter, this flagship session bridges computer security principles with mentorship circles and technical leadership discussions.',
    fullDetails: 'Includes a guided CTF (Capture The Flag) lab focused on web vulnerabilities (OWASP Top 10) followed by a panel with prominent women engineers working in cybersecurity.',
    date: 'Thursday, November 26, 2026',
    time: '01:30 PM – 05:00 PM IST',
    isoDate: '2026-11-26T13:30:00+05:30',
    location: 'Auditorium A & Google Meet Live',
    format: 'Hybrid',
    registrationDeadline: 'November 25, 2026 at 12:00 PM',
    status: 'Open',
    featured: false,
    prerequisites: ['All college students welcome; beginner friendly'],
    takeaways: ['Web security audit checklist', 'Direct 1:1 mentorship breakout networking'],
    isSampleData: true,
    coordinatorContact: 'ACM-W Student Chair & Organizing Committee'
  },
  {
    id: 'quantum-edge-colloquium',
    title: 'Compute Colloquium: Quantum Algorithms & Post-Quantum Cryptography',
    category: 'Research',
    tagline: 'Unpacking Shor’s algorithm, lattice-based cryptography, and quantum circuit simulators.',
    description: 'A research-oriented symposium reviewing accepted ACM SIGARCH & SIGCOMM literature on quantum decoherence mitigation and hardware architectures.',
    fullDetails: 'Students interested in graduate studies, formal papers, and theoretical computer science will analyze peer-reviewed papers and simulate 5-qubit circuits with Qiskit.',
    date: 'Tuesday, December 01, 2026',
    time: '03:00 PM – 06:00 PM IST',
    isoDate: '2026-12-01T15:00:00+05:30',
    location: 'Research Media Center, Library 3rd Floor',
    format: 'In-Person',
    registrationDeadline: 'November 29, 2026 at 05:00 PM',
    status: 'Open',
    prerequisites: ['Linear algebra matrix operations', 'Curiosity for quantum physics basics'],
    takeaways: ['Circuit simulation notebooks', 'Research paper reading methodology guide'],
    isSampleData: true,
    coordinatorContact: 'Research SIG Student Coordinator'
  },
  {
    id: 'creative-code-interactive-lab',
    title: 'Creative Computing: Shaders, WebGL & Generative Audio',
    category: 'Design & Creative',
    tagline: 'Where mathematical functions become expressive visual and sonic experiences.',
    description: 'Synthesize raymarching shaders, generative canvas installations, and Web Audio synthesizers in this hands-on multidisciplinary studio.',
    fullDetails: 'Explore GLSL fragment shaders, noise algorithms (Simplex & Perlin), and real-time reactive soundscapes designed for modern interactive web installations.',
    date: 'Saturday, December 05, 2026',
    time: '10:30 AM – 02:30 PM IST',
    isoDate: '2026-12-05T10:30:00+05:30',
    location: 'Design & Innovation Hub, Ground Floor',
    format: 'In-Person',
    registrationDeadline: 'December 03, 2026 at 11:59 PM',
    status: 'Open',
    prerequisites: ['Basic HTML/CSS/JS knowledge', 'Web browser supporting WebGL2'],
    takeaways: ['Interactive WebGL portfolio piece', 'Reusable shader boilerplate pack'],
    isSampleData: true,
    coordinatorContact: 'UI/UX & Creative Tech Domain Head'
  }
];

export const EVENT_CATEGORIES = [
  'All',
  'Engineering',
  'AI & Machine Learning',
  'Competitive',
  'Research',
  'Design & Creative',
  'Community'
] as const;

/**
 * Generates an RFC-5545 compliant iCalendar string for valid event calendar integration
 */
export function generateICalendarData(event: EventItem): string {
  const cleanTitle = event.title.replace(/,/g, '\\,');
  const cleanDesc = `${event.tagline} - ${event.description}`.replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const cleanLoc = event.location.replace(/,/g, '\\,');
  
  // Format YYYYMMDDTHHMMSSZ roughly from isoDate
  const startDate = new Date(event.isoDate);
  const endDate = new Date(startDate.getTime() + 3.5 * 60 * 60 * 1000); // ~3.5 hours duration

  const formatUtc = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ACM NEXUS//ABES ACM Student Chapter//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:nexus-event-${event.id}@acmnexus.abes`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(startDate)}`,
    `DTEND:${formatUtc(endDate)}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${cleanLoc}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
