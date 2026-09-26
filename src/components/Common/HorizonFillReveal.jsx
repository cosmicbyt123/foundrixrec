import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HorizonFillReveal = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Parallax horizon rise on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const domeY = useTransform(scrollYProgress, [0, 0.6], [45, 0]);
  const flareScale = useTransform(scrollYProgress, [0.1, 0.6], [0.85, 1.15]);
  const flareOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.4, 0.95, 0.5]);

  // Dense rising stardust embers canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#00f0ff', '#ffffff', '#38bdf8', '#60a5fa', '#93c5fd', '#c084fc'];
    const particleCount = width < 768 ? 70 : 140;

    class HorizonEmber {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        // Calculate Y on the convex curved horizon arc
        const normX = (this.x - width / 2) / (width / 2);
        const domeCurveY = height * 0.65 + normX * normX * (height * 0.22);

        this.y = initial ? domeCurveY - Math.random() * (height * 0.8) : domeCurveY + Math.random() * 8;
        this.vy = -(Math.random() * 1.6 + 0.8);
        this.vx = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2 + 0.7;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = Math.random() * 0.75 + 0.25;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.y += this.vy;
        this.x += this.vx;

        // Twinkle
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha >= 0.95) this.twinkleDir = -1;
        if (this.alpha <= 0.15) this.twinkleDir = 1;

        // Reset if drifted beyond top or sides
        if (this.y < height * 0.02 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 3.5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const embers = Array.from({ length: particleCount }, () => new HorizonEmber());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < embers.length; i++) {
        embers[i].update();
        embers[i].draw();
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="horizon-ambient-divider"
      aria-label="Celestial Horizon Divider"
      style={{
        position: 'relative',
        height: 'clamp(200px, 26vh, 290px)',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Translucent Cosmic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(6, 16, 36, 0.4) 0%, rgba(3, 5, 15, 0.7) 90%)',
          zIndex: 0,
        }}
      />

      {/* 2. Rising Stardust Embers Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 3. Monumental Glowing Curved Horizon Dome (Sunrise Rim Flare) */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 3,
          y: domeY,
        }}
      >
        {/* Blinding Solar Apex Glow / Sunrise Flare */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(300px, 55vw, 720px)',
            height: '130px',
            background: 'radial-gradient(ellipse 70% 80px at 50% 30%, #ffffff 0%, #00f0ff 40%, rgba(37, 99, 235, 0.4) 70%, transparent 100%)',
            filter: 'blur(35px)',
            opacity: flareOpacity,
            scale: flareScale,
          }}
        />

        {/* Vector SVG Curved Horizon Dome */}
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            {/* Horizon Rim Neon Beam */}
            <linearGradient id="horizonCyanRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
              <stop offset="20%" stopColor="rgba(37, 99, 235, 0.5)" />
              <stop offset="45%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#00f0ff" />
              <stop offset="80%" stopColor="rgba(37, 99, 235, 0.5)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
            </linearGradient>

            {/* Atmosphere Fill Under Arc */}
            <radialGradient id="planetBodyGrad" cx="50%" cy="15%" r="75%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.25)" />
              <stop offset="25%" stopColor="rgba(30, 58, 138, 0.35)" />
              <stop offset="60%" stopColor="#050a14" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>
          </defs>

          {/* Convex Silhouette Body */}
          <path
            d="M -100,240 Q 720,25 1540,240 L 1540,280 L -100,280 Z"
            fill="url(#planetBodyGrad)"
          />

          {/* High-Voltage Razor Rim Beam */}
          <path
            d="M -100,240 Q 720,25 1540,240"
            stroke="url(#horizonCyanRim)"
            strokeWidth="3"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 15px #00f0ff) drop-shadow(0 0 35px rgba(0, 240, 255, 0.8))',
            }}
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HorizonFillReveal;
