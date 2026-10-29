import { ActivityItem } from '../types';

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: 'activity-workshops',
    title: 'Architectural Tech Labs & Masterclasses',
    type: 'Technical Workshop',
    cadence: 'Bi-Weekly Sessions',
    description: 'Deep-dive developer workshops spanning modern system engineering, cloud primitives, Rust systems, and full-stack architecture.',
    highlights: ['Curated starter code packs provided', 'Interactive live profiling and debugging', 'Small group breakout reviews'],
    isSampleData: true
  },
  {
    id: 'activity-hackathons',
    title: 'Nexus Code Sprints & Ideathons',
    type: 'Coding Competition',
    cadence: 'Semester Flagship Challenge',
    description: 'Time-boxed team hackathons aimed at solving real-world campus, societal, and technological bottlenecks with production prototypes.',
    highlights: ['Peer judging & industry alumni critiques', 'Focus on deployability & code quality', 'Special category awards for accessibility'],
    isSampleData: true
  },
  {
    id: 'activity-sig-ai',
    title: 'Neural Networks & ML Reading Groups',
    type: 'Peer Circle',
    cadence: 'Weekly Discussion Circles',
    description: 'Informal student-led Special Interest Groups (SIG) dissecting recent arXiv papers, testing Hugging Face models, and running localized experiments.',
    highlights: ['Paper summaries & code reproduction', 'Colab GPU resource pooling', 'Foundations of mathematical modeling'],
    isSampleData: true
  },
  {
    id: 'activity-acmw',
    title: 'ACM-W Mentorship & Leadership Circles',
    type: 'Peer Circle',
    cadence: 'Monthly Forum',
    description: 'Dedicated spaces fostering women in engineering and computing through technical guidance, resume reviews, and research spotlights.',
    highlights: ['1:1 junior-to-senior mentorship pairs', 'Inclusive, encouraging question-driven culture', 'Guest fireside sessions with women leaders'],
    isSampleData: true
  },
  {
    id: 'activity-icpc',
    title: 'Competitive Algorithmic Arena (CP-SIG)',
    type: 'Hands-on Sprint',
    cadence: 'Twice Weekly Problem Sets',
    description: 'Intense speed-coding problem sets covering dynamic programming, graph invariants, number theory, and contest tactics.',
    highlights: ['Live contest environment mirroring Codeforces/AtCoder', 'Step-by-step editorial walk-throughs', 'Rating progress tracking'],
    isSampleData: true
  },
  {
    id: 'activity-colloquium',
    title: 'Distinguished Guest Tech Talks',
    type: 'Research Seminar',
    cadence: 'Monthly Spotlight',
    description: 'Invited sessions featuring researchers, startup founders, and senior engineers sharing real-world perspective on computing horizons.',
    highlights: ['Open Q&A forum on career pathways', 'Behind-the-scenes architectural war stories', 'Networking opportunities'],
    isSampleData: true
  }
];
