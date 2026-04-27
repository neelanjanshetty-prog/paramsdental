'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { PageLoader } from '@/components/ui/PageLoader';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <PageLoader />
        <CursorGlow />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}
