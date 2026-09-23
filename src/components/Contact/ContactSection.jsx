import React from 'react';
import { Phone, MessageSquare, Headphones, ShieldCheck, Mail } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const ContactSection = () => {
  const { coordinators } = EVENT_DATA;

  return (
    <section id="contact" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-badge">
            <Headphones size={14} />
            <span>ORGANIZER DESK & HELPLINE</span>
          </div>
          <h2 className="section-title">EVENT COORDINATORS</h2>
          <p className="section-subtitle">
            Have questions regarding passes, UPI verification, campus venue, or hackathon team rules? Reach out to our lead student coordinators directly!
          </p>
        </div>

        {/* Coordinators Grid */}
        <div
          className="stagger-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {coordinators.map((coordinator, idx) => (
            <div
              key={idx}
              className="glass-card reveal-scale"
              style={{
                padding: '32px',
                textAlign: 'center',
                border: '1px solid rgba(20, 110, 245, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(20, 110, 245, 0.3) 0%, rgba(0, 240, 255, 0.2) 100%)',
                  border: '1px solid var(--border-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  margin: '0 auto 16px auto',
                }}
              >
                <Phone size={26} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', marginBottom: '4px' }}>
                {coordinator.name.toUpperCase()}
              </h4>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '14px' }}>
                {coordinator.role}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#ffffff', fontWeight: '700', marginBottom: '24px' }}>
                {coordinator.displayPhone}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`tel:${coordinator.phone}`}
                  className="btn-ghost-cyan"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={14} />
                  <span>Call</span>
                </a>

                <a
                  href={coordinator.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-border-beam"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    justifyContent: 'center',
                  }}
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div
          style={{
            maxWidth: '720px',
            margin: '36px auto 0 auto',
            textAlign: 'center',
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <ShieldCheck size={18} color="var(--accent-cyan)" />
          <span>
            Payment verifications are processed within 12 hours. If urgent, feel free to WhatsApp our coordinators with your UTR!
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
