import confetti from 'canvas-confetti';

/**
 * Grand Celebration Birthday Cracker / Fireworks Cannon Engine
 * Multi-stage synchronized party crackers, starburst explosions, and cascading confetti rain
 */
export const triggerCelebrationCrackers = () => {
  if (typeof window === 'undefined') return;
  try {
    // Stage 1: Dual corner birthday party poppers firing simultaneously
    confetti({
      particleCount: 95,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.85 },
      colors: ['#00f0ff', '#146ef5', '#fbbf24', '#f43f5e', '#a855f7', '#10b981'],
      startVelocity: 55,
      ticks: 250,
    });
    confetti({
      particleCount: 95,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.85 },
      colors: ['#00f0ff', '#146ef5', '#fbbf24', '#f43f5e', '#a855f7', '#10b981'],
      startVelocity: 55,
      ticks: 250,
    });

    // Stage 2: Central starburst cracker fireworks explosion
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 110,
        origin: { x: 0.5, y: 0.4 },
        shapes: ['star', 'circle'],
        colors: ['#fbbf24', '#f59e0b', '#00f0ff', '#10b981', '#ffffff'],
        scalar: 1.25,
        startVelocity: 48,
        ticks: 280,
      });
    }, 280);

    // Stage 3: Second volley of angled corner cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 50,
        spread: 80,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#00f0ff', '#10b981', '#fbbf24', '#ec4899', '#ffffff'],
        startVelocity: 60,
        ticks: 250,
      });
      confetti({
        particleCount: 80,
        angle: 130,
        spread: 80,
        origin: { x: 0.85, y: 0.8 },
        colors: ['#00f0ff', '#10b981', '#fbbf24', '#ec4899', '#ffffff'],
        startVelocity: 60,
        ticks: 250,
      });
    }, 650);

    // Stage 4: Cascading festive golden stars falling from top
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { x: 0.5, y: 0.12 },
        shapes: ['star'],
        colors: ['#fbbf24', '#ffffff', '#00f0ff'],
        scalar: 1.15,
        ticks: 360,
        gravity: 0.75,
      });
    }, 1200);
  } catch (err) {
    console.error('Celebration cracker error:', err);
  }
};
