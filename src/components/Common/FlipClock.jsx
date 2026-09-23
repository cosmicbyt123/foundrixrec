import React, { useState, useEffect, useRef } from 'react';
import './FlipClock.css';

/**
 * Single 3D Split-Flap Card Component
 * Emulates physical mechanical split-flap boards with realistic 3D perspective fold
 */
const FlipCard = ({ value, label }) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [nextVal, setNextVal] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValRef = useRef(value);

  useEffect(() => {
    if (value !== prevValRef.current) {
      setNextVal(value);
      setIsFlipping(true);

      const timeout = setTimeout(() => {
        setCurrentVal(value);
        setIsFlipping(false);
        prevValRef.current = value;
      }, 560);

      return () => clearTimeout(timeout);
    }
  }, [value]);

  return (
    <div className="flip-unit">
      <div className="flip-card-box">
        {/* Corner Sub-label like "PM" in user reference photo */}
        <span className="flip-corner-tag">{label}</span>

        {/* Top Static (reveals new value underneath when flap drops) */}
        <div className="flip-card-half flip-card-top">
          <span>{nextVal}</span>
        </div>

        {/* Bottom Static (shows current value before flap slaps down) */}
        <div className="flip-card-half flip-card-bottom">
          <span>{currentVal}</span>
        </div>

        {/* Flipping Top Flap (folds down from 0deg to -90deg) */}
        <div className={`flip-card-half flip-card-top flip-leaf-top ${isFlipping ? 'flipping-top' : ''}`}>
          <span>{currentVal}</span>
        </div>

        {/* Flipping Bottom Flap (falls down from 90deg to 0deg) */}
        <div className={`flip-card-half flip-card-bottom flip-leaf-bottom ${isFlipping ? 'flipping-bottom' : ''}`}>
          <span>{nextVal}</span>
        </div>

        {/* Center Split Groove & Side Notches */}
        <div className="flip-divider-line" />
        <div className="flip-side-notch-left" />
        <div className="flip-side-notch-right" />
      </div>

      {/* Subtitle Label */}
      <span className="flip-bottom-label">{label}</span>
    </div>
  );
};

/**
 * 3D Mechanical Flip Clock Countdown to Summit
 * Target: 9 October 2026, 09:00 AM IST
 */
export const FlipClock = ({ targetDate = '2026-10-09T09:00:00+05:30' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flip-clock-wrapper reveal-on-scroll">
      {/* Live Badge */}
      <div className="flip-clock-header">
        <span className="flip-live-dot" />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: '700',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          EVENT COUNTDOWN • OCT 9–10, 2026
        </span>
      </div>

      {/* 4 Split-Flap Clock Modules */}
      <div className="flip-clock-container">
        {/* DAYS */}
        <FlipCard value={timeLeft.days} label="DAYS" />

        {/* Separator Colons */}
        <div className="flip-separator">
          <div className="flip-separator-dot" />
          <div className="flip-separator-dot" />
        </div>

        {/* HOURS */}
        <FlipCard value={timeLeft.hours} label="HOURS" />

        {/* Separator Colons */}
        <div className="flip-separator">
          <div className="flip-separator-dot" />
          <div className="flip-separator-dot" />
        </div>

        {/* MINUTES */}
        <FlipCard value={timeLeft.minutes} label="MINS" />

        {/* Separator Colons */}
        <div className="flip-separator">
          <div className="flip-separator-dot" />
          <div className="flip-separator-dot" />
        </div>

        {/* SECONDS */}
        <FlipCard value={timeLeft.seconds} label="SECS" />
      </div>
    </div>
  );
};

export default FlipClock;
