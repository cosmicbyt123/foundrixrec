import React, { useState, useEffect } from 'react';
import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

export const Hero = (props) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 767;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileHero {...props} /> : <DesktopHero {...props} />;
};

export default Hero;
