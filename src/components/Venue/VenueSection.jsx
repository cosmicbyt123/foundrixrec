import React from 'react';
import { MapPin, CheckCircle2, ExternalLink, Building2 } from 'lucide-react';
import RaghuLogo from '../Common/RaghuLogo';
import { EVENT_DATA } from '../../data/event';

export const VenueSection = () => {
  const { venueInfo } = EVENT_DATA;

  return (
    <section id="venue" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-badge">
            <Building2 size={14} />
            <span>CAMPUS VENUE • RAGHU ENGINEERING COLLEGE</span>
          </div>
          <h2 className="section-title">SUMMIT VENUE & CAMPUS</h2>
          <p className="section-subtitle">
            Proudly hosted on-campus by the students of Raghu Engineering College in Visakhapatnam.
          </p>
        </div>

        {/* Campus Arena Official Showcase Card */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div
            className="glass-card reveal-on-scroll"
            style={{
              padding: 'clamp(24px, 4vw, 44px)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0, 240, 255, 0.3)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-blue)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <MapPin size={16} />
                <span>OFFICIAL VENUE</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <RaghuLogo size="large" />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                RAGHU ENGINEERING COLLEGE
              </h3>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(20, 110, 245, 0.15)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  marginBottom: '16px',
                }}
              >
                <span>AUTONOMOUS INSTITUTION</span>
                <span>•</span>
                <span style={{ color: 'var(--accent-gold)' }}>NAAC A+ GRADE</span>
              </div>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                }}
              >
                {venueInfo.address}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  marginBottom: '32px',
                }}
              >
                {venueInfo.facilities.map((fac, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--accent-cyan)" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <a
                href="https://raghuenggcollege.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#146ef5',
                  color: '#ffffff',
                  padding: '13px 20px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px rgba(20, 110, 245, 0.6)',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <span>Visit REC Website</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://maps.google.com/?q=Raghu+Engineering+College+Visakhapatnam"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-cyan"
                style={{
                  padding: '13px 20px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <MapPin size={16} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
