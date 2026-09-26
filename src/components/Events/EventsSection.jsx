import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Terminal,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Sparkles,
} from 'lucide-react';

export const EventsSection = ({ onRegisterClick, onOpenHackathonHub, hideHeader = false }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 901);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Entrance scroll tracking (for standalone page /events)
  const { scrollYProgress: entranceProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 20%'],
  });

  const headerScale = useTransform(entranceProgress, [0.12, 0.82], [0.65, 1]);
  const headerOpacity = useTransform(entranceProgress, [0.12, 0.72], [0, 1]);
  const headerY = useTransform(entranceProgress, [0.12, 0.82], [50, 0]);
  const headerBlurVal = useTransform(entranceProgress, [0.12, 0.72], [8, 0]);
  const headerBlur = useTransform(headerBlurVal, (v) => v <= 0.2 ? 'none' : `blur(${v}px)`);

  // Smooth scroll tracking for the Event section laser spine & cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: hideHeader ? ['start 85%', 'end 85%'] : ['start 65%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Straight vertical laser beam height & tracer riding the tip
  const lineHeight = useTransform(smoothProgress, [0.05, 0.95], ['0%', '100%']);
  const tracerTop = useTransform(smoothProgress, [0.05, 0.95], ['0%', '100%']);
  const tracerOpacity = useTransform(smoothProgress, [0.02, 0.1, 0.9, 0.98], [0, 1, 1, 0]);

  // Track 01 (Online Hackathon - Left side, Up) Docking
  const leftConnectorScaleX = useTransform(smoothProgress, [0.12, 0.35], [0, 1]);
  const leftCardOpacity = useTransform(smoothProgress, [0.15, 0.40], [0, 1]);
  const leftCardX = useTransform(smoothProgress, [0.15, 0.40], [-25, 0]);

  // Track 02 (Startup Workshop - Right side, Down) Docking
  const rightConnectorScaleX = useTransform(smoothProgress, [0.45, 0.70], [0, 1]);
  const rightCardOpacity = useTransform(smoothProgress, [0.48, 0.75], [0, 1]);
  const rightCardX = useTransform(smoothProgress, [0.48, 0.75], [25, 0]);

  // Terminal Anchor Beacon Flare at the base of events
  const terminalScale = useTransform(smoothProgress, [0.82, 0.98], [0.6, 1.25]);
  const terminalGlow = useTransform(smoothProgress, [0.82, 0.98], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="events"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#000000',
        padding: hideHeader ? '0 0 70px 0' : '24px 0 70px 0',
        marginTop: hideHeader ? (isMobile ? '-14vh' : '-22vh') : '0',
        overflow: 'hidden',
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

      {/* Clean Subtle White Cyber Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Deep Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Scoped CSS for Keyframes and Spine Layout */}
      <style>{`
        @keyframes anchorPing {
          0% { transform: scale(0.6); opacity: 0.95; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes laserGlowPulse {
          0%, 100% { filter: drop-shadow(0 0 6px #00f0ff) drop-shadow(0 0 14px rgba(0, 240, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 10px #00f0ff) drop-shadow(0 0 22px rgba(192, 132, 252, 0.7)); }
        }

        /* Desktop Spine Layout */
        @media (min-width: 901px) {
          .spine-timeline-wrapper {
            position: relative;
            max-width: 820px;
            width: 100%;
            margin: 0 auto;
          }
          .timeline-spine-track {
            position: absolute;
            top: 7px;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            z-index: 4;
            pointer-events: none;
          }
          .e-split-layout {
            display: flex;
            justify-content: space-between;
            position: relative;
            width: 100%;
            margin: 0 auto;
          }
          .e-col-left {
            width: calc(50% - 36px);
            max-width: 350px;
            position: relative;
            align-self: flex-start;
          }
          .e-col-right {
            width: calc(50% - 36px);
            max-width: 350px;
            position: relative;
            align-self: flex-start;
            margin-top: 75px;
          }
          .e-connector-left {
            position: absolute;
            top: 55px;
            right: -36px;
            width: 36px;
            height: 2px;
            background: linear-gradient(90deg, rgba(0, 240, 255, 0.2), #00f0ff);
            box-shadow: 0 0 8px #00f0ff;
            transform-origin: right center;
            z-index: 5;
          }
          .e-anchor-left {
            position: absolute;
            right: -6px;
            top: -5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #00f0ff;
            box-shadow: 0 0 12px #00f0ff;
          }
          .e-connector-right {
            position: absolute;
            top: 55px;
            left: -36px;
            width: 36px;
            height: 2px;
            background: linear-gradient(90deg, #c084fc, rgba(192, 132, 252, 0.2));
            box-shadow: 0 0 8px #c084fc;
            transform-origin: left center;
            z-index: 5;
          }
          .e-anchor-right {
            position: absolute;
            left: -6px;
            top: -5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #c084fc;
            box-shadow: 0 0 12px #c084fc;
          }
        }

        /* Mobile Spine Layout */
        @media (max-width: 900px) {
          .spine-timeline-wrapper {
            position: relative;
            width: 100%;
            max-width: 440px;
            margin: 0 auto;
          }
          .timeline-spine-track {
            position: absolute;
            top: 7px;
            bottom: 20px;
            left: 16px;
            width: 2px;
            z-index: 4;
            pointer-events: none;
          }
          .e-split-layout {
            display: flex;
            flex-direction: column;
            gap: 24px;
            position: relative;
            padding-left: 38px;
            padding-right: 6px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .e-col-left, .e-col-right {
            width: 100%;
            max-width: 100%;
            position: relative;
            margin-top: 0 !important;
            box-sizing: border-box;
          }
          .e-connector-left, .e-connector-right {
            position: absolute;
            top: 45px;
            left: -22px;
            width: 22px;
            height: 2px;
            background: #00f0ff;
            box-shadow: 0 0 8px #00f0ff;
            transform-origin: left center;
            z-index: 5;
          }
          .e-anchor-left, .e-anchor-right {
            position: absolute;
            left: -6px;
            top: -5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #00f0ff;
            box-shadow: 0 0 10px #00f0ff;
          }
        }
      `}</style>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* =======================================================================
            SECTION HEADER: THE 2 CORE PILLARS (Rendered only on standalone /events page)
            ======================================================================= */}
        {!hideHeader && (
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: '28px',
              position: 'relative',
              zIndex: 6,
              scale: headerScale,
              opacity: headerOpacity,
              y: headerY,
              filter: headerBlur,
            }}
          >
            {/* Flagship Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.12), rgba(192, 132, 252, 0.12))',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.15)',
                marginBottom: '10px',
              }}
            >
              <Trophy size={13} color="#00f0ff" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
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
                fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
                color: '#ffffff',
                fontWeight: '900',
                lineHeight: '1.05',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)',
              }}
            >
              THE 2 CORE PILLARS
            </h2>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.88rem',
                maxWidth: '520px',
                margin: '0 auto',
                lineHeight: '1.45',
              }}
            >
              Every ₹799 pass unlocks simultaneous access to both the Online Hackathon and the 2-Day In-Person Workshop.
            </p>
          </motion.div>
        )}

        {/* =======================================================================
            SPINE TIMELINE: 2 EVENT CARDS ATTACHED TO STRAIGHT VERTICAL STRING
            ======================================================================= */}
        <div className="spine-timeline-wrapper">
          {/* Top Origin Launch Node - Laser line starts strictly here */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'center',
              paddingLeft: isMobile ? '13px' : '0',
              alignItems: 'center',
              marginBottom: '20px',
              zIndex: 6,
            }}
          >
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
          </div>

          {/* Straight Vertical Laser Line between the 2 Cards */}
          <div className="timeline-spine-track">
            {/* Background static faint rail */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.08)',
              }}
            />

            {/* Scroll-Driven Active Gradient Laser Beam */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: lineHeight,
                background: 'linear-gradient(180deg, #00f0ff 0%, #2563eb 35%, #9333ea 70%, #c084fc 100%)',
                boxShadow: '0 0 10px #00f0ff, 0 0 20px rgba(192, 132, 252, 0.6)',
                animation: 'laserGlowPulse 4s infinite ease-in-out',
              }}
            />

            {/* Glowing Plasma Tracer Head riding the tip */}
            <motion.div
              style={{
                position: 'absolute',
                top: tracerTop,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: tracerOpacity,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 12px #00f0ff, 0 0 24px #ffffff, 0 0 35px rgba(0, 240, 255, 0.8)',
                zIndex: 8,
              }}
            />
          </div>

          {/* =====================================================================
              THE 2 EVENT CARDS (Track 01 Up Left, Track 02 Down Right)
              ===================================================================== */}
          <div className="e-split-layout">
            {/* TRACK 01: ONLINE HACKATHON (Left Side, Up) */}
            <div className="e-col-left">
              <motion.div
                className="e-connector-left"
                style={{
                  scaleX: isMobile ? 1 : leftConnectorScaleX,
                  opacity: isMobile ? 1 : leftConnectorScaleX,
                }}
              >
                <div className="e-anchor-left" />
              </motion.div>

              <motion.div
                onClick={() => navigate('/hackathon')}
                style={{
                  opacity: isMobile ? 1 : leftCardOpacity,
                  x: isMobile ? 0 : leftCardX,
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, rgba(8, 14, 28, 0.88) 0%, rgba(4, 7, 16, 0.96) 100%)',
                  border: '1.5px solid rgba(0, 240, 255, 0.38)',
                  padding: '20px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 240, 255, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                {/* Top Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                  }}
                />

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        fontWeight: '800',
                        color: '#00f0ff',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '3px 9px',
                        borderRadius: '999px',
                        background: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid rgba(0, 240, 255, 0.35)',
                      }}
                    >
                      TRACK 01 • VIRTUAL
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid rgba(0, 240, 255, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00f0ff',
                      }}
                    >
                      <Terminal size={16} />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)',
                      fontWeight: '900',
                      color: '#ffffff',
                      margin: '0 0 6px 0',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      lineHeight: '1.1',
                    }}
                  >
                    ONLINE HACKATHON
                  </h3>

                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.68)',
                      fontSize: '0.82rem',
                      lineHeight: '1.4',
                      marginBottom: '14px',
                    }}
                  >
                    24-Hour virtual innovation sprint to build high-impact tech prototypes.
                  </p>

                  {/* Team Size 3-4 Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 240, 255, 0.08)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      marginBottom: '14px',
                    }}
                  >
                    <Sparkles size={14} color="#00f0ff" />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: '800',
                        color: '#00f0ff',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Team Size: 3–4 Members
                    </span>
                  </div>

                  {/* Short Perks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={13} color="#00f0ff" />
                      <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Hardware & Software Tracks
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={13} color="#00f0ff" />
                      <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Verified E-Cell IIT Bombay Certificate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/hackathon');
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.45)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00f0ff';
                    e.currentTarget.style.color = '#040714';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            </div>

            {/* TRACK 02: STARTUP WORKSHOP (Right Side, Down) */}
            <div className="e-col-right">
              <motion.div
                className="e-connector-right"
                style={{
                  scaleX: isMobile ? 1 : rightConnectorScaleX,
                  opacity: isMobile ? 1 : rightConnectorScaleX,
                }}
              >
                <div className="e-anchor-right" />
              </motion.div>

              <motion.div
                onClick={() => navigate('/workshop')}
                style={{
                  opacity: isMobile ? 1 : rightCardOpacity,
                  x: isMobile ? 0 : rightCardX,
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, rgba(14, 10, 26, 0.88) 0%, rgba(8, 5, 18, 0.96) 100%)',
                  border: '1.5px solid rgba(192, 132, 252, 0.38)',
                  padding: '20px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.85), 0 0 25px rgba(192, 132, 252, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                {/* Top Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #c084fc, transparent)',
                  }}
                />

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        fontWeight: '800',
                        color: '#c084fc',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '3px 9px',
                        borderRadius: '999px',
                        background: 'rgba(192, 132, 252, 0.12)',
                        border: '1px solid rgba(192, 132, 252, 0.35)',
                      }}
                    >
                      TRACK 02 • IN-PERSON
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(192, 132, 252, 0.12)',
                        border: '1px solid rgba(192, 132, 252, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#c084fc',
                      }}
                    >
                      <Lightbulb size={16} />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)',
                      fontWeight: '900',
                      color: '#ffffff',
                      margin: '0 0 6px 0',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      lineHeight: '1.1',
                    }}
                  >
                    STARTUP WORKSHOP
                  </h3>

                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.68)',
                      fontSize: '0.82rem',
                      lineHeight: '1.4',
                      marginBottom: '14px',
                    }}
                  >
                    2-Day immersive masterclasses on zero-to-one venture building & GenAI tools.
                  </p>

                  {/* In-Person Format Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(192, 132, 252, 0.08)',
                      border: '1px solid rgba(192, 132, 252, 0.25)',
                      marginBottom: '14px',
                    }}
                  >
                    <Sparkles size={14} color="#c084fc" />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: '800',
                        color: '#c084fc',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Format: 2 Full Days On-Campus
                    </span>
                  </div>

                  {/* Short Perks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={13} color="#c084fc" />
                      <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Hands-on Pitch & Architecture Toolkits
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={13} color="#c084fc" />
                      <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Dual Certification: REC & E-Cell IIT Bombay
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/workshop');
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(192, 132, 252, 0.12)',
                    border: '1px solid rgba(192, 132, 252, 0.45)',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c084fc';
                    e.currentTarget.style.color = '#040714';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(192, 132, 252, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Terminal Anchor Beacon at the Base of the Event Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'flex-start' : 'center',
              paddingLeft: isMobile ? '12px' : '0',
              marginTop: '40px',
              position: 'relative',
              zIndex: 6,
            }}
          >
            <motion.div
              style={{
                scale: terminalScale,
                opacity: terminalGlow,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff, #00f0ff)',
                boxShadow: '0 0 16px #00f0ff, 0 0 32px #00f0ff',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
