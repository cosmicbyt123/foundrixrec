import React from 'react';
import PassesSection from '../components/Passes/PassesSection';

export const PassesPage = ({ onRegisterClick }) => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Main Single Pass Checkout Component */}
      <PassesSection onRegisterClick={onRegisterClick} />
    </div>
  );
};

export default PassesPage;

