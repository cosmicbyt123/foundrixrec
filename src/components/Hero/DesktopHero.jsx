import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Users, Sparkles } from 'lucide-react';
import StardustCanvas from '../Common/StardustCanvas';
import GeometricX from './GeometricX';
import './Hero.css';

export const DesktopHero = ({ onRegisterClick, onOpenHackathonHub }) => {
  const heroRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Smooth scroll tracking across the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // 1. Initial scroll (0 -> 0.12): UI elements fade out first
  const rawUiOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const rawUiY = useTransform(scrollYProgress, [0, 0.12], [0, -15]);
  const rawUiPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.10 ? 'none' : 'auto'));

  // 2. CRITICAL SCROLL EFFECT (0 -> 0.45):
  // FOUNDRIX typography scales smoothly toward the viewer (1 -> 1.75) while fading away (1 -> 0)
  const rawTitleScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.75]);
  const rawTitleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28, 0.45], [1, 0.85, 0.35, 0]);
  const rawTitleY = useTransform(scrollYProgress, [0, 0.45], [0, -25]);

  // Subtitle fades subtly
  const rawSubtitleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.15]);

  // 3. Background geometric X subtle parallax and scaling (1 -> 1.05)
  const rawXScale = useTransform(scrollYProgress, [0, 0.50], [1, 1.05]);
  const rawXOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.8]);

  // Apply reduced-motion fallback values if requested
  const uiOpacity = reducedMotion ? 1 : rawUiOpacity;
  const uiY = reducedMotion ? 0 : rawUiY;
  const uiPointerEvents = reducedMotion ? 'auto' : rawUiPointerEvents;
  const titleScale = reducedMotion ? 1 : rawTitleScale;
  const titleOpacity = reducedMotion ? 1 : rawTitleOpacity;
  const titleY = reducedMotion ? 0 : rawTitleY;
  const subtitleOpacity = reducedMotion ? 1 : rawSubtitleOpacity;
  const xScale = reducedMotion ? 1 : rawXScale;
  const xOpacity = reducedMotion ? 1 : rawXOpacity;

  return (
    <section ref={heroRef} id="hero" className="foundrix-hero">
      {/* =========================================================================
          STICKY PINNED 100VH CAMERA VIEWPORT
          ========================================================================= */}
      <div className="foundrix-hero__viewport">
        {/* Layer 0: Near-black navy base & radial illumination */}
        <div className="foundrix-hero__background" />

        {/* Layer 1: Subtle Cosmic Stardust Particles */}
        <StardustCanvas particleCount={60} speed={0.25} />

        {/* Layer 2: Giant Geometric Electric Blue X & Perspective Runway */}
        <motion.div
          style={{
            scale: xScale,
            opacity: xOpacity,
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <GeometricX />
        </motion.div>

        {/* Layer 3: Minimal Technical HUD Elements */}
        <div className="foundrix-hero__hud" aria-hidden="true">
          {/* Circular HUD Reticle to left of 9&10 */}
          <div className="foundrix-hero__reticle">
            <div className="foundrix-hero__reticle-inner">
              <span className="foundrix-hero__reticle-dot" />
            </div>
          </div>

          {/* Lower-Left Micro Detail: SOMETHING IS BEING BUILT. */}
          <div className="foundrix-hero__built">
            <div>SOMETHING IS</div>
            <div>
              <span className="foundrix-hero__built-dot" />
              <span>BEING</span>
            </div>
            <div>BUILT.</div>
          </div>
        </div>

        {/* =======================================================================
            Layer 10: Centered Hero Presentation
            ======================================================================= */}
        <div className="foundrix-hero__content">
          {/* Top Event Association Pill */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
            }}
            className="foundrix-hero__pill"
          >
            <Sparkles size={13} color="#00f0ff" />
            <span className="foundrix-hero__pill-text">
              RAGHU ENGINEERING COLLEGE PRESENTS
            </span>
            <span className="foundrix-hero__pill-sep">|</span>
            <span className="foundrix-hero__pill-cyan">
              IN ASSOC. WITH E-CELL IIT BOMBAY
            </span>
          </motion.div>

          {/* Dominant FOUNDRIX Title (HTML typography with 3D Blue Shadow) */}
          <motion.h1
            style={{
              scale: titleScale,
              opacity: titleOpacity,
              y: titleY,
            }}
            className="foundrix-hero__title"
          >
            FOUNDRIX
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            style={{
              opacity: subtitleOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
            }}
            className="foundrix-hero__subtitle"
          >
            STARTUP &amp; ENTREPRENEURSHIP SUMMIT
          </motion.div>

          {/* Date: 9&10 October (nestled visually within the ivory runway) */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
            }}
            className="foundrix-hero__date"
          >
            <div className="foundrix-hero__date-num">9&amp;10</div>
            <div className="foundrix-hero__date-month">October</div>
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            style={{
              opacity: uiOpacity,
              y: uiY,
              pointerEvents: uiPointerEvents,
            }}
            className="foundrix-hero__actions"
          >
            {/* REGISTER Pill Button */}
            <button
              onClick={onRegisterClick}
              className="foundrix-hero__btn-register"
              aria-label="Register for Foundrix 2026 Summit"
            >
              <span>REGISTER</span>
              <ArrowUpRight size={16} color="#00f0ff" />
            </button>

            {/* LOGIN Pill Button */}
            <button
              onClick={onOpenHackathonHub}
              className="foundrix-hero__btn-login"
              aria-label="Login to Attendee Portal"
            >
              <Users size={15} color="#ffffff" />
              <span>LOGIN</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesktopHero;
