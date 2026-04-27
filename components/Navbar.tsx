'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { navItems } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const sectionIds = useMemo(() => navItems.map((item) => item.href.replace('#', '')), []);
  const activeSection = useActiveSection(sectionIds);

  const navigateToSection = (target: string) => {
    if (pathname !== '/') {
      window.location.href = `/${target}`;
      return;
    }

    const element = document.querySelector(target);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition duration-300',
          isScrolled ? 'py-3' : 'py-5'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="section-container">
          <div
            className={cn(
              'flex min-h-[76px] items-center justify-between rounded-full px-4 py-1.5 transition duration-300 md:min-h-20 md:px-5',
              isScrolled
                ? 'glass-panel border border-white/50 shadow-panel'
                : 'bg-white/25 backdrop-blur-md dark:bg-white/5'
            )}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-16 w-40 overflow-hidden sm:h-[72px] sm:w-48 lg:h-[76px] lg:w-56">
                <Image
                  src="/images/params-dental-logo-nav.png"
                  alt="Param's Dental"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-1 rounded-full border border-white/40 bg-white/50 px-2 py-2 dark:border-white/10 dark:bg-white/5 lg:flex">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateToSection(item.href)}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition',
                      isActive
                        ? 'bg-primary-600 text-white shadow-glow'
                        : 'text-[rgb(var(--muted-ink))] hover:text-primary-700 dark:hover:text-primary-200'
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              <button
                type="button"
                className="button-primary"
                onClick={() => navigateToSection('#appointment')}
              >
                Book Appointment
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-primary-700 dark:text-primary-200" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[110] bg-slate-950/50 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-surface-elevated px-6 py-6 shadow-2xl dark:bg-slate-950"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="relative h-20 w-44">
                  <Image
                    src="/images/params-dental-logo-nav.png"
                    alt="Param's Dental"
                    fill
                    className="object-contain"
                    sizes="176px"
                    priority
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-primary-700 dark:text-primary-200" />
                </button>
              </div>

              <div className="mt-10 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigateToSection(item.href);
                    }}
                    className="glass-panel flex w-full items-center justify-between rounded-3xl px-5 py-4 text-left text-base font-medium text-ink"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <span>{item.label}</span>
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                className="button-primary mt-auto"
                onClick={() => {
                  setIsOpen(false);
                  navigateToSection('#appointment');
                }}
              >
                Book Appointment
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
