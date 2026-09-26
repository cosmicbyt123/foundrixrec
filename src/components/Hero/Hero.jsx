import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Users, Sparkles, ChevronDown, Trophy } from 'lucide-react';
import StardustCanvas from '../Common/StardustCanvas';

export const Hero = ({ onRegisterClick, onOpenHackathonHub }) => {
  const heroRef = useRef(null);

  // Smooth scroll tracking for hero zoom-through and seamless emergence
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // 1. Initial touch of scroll (0 -> 0.07): UI elements fade out instantly before title expands
  const uiOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const uiY = useTransform(scrollYProgress, [0, 0.07], [0, -18]);
  const uiPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? 'none' : 'auto'));

  // 2. FOUNDRIX'26 typography zooms forward into camera space (0.06 -> 0.44) and vanishes into blank void
  const titleScale = useTransform(scrollYProgress, [0.06, 0.44], [1, 6.8]);
  const titleOpacity = useTransform(scrollYProgress, [0.06, 0.20, 0.42], [1, 0.9, 0]);
  const titleLetterSpacing = useTransform(scrollYProgress, [0.06, 0.44], ['0.04em', '0.20em']);
  const heroFirstScreenOpacity = useTransform(scrollYProgress, [0.40, 0.45], [1, 0]);
  const heroFirstScreenPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.40 ? 'none' : 'auto'));

  // 3. Emergence of next section: THE 2 CORE PILLARS from the center blank/black screen (0.46 -> 0.86)
  // Exactly the opposite of hero zoom: emerges from depth/void, scales up to 1.0, fades in from black screen
  const emergenceScale = useTransform(scrollYProgress, [0.46, 0.85], [0.65, 1.0]);
  const emergenceOpacity = useTransform(scrollYProgress, [0.46, 0.76], [0, 1]);
  const emergenceY = useTransform(scrollYProgress, [0.46, 0.85], [35, 0]);
  const emergenceBlurVal = useTransform(scrollYProgress, [0.46, 0.76], [8, 0]);
  const emergenceBlur = useTransform(emergenceBlurVal, (v) => (v <= 0.2 ? 'none' : `blur(${v}px)`));
  const emergencePointerEvents = useTransform(scrollYProgress, (v) => (v < 0.55 ? 'none' : 'auto'));

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '160vh',
        backgroundColor: '#000000',
      }}
    >
      {/* =========================================================================
          AURORA MESH BACKGROUND (Disabled for Simple White & Black theme)
          To restore: uncomment this block
          ========================================================================= */}
      {/*
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/aurora-mesh-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.92,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      */}

      {/* Clean Tactile Subtle White Cyber Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.9,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Deep Dark Vignette Overlay for Crisp Contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtle Stardust Canvas */}
      <StardustCanvas particleCount={30} speed={0.4} />


      {/* =========================================================================
          STICKY PINNED CAMERA VIEWPORT
          ========================================================================= */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* Layer 1: FOUNDRIX'26 Hero Presentation */}
        <motion.div
          className="container hero-content-container"
          style={{
            opacity: heroFirstScreenOpacity,
            pointerEvents: heroFirstScreenPointerEvents,
            position: 'absolute',
            zIndex: 3,
            maxWidth: '1200px',
            width: '100%',
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Top Association Pill - Realistic, Refined Glassmorphism */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              backgroundColor: 'rgba(6, 12, 24, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '999px',
              marginBottom: '12px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              maxWidth: '92vw',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={13} color="#00f0ff" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.6rem, 1.8vw, 0.74rem)',
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              RAGHU ENGINEERING COLLEGE PRESENTS
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.6rem, 1.8vw, 0.74rem)',
                fontWeight: '700',
                color: '#00f0ff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              IN ASSOC. WITH E-CELL IIT BOMBAY
            </span>
          </motion.div>

          {/* Subtitle Prefix */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.74rem, 1.6vw, 1.05rem)',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            REC VISAKHAPATNAM'S
          </motion.div>

          {/* Monumental Title: FOUNDRIX'26 (Guaranteed single-line responsive clamp) */}
          <motion.h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 9.5vw, 9.4rem)',
              fontWeight: '900',
              lineHeight: '0.9',
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 14px 0',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 240, 255, 0.2)',
              scale: titleScale,
              opacity: titleOpacity,
              letterSpacing: titleLetterSpacing,
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
              whiteSpace: 'nowrap',
            }}
          >
            FOUNDRIX'26
          </motion.h1>

          {/* Tagline & Dates */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.74rem, 1.6vw, 1.02rem)',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '22px',
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>IMAGINE. BUILD. EVOLVE.</span>
            <span style={{ color: '#00f0ff' }}>✧</span>
            <span style={{ color: '#00f0ff', fontWeight: '800' }}>09TH–10TH OCT 2026</span>
          </motion.div>

          {/* Dual Clean Action Pills */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            {/* REGISTER Pill Button */}
            <button
              onClick={onRegisterClick}
              className="btn-border-beam"
              style={{
                borderRadius: '999px',
                padding: '12px 36px',
                background: 'linear-gradient(180deg, #0e1c32 0%, #060e1c 100%)',
                border: '1.5px solid rgba(0, 240, 255, 0.45)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.2)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.96rem',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.2)';
              }}
            >
              <span>REGISTER</span>
              <ArrowUpRight size={17} color="#00f0ff" />
            </button>

            {/* LOGIN Pill Button */}
            <button
              onClick={onOpenHackathonHub}
              style={{
                borderRadius: '999px',
                padding: '12px 30px',
                background: 'rgba(10, 16, 28, 0.75)',
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(12px)',
                color: '#ffffff',
                fontSize: '0.94rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(10, 16, 28, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Users size={16} color="#ffffff" />
              <span>LOGIN</span>
            </button>
          </motion.div>

          {/* Clean Scroll Prompt Indicator */}
          <motion.div
            style={{
              opacity: uiOpacity,
              marginTop: '26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                letterSpacing: '0.18em',
                color: 'rgba(0, 240, 255, 0.75)',
                textTransform: 'uppercase',
              }}
            >
              SCROLL TO EXPLORE
            </span>
            <ChevronDown size={14} color="#00f0ff" style={{ animation: 'bounceSlow 2s infinite' }} />
          </motion.div>
        </motion.div>

        {/* Layer 2: Next Section Emergence (THE 2 CORE PILLARS) from the Black Void */}
        <motion.div
          style={{
            opacity: emergenceOpacity,
            scale: emergenceScale,
            y: emergenceY,
            filter: emergenceBlur,
            pointerEvents: emergencePointerEvents,
            position: 'absolute',
            zIndex: 4,
            maxWidth: '960px',
            width: '100%',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Flagship Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.12), rgba(192, 132, 252, 0.12))',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              boxShadow: '0 0 16px rgba(0, 240, 255, 0.15)',
              marginBottom: '12px',
            }}
          >
            <Trophy size={13} color="#00f0ff" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 2vw, 0.72rem)',
                fontWeight: '800',
                color: '#00f0ff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              2 FLAGSHIP TRACKS • 1 PASS
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
              color: '#ffffff',
              fontWeight: '900',
              lineHeight: '1.05',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: '0 0 10px 0',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 240, 255, 0.25)',
            }}
          >
            THE 2 CORE PILLARS
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)',
              maxWidth: '520px',
              margin: '0 auto 20px auto',
              lineHeight: '1.45',
            }}
          >
            Every ₹799 pass unlocks simultaneous access to both the Online Hackathon and the 2-Day In-Person Workshop.
          </p>

          {/* Pulsing Origin Launch Node */}
          <div
            style={{
              position: 'relative',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 25%, #00f0ff 70%, #2563eb 100%)',
              boxShadow: '0 0 16px #00f0ff, 0 0 28px rgba(0, 240, 255, 0.8)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: '-5px',
                borderRadius: '50%',
                border: '1.5px solid rgba(0, 240, 255, 0.8)',
                animation: 'anchorPing 2.2s infinite ease-out',
              }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes anchorPing {
          0% { transform: scale(0.6); opacity: 0.95; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
