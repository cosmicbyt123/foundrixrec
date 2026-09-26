import React from 'react';
import Hero from '../components/Hero/Hero';
import EventsSection from '../components/Events/EventsSection';
import AboutSection from '../components/About/AboutSection';

export const HomePage = ({
  onRegisterClick,
  onOpenHackathonHub,
}) => {
  return (
    <>
      {/* 1. Hero Section with Scroll Zoom-Through Animation */}
      <Hero
        onRegisterClick={onRegisterClick}
        onOpenHackathonHub={onOpenHackathonHub}
      />

      {/* 2. Events Section: The 2 Core Pillars Spine & Cards */}
      <EventsSection
        hideHeader={true}
        onRegisterClick={onRegisterClick}
        onOpenHackathonHub={onOpenHackathonHub}
      />

      {/* 3. The Raghu Section: About Foundrix 2026 */}
      <AboutSection />
    </>
  );
};

export default HomePage;
