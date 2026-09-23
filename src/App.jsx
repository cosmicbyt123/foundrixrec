import React, { useState } from 'react';
import CinematicLoader from './components/Loader/CinematicLoader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import EventsSection from './components/Events/EventsSection';
import VenueSection from './components/Venue/VenueSection';
import PassesSection from './components/Passes/PassesSection';
import FAQSection from './components/FAQ/FAQSection';
import ContactSection from './components/Contact/ContactSection';
import Footer from './components/Footer/Footer';
import RegistrationModal from './components/Registration/RegistrationModal';
import AttendeeDashboard from './components/Dashboard/AttendeeDashboard';
import LoginModal from './components/Auth/LoginModal';
import MobileBottomDock from './components/Navbar/MobileBottomDock';
import ScrollProgressBar from './components/Common/ScrollProgressBar';
import ScrollToTop from './components/Common/ScrollToTop';
import CustomCursor from './components/Common/CustomCursor';
import MarqueeTicker from './components/Common/MarqueeTicker';
import useScrollReveal from './components/Common/useScrollReveal';
import { getActiveParticipant, getPurchasedPass } from './services/sessionService';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleLoginClick = () => {
    const active = getActiveParticipant() || getPurchasedPass();
    if (active && (active.regId || active.name)) {
      setIsDashboardOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

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

      {/* 2. Sticky Navigation */}
      <Navbar
        onRegisterClick={() => setIsRegisterOpen(true)}
        onOpenHackathonHub={handleLoginClick}
      />

      {/* 4. Monumental Hero Section */}
      <main style={{ flex: 1 }}>
        <Hero
          onRegisterClick={() => setIsRegisterOpen(true)}
          onOpenHackathonHub={handleLoginClick}
        />

        {/* Dynamic Infinite Marquee Ribbon 1 */}
        <MarqueeTicker items={marqueeKeywords1} />

        {/* 5. The 2 Core Event Pillars (Online Hackathon & Workshop) */}
        <EventsSection
          onRegisterClick={() => setIsRegisterOpen(true)}
          onOpenHackathonHub={handleLoginClick}
        />

        {/* 6. Campus Venue Showcase */}
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
        onOpenHackathonHub={handleLoginClick}
      />

      {/* Floating Mobile Bottom Action Dock */}
      <MobileBottomDock
        onRegisterClick={() => setIsRegisterOpen(true)}
        onOpenHackathonHub={handleLoginClick}
      />

      {/* 3-Step Registration & Payment Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenDashboard={() => {
          setIsRegisterOpen(false);
          setIsDashboardOpen(true);
        }}
        onOpenHackathonHub={() => {
          setIsRegisterOpen(false);
          setIsDashboardOpen(true);
        }}
      />

      {/* Delegate Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          setIsDashboardOpen(true);
        }}
        onRegisterClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      {/* Unified Attendee Dashboard (Pass + Pending Status + Hackathon Teams) */}
      <AttendeeDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onRegisterAnother={() => {
          setIsDashboardOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </div>
  );
};

export default App;
