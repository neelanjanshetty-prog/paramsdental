'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function CTASection() {
  return (
    <section className="section-shell pt-10">
      <div className="section-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-slate-950 px-6 py-12 text-white shadow-halo md:px-10 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(76,185,231,0.4),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(13,76,146,0.55),transparent_32%)]" />
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-white/10 bg-white/5 blur-2xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.45em] text-white/55">Ready when you are</p>
                <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
                  Ready to Transform Your Smile?
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="button-primary relative overflow-visible px-7 py-4 text-base"
                whileHover={{ scale: 1.03 }}
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-white/40" />
                <span className="relative inline-flex items-center gap-2">
                  Book Your Appointment Today
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
