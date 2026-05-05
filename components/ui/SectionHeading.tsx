import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl md:mt-6 md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-ink))] sm:text-base md:mt-5 md:text-lg md:leading-8">{description}</p>
    </div>
  );
}
