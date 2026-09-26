import React from 'react';
import { Ticket } from 'lucide-react';

export const PassesSideTab = ({ onRegisterClick }) => {
  return (
    <div
      onClick={onRegisterClick}
      role="button"
      tabIndex={0}
      aria-label="View passes and register"
      className="passes-side-tab"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 48,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 7px',
        backgroundColor: 'rgba(6, 10, 18, 0.92)',
        border: '1.5px solid rgba(0, 240, 255, 0.45)',
        borderRight: 'none',
        borderRadius: '8px 0 0 8px',
        backdropFilter: 'blur(16px)',
        boxShadow: '-4px 0 25px rgba(0, 240, 255, 0.28), inset 0 0 12px rgba(0, 240, 255, 0.1)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-50%) translateX(-4px)';
        e.currentTarget.style.borderColor = '#00f0ff';
        e.currentTarget.style.boxShadow = '-6px 0 35px rgba(0, 240, 255, 0.55), inset 0 0 16px rgba(0, 240, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(-50%) translateX(0)';
        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.45)';
        e.currentTarget.style.boxShadow = '-4px 0 25px rgba(0, 240, 255, 0.28), inset 0 0 12px rgba(0, 240, 255, 0.1)';
      }}
    >
      {/* Live Pulsating Indicator Dot */}
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#00f0ff',
          boxShadow: '0 0 10px #00f0ff',
          animation: 'sideTabPulse 1.8s ease-in-out infinite alternate',
        }}
      />

      {/* Ticket Icon */}
      <Ticket size={14} color="#00f0ff" />

      {/* Vertical Text PASSES */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          fontWeight: '900',
          letterSpacing: '0.22em',
          color: '#ffffff',
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          textTransform: 'uppercase',
          marginTop: '2px',
        }}
      >
        PASSES
      </span>

      <style>{`
        @keyframes sideTabPulse {
          0% { opacity: 0.4; transform: scale(0.85); box-shadow: 0 0 6px #00f0ff; }
          100% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 14px #00f0ff; }
        }
        @media (max-width: 768px) {
          .passes-side-tab {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PassesSideTab;

