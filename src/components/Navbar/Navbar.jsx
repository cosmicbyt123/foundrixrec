import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Users, Sparkles } from 'lucide-react';
import RaghuLogo from '../Common/RaghuLogo';
import OrbitalMenu from './OrbitalMenu';

export const Navbar = ({ onRegisterClick, onOpenHackathonHub }) => {
  const [orbitalMenuOpen, setOrbitalMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Speakers', path: '/speakers' },
    { label: 'Venue', path: '/venue' },
    { label: 'Passes', path: '/passes' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          width: '100%',
          padding: scrolled ? '14px 24px' : '22px 28px',
          backgroundColor: scrolled ? 'rgba(4, 6, 12, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 0,
          }}
        >
          {/* Brand Left Group: FOUNDRIX + Raghu Engineering College */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: '#ffffff',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(0, 240, 255, 0.3)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20V8H8V11H18V15H8V20H4V4Z" fill="#ffffff" />
                </svg>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    letterSpacing: '0.04em',
                    lineHeight: '1',
                    color: '#ffffff',
                  }}
                >
                  FOUNDRIX
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: '#00f0ff',
                    letterSpacing: '0.12em',
                    lineHeight: '1',
                    marginTop: '2px',
                  }}
                >
                  E-CELL IIT BOMBAY ASSOC.
                </div>
              </div>
            </Link>

            {/* Vertical subtle divider */}
            <div
              style={{
                width: '1px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                display: 'none',
              }}
              className="desktop-divider"
            />

            {/* Raghu Engineering College Badge Link */}
            <div style={{ display: 'none' }} className="desktop-rec-logo">
              <RaghuLogo size="small" showWordmark={true} />
            </div>
          </div>

          {/* Desktop Nav Links & Actions */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '24px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    position: 'relative',
                    color: isActive ? '#00f0ff' : 'rgba(255, 255, 255, 0.8)',
                    textShadow: isActive ? '0 0 10px rgba(0, 240, 255, 0.7)' : 'none',
                    textDecoration: 'none',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? '800' : '700',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                    padding: '6px 2px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00f0ff';
                    e.currentTarget.style.textShadow = '0 0 10px rgba(0, 240, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.textShadow = 'none';
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '2px',
                        borderRadius: '999px',
                        backgroundColor: '#00f0ff',
                        boxShadow: '0 0 8px #00f0ff',
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Login Button */}
            <button
              onClick={onOpenHackathonHub}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                color: '#ffffff',
                padding: '9px 18px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
              }}
            >
              <span>LOGIN</span>
            </button>

            {/* Register Button */}
            <button
              onClick={onRegisterClick}
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                border: '1px solid rgba(0, 240, 255, 0.5)',
                borderRadius: '999px',
                padding: '9px 22px',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: '800',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.28)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.55)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.28)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>REGISTER</span>
              <ArrowUpRight size={15} color="#00f0ff" />
            </button>

            {/* Hamburger Button to Open Fullscreen Orbital Radar Menu (matching E-Summit video) */}
            <button
              onClick={() => setOrbitalMenuOpen(true)}
              aria-label="Open Orbital Navigation Console"
              style={{
                background: 'rgba(6, 14, 26, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.18)';
                e.currentTarget.style.borderColor = '#00f0ff';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 14, 26, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Menu size={20} color="#00f0ff" />
            </button>
          </div>

          {/* Mobile Right Controls: Register + Hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            className="mobile-toggle"
          >
            <button
              onClick={onRegisterClick}
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                border: '1px solid rgba(0, 240, 255, 0.5)',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '7px 15px',
                fontSize: '0.74rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              REGISTER
            </button>

            <button
              onClick={() => setOrbitalMenuOpen(true)}
              style={{
                backgroundColor: 'rgba(6, 14, 26, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                color: '#ffffff',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation"
            >
              <Menu size={18} color="#00f0ff" />
            </button>
          </div>
        </div>

        <style>{`
          @media (min-width: 960px) {
            .desktop-nav {
              display: flex !important;
            }
            .desktop-divider {
              display: block !important;
            }
            .desktop-rec-logo {
              display: flex !important;
            }
            .mobile-toggle {
              display: none !important;
            }
          }
        `}</style>
      </header>

      {/* Fullscreen Orbital Radar Menu (matching E-Summit 2026 video) */}
      <OrbitalMenu
        isOpen={orbitalMenuOpen}
        onClose={() => setOrbitalMenuOpen(false)}
        onRegisterClick={onRegisterClick}
        onLoginClick={onOpenHackathonHub}
      />
    </>
  );
};

export default Navbar;
