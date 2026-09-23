import React from 'react';
import { Ticket, Check, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const PassesSection = ({ onRegisterClick }) => {
  const { pass } = EVENT_DATA;

  return (
    <section id="passes" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Exact Congra Template Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '55px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              color: '#ffffff',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
              lineHeight: '0.92',
            }}
          >
            SELECT YOUR EXPERIENCE
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              margin: 0,
            }}
          >
            Choose the experience that suits you best! Flat ₹799 per head all-inclusive pass.
          </p>
        </div>

        {/* 2-Card Congra Experience Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            maxWidth: '920px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {/* Card 1: Obsidian Black Card (Full Summit Pass) */}
          <div
            className="reveal-from-left"
            style={{
              backgroundColor: '#0c0f17',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: 'clamp(28px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(20, 110, 245, 0.5)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                ALL-INCLUSIVE PASS
              </div>

              {/* Congra Big Price Header */}
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '28px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3.8rem, 8vw, 5.5rem)',
                    color: '#ffffff',
                    lineHeight: '0.85',
                  }}
                >
                  ₹799
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    color: 'var(--text-muted)',
                    marginLeft: '2px',
                  }}
                >
                  .00
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginLeft: '8px',
                  }}
                >
                  / PER HEAD
                </span>
              </div>

              {/* Congra Checklist with Square Checkmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {[
                  'Full Entry to 2-Day In-Person Workshop at Raghu Engg College',
                  'Entry to Online Hackathon (Form 3–4 Member Team)',
                  'Live Pitch & Demo on Day 1 (9 Oct) Before Startup Jury',
                  'Official Foundrix Swags & Merch Kit',
                  'Campus Delegate Networking & Startup Lounge Access',
                  'Official Certificate of Participation',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '3px',
                        backgroundColor: '#146ef5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={14} color="#ffffff" strokeWidth={3} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: '1.45' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Congra Blue Action Button */}
            <button
              onClick={onRegisterClick}
              style={{
                width: '100%',
                backgroundColor: '#146ef5',
                border: 'none',
                borderRadius: '4px',
                padding: '16px',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontWeight: '800',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(20, 110, 245, 0.6)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2579f8';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(20, 110, 245, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#146ef5';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(20, 110, 245, 0.6)';
              }}
            >
              <span>RESERVE PASS — ₹799</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Card 2: Electric Cobalt Blue Featured Card (First 200 Early Bird Spotlight) */}
          <div
            className="reveal-from-right"
            style={{
              backgroundColor: '#146ef5',
              border: '1px solid #00f0ff',
              borderRadius: '8px',
              padding: 'clamp(28px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(20, 110, 245, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)',
              position: 'relative',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            {/* Top Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-13px',
                right: '24px',
                backgroundColor: '#ffffff',
                color: '#146ef5',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: '900',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              LIMITED TO FIRST 200
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={16} />
                <span>EARLY BIRD EXPERIENCE</span>
              </div>

              {/* Congra Big Price Header */}
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '28px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3.8rem, 8vw, 5.5rem)',
                    color: '#ffffff',
                    lineHeight: '0.85',
                  }}
                >
                  ₹799
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginLeft: '2px',
                  }}
                >
                  .00
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#ffffff',
                    marginLeft: '8px',
                    fontWeight: '700',
                  }}
                >
                  + IIT DELHI CERTIFICATE
                </span>
              </div>

              {/* Congra White Square Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {[
                  'Official Certificate from E-Cell, IIT Delhi (First 200 Only)',
                  'Full Entry to 2-Day In-Person Workshop at Raghu Engg College',
                  'Entry to Online Hackathon (Form 3–4 Member Team)',
                  'Priority Pitch Slot on Day 1 (9 Oct) Before Startup Jury',
                  'Official Foundrix Swags & Merch Kit',
                  'Campus Delegate Networking & Verified Certificates',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '3px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={14} color="#146ef5" strokeWidth={3} />
                    </div>
                    <span style={{ color: '#ffffff', fontSize: '0.92rem', lineHeight: '1.45', fontWeight: i === 0 ? '700' : '400' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Congra White Action Button */}
            <button
              onClick={onRegisterClick}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '16px',
                color: '#146ef5',
                fontSize: '0.92rem',
                fontWeight: '900',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>CLAIM EARLY BIRD PASS</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassesSection;
