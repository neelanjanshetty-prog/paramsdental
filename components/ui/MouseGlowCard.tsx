'use client';

import {
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
} from 'react';
import { cn } from '@/utils/cn';

type MouseGlowCardProps = HTMLAttributes<HTMLDivElement>;

export function MouseGlowCard({ className, children, ...props }: MouseGlowCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = ref.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handlePointerLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-[28px] transition duration-500 will-change-transform',
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          '--glow-x': '50%',
          '--glow-y': '50%',
        } as CSSProperties
      }
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),rgba(76,185,231,0.28),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
