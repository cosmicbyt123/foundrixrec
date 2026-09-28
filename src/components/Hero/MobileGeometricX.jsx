import React, { useRef, useState, useEffect } from 'react';

// Mobile Framing Canopy: Frames FOUNDRIX from above, symmetrical around 50%
export const MobileCanopy = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? Math.min(window.innerWidth, 500) : 390));

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        setWidth(Math.round(containerRef.current.getBoundingClientRect().width) || 390);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const centerX = width / 2;
  const height = 180;

  // Left canopy beam points down toward FOUNDRIX upper-left
  const leftTopOuterX = Math.round(Math.max(10, centerX - width * 0.40));
  const leftTopInnerX = Math.round(Math.max(30, centerX - width * 0.22));
  const leftBottomOuterX = Math.round(centerX - width * 0.24);
  const leftBottomInnerX = Math.round(centerX - width * 0.12);

  // Right canopy beam (mirrored around centerX)
  const rightTopOuterX = Math.round(Math.min(width - 10, centerX + width * 0.40));
  const rightTopInnerX = Math.round(Math.min(width - 30, centerX + width * 0.22));
  const rightBottomOuterX = Math.round(centerX + width * 0.24);
  const rightBottomInnerX = Math.round(centerX + width * 0.12);

  return (
    <div ref={containerRef} className="foundrix-hero-mobile__canopy" aria-hidden="true">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="mobileCanopyAura" cx="50%" cy="80%" r="55%">
            <stop offset="0%" stopColor="#1e56ff" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#0d2fa6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#020713" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="mobileCanopyBeamLeft" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0a2baf" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#123db8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#164bff" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="mobileCanopyBeamRight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a2baf" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#123db8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#164bff" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Central aura behind FOUNDRIX */}
        <circle cx={centerX} cy={140} r={140} fill="url(#mobileCanopyAura)" />

        {/* Left Canopy Beam */}
        <polygon
          points={`${leftBottomInnerX},135 ${leftTopInnerX},0 ${leftTopOuterX},0 ${leftBottomOuterX},135`}
          fill="url(#mobileCanopyBeamLeft)"
        />
        <line
          x1={leftTopInnerX}
          y1={0}
          x2={leftBottomInnerX}
          y2={135}
          stroke="#164bff"
          strokeWidth="1.6"
          strokeOpacity="0.65"
        />

        {/* Right Canopy Beam */}
        <polygon
          points={`${rightBottomInnerX},135 ${rightTopInnerX},0 ${rightTopOuterX},0 ${rightBottomOuterX},135`}
          fill="url(#mobileCanopyBeamRight)"
        />
        <line
          x1={rightTopInnerX}
          y1={0}
          x2={rightBottomInnerX}
          y2={135}
          stroke="#164bff"
          strokeWidth="1.6"
          strokeOpacity="0.65"
        />
      </svg>
    </div>
  );
};

// Mobile Perspective Pathway: Leads directly from beneath buttons toward Events
export const MobilePathway = () => {
  const containerRef = useRef(null);
  const [dims, setDims] = useState(() => ({
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth, 500) : 390,
    height: 240,
  }));

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({
          width: Math.round(rect.width) || 390,
          height: Math.round(rect.height) || 240,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const { width, height } = dims;
  const centerX = width / 2;

  // Proportions:
  // Top width: ~20% of container width (comfortably narrow)
  // Bottom width: ~72% of container width (comfortably inside screen, never 100vw)
  const topWidth = Math.round(width * 0.20);
  const topHalfWidth = topWidth / 2;
  const bottomWidth = Math.round(width * 0.72);
  const bottomHalfWidth = bottomWidth / 2;

  // Mirrored coordinates around centerX
  const topLeftX = Math.round(centerX - topHalfWidth);
  const topRightX = Math.round(centerX + topHalfWidth);
  const bottomLeftX = Math.round(centerX - bottomHalfWidth);
  const bottomRightX = Math.round(centerX + bottomHalfWidth);

  // Wings flanking the runway
  const wingLeftTopX = Math.round(Math.max(15, topLeftX - width * 0.12));
  const wingRightTopX = Math.round(Math.min(width - 15, topRightX + width * 0.12));
  const wingLeftBottomX = Math.round(Math.max(10, bottomLeftX - width * 0.10));
  const wingRightBottomX = Math.round(Math.min(width - 10, bottomRightX + width * 0.10));

  return (
    <div ref={containerRef} className="foundrix-hero-mobile__pathway" aria-hidden="true">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Ivory / Cream Runway Gradient fading into deep royal blue before bottom */}
          <linearGradient id="mobileRunwayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#faf2e6" stopOpacity="0.92" />
            <stop offset="42%" stopColor="#f3e3ca" stopOpacity="0.88" />
            <stop offset="60%" stopColor="#e0caa8" stopOpacity="0.75" />
            <stop offset="74%" stopColor="#6090e8" stopOpacity="0.55" />
            <stop offset="86%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="94%" stopColor="#123db8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#081a54" stopOpacity="0" />
          </linearGradient>

          {/* Glowing Cyan Border along runway edges */}
          <linearGradient id="mobileCyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#00f0ff" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#1e56ff" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#081a54" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#081a54" stopOpacity="0" />
          </linearGradient>

          {/* Lower Left Blue Wing */}
          <linearGradient id="mobileWingLeft" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1a52ff" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#1646d9" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#1038af" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#081a54" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#081a54" stopOpacity="0" />
          </linearGradient>

          {/* Lower Right Blue Wing */}
          <linearGradient id="mobileWingRight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1a52ff" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#1646d9" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#1038af" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#081a54" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#081a54" stopOpacity="0" />
          </linearGradient>

          {/* Outer Diagonal Stripe */}
          <linearGradient id="mobileOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2764ff" stopOpacity="0.70" />
            <stop offset="50%" stopColor="#164bff" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#0a2baf" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#081a54" stopOpacity="0" />
          </linearGradient>

          <filter id="mobileGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Left Wing */}
        <polygon
          points={`${wingLeftTopX},0 ${topLeftX},0 ${bottomLeftX},${height} ${wingLeftBottomX},${height}`}
          fill="url(#mobileWingLeft)"
        />

        {/* 2. Right Wing */}
        <polygon
          points={`${topRightX},0 ${wingRightTopX},0 ${wingRightBottomX},${height} ${bottomRightX},${height}`}
          fill="url(#mobileWingRight)"
        />

        {/* 3. Central Ivory Runway */}
        <polygon
          points={`${topLeftX},0 ${topRightX},0 ${bottomRightX},${height} ${bottomLeftX},${height}`}
          fill="url(#mobileRunwayGrad)"
        />

        {/* 4. Glowing Cyan Edges */}
        <line
          x1={topLeftX}
          y1={0}
          x2={bottomLeftX}
          y2={height}
          stroke="url(#mobileCyanGrad)"
          strokeWidth="1.8"
          filter="url(#mobileGlow)"
        />
        <line
          x1={topRightX}
          y1={0}
          x2={bottomRightX}
          y2={height}
          stroke="url(#mobileCyanGrad)"
          strokeWidth="1.8"
          filter="url(#mobileGlow)"
        />

        {/* 5. Outer Diagonal Highlight Lines */}
        <line
          x1={wingLeftTopX}
          y1={0}
          x2={wingLeftBottomX}
          y2={height}
          stroke="url(#mobileOuterGrad)"
          strokeWidth="2"
        />
        <line
          x1={wingRightTopX}
          y1={0}
          x2={wingRightBottomX}
          y2={height}
          stroke="url(#mobileOuterGrad)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default MobilePathway;
