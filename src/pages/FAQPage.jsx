import React from 'react';
import FAQSection from '../components/FAQ/FAQSection';

export const FAQPage = () => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Main FAQ Accordion Component */}
      <FAQSection />
    </div>
  );
};

export default FAQPage;

