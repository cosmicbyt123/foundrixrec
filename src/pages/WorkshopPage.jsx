import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react';

export const WorkshopPage = ({ onRegisterClick }) => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/events"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#c084fc',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              fontWeight: '700',
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO EVENTS</span>
          </Link>
        </div>

        {/* Core Snapshot Banner */}
        <div
          style={{
            borderRadius: '20px',
            background: 'linear-gradient(180deg, rgba(16, 12, 36, 0.92) 0%, rgba(6, 6, 20, 0.98) 100%)',
            border: '1.5px solid rgba(139, 92, 246, 0.5)',
            padding: 'clamp(24px, 4vw, 36px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.18)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c084fc',
              }}
            >
              <Lightbulb size={18} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#c084fc', fontWeight: '800', letterSpacing: '0.1em' }}>
                TRACK 02 • IN-PERSON CAMPUS
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#ffffff', margin: 0 }}>
                STARTUP ACCELERATOR WORKSHOP
              </h2>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              paddingBottom: '28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                IMMERSION DURATION
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', fontWeight: '900', marginTop: '4px' }}>
                2 FULL DAYS
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                09 & 10 October 2026
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                DELIVERY FORMAT
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#c084fc', fontWeight: '900', marginTop: '4px' }}>
                IN-PERSON LAB
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Campus auditorium & breakout hubs
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                CAMPUS VENUE
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', fontWeight: '900', marginTop: '4px' }}>
                REC VISAKHAPATNAM
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Raghu Engineering College
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                VERIFIED CREDENTIALS
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', fontWeight: '900', marginTop: '4px' }}>
                E-CELL IIT BOMBAY
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Official accredited credentials
              </div>
            </div>
          </div>

          {/* Announcement Alert Notice */}
          <div
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <AlertCircle size={22} color="#c084fc" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: '1.5' }}>
              <strong style={{ color: '#c084fc' }}>Notice:</strong> Detailed speaker agenda, workshop materials, mentor allocation, and seating assignments will be informed soon to all pass holders.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;

