import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';

export const OrbitalMenu = ({ isOpen, onClose, onRegisterClick, onLoginClick }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const links = [
    { label: 'HOME', path: '/' },
    { label: 'EVENTS & HACKATHON', path: '/events' },
    { label: 'SPEAKERS & MENTORS', path: '/speakers' },
    { label: 'VENUE SHOWCASE', path: '/venue' },
    { label: 'SUMMIT PASSES (₹799)', path: '/passes' },
    { label: 'FAQS & GUIDELINES', path: '/faq' },
    { label: 'ABOUT FOUNDRIX', path: '/about' },
  ];

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(4, 6, 12, 0.96)',
        backdropFilter: 'blur(25px) saturate(180%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        animation: 'orbitalFadeIn 0.3s ease-out forwards',
      }}
    >
      {/* Top Bar with Branding & Close Button */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              color: '#ffffff',
              letterSpacing: '0.04em',
            }}
          >
            FOUNDRIX'26
          </span>
          <span style={{ color: 'rgba(0, 240, 255, 0.6)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            // NAVIGATION
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.15)';
            e.currentTarget.style.borderColor = '#00f0ff';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <X size={22} color="#00f0ff" />
        </button>
      </div>

      {/* Futuristic Concentric Orbital Rings Background (matching IIT Bombay E-Summit video) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Orbital Ring 1 (Inner) */}
        <div
          style={{
            position: 'absolute',
            width: 'min(90vw, 440px)',
            height: 'min(90vw, 440px)',
            borderRadius: '50%',
            border: '1px dashed rgba(0, 240, 255, 0.22)',
            animation: 'orbitSpin 40s linear infinite',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '15%',
              left: '85%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00f0ff',
              boxShadow: '0 0 12px #00f0ff',
            }}
          />
        </div>

        {/* Orbital Ring 2 (Middle) */}
        <div
          style={{
            position: 'absolute',
            width: 'min(95vw, 680px)',
            height: 'min(95vw, 680px)',
            borderRadius: '50%',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            boxShadow: '0 0 40px rgba(37, 99, 235, 0.12), inset 0 0 30px rgba(0, 240, 255, 0.08)',
            animation: 'orbitSpinReverse 55s linear infinite',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: '22%',
              left: '12%',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#60a5fa',
              boxShadow: '0 0 14px #60a5fa',
            }}
          />
        </div>

        {/* Orbital Ring 3 (Outer) */}
        <div
          style={{
            position: 'absolute',
            width: 'min(110vw, 920px)',
            height: 'min(110vw, 920px)',
            borderRadius: '50%',
            border: '1px dashed rgba(0, 240, 255, 0.12)',
            animation: 'orbitSpin 75s linear infinite',
          }}
        />

        {/* Radial Center Glow */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.09) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Centered Vertical Navigation Capsule */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: 'min(92vw, 420px)',
          padding: '24px 20px',
          borderRadius: '999px',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          background: 'rgba(6, 12, 22, 0.75)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 45px rgba(0, 240, 255, 0.2), inset 0 0 25px rgba(0, 240, 255, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Subtle Top Indicator Dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={12} color="#00f0ff" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#00f0ff',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            ORBITAL CONSOLE
          </span>
        </div>

        {/* Menu Links */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
          }}
        >
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.path)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.15rem, 2.8vw, 1.55rem)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '6px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00f0ff';
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.textShadow = '0 0 20px rgba(0, 240, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div
          style={{
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.4), transparent)',
            margin: '8px 0',
          }}
        />

        {/* Action Dual Buttons at Bottom of Capsule */}
        <div style={{ display: 'flex', gap: '10px', width: '85%' }}>
          <button
            onClick={() => {
              onClose();
              if (onRegisterClick) onRegisterClick();
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              border: '1px solid rgba(0, 240, 255, 0.5)',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            }}
          >
            <span>REGISTER</span>
            <ArrowUpRight size={14} color="#00f0ff" />
          </button>

          <button
            onClick={() => {
              onClose();
              if (onLoginClick) onLoginClick();
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            LOGIN
          </button>
        </div>
      </div>

      <style>{`
        @keyframes orbitalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default OrbitalMenu;
