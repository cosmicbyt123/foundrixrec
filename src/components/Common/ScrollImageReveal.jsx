import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, MapPin, Users, Award, ShieldCheck } from 'lucide-react';

/**
 * ScrollImageReveal
 * Inspired by Motion.dev "Scroll Image Reveal" recipe
 * - Element-targeted useScroll tracking
 * - useTransform for clipPath curtain reveal
 * - useTransform for inner image parallax scale (1.25 -> 1.0)
 * - Luminous cyber-laser curtain border matching the FOUNDRIX 2026 theme
 */
export const ScrollImageReveal = ({
  src = '/assets/conclave_arena_reveal.jpg',
  alt = 'FOUNDRIX 2026 Conclave Arena',
  tag = 'CONCLAVE ARENA • REC CAMPUS ARENA',
  title = 'THE 2026 INNOVATION ARENA',
  subtitle = 'Where 1,000+ student founders, engineers, and venture builders converge on 9-10 October 2026.',
  stats = [
    { label: 'ATTENDEES', value: '1,000+' },
    { label: 'SPRINT DURATION', value: '48 HOURS' },
    { label: 'ALLIANCE', value: 'E-CELL IIT BOMBAY' },
  ],
  style = {},
}) => {
  const containerRef = useRef(null);

  // Element-targeted scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Motion.dev Signature: Curtain Clip-Path expansion as you scroll
  const clipPath = useTransform(
    smoothProgress,
    [0.08, 0.78],
    [
      'inset(16% 16% 16% 16% round 28px)',
      'inset(0% 0% 0% 0% round 18px)',
    ]
  );

  // Motion.dev Signature: Parallax Inner Image Scale (zooms in, settles to 1.0)
  const imageScale = useTransform(smoothProgress, [0.05, 0.85], [1.25, 1.0]);

  // Container subtle depth scale
  const containerScale = useTransform(smoothProgress, [0.08, 0.75], [0.93, 1.0]);

  // Overall luminosity and opacity fade
  const opacity = useTransform(smoothProgress, [0.02, 0.22], [0.35, 1]);
  const overlayOpacity = useTransform(smoothProgress, [0.35, 0.75], [0, 1]);
  const laserGlow = useTransform(smoothProgress, [0.1, 0.5, 0.85], [0.4, 1, 0.3]);

  return (
    <div
      ref={containerRef}
      className="scroll-image-reveal-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto 40px auto',
        padding: '0 4px',
        ...style,
      }}
    >
      {/* Outer Glow Halo */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '26px',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 240, 255, 0.18), rgba(192, 132, 252, 0.12), transparent 75%)',
          filter: 'blur(20px)',
          opacity: laserGlow,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Motion Container with Dynamic Curtain clipPath */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          minHeight: '280px',
          maxHeight: '520px',
          clipPath,
          scale: containerScale,
          opacity,
          borderRadius: '18px',
          border: '1.5px solid rgba(0, 240, 255, 0.38)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 240, 255, 0.2)',
          overflow: 'hidden',
          zIndex: 1,
          backgroundColor: '#040714',
        }}
      >
        {/* Parallax Scaling Inner Image */}
        <motion.img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            scale: imageScale,
            transformOrigin: 'center center',
          }}
        />

        {/* Ambient Vignette & Gradient Overlays for High-Contrast Text Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(4, 7, 20, 0.25) 0%, rgba(4, 7, 20, 0.45) 50%, rgba(4, 7, 20, 0.92) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Cyber Neon Scanline Texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.02) 0px, rgba(0, 240, 255, 0.02) 1px, transparent 1px, transparent 3px)',
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        />

        {/* Luminous High-Tech Curtain Edge Indicator Beams */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00f0ff 30%, #ffffff 50%, #c084fc 70%, transparent)',
            boxShadow: '0 0 12px #00f0ff',
            opacity: laserGlow,
          }}
        />

        {/* Overlay Content Reveals with Smooth Fade-In */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: overlayOpacity,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {/* Top Header Pill HUD */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(6, 12, 24, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <MapPin size={13} color="#00f0ff" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: 'rgba(192, 132, 252, 0.15)',
                border: '1px solid rgba(192, 132, 252, 0.4)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Sparkles size={12} color="#c084fc" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  fontWeight: '800',
                  color: '#c084fc',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                OFFICIAL 2026 VENUE
              </span>
            </div>
          </div>

          {/* Bottom Banner Typography & Quick Stats */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 0 6px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                lineHeight: '1.1',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 240, 255, 0.3)',
              }}
            >
              {title}
            </h3>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: 'clamp(0.82rem, 1.4vw, 0.94rem)',
                maxWidth: '680px',
                margin: '0 0 16px 0',
                lineHeight: '1.5',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              {subtitle}
            </p>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(6, 12, 24, 0.75)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'rgba(0, 240, 255, 0.85)',
                      letterSpacing: '0.08em',
                      fontWeight: '700',
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.86rem',
                      fontWeight: '900',
                      color: '#ffffff',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollImageReveal;
