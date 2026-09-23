import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (totalHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollPercentage(pct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      aria-label="Scroll to top"
      title="Back to Top"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        style={{ position: 'absolute', inset: '2px', transform: 'rotate(-90deg)', pointerEvents: 'none' }}
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="var(--accent-cyan)"
          strokeWidth="2.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <ArrowUp size={18} color="#ffffff" style={{ position: 'relative', zIndex: 1 }} />
    </button>
  );
};

export default ScrollToTop;
