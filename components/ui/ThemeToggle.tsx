'use client';

import { Moon, SunMedium } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-primary-700 transition dark:text-primary-200"
      whileTap={{ scale: 0.94 }}
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
    </motion.button>
  );
}
