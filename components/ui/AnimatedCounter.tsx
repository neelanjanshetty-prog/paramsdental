'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
};

export function AnimatedCounter({
  value,
  suffix = '',
  decimals = Number.isInteger(value) ? 0 : 1,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    let frame = 0;
    let startTime = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const duration = 1200;

        const animate = (timestamp: number) => {
          if (!startTime) {
            startTime = timestamp;
          }

          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(value * eased);

          if (progress < 1) {
            frame = window.requestAnimationFrame(animate);
          }
        };

        frame = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.65 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}
