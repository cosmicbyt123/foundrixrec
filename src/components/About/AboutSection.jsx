import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, ExternalLink } from 'lucide-react';
import RaghuLogo from '../Common/RaghuLogo';

export const AboutSection = () => {
  const facilities = [
    'Centrally Air-Conditioned Presentation Theatres & Seminar Halls',
    'High-Speed Gigabit Campus Wi-Fi & Power Stations',
    'Dedicated Startup Incubation Center & Hackathon Pitch Arena',
    'Sprawling Green Campus with Modern Amenities',
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '50px 0 90px 0',
        backgroundColor: '#000000',
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

      {/* Dark Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '880px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* Official Venue Card matching Screenshot 3 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{
            borderRadius: '18px',
            background: 'linear-gradient(180deg, rgba(8, 14, 28, 0.9) 0%, rgba(4, 7, 16, 0.96) 100%)',
            border: '1.5px solid rgba(0, 240, 255, 0.35)',
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 240, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: '800',
              color: '#00f0ff',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <MapPin size={15} color="#00f0ff" />
            <span>OFFICIAL VENUE</span>
          </div>

          {/* Logo */}
          <div style={{ marginBottom: '16px' }}>
            <RaghuLogo size={46} />
          </div>

          {/* Heading */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3.8vw, 2.5rem)',
              color: '#ffffff',
              fontWeight: '900',
              textTransform: 'uppercase',
              margin: '0 0 10px 0',
              letterSpacing: '0.02em',
            }}
          >
            RAGHU ENGINEERING COLLEGE
          </h3>

          {/* Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(20, 110, 245, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '999px',
              padding: '4px 14px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: '800',
              color: '#00f0ff',
              letterSpacing: '0.08em',
              marginBottom: '18px',
            }}
          >
            <span>AUTONOMOUS INSTITUTION</span>
            <span style={{ color: 'rgba(0, 240, 255, 0.5)' }}>•</span>
            <span style={{ color: '#f59e0b' }}>NAAC A+ GRADE</span>
          </div>

          {/* Address */}
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.72)',
              fontSize: '0.92rem',
              lineHeight: '1.55',
              margin: '0 0 24px 0',
            }}
          >
            Dakamarri, Bheemunipatnam Mandal, Visakhapatnam, Andhra Pradesh — 531162
          </p>

          {/* Facilities Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px 20px',
              marginBottom: '28px',
            }}
          >
            {facilities.map((fac, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#00f0ff" style={{ flexShrink: 0 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.86rem', lineHeight: '1.4' }}>
                  {fac}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://raghuenggcollege.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#146ef5',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(20, 110, 245, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d78fc';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#146ef5';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>VISIT REC WEBSITE</span>
              <ExternalLink size={15} />
            </a>

            <a
              href="https://maps.google.com/?q=Raghu+Engineering+College+Visakhapatnam"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'rgba(10, 16, 28, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                color: '#00f0ff',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(10, 16, 28, 0.85)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MapPin size={15} />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
