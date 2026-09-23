import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { SCHEDULE_DATA } from '../../data/schedule';

export const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const currentSchedule = SCHEDULE_DATA.days.find((d) => d.id === activeDay) || SCHEDULE_DATA.days[0];

  return (
    <section id="schedule" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-badge">
            <Calendar size={14} />
            <span>2-DAY ITINERARY • 9 & 10 OCTOBER 2026</span>
          </div>
          <h2 className="section-title">SUMMIT SCHEDULE</h2>
          <p className="section-subtitle">
            A carefully orchestrated journey from idea validation to live hackathon pitching, founder insights, and grand recognitions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          className="reveal-on-scroll schedule-tabs-wrapper"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          {SCHEDULE_DATA.days.map((day) => {
            const isActive = day.id === activeDay;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className="schedule-tab-btn"
                style={{
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: isActive ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.04)',
                  color: '#ffffff',
                  boxShadow: isActive ? '0 0 30px rgba(20, 110, 245, 0.6), 0 0 15px rgba(0, 240, 255, 0.3)' : 'none',
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{day.badge}</span>
                <span style={{ fontSize: '0.9rem', color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                  ({day.id === 'day1' ? 'Hackathon + Workshop' : 'Workshop + Awards'})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Day Description Banner */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '16px 24px',
            background: 'rgba(20, 110, 245, 0.08)',
            border: '1px solid rgba(20, 110, 245, 0.2)',
            borderRadius: 'var(--radius-md)',
            maxWidth: '680px',
            margin: '0 auto 40px auto',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
            {currentSchedule.dateLabel}
          </div>
          <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '1rem' }}>
            {currentSchedule.sublabel}
          </div>
        </div>

        {/* Vertical Dashed Timeline */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Dashed Connecting Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '23px',
              width: '2px',
              borderLeft: '2px dashed rgba(20, 110, 245, 0.4)',
              zIndex: 0,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {currentSchedule.timeline.map((item, index) => {
              const isHackathonSlot = item.type === 'Hackathon';
              return (
                <div
                  key={index}
                  className="reveal-on-scroll"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '24px',
                  }}
                >
                  {/* Number Badge */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: isHackathonSlot ? 'var(--accent-blue)' : '#0e111a',
                      border: isHackathonSlot ? '2px solid var(--accent-cyan)' : '2px solid rgba(20, 110, 245, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      flexShrink: 0,
                      boxShadow: isHackathonSlot ? '0 0 20px rgba(0, 240, 255, 0.5)' : 'none',
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Content Card */}
                  <div
                    className="glass-card"
                    style={{
                      flex: 1,
                      padding: '24px',
                      border: isHackathonSlot ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isHackathonSlot ? 'rgba(14, 22, 40, 0.85)' : 'rgba(15, 18, 28, 0.7)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--accent-cyan)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                        }}
                      >
                        <span>{item.session}</span>
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                        }}
                      >
                        <MapPin size={13} color="var(--accent-blue)" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                        color: '#ffffff',
                        marginBottom: '8px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.title}
                    </h4>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: '1.6',
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
