import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Terminal } from 'lucide-react';

export const HackathonPage = ({ onRegisterClick }) => {
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
              color: '#00f0ff',
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
            background: 'linear-gradient(180deg, rgba(8, 16, 36, 0.92) 0%, rgba(4, 8, 20, 0.98) 100%)',
            border: '1.5px solid rgba(0, 240, 255, 0.45)',
            padding: 'clamp(24px, 4vw, 36px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 240, 255, 0.12)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00f0ff',
              }}
            >
              <Terminal size={18} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f0ff', fontWeight: '800', letterSpacing: '0.1em' }}>
                TRACK 01 • VIRTUAL + CAMPUS
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#ffffff', margin: 0 }}>
                ONLINE HACKATHON ARENA
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                TEAM SPECIFICATION
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', fontWeight: '900', marginTop: '4px' }}>
                3 – 4 MEMBERS
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Cross-college teams allowed
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                CASH PRIZE POOL
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#00f0ff', fontWeight: '900', marginTop: '4px' }}>
                ₹1,00,000+
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Cash rewards + venture credits
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                SPRINT FORMAT
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', fontWeight: '900', marginTop: '4px' }}>
                24H VIRTUAL + CAMPUS
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Grand finals live on stage
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                VERIFIED CREDENTIALS
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffffff', fontWeight: '900', marginTop: '4px' }}>
                E-CELL IIT BOMBAY
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                + Raghu Engineering College
              </div>
            </div>
          </div>

          {/* Announcement Alert Notice */}
          <div
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <AlertCircle size={22} color="#00f0ff" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: '1.5' }}>
              <strong style={{ color: '#00f0ff' }}>Notice:</strong> Detailed problem statements, submission guidelines, portal login links, and evaluation criteria will be informed soon to all registered teams.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonPage;

