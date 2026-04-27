'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
  direction?: 'up' | 'left' | 'right';
  delay?: number;
};

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  ...props
}: RevealProps) {
  const offsets = {
    up: { y: 32, x: 0 },
    left: { y: 0, x: -32 },
    right: { y: 0, x: 32 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
