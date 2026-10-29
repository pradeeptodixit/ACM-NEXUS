import { PathwayItem } from '../types';

export const PATHWAYS_DATA: PathwayItem[] = [
  {
    id: 'pathway-build',
    title: 'Software Engineering',
    verb: 'Build',
    tagline: 'From system architecture to reactive web platforms and APIs.',
    description: 'Transform concepts into resilient, scalable digital systems. Master contemporary full-stack pipelines, cloud infrastructure, and software craft.',
    iconName: 'Terminal',
    targetCategory: 'Engineering',
    skills: ['TypeScript', 'Distributed APIs', 'Cloud Microservices', 'CI/CD Pipelines']
  },
  {
    id: 'pathway-explore',
    title: 'AI & Intelligence Systems',
    verb: 'Explore',
    tagline: 'Foundation models, neural networks, and agentic workflows.',
    description: 'Investigate statistical learning, computer vision, natural language understanding, and practical deployment of neural architectures on real compute.',
    iconName: 'BrainCircuit',
    targetCategory: 'AI & Machine Learning',
    skills: ['PyTorch / JAX', 'Transformers', 'Quantization', 'Autonomous Agents']
  },
  {
    id: 'pathway-solve',
    title: 'Algorithmic Problem Solving',
    verb: 'Solve',
    tagline: 'Computational complexity, graph algorithms, and speed confluences.',
    description: 'Hone mental sharpness and rigorous optimization through competitive programming, dynamic decomposition, and mathematical problem-solving.',
    iconName: 'Cpu',
    targetCategory: 'Competitive',
    skills: ['Graph Theory', 'Dynamic Programming', 'ICPC Style Drills', 'Bit Manipulation']
  },
  {
    id: 'pathway-discover',
    title: 'Research & Theoretical Compute',
    verb: 'Discover',
    tagline: 'Formal papers, quantum simulation, and cryptographic protocols.',
    description: 'Engage with peer-reviewed literature from ACM Digital Library, scrutinize system security guarantees, and explore quantum information science.',
    iconName: 'Microscope',
    targetCategory: 'Research',
    skills: ['Paper Dissection', 'Post-Quantum Cryptography', 'Qiskit Simulation', 'Formal Verification']
  },
  {
    id: 'pathway-create',
    title: 'Creative Coding & UI Design',
    verb: 'Create',
    tagline: 'Where mathematical beauty intersects with interaction design.',
    description: 'Craft tactile interfaces, WebGL shader art, typography systems, and audio-reactive visuals that elevate technology from utility to experience.',
    iconName: 'Sparkles',
    targetCategory: 'Design & Creative',
    skills: ['GLSL / WebGL', 'Design Systems', 'Micro-interactions', 'Accessibility (a11y)']
  },
  {
    id: 'pathway-connect',
    title: 'Community & ACM-W Leadership',
    verb: 'Connect',
    tagline: 'Mentorship, open discourse, and peer empowerment in computing.',
    description: 'Lead initiatives, organize technical symposia, bridge gender gaps through ACM-W councils, and foster an inclusive, high-trust engineering culture.',
    iconName: 'Users',
    targetCategory: 'Community',
    skills: ['Peer Mentoring', 'Technical Communication', 'Diversity Advocacy', 'Community Organizing']
  }
];
