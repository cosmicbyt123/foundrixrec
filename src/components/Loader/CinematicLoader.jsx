import React, { useState, useEffect } from 'react';

/**
 * Broed-Inspired Awwwards Page Load Animation (FOUNDRIX 2026)
 * Inspired by https://www.awwwards.com/inspiration/page-load-broed
 * 
 * Phases:
 * 1. Rapid vertical kinetic typographic word-roll (INNOVATE -> BUILD -> PITCH -> FOUNDRIX)
 * 2. Glitch character scramble settling into the monumental brand mark
 * 3. Split-stroke contrast typography (solid fill vs outlined letterforms)
 * 4. High-velocity curtain slide-up reveal with cubic-bezier easing revealing the hero stage
 */

const CYCLING_WORDS = [
  'INNOVATE',
  'BUILD SPRINT',
  'REC CAMPUS',
  'LIVE PITCH',
  'FOUNDRIX',
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

export const CinematicLoader = ({ onComplete }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [scrambleText, setScrambleText] = useState('FOUNDRIX');
  const [phase, setPhase] = useState('rolling'); // 'rolling' -> 'scramble' -> 'locked' -> 'exit'

  useEffect(() => {
    // 1. Phase 1: Rapid word cycling (like slot-machine roll in Broed)
    let wordCycleCount = 0;
    const wordInterval = setInterval(() => {
      wordCycleCount++;
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);

      if (wordCycleCount >= 6) {
        clearInterval(wordInterval);
        setPhase('scramble');
      }
    }, 180);

    return () => {
      clearInterval(wordInterval);
    };
  }, []);

  // 3. Phase 2: Kinetic Scramble into FOUNDRIX
  useEffect(() => {
    if (phase !== 'scramble') return;

    const target = 'FOUNDRIX';
    let iteration = 0;

    const scrambleInterval = setInterval(() => {
      setScrambleText(
        target
          .split('')
          .map((letter, idx) => {
            if (idx < iteration) {
              return target[idx];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      iteration += 1 / 3;

      if (iteration >= target.length) {
        clearInterval(scrambleInterval);
        setScrambleText('FOUNDRIX');
        setPhase('locked');
      }
    }, 35);

    return () => clearInterval(scrambleInterval);
  }, [phase]);

  // 4. Phase 3 & 4: Locked and Curtain Exit
  useEffect(() => {
    if (phase === 'locked') {
      const exitTimer = setTimeout(() => {
        setPhase('exit');
        const completeTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 850);
        return () => clearTimeout(completeTimer);
      }, 550);

      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  // Click to skip for instant preview
  const handleSkip = () => {
    setPhase('exit');
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 400);
  };

  const isExiting = phase === 'exit';

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0a0d14',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 48px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.85s cubic-bezier(0.85, 0, 0.15, 1)',
        willChange: 'transform',
      }}
    >
      {/* Top Header Row (Broed-style top meta bar) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00f0ff',
              boxShadow: '0 0 10px #00f0ff',
              animation: 'pulseGlow 1.5s infinite alternate',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
            }}
          >
            RAGHU ENGINEERING COLLEGE • REC CAMPUS
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            color: 'var(--accent-cyan)',
            textTransform: 'uppercase',
          }}
        >
          OCTOBER 9–10, 2026
        </div>
      </div>

      {/* Center Stage: Broed Kinetic Typography */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: 'auto',
          transform: isExiting ? 'translateY(-30px) scale(0.95)' : 'translateY(0) scale(1)',
          transition: 'transform 0.85s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.5s ease',
          opacity: isExiting ? 0 : 1,
        }}
      >
        {phase === 'rolling' ? (
          /* Phase 1: Slot-Machine Rolling Word sequence */
          <div
            style={{
              height: 'clamp(4.5rem, 15vw, 10.5rem)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              key={wordIndex}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(4.5rem, 15vw, 10.5rem)',
                fontWeight: '900',
                lineHeight: '0.9',
                letterSpacing: '0.04em',
                color: '#ffffff',
                textTransform: 'uppercase',
                animation: 'broedSlideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                display: 'flex',
                gap: '8px',
              }}
            >
              {CYCLING_WORDS[wordIndex].split('').map((char, i) => (
                <span
                  key={i}
                  style={{
                    color: i % 2 === 0 ? '#ffffff' : 'transparent',
                    WebkitTextStroke: i % 2 === 0 ? 'none' : '2px #00f0ff',
                    textShadow: i % 2 === 0 ? '0 0 40px rgba(20, 110, 245, 0.6)' : 'none',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* Phase 2 & 3: Scramble & Locked Broed Brandmark */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Monumental Central Split-Stroke Wordmark */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(5.5rem, 18vw, 13rem)',
                fontWeight: '900',
                lineHeight: '0.85',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                userSelect: 'none',
              }}
            >
              {scrambleText.split('').map((char, i) => {
                const isOutline = i % 2 === 1;
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      color: isOutline ? 'transparent' : '#ffffff',
                      WebkitTextStroke: isOutline ? '2px #00f0ff' : 'none',
                      textShadow: isOutline
                        ? '0 0 25px rgba(0, 240, 255, 0.6)'
                        : '0 0 50px rgba(20, 110, 245, 0.8), 0 0 80px rgba(0, 240, 255, 0.4)',
                      transition: 'all 0.15s ease',
                      transform: phase === 'locked' ? 'scale(1)' : 'scale(1.02)',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>

            {/* Broed Subline Tag */}
            <div
              style={{
                marginTop: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                fontWeight: '700',
                letterSpacing: '0.25em',
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span>THE FLAGSHIP TECH SUMMIT</span>
              <span>•</span>
              <span style={{ color: '#ffffff' }}>2026</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Row (Skip prompt) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Skip hint */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '7px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            transition: 'all 0.2s ease',
          }}
        >
          CLICK TO ENTER ↗
        </div>
      </div>

      <style>{`
        @keyframes broedSlideUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CinematicLoader;
