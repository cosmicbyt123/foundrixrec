import React from 'react';

export const RaghuLogo = ({ size = 'medium', className = '' }) => {
  const height = size === 'small' ? '32px' : size === 'large' ? '54px' : '42px';

  return (
    <a
      href="https://raghuenggcollege.com/"
      target="_blank"
      rel="noopener noreferrer"
      title="Visit Raghu Engineering College Official Website (Autonomous, Visakhapatnam)"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.opacity = '0.95';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.opacity = '1';
      }}
    >
      <img
        src="/assets/raghu-logo-dark.svg"
        alt="Raghu Engineering College (Autonomous | Visakhapatnam)"
        style={{
          height: height,
          width: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.6))',
        }}
      />
    </a>
  );
};

export default RaghuLogo;
