import React, { useState, useEffect } from 'react';
import { Ticket, Users, ArrowUpRight } from 'lucide-react';

export const MobileBottomDock = ({ onRegisterClick, onOpenHackathonHub }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling 300px
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="mobile-bottom-dock"
      style={{
        position: 'fixed',
        bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
        left: '12px',
        right: '12px',
        maxWidth: '480px',
        margin: '0 auto',
        zIndex: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderRadius: '999px',
        background: 'rgba(9, 12, 22, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 240, 255, 0.35)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(20, 110, 245, 0.4)',
        animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flexShrink: 1, paddingRight: '8px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff', lineHeight: '1' }}>
          ₹799 <small style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>/ HEAD</small>
        </div>
        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          WORKSHOP + HACKATHON
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={onOpenHackathonHub}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            padding: '8px 12px',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <Users size={12} />
          <span>Teams</span>
        </button>

        <button
          onClick={onRegisterClick}
          className="btn-border-beam"
          style={{
            padding: '9px 18px',
            fontSize: '0.78rem',
            boxShadow: '0 0 15px rgba(20, 110, 245, 0.6)',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <span>REGISTER</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-bottom-dock {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileBottomDock;
