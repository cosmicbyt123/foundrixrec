import React from 'react';
import EventsSection from '../components/Events/EventsSection';

export const EventsPage = ({ onRegisterClick, onOpenHackathonHub }) => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* The 2 Core Event Pillars */}
      <EventsSection
        onRegisterClick={onRegisterClick}
        onOpenHackathonHub={onOpenHackathonHub}
      />
    </div>
  );
};

export default EventsPage;

