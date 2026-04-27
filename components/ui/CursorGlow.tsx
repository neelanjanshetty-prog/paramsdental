'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CursorGlow() {
  const [isTouch, setIsTouch] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(coarsePointer);

    if (coarsePointer) {
      return undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - 120);
      mouseY.set(event.clientY - 120);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouch) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(76,185,231,0.24)_0%,rgba(76,185,231,0.1)_38%,transparent_70%)] blur-2xl md:block"
      style={{ x, y }}
    />
  );
}
