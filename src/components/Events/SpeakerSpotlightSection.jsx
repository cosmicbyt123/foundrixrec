import React from 'react';
import { Sparkles, Radio } from 'lucide-react';

export const SpeakerSpotlightSection = () => {
  return (
    <section
      id="speakers"
      style={{
        position: 'relative',
        padding: '80px 0 100px 0',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        {/* Section Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            marginBottom: '18px',
          }}
        >
          <Sparkles size={14} color="#00f0ff" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: '#ffffff',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            SPEAKERS
          </span>
        </div>

        {/* Section Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            color: '#ffffff',
            fontWeight: '900',
            lineHeight: '1',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            margin: '0 0 36px 0',
          }}
        >
          KEYNOTE SPEAKERS
        </h2>

        {/* STAY TUNED Card */}
        <div
          style={{
            borderRadius: '20px',
            background: 'linear-gradient(180deg, rgba(16, 20, 30, 0.75) 0%, rgba(8, 10, 16, 0.95) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            padding: 'clamp(48px, 8vw, 72px) 24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Top Accent Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '15%',
              right: '15%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
            }}
          />

          {/* Pulsating Live Beacon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 10px #00f0ff',
                animation: 'stayTunedPulse 1.8s ease-in-out infinite',
              }}
            />
            <Radio size={14} color="#00f0ff" />
          </div>

          {/* STAY TUNED Heading */}
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 8vw, 5rem)',
              color: '#ffffff',
              fontWeight: '900',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: '1',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 240, 255, 0.25)',
            }}
          >
            STAY TUNED
          </div>
        </div>

        <style>{`
          @keyframes stayTunedPulse {
            0%, 100% { opacity: 0.4; transform: scale(0.85); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default SpeakerSpotlightSection;


