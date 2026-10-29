export type EventCategory = 
  | 'All'
  | 'Engineering'
  | 'AI & Machine Learning'
  | 'Competitive'
  | 'Research'
  | 'Design & Creative'
  | 'Community';

export interface EventItem {
  id: string;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  tagline: string;
  description: string;
  fullDetails: string;
  date: string;
  time: string;
  isoDate: string; // for calendar and accurate status
  location: string;
  format: 'In-Person' | 'Hybrid' | 'Virtual';
  registrationDeadline: string;
  status: 'Open' | 'Filling Fast' | 'Closed';
  featured?: boolean;
  prerequisites: string[];
  takeaways: string[];
  isSampleData: boolean;
  coordinatorContact?: string;
}

export interface PathwayItem {
  id: string;
  title: string;
  verb: string;
  tagline: string;
  description: string;
  iconName: string;
  targetCategory: EventCategory;
  skills: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  type: 'Technical Workshop' | 'Coding Competition' | 'Hands-on Sprint' | 'Research Seminar' | 'Peer Circle';
  cadence: string;
  description: string;
  highlights: string[];
  isSampleData: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  wing: 'Executive Council' | 'ACM-W Initiative' | 'Domain Leads' | 'Faculty Mentors';
  bio: string;
  initials: string;
  isPlaceholder: boolean;
}

export interface RegistrationFormData {
  fullName: string;
  collegeEmail: string;
  academicYear: string;
  department: string;
  eventId: string;
  areaOfInterest: string;
  acceptedConsent: boolean;
}

export interface RegistrationRecord {
  id: string;
  referenceNumber: string;
  registeredAt: string;
  fullName: string;
  collegeEmail: string;
  academicYear: string;
  department: string;
  eventId: string;
  eventTitle: string;
  areaOfInterest: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  record?: RegistrationRecord;
  error?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Registration' | 'Participation' | 'Chapter & Membership' | 'Events';
}
