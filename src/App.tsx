import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NexusHero } from './components/hero/NexusHero';
import { MissionSection } from './components/about/MissionSection';
import { EventJourney } from './components/about/EventJourney';
import { PathwaysSection } from './components/pathways/PathwaysSection';
import { ActivitiesSection } from './components/activities/ActivitiesSection';
import { EventsSection } from './components/events/EventsSection';
import { RegistrationSection } from './components/registration/RegistrationSection';
import { TeamSection } from './components/team/TeamSection';
import { CreatorSection } from './components/about/CreatorSection';
import { FAQSection } from './components/faq/FAQSection';
import { QuickCommandModal } from './components/ui/QuickCommandModal';
import { EventCategory } from './types';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [preselectedEventId, setPreselectedEventId] = useState<string>('');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterEvent = (eventId: string) => {
    setPreselectedEventId(eventId);
    scrollTo('#registration');
  };

  const handleSelectCategoryFromPathway = (cat: EventCategory) => {
    setSelectedCategory(cat);
    scrollTo('#events');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-nexus-950 text-slate-100">
      
      {/* Top Navigation */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onNavigateToRegister={() => scrollTo('#registration')}
      />

      {/* Main Content Area with Skip Link Anchor */}
      <main id="main-content" className="flex-1">
        
        {/* Section 2: Hero */}
        <NexusHero
          onExploreEvents={() => scrollTo('#events')}
          onExploreCommunity={() => scrollTo('#about')}
        />

        {/* Section 7: Event Journey Pipeline */}
        <EventJourney />

        {/* Section 3 & 9: Mission & ACM/ACM-W Community */}
        <MissionSection />

        {/* Section 4: Interactive Learning Pathways */}
        <PathwaysSection
          onSelectCategoryFilter={handleSelectCategoryFromPathway}
        />

        {/* Section 5: Activity Ecosystem */}
        <ActivitiesSection />

        {/* Section 6: Upcoming Events & Conclaves */}
        <EventsSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onRegisterEvent={handleRegisterEvent}
        />

        {/* Section 7: Intelligent Event Registration Portal */}
        <RegistrationSection
          preselectedEventId={preselectedEventId}
          onClearPreselectedEvent={() => setPreselectedEventId('')}
        />

        {/* Section 8: Team & Contributors */}
        <TeamSection />

        {/* Section 10: Creator Showcase — "Crafted with Purpose" */}
        <CreatorSection />

        {/* Section 11: Contact & FAQ */}
        <FAQSection />

      </main>

      {/* Section 12: Footer */}
      <Footer />

      {/* Quick Navigation Command Palette */}
      <QuickCommandModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigateTo={(target) => scrollTo(target)}
      />

    </div>
  );
}

export default App;
