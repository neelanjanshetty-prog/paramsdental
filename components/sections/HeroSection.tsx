'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { stats } from '@/data/site';
import { useGsapParallax } from '@/hooks/useGsapParallax';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

type ReviewsSummaryResponse = {
  averageRating: number;
};

const reviewsRefreshIntervalMs = 30 * 60 * 1000;

function navigateTo(path: string) {
  window.location.href = path;
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function HeroSection() {
  const [googleRating, setGoogleRating] = useState<number | null>(null);

  useGsapParallax('.hero-parallax', 14);

  useEffect(() => {
    let isMounted = true;

    const loadGoogleRating = async () => {
      try {
        const response = await fetch('/api/reviews', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Reviews request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as ReviewsSummaryResponse;

        if (isMounted && Number.isFinite(payload.averageRating)) {
          setGoogleRating(payload.averageRating);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadGoogleRating();
    const refreshTimer = window.setInterval(loadGoogleRating, reviewsRefreshIntervalMs);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <section id="home" className="section-shell flex min-h-[auto] items-center pt-24 sm:min-h-screen md:pt-28">
      <div className="absolute inset-0 bg-aurora" />
      <div className="mesh-overlay absolute inset-0 opacity-40" />
      <div className="hero-parallax absolute -left-8 top-32 h-28 w-28 rounded-full bg-primary-200/50 blur-2xl md:h-40 md:w-40" />
      <div className="hero-parallax absolute right-6 top-24 h-32 w-32 rounded-full bg-secondary/30 blur-3xl md:h-56 md:w-56" />
      <div className="hero-parallax absolute bottom-20 left-1/2 h-32 w-32 rounded-full bg-primary-600/15 blur-3xl md:h-52 md:w-52" />
      <div className="absolute inset-x-4 top-24 z-[1] aspect-video max-h-[520px] overflow-hidden rounded-[28px] border border-white/60 bg-white/80 opacity-25 shadow-halo backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/40 sm:inset-x-10 sm:rounded-[40px] md:top-28 lg:inset-x-auto lg:right-8 lg:w-[58vw] lg:opacity-65">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="3D animation of dental braces being applied to teeth"
        >
          <source src="/videos/braces-hero.mp4" type="video/mp4" />
          <source src="/videos/braces-hero.webm" type="video/webm" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/90 via-white/45 to-white/5 dark:from-slate-950/80 dark:via-slate-950/35 dark:to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-white via-white/80 to-white/10 dark:from-slate-950 dark:via-slate-950/75 dark:to-slate-950/10" />

      <motion.div
        className="absolute right-[34%] top-[18%] z-[3] hidden rounded-full border border-white/60 bg-white/65 px-4 py-3 shadow-panel xl:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Pain-free visits</p>
      </motion.div>
      <motion.div
        className="absolute right-[8%] top-[60%] z-[3] hidden rounded-full border border-white/50 bg-white/60 px-4 py-3 shadow-panel lg:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Digital diagnostics</p>
      </motion.div>

      <div className="section-container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="section-kicker">Advanced dental care in Vijayanagar</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl md:mt-6 md:text-7xl md:leading-[0.95]">
                Dentist in Vijayanagar, Bengaluru for confident family smiles
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[rgb(var(--muted-ink))] md:mt-6 md:text-xl md:leading-8">
                Advanced dental care with orthodontics, Invisalign, dental implants, root canal treatment, teeth whitening, and family dentistry from a team trusted by 10K+ patients.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <button type="button" className="button-primary w-full gap-2 sm:w-auto" onClick={() => navigateTo('/book-appointment#appointment')}>
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
                      <AnimatedCounter
                        value={stat.label === 'Google Rating' && googleRating ? googleRating : stat.value}
                        suffix={stat.suffix}
                      />
                      {stat.label === 'Google Rating' ? <Star className="ml-1 inline h-5 w-5 fill-amber-400 text-amber-400" /> : null}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[rgb(var(--muted-ink))] sm:text-sm sm:leading-6">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
