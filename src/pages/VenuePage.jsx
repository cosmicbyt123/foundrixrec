import React from 'react';
import VenueSection from '../components/Venue/VenueSection';

export const VenuePage = () => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Main Interactive Venue Showcase */}
      <VenueSection />
    </div>
  );
};

export default VenuePage;

