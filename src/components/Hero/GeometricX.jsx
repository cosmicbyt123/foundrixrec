import React from 'react';

export const GeometricX = ({ style = {} }) => {
  return (
    <div className="foundrix-hero__x-wrapper" style={style}>
      <svg
        className="foundrix-hero__x-svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Central Radiant Backdrop Aura */}
          <radialGradient id="centerAura" cx="50%" cy="41%" r="35%">
            <stop offset="0%" stopColor="#1e56ff" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#0d2fa6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </radialGradient>

          {/* Upper Left Beam Gradient */}
          <linearGradient id="beamLeftGrad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#071a5c" />
            <stop offset="55%" stopColor="#0a2baf" />
            <stop offset="100%" stopColor="#164bff" />
          </linearGradient>

          {/* Upper Right Beam Gradient */}
          <linearGradient id="beamRightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071a5c" />
            <stop offset="55%" stopColor="#0a2baf" />
            <stop offset="100%" stopColor="#164bff" />
          </linearGradient>

          {/* Lower Left Wing Gradient: vertical falloff dissolving into deep royal blue and transparent navy */}
          <linearGradient id="wingLeftGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1a52ff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#1646d9" stopOpacity="0.82" />
            <stop offset="60%" stopColor="#1038af" stopOpacity="0.60" />
            <stop offset="80%" stopColor="#0a2680" stopOpacity="0.35" />
            <stop offset="94%" stopColor="#051652" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </linearGradient>

          {/* Lower Right Wing Gradient: vertical falloff dissolving into deep royal blue and transparent navy */}
          <linearGradient id="wingRightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1a52ff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#1646d9" stopOpacity="0.82" />
            <stop offset="60%" stopColor="#1038af" stopOpacity="0.60" />
            <stop offset="80%" stopColor="#0a2680" stopOpacity="0.35" />
            <stop offset="94%" stopColor="#051652" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </linearGradient>

          {/* Center Glowing Ivory Runway Gradient */}
          <linearGradient id="runwayCreamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="28%" stopColor="#faf2e6" stopOpacity="0.98" />
            <stop offset="46%" stopColor="#f3e3ca" stopOpacity="0.94" />
            <stop offset="60%" stopColor="#e2cbb0" stopOpacity="0.86" />
            <stop offset="72%" stopColor="#789be6" stopOpacity="0.75" />
            <stop offset="82%" stopColor="#2563eb" stopOpacity="0.60" />
            <stop offset="90%" stopColor="#123db8" stopOpacity="0.35" />
            <stop offset="96%" stopColor="#061852" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </linearGradient>

          {/* Softly Fading Cyan Border Gradient along the runway */}
          <linearGradient id="cyanBorderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#00f0ff" stopOpacity="0.50" />
            <stop offset="68%" stopColor="#1e56ff" stopOpacity="0.38" />
            <stop offset="84%" stopColor="#0e32aa" stopOpacity="0.18" />
            <stop offset="95%" stopColor="#020713" stopOpacity="0" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </linearGradient>

          {/* Softly Fading Outer Stripe Border Gradient */}
          <linearGradient id="outerStripeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2764ff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#164bff" stopOpacity="0.55" />
            <stop offset="72%" stopColor="#0a2baf" stopOpacity="0.30" />
            <stop offset="88%" stopColor="#061a68" stopOpacity="0.10" />
            <stop offset="98%" stopColor="#020713" stopOpacity="0" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </linearGradient>

          {/* Subtle Diffuse Shadow Filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Behind Center Aura Glow */}
        <circle cx="960" cy="440" r="420" fill="url(#centerAura)" />

        {/* 2. Top-Left Diagonal Arm */}
        <polygon points="960,440 340,0 660,0 960,440" fill="url(#beamLeftGrad)" />
        <line
          x1="960"
          y1="440"
          x2="340"
          y2="0"
          stroke="#2764ff"
          strokeWidth="3.5"
          strokeOpacity="0.75"
        />

        {/* 3. Top-Right Diagonal Arm */}
        <polygon points="960,440 1260,0 1580,0 960,440" fill="url(#beamRightGrad)" />
        <line
          x1="960"
          y1="440"
          x2="1580"
          y2="0"
          stroke="#2764ff"
          strokeWidth="3.5"
          strokeOpacity="0.75"
        />

        {/* 4. Lower-Left Perspective Blue Stripe */}
        <polygon
          points="960,440 300,1080 560,1080 960,440"
          fill="url(#wingLeftGrad)"
        />

        {/* 5. Lower-Right Perspective Blue Stripe */}
        <polygon
          points="960,440 1360,1080 1620,1080 960,440"
          fill="url(#wingRightGrad)"
        />

        {/* 6. Central Illuminated Ivory Runway (Apex behind FOUNDRIX, spreading downwards) */}
        <polygon
          points="960,440 560,1080 1360,1080"
          fill="url(#runwayCreamGrad)"
        />

        {/* 7. Precision Cyan Glowing Borders along the Runway */}
        <line
          x1="960"
          y1="440"
          x2="560"
          y2="1080"
          stroke="url(#cyanBorderGrad)"
          strokeWidth="2.5"
          filter="url(#softGlow)"
        />
        <line
          x1="960"
          y1="440"
          x2="1360"
          y2="1080"
          stroke="url(#cyanBorderGrad)"
          strokeWidth="2.5"
          filter="url(#softGlow)"
        />

        {/* Outer diagonal highlights on lower blue stripes matching canopy */}
        <line
          x1="960"
          y1="440"
          x2="300"
          y2="1080"
          stroke="url(#outerStripeGrad)"
          strokeWidth="3.5"
        />
        <line
          x1="960"
          y1="440"
          x2="1620"
          y2="1080"
          stroke="url(#outerStripeGrad)"
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
};

export default GeometricX;
