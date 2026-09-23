import React, { useEffect, useState, useRef } from 'react';

/**
 * High-Performance Kinetic Custom Cursor with Glowing Trailing Path
 * - Kinetic fading trail ribbon drawn on HTML5 canvas along the cursor's exact motion path
 * - Micro-sparks emitted during movement for a luminous cybernetic trail
 * - Double-layer electric cyan dot + smooth lagging follower ring
 * - Interactive hover expansions, click shockwaves, and touch-screen safety
 */
export const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const followerRef = useRef(null);

  // Position references for smooth LERP trailing physics
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  // Trailing path history & particle sparks
  const trailPoints = useRef([]);
  const sparks = useRef([]);
  const lastMousePos = useRef({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Completely disable on mobile and touch devices to conserve battery and CPU
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    ) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current.x = x;
      mousePos.current.y = y;

      if (!visible) setVisible(true);

      // Instantly position the center pinpoint dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Record trailing points with timestamp
      const now = performance.now();
      const dist = Math.hypot(x - lastMousePos.current.x, y - lastMousePos.current.y);

      if (dist > 3) {
        trailPoints.current.push({ x, y, time: now });

        // Spawn glowing micro-sparks on active movement
        if (dist > 8 && sparks.current.length < 40) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.5 + 0.5;
          sparks.current.push({
            x: x + (Math.random() - 0.5) * 6,
            y: y + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2.2 + 1,
            alpha: 1,
            maxLife: 25,
            life: 25,
            color: Math.random() > 0.3 ? '#00f0ff' : '#ffffff'
          });
        }

        lastMousePos.current = { x, y };
      }

      // Check if hovering over clickable / interactive elements
      const target = e.target;
      const isInteractive = target && (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.clickable') ||
        target.closest('.glass-card') ||
        target.closest('.schedule-tab-btn') ||
        target.closest('.pill-badge')
      );

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      setVisible(false);
      trailPoints.current = [];
    };
    const handleMouseEnter = () => setVisible(true);

    // Continuous 60fps render loop for trailing path ribbon, sparks, and LERP follower
    const renderLoop = (timestamp) => {
      // 1. Follower ring LERP physics
      const lerpFactor = 0.18;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerpFactor;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerpFactor;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Trailing Path & Sparks on Canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Filter out expired trail points (trail duration: 320ms)
        const trailLifetime = 320;
        trailPoints.current = trailPoints.current.filter(p => timestamp - p.time < trailLifetime);

        const pts = trailPoints.current;
        if (pts.length > 2) {
          // Draw smooth quadratic curves connecting the path
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let i = 1; i < pts.length - 1; i++) {
            const currentPoint = pts[i];
            const nextPoint = pts[i + 1];
            const ageRatio = (timestamp - currentPoint.time) / trailLifetime; // 0 (new) to 1 (old)
            const progress = 1 - Math.min(1, Math.max(0, ageRatio)); // 1 (new) to 0 (old)

            const midX = (currentPoint.x + nextPoint.x) / 2;
            const midY = (currentPoint.y + nextPoint.y) / 2;

            // Outer cyan glow pass
            ctx.beginPath();
            ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
            ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, midX, midY);
            ctx.lineWidth = Math.max(1, progress * 4.5);
            ctx.strokeStyle = `rgba(0, 240, 255, ${progress * 0.45})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f0ff';
            ctx.stroke();

            // Inner high-luminance white-cyan core pass
            ctx.beginPath();
            ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
            ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, midX, midY);
            ctx.lineWidth = Math.max(0.8, progress * 2.2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.85})`;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // 3. Render and update micro-sparks
        for (let i = sparks.current.length - 1; i >= 0; i--) {
          const s = sparks.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.life--;
          s.alpha = Math.max(0, s.life / s.maxLife);

          if (s.life <= 0) {
            sparks.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (s.life / s.maxLife), 0, Math.PI * 2);
          ctx.fillStyle = s.color === '#ffffff' 
            ? `rgba(255, 255, 255, ${s.alpha * 0.9})`
            : `rgba(0, 240, 255, ${s.alpha * 0.75})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00f0ff';
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  // Don't render on touch-only devices
  if (isTouchDevice || (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches)) {
    return null;
  }

  return (
    <>
      {/* 1. Trailing Path & Sparks Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="cursor-trail-canvas"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* 2. Interactive Kinetic Follower Ring and Pinpoint Dot */}
      <div
        className="custom-cursor-container"
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Outer Smooth Trailing Ring */}
        <div
          ref={followerRef}
          className={`cursor-follower ${isHovered ? 'cursor-hover' : ''} ${isClicked ? 'cursor-click' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: isHovered ? '56px' : '34px',
            height: isHovered ? '56px' : '34px',
            borderRadius: '50%',
            border: isHovered ? '1.5px solid #00f0ff' : '1.5px solid rgba(0, 240, 255, 0.55)',
            backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.12)' : 'rgba(20, 110, 245, 0.04)',
            boxShadow: isHovered
              ? '0 0 25px rgba(0, 240, 255, 0.5), inset 0 0 15px rgba(0, 240, 255, 0.2)'
              : '0 0 15px rgba(20, 110, 245, 0.3)',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />

        {/* Inner Precise Electric Cyan Center Dot */}
        <div
          ref={dotRef}
          className="cursor-dot"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: isHovered ? '4px' : '8px',
            height: isHovered ? '4px' : '8px',
            borderRadius: '50%',
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 10px #00f0ff, 0 0 18px #146ef5',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />

        <style>{`
          @media (pointer: coarse) {
            .custom-cursor-container,
            .cursor-trail-canvas {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CustomCursor;

