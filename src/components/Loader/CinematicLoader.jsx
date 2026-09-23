import React, { useState, useEffect } from 'react';

/**
 * Modern Entrepreneurship Summit Preloader
 * 1. Fast Cycling Words (Phase 1):
 *    - INNOVATE
 *    - BUILD SPRINT
 *    - REC CAMPUS
 *    - LIVE PITCH
 *    - FOUNDRIX
 * 2. Main Locked Wordmark (Phase 2 & 3):
 *    - FOUNDRIX (Clean solid white, zero '@' or glitch characters)
 *    - Subtitle: THE FLAGSHIP TECH SUMMIT • 2026
 * 3. High-velocity curtain slide-up reveal
 */

export const CinematicLoader = ({ onComplete }) => {
  const cyclingWords = [
    'INNOVATE',
    'BUILD SPRINT',
    'REC CAMPUS',
    'LIVE PITCH',
    'FOUNDRIX',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Phase 1: Fast cycling through the words
    let intervalId;
    let wordIndex = 0;

    intervalId = setInterval(() => {
      wordIndex += 1;
      if (wordIndex < cyclingWords.length) {
        setCurrentIndex(wordIndex);
      } else {
        // Phase 2: Lock onto FOUNDRIX
        clearInterval(intervalId);
        setIsLocked(true);

        // Phase 3: Hold locked wordmark & subtitle, then slide up curtain
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          const completeTimer = setTimeout(() => {
            if (onComplete) onComplete();
          }, 750);
          return () => clearTimeout(completeTimer);
        }, 900);

        return () => clearTimeout(exitTimer);
      }
    }, 220); // Snappy 220ms per word

    return () => clearInterval(intervalId);
  }, [onComplete]);

  // Click anywhere to skip instantly
  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  const currentDisplayWord = cyclingWords[currentIndex];

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#06070a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 48px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)',
        willChange: 'transform',
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.75)',
              textTransform: 'uppercase',
            }}
          >
            RAGHU ENGINEERING COLLEGE
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            color: '#ffffff',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          FOUNDRIX 2026
        </div>
      </div>

      {/* Center Stage: Wordmark & Cycling */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: 'auto',
          transform: isExiting ? 'translateY(-30px) scale(0.96)' : 'translateY(0) scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s ease',
          opacity: isExiting ? 0 : 1,
        }}
      >
        {/* Main Central Typography */}
        <h1
          key={currentDisplayWord}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize:
              currentDisplayWord === 'FOUNDRIX'
                ? 'clamp(5rem, 16vw, 12.5rem)'
                : 'clamp(3.8rem, 12vw, 9rem)',
            fontWeight: '900',
            lineHeight: '0.9',
            letterSpacing: '0.04em',
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: 0,
            textAlign: 'center',
            userSelect: 'none',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.95)',
            animation: 'wordPop 0.22s ease-out forwards',
          }}
        >
          {currentDisplayWord}
        </h1>

        {/* Phase 2 & 3 Subtitle: Revealed when locked on FOUNDRIX */}
        <div
          style={{
            marginTop: '18px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 1.6vw, 1.05rem)',
            fontWeight: '700',
            letterSpacing: '0.22em',
            color: 'rgba(255, 255, 255, 0.9)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: isLocked ? 1 : 0,
            transform: isLocked ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span>THE FLAGSHIP TECH SUMMIT</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
          <span style={{ color: '#ffffff' }}>2026</span>
        </div>
      </div>

      {/* Bottom Footer Row: Click to Enter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          OCTOBER 9 & 10 • VISAKHAPATNAM
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.65)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '7px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            transition: 'all 0.2s ease',
          }}
        >
          CLICK TO ENTER ↗
        </div>
      </div>

      <style>{`
        @keyframes wordPop {
          0% {
            opacity: 0.3;
            transform: scale(0.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CinematicLoader;
