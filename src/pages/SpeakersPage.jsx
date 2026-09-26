import React from 'react';
import SpeakerSpotlightSection from '../components/Events/SpeakerSpotlightSection';

export const SpeakersPage = () => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Featured Keynote Speakers & Mentors Spotlight */}
      <SpeakerSpotlightSection />
    </div>
  );
};

export default SpeakersPage;

