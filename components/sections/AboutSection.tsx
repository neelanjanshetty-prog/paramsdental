'use client';

import Image from 'next/image';
import { aboutFeatures, modernEquipment } from '@/data/site';
import { MouseGlowCard } from '@/components/ui/MouseGlowCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconRenderer } from '@/components/ui/IconRenderer';

export function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className="section-container">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -left-10 top-10 hidden h-32 w-32 rounded-full bg-secondary/20 blur-3xl md:block" />
              <div className="glass-panel gradient-border relative overflow-hidden rounded-[24px] p-3 sm:rounded-[34px] sm:p-4">
                <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px]">
                  <Image
                    src="/images/clinic-interior.jpg"
                    alt="Modern Param's Dental clinic interior"
                    width={1350}
                    height={1800}
                    className="h-auto w-full"
                    priority={false}
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-500 sm:left-4 sm:top-4 sm:px-4 sm:text-xs sm:tracking-[0.35em]">
                    Patient-first care
                  </div>
                </div>
                <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
                  <div className="rounded-[18px] border border-primary-100 bg-white/80 p-4 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Sterile & calm</p>
                    <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-ink))]">Every room is designed to reduce anxiety and support precision.</p>
                  </div>
                  <div className="rounded-[18px] border border-primary-100 bg-white/80 p-4 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Modern diagnostics</p>
                    <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-ink))]">Digital tools guide treatment with clarity and confidence.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Why Patients Choose Us"
                title="Why Choose Param's Dental?"
                description="Established on 12th December 2021, Params Dental Clinic has grown into a trusted destination for comprehensive dental care. With a strong focus on quality treatment, patient comfort, and personalized oral healthcare, we are committed to helping every patient achieve a healthy, confident smile."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[rgb(var(--muted-ink))] sm:text-base sm:leading-8">
                At Params Dental Clinic, we combine advanced dental technology, experienced care, and a compassionate approach to provide a smooth and comfortable experience for patients of all ages. From routine check-ups and preventive dentistry to advanced dental treatments, our goal is to deliver reliable, modern, and patient-focused dental care in a welcoming environment.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-5 rounded-[22px] border border-primary-100 bg-white/75 p-5 shadow-panel dark:border-primary-900 dark:bg-white/5 sm:mt-6 sm:rounded-[28px] sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Modern Equipment</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {modernEquipment.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-semibold text-ink">
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2">
              {aboutFeatures.map((feature, index) => (
                <Reveal key={feature.title} delay={0.08 * index}>
                  <MouseGlowCard className="glass-panel rounded-[22px] border border-white/60 p-5 shadow-panel sm:rounded-[28px] sm:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-600 to-secondary text-white shadow-glow sm:h-14 sm:w-14 sm:rounded-[20px]">
                      <IconRenderer name={feature.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-ink sm:mt-5 sm:text-xl">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-ink))] sm:leading-7">{feature.description}</p>
                  </MouseGlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
