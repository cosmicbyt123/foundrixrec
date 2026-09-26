import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Sparkles, ExternalLink } from 'lucide-react';
import RaghuLogo from '../Common/RaghuLogo';
import { CONFIG } from '../../config/environment';

export const Footer = ({ onRegisterClick, onOpenHackathonHub }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#040507',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '70px 0 35px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #146ef5 0%, #00f0ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20V8H8V11H18V15H8V20H4V4Z" fill="#ffffff" />
                </svg>
              </div>

              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#ffffff' }}>
                FOUNDRIX 2026
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Flagship Startup & Tech Ecosystem Event organized by the students of Raghu Engineering College.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <RaghuLogo size="small" showWordmark={true} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
              }}
            >
              <Sparkles size={13} />
              <span>Dakamarri, Visakhapatnam, AP</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff', marginBottom: '16px', letterSpacing: '0.05em' }}>
              EVENT NAVIGATION
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About FOUNDRIX</Link></li>
              <li><Link to="/events" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>The 2 Pillars & Events</Link></li>
              <li><Link to="/speakers" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Speakers & Mentors</Link></li>
              <li><Link to="/venue" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Campus Venue & Location</Link></li>
              <li><Link to="/passes" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>All-in-One Pass (₹799)</Link></li>
              <li><Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQs & Guidelines</Link></li>
            </ul>
          </div>

          {/* Direct Portals & Action */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff', marginBottom: '16px', letterSpacing: '0.05em' }}>
              PARTICIPANT HUB
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={onRegisterClick}
                className="btn-border-beam"
                style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
              >
                <span>GET PASS — ₹799</span>
              </button>

              <button
                onClick={onOpenHackathonHub}
                className="btn-ghost-cyan"
                style={{ width: '100%', padding: '12px', fontSize: '0.85rem', justifyContent: 'center' }}
              >
                <span>HACKATHON TEAM HUB</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '25px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © 2026 FOUNDRIX • Raghu Engineering College. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Visakhapatnam, Andhra Pradesh</span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
