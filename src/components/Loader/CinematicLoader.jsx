import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Users, Terminal, ArrowUpRight } from 'lucide-react';

/**
 * FOUNDRIX 2026 — Executive Entrepreneurship & Tech Summit Loader
 * Designed with the prestige and architectural rigor of Y Combinator Demo Day,
 * TechCrunch Disrupt, and Tier-1 Collegiate Entrepreneurship Summits (IIT / Stanford E-Cell).
 *
 * Core Narrative:
 * 1. Founder Acceleration Sequence: IDEATE -> VALIDATE -> BUILD SPRINT -> PITCH -> FOUNDRIX
 * 2. Precision Telemetry: Real-time venture stats (Seed Pool, E-Cell IIT Delhi, Delegates)
 * 3. Minimalist, high-contrast, obsidian typography with ZERO nightclub/rave glows
 */

const VENTURE_PILLARS = [
  { step: '01', label: 'IDEATE', subtitle: 'Problem Validation & Market Research' },
  { step: '02', label: 'BUILD', subtitle: 'Rapid Prototype & Hackathon Sprint' },
  { step: '03', label: 'PITCH', subtitle: 'Live Jury & Angel Evaluation' },
  { step: '04', label: 'SCALE', subtitle: 'Incubation & Seed Pathway' },
];

export const CinematicLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinalLock, setIsFinalLock] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate smoothly
        const increment = prev < 70 ? 2.5 : 4;
        return Math.min(100, Math.floor(prev + increment));
      });
    }, 45);

    // Step cycler (Ideate -> Build -> Pitch -> Scale)
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < VENTURE_PILLARS.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        setIsFinalLock(true);
        return prev;
      });
    }, 450);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  // When progress reaches 100% and final brandmark locks, initiate clean exit curtain
  useEffect(() => {
    if (progress === 100 && isFinalLock) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        const completeTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 750);
        return () => clearTimeout(completeTimer);
      }, 500);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, isFinalLock, onComplete]);

  // Click anywhere to skip instantly
  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  const activePillar = VENTURE_PILLARS[currentStep];

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#06070a',
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(20, 110, 245, 0.15), transparent 70%),
          linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4.5vw, 44px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)',
        willChange: 'transform',
      }}
    >
      {/* 1. Executive Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '14px',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.4vw, 0.78rem)',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '600',
              textTransform: 'uppercase',
            }}
          >
            E-CELL REC × INITIATIVE 2026
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1.4vw, 0.78rem)',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>OCTOBER 9–10</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
          <span style={{ color: '#ffffff' }}>VISAKHAPATNAM</span>
        </div>
      </div>

      {/* 2. Main Centerpiece: Authoritative Entrepreneurship Wordmark */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '980px',
          margin: 'auto',
          textAlign: 'center',
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.5s ease',
        }}
      >
        {/* Crisp Founder Phase Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-cyan)',
              fontWeight: '700',
            }}
          >
            PHASE {activePillar.step}
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: '#ffffff',
              letterSpacing: '0.12em',
              fontWeight: '600',
              textTransform: 'uppercase',
            }}
          >
            {activePillar.label} — {activePillar.subtitle}
          </span>
        </div>

        {/* Monumental, Clean White Typography (No neon glow, no club outlines) */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4.8rem, 16vw, 11rem)',
            fontWeight: '900',
            lineHeight: '0.88',
            letterSpacing: '0.03em',
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
            userSelect: 'none',
          }}
        >
          FOUNDRIX
        </h1>

        {/* Authoritative Summit Tagline */}
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
              fontWeight: '700',
              letterSpacing: '0.18em',
              color: 'rgba(255, 255, 255, 0.95)',
              textTransform: 'uppercase',
            }}
          >
            THE ENTREPRENEURSHIP & TECHNOLOGY SUMMIT
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              background: '#146ef5',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '0.08em',
            }}
          >
            2026
          </span>
        </div>

        {/* Minimalist Subtext */}
        <p
          style={{
            marginTop: '10px',
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.75rem, 1.4vw, 0.88rem)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
            maxWidth: '560px',
          }}
        >
          WHERE STUDENT INNOVATORS VALIDATE, BUILD & SCALE VENTURES
        </p>

        {/* Precision Progress Bar + Percentage */}
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            marginTop: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span>INITIALIZING SUMMIT STAGE</span>
            <span style={{ color: '#ffffff', fontWeight: '700' }}>{progress}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#146ef5',
                boxShadow: '0 0 8px rgba(20, 110, 245, 0.8)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Bottom Telemetry Grid: Serious Entrepreneurship Accreditations */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          width: '100%',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.25s ease',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '16px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: '12px',
            width: '100%',
          }}
        >
          {/* Stat 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={15} color="var(--accent-cyan)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Certified: <strong>E-Cell IIT Delhi</strong>
            </span>
          </div>

          {/* Stat 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={15} color="#10b981" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Seed & Cash Pool: <strong>₹1,00,000+</strong>
            </span>
          </div>

          {/* Stat 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={15} color="#60a5fa" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Sprint: <strong>Online Hackathon + Pitch</strong>
            </span>
          </div>

          {/* Skip prompt button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span>ENTER SUMMIT</span>
              <ArrowUpRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicLoader;
