'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Star } from 'lucide-react';
import { siteConfig, stats } from '@/data/site';
import { useGsapParallax } from '@/hooks/useGsapParallax';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { HeroScene } from '@/components/ui/HeroScene';
import { Reveal } from '@/components/ui/Reveal';

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function HeroSection() {
  useGsapParallax('.hero-parallax', 14);

  return (
    <section id="home" className="section-shell flex min-h-[auto] items-center pt-24 sm:min-h-screen md:pt-28">
      <div className="absolute inset-0 bg-aurora" />
      <div className="mesh-overlay absolute inset-0 opacity-40" />
      <div className="hero-parallax absolute -left-8 top-32 h-28 w-28 rounded-full bg-primary-200/50 blur-2xl md:h-40 md:w-40" />
      <div className="hero-parallax absolute right-6 top-24 h-32 w-32 rounded-full bg-secondary/30 blur-3xl md:h-56 md:w-56" />
      <div className="hero-parallax absolute bottom-20 left-1/2 h-32 w-32 rounded-full bg-primary-600/15 blur-3xl md:h-52 md:w-52" />

      <motion.div
        className="absolute left-[8%] top-[24%] hidden rounded-full border border-white/60 bg-white/65 px-4 py-3 shadow-panel md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Pain-free visits</p>
      </motion.div>
      <motion.div
        className="absolute right-[8%] top-[60%] hidden rounded-full border border-white/50 bg-white/60 px-4 py-3 shadow-panel lg:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Digital diagnostics</p>
      </motion.div>

      <div className="section-container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="section-kicker">Luxury Dentistry in Bangalore</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl md:mt-6 md:text-7xl md:leading-[0.95]">
                {siteConfig.tagline}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[rgb(var(--muted-ink))] md:mt-6 md:text-xl md:leading-8">
                Advanced dental care with modern technology, experienced doctors, and pain-free treatments.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <button type="button" className="button-primary w-full gap-2 sm:w-auto" onClick={() => scrollToSection('appointment')}>
                  Book Appointment
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="button-secondary w-full gap-2 sm:w-auto"
                  onClick={() => scrollToSection('services')}
                >
                  <PlayCircle className="h-4 w-4" />
                  View Services
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-panel rounded-[20px] border border-white/50 p-4 shadow-panel sm:rounded-[26px] sm:p-5"
                  >
                    <p className="text-xl font-semibold text-ink sm:text-2xl md:text-3xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      {stat.label === 'Google Rating' ? <Star className="ml-1 inline h-5 w-5 fill-amber-400 text-amber-400" /> : null}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[rgb(var(--muted-ink))] sm:text-sm sm:leading-6">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" delay={0.18}>
            <div className="relative mx-auto h-[340px] w-full max-w-[620px] sm:h-[430px] lg:h-[540px]">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/85 via-white/30 to-primary-100/80 shadow-halo backdrop-blur-2xl dark:from-primary-950/60 dark:via-primary-950/30 dark:to-primary-900/20 sm:rounded-[40px]" />
              <div className="absolute inset-4 rounded-[24px] border border-white/60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(255,255,255,0.12))] dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,rgba(76,185,231,0.08),rgba(13,76,146,0.06))] sm:inset-5 sm:rounded-[34px]" />
              <div className="absolute inset-0">
                <HeroScene />
              </div>
              <motion.div
                className="glass-panel absolute left-4 top-5 rounded-[18px] p-3 md:left-8 md:rounded-[24px] md:p-4"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Premium Workflow</p>
                <p className="mt-2 text-xs font-semibold text-ink sm:text-sm">Consultation to confident smile</p>
              </motion.div>
              <motion.div
                className="glass-panel absolute bottom-5 right-4 max-w-[180px] rounded-[18px] p-3 md:right-8 md:max-w-[220px] md:rounded-[24px] md:p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Patient Promise</p>
                <p className="mt-2 text-xs leading-5 text-[rgb(var(--muted-ink))] sm:text-sm sm:leading-6">
                  Calm diagnostics, precise planning, and meticulous aftercare.
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
