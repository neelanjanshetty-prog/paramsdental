'use client';

import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { testimonials, transformationCase } from '@/data/site';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TestimonialSection() {
  return (
    <section id="testimonials" className="section-shell">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Testimonials"
                title="Real patient confidence, before and after"
                description="A blend of transformation storytelling and measurable cosmetic outcomes."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <motion.div
                className="glass-panel relative mt-8 overflow-hidden rounded-[32px] p-6 shadow-panel"
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,185,231,0.18),transparent_30%)]" />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Patient Story</p>
                  <h3 className="mt-4 text-2xl font-semibold text-ink">A makeover built around natural elegance</h3>
                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                    &ldquo;I wanted a brighter smile, but I did not want it to look artificial. The team listened carefully and created something refined and believable.&rdquo;
                  </p>
                  <button type="button" className="button-secondary mt-6 gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Watch Testimonial
                  </button>
                </div>
              </motion.div>
            </Reveal>

            <div className="mt-6 space-y-4">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={0.12 + 0.06 * index}>
                  <div className="glass-panel rounded-[28px] p-5 shadow-panel">
                    <p className="text-sm leading-7 text-[rgb(var(--muted-ink))]">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="mt-4">
                      <p className="font-semibold text-ink">{testimonial.name}</p>
                      <p className="text-xs uppercase tracking-[0.28em] text-primary-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="right">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Before / After</p>
                  <h3 className="mt-3 text-3xl font-semibold text-ink">{transformationCase.label}</h3>
                </div>
                <p className="max-w-sm text-sm leading-7 text-[rgb(var(--muted-ink))]">{transformationCase.description}</p>
              </div>
              <BeforeAfterSlider
                beforeImage={transformationCase.beforeImage}
                afterImage={transformationCase.afterImage}
                label={transformationCase.label}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
