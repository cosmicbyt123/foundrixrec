import React from 'react';
import { Terminal, Lightbulb, CheckCircle2, ArrowRight, Users, Trophy } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const EventsSection = ({ onRegisterClick, onOpenHackathonHub }) => {
  const { events } = EVENT_DATA;

  return (
    <section id="events" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-badge">
            <Trophy size={14} />
            <span>2 FLAGSHIP EXPERIENCES • 1 ALL-INCLUSIVE PASS</span>
          </div>
          <h2 className="section-title">THE 2 CORE PILLARS</h2>
          <p className="section-subtitle">
            Your single ₹799 registration unlocks complete access to both the high-octane Online Hackathon and the comprehensive 2-Day In-Person Workshop.
          </p>
        </div>

        {/* Cards Grid / Mobile Horizontal Snap Slider */}
        <div className="horizontal-snap-container stagger-container">
          {events.map((item) => {
            const isHackathon = item.id === 'hackathon';
            return (
              <div
                key={item.id}
                className="horizontal-snap-item glass-card reveal-scale"
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isHackathon ? '1px solid rgba(20, 110, 245, 0.4)' : '1px solid rgba(0, 240, 255, 0.3)',
                  boxShadow: isHackathon
                    ? '0 10px 40px rgba(20, 110, 245, 0.12)'
                    : '0 10px 40px rgba(0, 240, 255, 0.08)',
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Ambient Top Glow Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: isHackathon
                      ? 'linear-gradient(90deg, transparent, #146ef5, transparent)'
                      : 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                  }}
                />

                <div>
                  {/* Event Badge & Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        color: item.accentColor,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${item.accentColor}33`,
                      }}
                    >
                      {item.badge}
                    </span>

                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.accentColor,
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {isHackathon ? <Terminal size={24} /> : <Lightbulb size={24} />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                      color: '#ffffff',
                      marginBottom: '14px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.98rem',
                      lineHeight: '1.6',
                      marginBottom: '28px',
                    }}
                  >
                    {item.summary}
                  </p>

                  {/* Key Highlights / Perks */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '32px',
                    }}
                  >
                    {item.perks.map((perk, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.9rem',
                          color: '#e2e8f0',
                        }}
                      >
                        <CheckCircle2
                          size={18}
                          color={item.accentColor}
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Action */}
                <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  {isHackathon ? (
                    <button
                      onClick={onOpenHackathonHub}
                      className="btn-ghost-cyan"
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        justifyContent: 'center',
                        fontWeight: '700',
                      }}
                    >
                      <Users size={18} />
                      <span>{item.ctaText}</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={onRegisterClick}
                      className="btn-border-beam"
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        justifyContent: 'center',
                      }}
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '16px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
          }}
          className="mobile-swipe-hint"
        >
          <span>← SWIPE TO EXPLORE BOTH PILLARS →</span>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .mobile-swipe-hint {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default EventsSection;
