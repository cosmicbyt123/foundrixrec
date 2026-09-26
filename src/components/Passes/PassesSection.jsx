import React, { useState, useEffect } from 'react';
import { Ticket, Check, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';
import { fetchEarlyBirdStats } from '../../services/registrationService';

export const PassesSection = ({ onRegisterClick }) => {
  const { pass } = EVENT_DATA;
  const [stats, setStats] = useState({
    verifiedCount: 6,
    spotsRemaining: 194,
    offerActive: true,
  });

  useEffect(() => {
    fetchEarlyBirdStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  const isEarlyBirdActive = stats.offerActive && stats.spotsRemaining > 0;

  return (
    <section id="passes" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Exact Congra Template Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '45px' }}>
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
            {isEarlyBirdActive ? 'SELECT YOUR EXPERIENCE' : 'FOUNDRIX 2026 PASS'}
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              margin: 0,
            }}
          >
            {isEarlyBirdActive
              ? 'Choose the experience that suits you best! Flat ₹799 per head all-inclusive pass.'
              : 'Flat ₹799 per head all-inclusive pass for the 2-day flagship summit.'}
          </p>
        </div>

        {/* Sold out notice if 200 spots reached */}
        {!isEarlyBirdActive && (
          <div
            className="reveal-on-scroll"
            style={{
              maxWidth: '520px',
              margin: '0 auto 28px auto',
              padding: '12px 18px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '6px',
              color: '#f87171',
              fontSize: '0.88rem',
              fontWeight: '600',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={16} />
            <span>First 200 Early Bird Passes (IIT Mumbai Perk) are fully claimed. Standard passes now active.</span>
          </div>
        )}

        {/* Experience Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isEarlyBirdActive ? 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' : '1fr',
            gap: '24px',
            maxWidth: isEarlyBirdActive ? '920px' : '520px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {/* Card 1: Obsidian Luxury Card (Full Summit Pass) */}
          <div
            className="reveal-from-left"
            style={{
              backgroundColor: 'rgba(10, 14, 22, 0.88)',
              border: '1px solid rgba(223, 238, 203, 0.3)',
              borderRadius: '12px',
              padding: 'clamp(28px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(223, 238, 203, 0.08)',
              backdropFilter: 'blur(16px)',
              transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#dfeecb';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(223, 238, 203, 0.25)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(223, 238, 203, 0.3)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(223, 238, 203, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--accent-mint)',
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
                        borderRadius: '4px',
                        backgroundColor: '#dfeecb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={14} color="#060709" strokeWidth={3} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: '1.45' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radiant Mint Action Button that POPS */}
            <button
              onClick={onRegisterClick}
              style={{
                width: '100%',
                backgroundColor: '#dfeecb',
                border: 'none',
                borderRadius: '8px',
                padding: '16px',
                color: '#060709',
                fontSize: '0.94rem',
                fontWeight: '900',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(223, 238, 203, 0.45)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#edf7e2';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(223, 238, 203, 0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dfeecb';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(223, 238, 203, 0.45)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>RESERVE PASS — ₹799</span>
              <ArrowUpRight size={18} color="#060709" />
            </button>
          </div>

          {/* Card 2: Palette 2 Warm Luxury Amber Gold (First 200 Early Bird Spotlight) */}
          {isEarlyBirdActive && (
            <div
              className="reveal-from-right"
              style={{
                background: 'linear-gradient(150deg, rgba(38, 26, 10, 0.95) 0%, rgba(18, 14, 8, 0.98) 100%)',
                border: '1.5px solid #fbbf24',
                borderRadius: '12px',
                padding: 'clamp(28px, 4vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.25)',
                position: 'relative',
                backdropFilter: 'blur(16px)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 45px rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.25)';
              }}
            >
              {/* Top Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-13px',
                  right: '24px',
                  backgroundColor: '#fbbf24',
                  color: '#1a0f00',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: '900',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.5)',
                }}
              >
                LIMITED TO FIRST 200 • {stats.spotsRemaining} SPOTS LEFT
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    color: '#fbbf24',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={16} color="#fbbf24" />
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
                      color: '#fbbf24',
                      marginLeft: '8px',
                      fontWeight: '800',
                    }}
                  >
                    + IIT MUMBAI CERTIFICATE
                  </span>
                </div>

                {/* Congra White Square Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                  {[
                    'Official Certificate from E-Cell, IIT Mumbai (First 200 Only)',
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
                          borderRadius: '4px',
                          backgroundColor: '#fbbf24',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <Check size={14} color="#1a0f00" strokeWidth={3} />
                      </div>
                      <span style={{ color: '#ffffff', fontSize: '0.92rem', lineHeight: '1.45', fontWeight: i === 0 ? '700' : '400' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warm Amber Gold Action Button */}
              <button
                onClick={onRegisterClick}
                style={{
                  width: '100%',
                  backgroundColor: '#fbbf24',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  color: '#1a0f00',
                  fontSize: '0.94rem',
                  fontWeight: '900',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fde68a';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.7)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fbbf24';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.45)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>CLAIM EARLY BIRD PASS</span>
                <ArrowUpRight size={18} color="#1a0f00" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PassesSection;
