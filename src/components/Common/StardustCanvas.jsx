import React, { useEffect, useRef } from 'react';

export const StardustCanvas = ({
  particleCount = 55,
  speed = 0.6,
  colors = ['#00f0ff', '#3b82f6', '#60a5fa', '#ffffff', '#22d3ee'],
  style = {},
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + Math.random() * 20;
        this.size = Math.random() * 2.2 + 0.6;
        this.vy = -(Math.random() * speed + 0.3);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.7 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.008;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.y += this.vy;
        this.x += this.vx;

        // Twinkle
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha >= 0.9) this.twinkleDir = -1;
        if (this.alpha <= 0.15) this.twinkleDir = 1;

        // Reset if drifted off top or sides
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    />
  );
};

export default StardustCanvas;
