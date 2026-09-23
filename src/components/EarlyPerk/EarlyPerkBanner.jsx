import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import { fetchEarlyBirdStats } from '../../services/registrationService';

export const EarlyPerkBanner = ({ onRegisterClick }) => {
  const [stats, setStats] = useState({
    verifiedCount: 142,
    spotsRemaining: 58,
    offerActive: true,
  });

  useEffect(() => {
    fetchEarlyBirdStats().then((data) => {
      if (data) setStats(data);
    });
  }, []);

  if (!stats.offerActive && stats.spotsRemaining <= 0) {
    return null; // Offer automatically removed after 200 successful registrations
  }

  return (
    <aside
      aria-label="Early Bird Announcement"
      style={{
        background: 'linear-gradient(90deg, rgba(8, 14, 28, 0.98) 0%, rgba(14, 30, 60, 0.98) 50%, rgba(8, 14, 28, 0.98) 100%)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.35)',
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 240, 255, 0.15)',
        position: 'relative',
        zIndex: 60,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px 16px',
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
      >
        {/* Left / Center announcement */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.74rem, 2vw, 0.84rem)',
            color: '#ffffff',
            flex: '1 1 auto',
            minWidth: '260px',
            justifyContent: 'center',
          }}
          className="early-perk-text-wrap"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 107, 0, 0.25)',
              color: '#ff7700',
              flexShrink: 0,
            }}
          >
            <Flame size={14} />
          </div>

          <div style={{ lineHeight: '1.35', textAlign: 'center' }}>
            <span style={{ fontWeight: '800', color: 'var(--accent-cyan)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              EARLY BIRD PERK:{' '}
            </span>
            <span>
              First 200 Registrations get an Official Certificate from{' '}
              <strong style={{ color: '#ffffff', textDecoration: 'underline', textDecorationColor: 'var(--accent-cyan)' }}>
                E-Cell, IIT Delhi
              </strong>
              !
            </span>
          </div>
        </div>

        {/* Right / Bottom actions: Spots Badge + Claim Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexShrink: 0,
            margin: '0 auto',
          }}
          className="early-perk-actions-wrap"
        >
          {/* Live Remaining Spots Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: '700',
              color: 'var(--accent-cyan)',
              backgroundColor: 'rgba(0, 240, 255, 0.08)',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            <Sparkles size={12} />
            <span>{stats.spotsRemaining} / 200 SPOTS LEFT</span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={onRegisterClick}
            style={{
              backgroundColor: '#146ef5',
              color: '#ffffff',
              border: '1px solid #00f0ff',
              borderRadius: '999px',
              padding: '5px 14px',
              fontSize: '0.74rem',
              fontWeight: '800',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 14px rgba(20, 110, 245, 0.7)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2579f8';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#146ef5';
              e.currentTarget.style.boxShadow = '0 0 14px rgba(20, 110, 245, 0.7)';
            }}
          >
            <span>Claim Spot</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .early-perk-text-wrap {
            justifyContent: flex-start !important;
          }
          .early-perk-text-wrap div {
            text-align: left !important;
          }
          .early-perk-actions-wrap {
            margin-left: auto !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default EarlyPerkBanner;
