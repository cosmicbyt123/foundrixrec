import React from 'react';
import { ArrowUpRight, Users, Sparkles } from 'lucide-react';
import StardustCanvas from '../Common/StardustCanvas';
import './MobileHero.css';

export const MobileHero = ({ onRegisterClick, onOpenHackathonHub }) => {
  return (
    <section id="hero" className="foundrix-hero-mobile">
      {/* Layer 0: Continuous Dark Navy to Royal Blue Background Canvas */}
      <div className="foundrix-hero-mobile__background" />
      <div className="foundrix-hero-mobile__bottom-glow" />

      {/* Layer 1: Dedicated Mobile Stardust Particles */}
      <StardustCanvas particleCount={35} speed={0.18} />

      {/* Layer 10: Centered Portrait Content Presentation (Single Center Axis) */}
      <div className="foundrix-hero-mobile__viewport">
        <div className="foundrix-hero-mobile__content">
          {/* Association Pill */}
          <div className="foundrix-hero-mobile__pill">
            <Sparkles size={11} color="#00f0ff" className="foundrix-hero-mobile__pill-sparkle" />
            <div className="foundrix-hero-mobile__pill-body">
              <span className="foundrix-hero-mobile__pill-line1">
                RAGHU ENGINEERING COLLEGE PRESENTS
              </span>
              <span className="foundrix-hero-mobile__pill-sep">•</span>
              <span className="foundrix-hero-mobile__pill-line2">
                IN ASSOC. WITH E-CELL IIT BOMBAY
              </span>
            </div>
          </div>

          {/* Dominant FOUNDRIX Title (Proportional & Centered) */}
          <h1 className="foundrix-hero-mobile__title">
            FOUNDRIX
          </h1>

          {/* Subtitle */}
          <div className="foundrix-hero-mobile__subtitle">
            STARTUP &amp; ENTREPRENEURSHIP SUMMIT
          </div>

          {/* Date: 9&10 October */}
          <div className="foundrix-hero-mobile__date">
            <div className="foundrix-hero-mobile__date-num">9&amp;10</div>
            <div className="foundrix-hero-mobile__date-month">October</div>
          </div>

          {/* Dual Primary CTA Buttons */}
          <div className="foundrix-hero-mobile__actions">
            <button
              onClick={onRegisterClick}
              className="foundrix-hero-mobile__btn-register"
              aria-label="Register for Foundrix 2026 Summit"
            >
              <span>REGISTER</span>
              <ArrowUpRight size={14} color="#00f0ff" />
            </button>

            <button
              onClick={onOpenHackathonHub}
              className="foundrix-hero-mobile__btn-login"
              aria-label="Login to Attendee Portal"
            >
              <Users size={14} color="#ffffff" />
              <span>LOGIN</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;
