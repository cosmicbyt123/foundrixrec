import { useEffect } from 'react';

/**
 * Custom Hook that watches elements with .reveal-on-scroll, .reveal-scale,
 * .reveal-from-left, or .reveal-from-right and handles bidirectional scroll animations
 * (both scrolling DOWN and scrolling UP).
 */
export const useScrollReveal = (selector = '.reveal-on-scroll, .reveal-scale, .reveal-from-left, .reveal-from-right') => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Track Scroll Direction ('up' vs 'down')
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Set initial direction
    document.body.setAttribute('data-scroll-dir', 'down');

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) > 4) {
        const direction = diff < 0 ? 'up' : 'down';
        document.body.setAttribute('data-scroll-dir', direction);
      }

      // If user scrolls back up near the top, ensure all hero elements re-reveal cleanly
      if (currentScrollY <= 60) {
        document.querySelectorAll('#hero .reveal-on-scroll, #hero .reveal-scale, #hero .reveal-from-left, #hero .reveal-from-right').forEach((el) => {
          el.classList.add('is-revealed');
          el.classList.remove('scroll-above', 'scroll-below');
        });
      }

      lastScrollY = Math.max(0, currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. If IntersectionObserver is not supported, reveal immediately
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // 3. Bidirectional IntersectionObserver
    // Does NOT unobserve, allowing elements to re-animate smoothly when scrolling UP or DOWN
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (el.closest('#hero')) {
            el.classList.add('is-revealed');
            el.classList.remove('scroll-above', 'scroll-below');
            return;
          }

          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            el.classList.remove('scroll-above', 'scroll-below');
          } else {
            // Determine if element left through top (above viewport) or bottom (below viewport)
            const rect = entry.boundingClientRect;
            if (rect.bottom < 0) {
              // Element is now above current viewport (user scrolled down past it)
              el.classList.remove('is-revealed');
              el.classList.add('scroll-above');
              el.classList.remove('scroll-below');
            } else if (rect.top > window.innerHeight) {
              // Element is now below current viewport (user scrolled up past it)
              el.classList.remove('is-revealed');
              el.classList.add('scroll-below');
              el.classList.remove('scroll-above');
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '30px 0px -20px 0px',
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    // Handle dynamically mounted elements
    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll(selector);
      currentElements.forEach((el) => {
        if (!el.dataset.observed) {
          el.dataset.observed = 'true';
          observer.observe(el);
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector]);
};

export default useScrollReveal;
