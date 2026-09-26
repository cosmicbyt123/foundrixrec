import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

export const PageHeroBanner = ({ tag, title, description, badgeIcon: BadgeIcon = Sparkles }) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '160px 24px 80px 24px',
        backgroundColor: 'transparent',
        borderBottom: '1px solid rgba(0, 240, 255, 0.12)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* 4-Color Ambient Radiant Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.12) 0%, rgba(37, 99, 235, 0.08) 40%, rgba(139, 92, 246, 0.05) 70%, transparent 85%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyber Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{
              color: 'rgba(255, 255, 255, 0.65)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00f0ff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
          >
            HOME
          </Link>
          <ChevronRight size={14} color="rgba(255, 255, 255, 0.3)" />
          <span style={{ color: '#00f0ff', fontWeight: '700' }}>{tag.toUpperCase()}</span>
        </motion.div>

        {/* Tag Badge */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.12), rgba(139, 92, 246, 0.12))',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              marginBottom: '16px',
            }}
          >
            <BadgeIcon size={14} color="#00f0ff" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: '800',
                color: '#00f0ff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          </motion.div>
        </div>

        {/* Title with Gradient Polish */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            color: '#ffffff',
            fontWeight: '900',
            lineHeight: '1.08',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
          }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            color: 'rgba(255, 255, 255, 0.72)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

export default PageHeroBanner;
