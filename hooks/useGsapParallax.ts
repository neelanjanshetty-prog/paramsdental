'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGsapParallax(selector: string, yPercent = 18) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector);

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: 0 },
          {
            yPercent,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              scrub: true,
              start: 'top bottom',
              end: 'bottom top',
            },
          }
        );
      });
    });

    return () => context.revert();
  }, [selector, yPercent]);
}
