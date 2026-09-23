import React from 'react';
import { MapPin, Calendar, ArrowUpRight, Users, Sparkles, Trophy, Lightbulb, Ticket } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';
import FlipClock from '../Common/FlipClock';

export const Hero = ({ onRegisterClick, onOpenHackathonHub }) => {
  const { hero } = EVENT_DATA;

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '30px',
        paddingBottom: '20px',
        overflow: 'hidden',
        background: '#060709',
      }}
    >
      {/* Background: Grand Keynote Arena Stage & Tech Summit Keynote Auditorium */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(180deg, rgba(6, 7, 9, 0.5) 0%, rgba(6, 7, 9, 0.2) 30%, rgba(6, 7, 9, 0.65) 75%, #060709 100%),
            url('/assets/hero-bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.95,
          zIndex: 0,
        }}
      />

      {/* Atmospheric Stage Glow behind Title & CTAs */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '850px',
          maxWidth: '100%',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(20, 110, 245, 0.35) 0%, rgba(0, 240, 255, 0.15) 45%, transparent 75%)',
          filter: 'blur(70px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Hero Center Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          margin: 'auto',
          paddingTop: '20px',
          paddingBottom: '30px',
        }}
      >
        {/* Top Association Pill */}
        <div
          className="pill-badge reveal-on-scroll"
          style={{
            marginBottom: '18px',
            backgroundColor: 'rgba(9, 14, 28, 0.8)',
            borderColor: 'rgba(0, 240, 255, 0.4)',
            boxShadow: '0 0 20px rgba(20, 110, 245, 0.35)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Sparkles size={14} color="var(--accent-cyan)" />
          <span style={{ color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700' }}>
            {hero.association}
          </span>
        </div>

        {/* Monumental Bebas Neue Condensed Headline */}
        <div className="reveal-on-scroll" style={{ marginBottom: '24px', transitionDelay: '80ms' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.8rem, 12vw, 8.8rem)',
              fontWeight: '900',
              lineHeight: '0.86',
              letterSpacing: '0.01em',
              color: '#ffffff',
              textTransform: 'uppercase',
              textShadow: '0 8px 40px rgba(0, 0, 0, 0.95), 0 0 70px rgba(20, 110, 245, 0.45)',
              margin: 0,
            }}
          >
            FOUNDRIX 2026:
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.4rem, 11vw, 8.4rem)',
              fontWeight: '900',
              lineHeight: '0.88',
              letterSpacing: '0.02em',
              color: '#ffffff',
              textTransform: 'uppercase',
              textShadow: '0 8px 40px rgba(0, 0, 0, 0.95), 0 0 70px rgba(0, 240, 255, 0.45)',
              marginTop: '4px',
            }}
          >
            THE TECH SUMMIT
          </div>
        </div>

        {/* 3D Mechanical Split-Flap / Flip Clock Countdown */}
        <FlipClock targetDate={hero.targetDate} />

        {/* Symmetrical Controls Row: Venue & Date Pills */}
        <div
          className="reveal-on-scroll"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '26px',
            transitionDelay: '180ms',
          }}
        >
          {/* Capsule Pill: Campus Arena */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(10, 14, 26, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            }}
          >
            <MapPin size={15} color="var(--accent-cyan)" />
            <span style={{ color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
              CAMPUS ARENA, REC
            </span>
          </div>

          {/* Capsule Pill: Summit Dates */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(10, 14, 26, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            }}
          >
            <Calendar size={15} color="var(--accent-cyan)" />
            <span style={{ color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
              OCT 9–10, 2026
            </span>
          </div>
        </div>

        {/* Radiant Electric Blue Button + Team Hub Button */}
        <div
          className="reveal-on-scroll"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '15px',
            transitionDelay: '240ms',
          }}
        >
          {/* Concept Glowing Radiant Blue GET TICKETS Button */}
          <button
            onClick={onRegisterClick}
            style={{
              background: 'linear-gradient(180deg, #1872f8 0%, #084ebd 100%)',
              border: '2px solid #00f0ff',
              borderRadius: '9999px',
              padding: '14px 38px',
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: '800',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 35px rgba(20, 110, 245, 0.9), 0 0 16px rgba(0, 240, 255, 0.8)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(20, 110, 245, 1), 0 0 25px rgba(0, 240, 255, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 0 35px rgba(20, 110, 245, 0.9), 0 0 16px rgba(0, 240, 255, 0.8)';
            }}
          >
            <span>GET PASS — ₹799</span>
            <ArrowUpRight size={20} />
          </button>

          {/* Sleek Dark Glass Team Hub Button */}
          <button
            onClick={onOpenHackathonHub}
            style={{
              background: 'rgba(10, 14, 26, 0.8)',
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
              borderRadius: '9999px',
              padding: '14px 30px',
              color: '#ffffff',
              fontSize: '0.96rem',
              fontWeight: '700',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(14px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(20, 110, 245, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(10, 14, 26, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <Users size={18} color="var(--accent-cyan)" />
            <span>HACKATHON TEAM HUB</span>
          </button>
        </div>

        {/* Micro Subtitle */}
        <p
          className="reveal-on-scroll"
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            marginTop: '6px',
            transitionDelay: '300ms',
          }}
        >
          ₹799 ALL-INCLUSIVE PASS • 2-DAY WORKSHOP + ONLINE HACKATHON + SWAGS + CERTIFICATES
        </p>
      </div>

      {/* Concept Lower-Third Bento Preview Cards (Hackathon, Workshop, Pass Perks) */}
      <div
        className="container stagger-container"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Pillar 1: Online Hackathon */}
          <div
            onClick={onOpenHackathonHub}
            className="horizontal-snap-item glass-card reveal-from-left"
            style={{
              background: 'linear-gradient(180deg, rgba(16, 24, 44, 0.85) 0%, rgba(9, 13, 24, 0.95) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '16px 16px 0 0',
              padding: '20px 24px',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 -10px 30px rgba(0, 240, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
              e.currentTarget.style.boxShadow = '0 -8px 24px rgba(0, 0, 0, 0.5)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={18} color="var(--accent-cyan)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  ONLINE HACKATHON
                </span>
              </div>
              <ArrowUpRight size={16} color="var(--accent-cyan)" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: '1.4', margin: 0 }}>
              Build sprint before summit • 3–4 members • Pitch live on Day 1 (9 Oct)
            </p>
          </div>

          {/* Pillar 2: Entrepreneurship Workshop */}
          <div
            onClick={onRegisterClick}
            className="horizontal-snap-item glass-card reveal-scale"
            style={{
              background: 'linear-gradient(180deg, rgba(16, 24, 44, 0.85) 0%, rgba(9, 13, 24, 0.95) 100%)',
              border: '1px solid rgba(20, 110, 245, 0.45)',
              borderRadius: '16px 16px 0 0',
              padding: '20px 24px',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#1872f8';
              e.currentTarget.style.boxShadow = '0 -10px 30px rgba(20, 110, 245, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(20, 110, 245, 0.45)';
              e.currentTarget.style.boxShadow = '0 -8px 24px rgba(0, 0, 0, 0.5)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lightbulb size={18} color="#1872f8" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  2-DAY WORKSHOP
                </span>
              </div>
              <ArrowUpRight size={16} color="#1872f8" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: '1.4', margin: 0 }}>
              Hands-on startup, tech & MVP masterclasses inside REC campus auditorium
            </p>
          </div>

          {/* Pillar 3: All-Inclusive ₹799 Pass */}
          <div
            onClick={onRegisterClick}
            className="horizontal-snap-item glass-card reveal-from-right"
            style={{
              background: 'linear-gradient(180deg, rgba(16, 24, 44, 0.85) 0%, rgba(9, 13, 24, 0.95) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              borderRadius: '16px 16px 0 0',
              padding: '20px 24px',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.boxShadow = '0 -10px 30px rgba(251, 191, 36, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)';
              e.currentTarget.style.boxShadow = '0 -8px 24px rgba(0, 0, 0, 0.5)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ticket size={18} color="var(--accent-gold)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  ALL-IN-ONE PASS — ₹799
                </span>
              </div>
              <ArrowUpRight size={16} color="var(--accent-gold)" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: '1.4', margin: 0 }}>
              Workshop + Hackathon + Swags + Verified Certificates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
