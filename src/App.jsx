import React, { useState } from 'react';
import CinematicLoader from './components/Loader/CinematicLoader';
import EarlyPerkBanner from './components/EarlyPerk/EarlyPerkBanner';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import EventsSection from './components/Events/EventsSection';
import ScheduleSection from './components/Schedule/ScheduleSection';
import VenueSection from './components/Venue/VenueSection';
import PassesSection from './components/Passes/PassesSection';
import FAQSection from './components/FAQ/FAQSection';
import ContactSection from './components/Contact/ContactSection';
import Footer from './components/Footer/Footer';
import RegistrationModal from './components/Registration/RegistrationModal';
import HackathonHub from './components/Hackathon/HackathonHub';
import MobileBottomDock from './components/Navbar/MobileBottomDock';
import ScrollProgressBar from './components/Common/ScrollProgressBar';
import ScrollToTop from './components/Common/ScrollToTop';
import CustomCursor from './components/Common/CustomCursor';
import MarqueeTicker from './components/Common/MarqueeTicker';
import useScrollReveal from './components/Common/useScrollReveal';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isHackathonHubOpen, setIsHackathonHubOpen] = useState(false);

  // Activate scroll-driven reveal animations
  useScrollReveal();

  const marqueeKeywords1 = [
    'RAGHU ENGINEERING COLLEGE',
    '9 & 10 OCTOBER 2026',
    '₹799 ALL-INCLUSIVE PASS',
    'ONLINE HACKATHON ARENA',
    '2-DAY IN-PERSON WORKSHOP',
    'E-CELL IIT BOMBAY',
    'FIRST 200 GET E-CELL IIT DELHI CERTIFICATES',
    'LIVE JURY PITCH & DEMO',
  ];

  const marqueeKeywords2 = [
    'INITIATED & HOSTED BY REC STUDENTS',
    'NATIONAL ENTREPRENEURSHIP CHALLENGE',
    'REC CAMPUS ARENA • VISAKHAPATNAM',
    'OFFICIAL DELEGATE SWAGS & MERCH',
    'VERIFIED ACADEMIC CERTIFICATES',
    'HACKATHON CASH PRIZES',
    'STUDENT INNOVATORS SUMMIT',
  ];

  return (
    <div className="foundrix-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Interactive Electric Cyan Kinetic Cursor */}
      <CustomCursor />

      {/* Top Dynamic Scroll Progress Line */}
      <ScrollProgressBar />

      {/* Floating Cyber Scroll-To-Top Button */}
      <ScrollToTop />

      {/* 1. Cinematic Preloader */}
      {loading && <CinematicLoader onComplete={() => setLoading(false)} />}

      {/* 2. Exclusive Early Bird Perk Bar (First 200 E-Cell, IIT Delhi) */}
      <EarlyPerkBanner onRegisterClick={() => setIsRegisterOpen(true)} />

      {/* 3. Sticky Navigation */}
      <Navbar
        onRegisterClick={() => setIsRegisterOpen(true)}
        onOpenHackathonHub={() => setIsHackathonHubOpen(true)}
      />

      {/* 4. Monumental Hero Section */}
      <main style={{ flex: 1 }}>
        <Hero
          onRegisterClick={() => setIsRegisterOpen(true)}
          onOpenHackathonHub={() => setIsHackathonHubOpen(true)}
        />

        {/* Dynamic Infinite Marquee Ribbon 1 */}
        <MarqueeTicker items={marqueeKeywords1} />

        {/* 5. The 2 Core Event Pillars (Online Hackathon & Workshop) */}
        <EventsSection
          onRegisterClick={() => setIsRegisterOpen(true)}
          onOpenHackathonHub={() => setIsHackathonHubOpen(true)}
        />

        {/* 6. 2-Day Schedule (Oct 9 Pitch & Workshop / Oct 10 Workshop & Valedictory) */}
        <ScheduleSection />

        {/* 7. Campus Venue & Student Host Info */}
        <VenueSection />

        {/* Dynamic Reverse Marquee Ribbon 2 */}
        <MarqueeTicker items={marqueeKeywords2} reverse={true} />

        {/* 8. Single All-Inclusive Pass Card (₹799 Per Head) */}
        <PassesSection onRegisterClick={() => setIsRegisterOpen(true)} />

        {/* 9. FAQs */}
        <FAQSection />

        {/* 10. Event Coordinators (Tarun & Thanu) */}
        <ContactSection />
      </main>

      {/* 11. Modern Footer */}
      <Footer
        onRegisterClick={() => setIsRegisterOpen(true)}
        onOpenHackathonHub={() => setIsHackathonHubOpen(true)}
      />

      {/* Floating Mobile Bottom Action Dock */}
      <MobileBottomDock
        onRegisterClick={() => setIsRegisterOpen(true)}
        onOpenHackathonHub={() => setIsHackathonHubOpen(true)}
      />

      {/* 3-Step Registration & Payment Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenHackathonHub={() => {
          setIsRegisterOpen(false);
          setIsHackathonHubOpen(true);
        }}
      />

      {/* Hackathon Team Hub Modal */}
      <HackathonHub
        isOpen={isHackathonHubOpen}
        onClose={() => setIsHackathonHubOpen(false)}
        onRegisterClick={() => {
          setIsHackathonHubOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </div>
  );
};

export default App;
