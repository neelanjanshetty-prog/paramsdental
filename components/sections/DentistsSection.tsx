'use client';

import Image from 'next/image';
import { Award, Sparkles } from 'lucide-react';
import { doctors } from '@/data/site';
import { MouseGlowCard } from '@/components/ui/MouseGlowCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function DentistsSection() {
  return (
    <section id="dentists" className="section-shell">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Dentists"
            title="Meet the doctors behind every confident smile"
            description="A multidisciplinary team of experienced dentists bringing together cosmetic precision, restorative planning, orthodontic expertise, and gentle family care."
            align="center"
          />
        </Reveal>

        <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.name} delay={0.05 * index}>
              <MouseGlowCard className="glass-panel overflow-hidden rounded-[24px] border border-white/60 shadow-panel sm:rounded-[32px]">
                <div className="relative aspect-[4/4.6] overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-primary-200 sm:left-4 sm:top-4 sm:text-[11px] sm:tracking-[0.28em]">
                    {doctor.experience}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold leading-tight text-ink sm:text-2xl">{doctor.name}</h3>
                      <p className="mt-2 text-xs font-medium uppercase leading-5 tracking-[0.16em] text-primary-500 sm:text-sm sm:tracking-[0.24em]">
                        {doctor.role}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-primary-600 to-secondary text-white shadow-glow sm:h-12 sm:w-12 sm:rounded-[18px]">
                      {index % 2 === 0 ? <Award className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[rgb(var(--muted-ink))] sm:leading-7">{doctor.bio}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {doctor.badge ? (
                      <span className="rounded-full bg-secondary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-100 sm:text-xs sm:tracking-[0.18em]">
                        {doctor.badge}
                      </span>
                    ) : null}
                    {doctor.qualification ? (
                      <span className="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-600 dark:bg-primary-950/40 dark:text-primary-200 sm:text-xs sm:tracking-[0.18em]">
                        {doctor.qualification}
                      </span>
                    ) : null}
                    {doctor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-600 dark:bg-primary-950/40 dark:text-primary-200 sm:text-xs sm:tracking-[0.18em]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </MouseGlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
