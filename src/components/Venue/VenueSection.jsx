import React from 'react';
import { MapPin, CheckCircle2, Navigation, ExternalLink, Users, Calendar, Sparkles, Building2 } from 'lucide-react';
import RaghuLogo from '../Common/RaghuLogo';
import { EVENT_DATA } from '../../data/event';

export const VenueSection = () => {
  const { venueInfo, coordinators } = EVENT_DATA;

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
            Proudly hosted on-campus by the students of Raghu Engineering College (NEC Team REC) in Visakhapatnam.
          </p>
        </div>

        {/* 2-Column Split: Campus Arena Card & Student Host Desk */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'stretch',
          }}
        >
          {/* Card 1: Official Campus Showcase */}
          <div
            className="glass-card reveal-from-left"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
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
                  fontSize: '2.4rem',
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '28px',
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <a
                href="https://raghuenggcollege.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#146ef5',
                  color: '#ffffff',
                  padding: '12px 18px',
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
                  padding: '12px 18px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <MapPin size={16} />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Card 2: Student Host & Logistics Info */}
          <div
            className="glass-card reveal-from-right"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(20, 110, 245, 0.4)',
              background: 'linear-gradient(180deg, rgba(14, 20, 36, 0.85) 0%, rgba(9, 13, 24, 0.95) 100%)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <Users size={16} />
                <span>HOSTED BY REC STUDENTS</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.4rem',
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                STUDENT ORGANIZING TEAM
              </h3>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                }}
              >
                FOUNDRIX 2026 is initiated, designed, and hosted by the students of <strong>Raghu Engineering College</strong> under the National Entrepreneurship Challenge (NEC) in association with E-Cell IIT Bombay.
              </p>

              {/* Event Quick Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Calendar size={18} color="var(--accent-cyan)" />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SUMMIT DATES</div>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.92rem' }}>9 & 10 October 2026</div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Sparkles size={18} color="var(--accent-gold)" />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>EARLY BIRD PERK</div>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.92rem' }}>First 200 get Certificate from E-Cell, IIT Delhi</div>
                  </div>
                </div>
              </div>

              {/* Logistics Note */}
              <div
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'rgba(20, 110, 245, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(20, 110, 245, 0.3)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                  LOGISTICS & ARRIVAL ADVISORY
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  {venueInfo.note}
                </div>
              </div>
            </div>

            {/* Coordinator Contacts */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                STUDENT COORDINATOR HELPLINE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {coordinators.map((c) => (
                  <a
                    key={c.name}
                    href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span>{c.name}:</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{c.phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
