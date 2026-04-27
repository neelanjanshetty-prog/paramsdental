'use client';

import Image from 'next/image';
import { useState } from 'react';

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  label: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  label,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(58);

  return (
    <div className="glass-panel gradient-border relative overflow-hidden rounded-[30px] p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
        <Image
          src={beforeImage}
          alt={`${label} before treatment`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="relative h-full w-[120%]">
            <Image
              src={afterImage}
              alt={`${label} after treatment`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div
          className="absolute inset-y-0 z-10 w-1 rounded-full bg-white shadow-glow"
          style={{ left: `calc(${position}% - 2px)` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-xs font-semibold text-primary-700 shadow-panel">
            Drag
          </div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-100"
        aria-label={`Adjust ${label} before and after comparison`}
      />
      <div className="mt-3 flex justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--muted-ink))]">
        <span>After</span>
        <span>Before</span>
      </div>
    </div>
  );
}
