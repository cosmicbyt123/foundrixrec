import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CinematicLoader from './components/Loader/CinematicLoader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import RegistrationModal from './components/Registration/RegistrationModal';
import AttendeeDashboard from './components/Dashboard/AttendeeDashboard';
import LoginModal from './components/Auth/LoginModal';
import MobileBottomDock from './components/Navbar/MobileBottomDock';
import ScrollProgressBar from './components/Common/ScrollProgressBar';
import ScrollToTop from './components/Common/ScrollToTop';
import CustomCursor from './components/Common/CustomCursor';
import PassesSideTab from './components/Common/PassesSideTab';
import RouteScrollReset from './components/Common/RouteScrollReset';
import useScrollReveal from './components/Common/useScrollReveal';
import { getActiveParticipant, getPurchasedPass } from './services/sessionService';
import { fetchEarlyBirdStats } from './services/registrationService';
import Lenis from 'lenis';

// Dedicated Route Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import SpeakersPage from './pages/SpeakersPage';
import VenuePage from './pages/VenuePage';
import PassesPage from './pages/PassesPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import HackathonPage from './pages/HackathonPage';
import WorkshopPage from './pages/WorkshopPage';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isEarlyBirdActive, setIsEarlyBirdActive] = useState(true);

  useEffect(() => {
    fetchEarlyBirdStats().then((data) => {
      if (data) setIsEarlyBirdActive(data.offerActive && data.spotsRemaining > 0);
    });
  }, []);

  // E-Summit Level Buttery Smooth Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

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
    isEarlyBirdActive ? 'FIRST 200 GET E-CELL IIT MUMBAI CERTIFICATES' : 'ALL-INCLUSIVE WORKSHOPS & HACKATHON PASS',
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
      {/* Route-driven scroll position reset */}
      <RouteScrollReset />

      {/* Interactive Electric Cyan Kinetic Cursor */}
      <CustomCursor />

      {/* Top Dynamic Scroll Progress Line */}
      <ScrollProgressBar />

      {/* Floating Cyber Scroll-To-Top Button */}
      <ScrollToTop />

      {/* 1. Cinematic Preloader */}
      {loading && <CinematicLoader onComplete={() => setLoading(false)} />}

      {/* 2. Sticky Global Navigation */}
      <Navbar
        onRegisterClick={() => setIsRegisterOpen(true)}
        onOpenHackathonHub={handleLoginClick}
      />

      {/* 3. Main Multi-Route Views */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onRegisterClick={() => setIsRegisterOpen(true)}
                onOpenHackathonHub={handleLoginClick}
                marqueeKeywords1={marqueeKeywords1}
                marqueeKeywords2={marqueeKeywords2}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsPage
                onRegisterClick={() => setIsRegisterOpen(true)}
                onOpenHackathonHub={handleLoginClick}
              />
            }
          />
          <Route
            path="/speakers"
            element={<SpeakersPage />}
          />
          <Route
            path="/venue"
            element={<VenuePage />}
          />
          <Route
            path="/passes"
            element={<PassesPage onRegisterClick={() => setIsRegisterOpen(true)} />}
          />
          <Route
            path="/faq"
            element={<FAQPage />}
          />
          <Route
            path="/hackathon"
            element={<HackathonPage onRegisterClick={() => setIsRegisterOpen(true)} />}
          />
          <Route
            path="/workshop"
            element={<WorkshopPage onRegisterClick={() => setIsRegisterOpen(true)} />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      {/* Pinned Right-Edge 'PASSES' Vertical Tab */}
      <PassesSideTab onRegisterClick={() => setIsRegisterOpen(true)} />

      {/* Modern Global Footer */}
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
