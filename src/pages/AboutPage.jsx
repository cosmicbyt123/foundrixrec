import React from 'react';
import RaghuLogo from '../components/Common/RaghuLogo';
import { Target, Compass, Award } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        {/* Collaboration Hero Card */}
        <div
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(180deg, rgba(8, 16, 36, 0.9) 0%, rgba(4, 8, 20, 0.98) 100%)',
            border: '1.5px solid rgba(0, 240, 255, 0.35)',
            padding: 'clamp(28px, 4vw, 48px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.12)',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <RaghuLogo size={56} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  fontWeight: '800',
                  color: '#00f0ff',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                REC X E-CELL IIT BOMBAY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                  color: '#ffffff',
                  fontWeight: '900',
                  margin: '4px 0 0 0',
                  textTransform: 'uppercase',
                }}
              >
                EMPOWERING STUDENT FOUNDERS
              </h2>
            </div>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '20px' }}>
            FOUNDRIX 2026 is an initiative conceived, organized, and driven entirely by students of Raghu Engineering College under the National Entrepreneurship Challenge in collaboration with E-Cell IIT Bombay.
          </p>

          <p style={{ color: 'rgba(255, 255, 255, 0.68)', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
            Our vision is to bridge the gap between academic engineering and real-world venture building. By providing access to high-caliber mentorship, live investor pitches, GenAI-driven toolkits, and dual-certified credentials, FOUNDRIX empowers college innovators to transform classroom ideas into scalable tech ventures.
          </p>
        </div>

        {/* 3 Pillars of Mission */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '28px 24px',
              borderRadius: '16px',
              background: 'linear-gradient(180deg, rgba(8, 16, 32, 0.85) 0%, rgba(4, 8, 18, 0.95) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
            }}
          >
            <Target size={28} color="#00f0ff" style={{ marginBottom: '14px' }} />
            <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 8px 0' }}>The Mission</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              Democratize venture building for regional engineering talents across South India with hands-on immersion and zero fluff.
            </p>
          </div>

          <div
            style={{
              padding: '28px 24px',
              borderRadius: '16px',
              background: 'linear-gradient(180deg, rgba(16, 12, 34, 0.85) 0%, rgba(6, 6, 18, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
            }}
          >
            <Compass size={28} color="#8b5cf6" style={{ marginBottom: '14px' }} />
            <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 8px 0' }}>Hands-On Innovation</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              Practical prototype building in our 24-hour virtual hackathon combined with 2-day on-campus venture masterclasses.
            </p>
          </div>

          <div
            style={{
              padding: '28px 24px',
              borderRadius: '16px',
              background: 'linear-gradient(180deg, rgba(14, 28, 52, 0.85) 0%, rgba(6, 12, 24, 0.95) 100%)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
            }}
          >
            <Award size={28} color="#3b82f6" style={{ marginBottom: '14px' }} />
            <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', margin: '0 0 8px 0' }}>Verified Credentials</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
              Official dual-accredited certificates verified by E-Cell IIT Bombay and Raghu Engineering College for academic weight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

