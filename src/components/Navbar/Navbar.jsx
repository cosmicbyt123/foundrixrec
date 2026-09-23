import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Users, ExternalLink } from 'lucide-react';
import RaghuLogo from '../Common/RaghuLogo';

export const Navbar = ({ onRegisterClick, onOpenHackathonHub }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'Events', href: '#events' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Venue', href: '#venue' },
    { label: 'Passes', href: '#passes' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: '10px',
        zIndex: 50,
        width: '100%',
        padding: '0 12px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'rgba(6, 10, 20, 0.65)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 25px rgba(0, 240, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        }}
      >
        {/* Brand Left Group: FOUNDRIX + Raghu Engineering College */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#hero"
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
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #146ef5 0%, #00f0ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(20, 110, 245, 0.6)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20V8H8V11H18V15H8V20H4V4Z" fill="#ffffff" />
              </svg>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.85rem',
                letterSpacing: '0.04em',
                lineHeight: '1',
                color: '#ffffff',
              }}
            >
              FOUNDRIX
            </div>
          </a>

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
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: '600',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}

          {/* Team Hub Ghost Button */}
          <button
            onClick={onOpenHackathonHub}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'var(--accent-cyan)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.12)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <Users size={14} />
            <span>Team Hub</span>
          </button>

          {/* Congra Template Style Crisp Electric Blue Primary Button */}
          <button
            onClick={onRegisterClick}
            style={{
              backgroundColor: '#146ef5',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 22px',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontWeight: '800',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(20, 110, 245, 0.75)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2579f8';
              e.currentTarget.style.boxShadow = '0 0 28px rgba(20, 110, 245, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#146ef5';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(20, 110, 245, 0.75)';
            }}
          >
            <span>GET A TICKET</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Mobile View Toggle: Square Congra Blue Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
          className="mobile-toggle"
        >
          {/* Quick Register Pill on Mobile */}
          <button
            onClick={onRegisterClick}
            style={{
              backgroundColor: '#146ef5',
              border: 'none',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '7px 13px',
              fontSize: '0.76rem',
              fontWeight: '800',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(20, 110, 245, 0.8)',
            }}
          >
            ₹799 PASS
          </button>

          {/* Square Blue Mobile Hamburger Button (from Congra Template) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              backgroundColor: '#146ef5',
              border: 'none',
              color: '#ffffff',
              width: '38px',
              height: '38px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 14px rgba(20, 110, 245, 0.6)',
              transition: 'background-color 0.2s ease',
            }}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: '8px',
            backgroundColor: 'rgba(8, 12, 24, 0.78)',
            backdropFilter: 'blur(25px) saturate(180%)',
            WebkitBackdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '16px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          {/* Raghu College Mobile Link */}
          <div
            style={{
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '4px',
            }}
          >
            <RaghuLogo size="small" showWordmark={true} />
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                letterSpacing: '0.04em',
                padding: '6px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={14} color="var(--accent-cyan)" />
            </a>
          ))}

          {/* Hackathon Team Hub Mobile Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHackathonHub();
            }}
            style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid var(--border-cyan)',
              color: 'var(--accent-cyan)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            <Users size={16} />
            <span>HACKATHON TEAM HUB</span>
          </button>

          {/* Register Pass Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRegisterClick();
            }}
            style={{
              backgroundColor: '#146ef5',
              border: 'none',
              boxShadow: '0 0 20px rgba(20, 110, 245, 0.8)',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '13px',
              fontSize: '0.92rem',
              fontWeight: '800',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            REGISTER PASS — ₹799
          </button>
        </div>
      )}

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
  );
};

export default Navbar;
