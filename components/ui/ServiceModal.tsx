'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { Service } from '@/data/site';
import { IconRenderer } from '@/components/ui/IconRenderer';

type ServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onBook: (service: Service) => void;
};

export function ServiceModal({ service, onClose, onBook }: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service ? (
        <motion.div
          className="fixed inset-0 z-[115] flex items-center justify-center bg-slate-950/60 px-3 py-5 backdrop-blur-md sm:px-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel gradient-border relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[24px] p-5 sm:rounded-[32px] sm:p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-primary-700 transition hover:rotate-90 dark:border-white/10 dark:bg-white/5 dark:text-primary-100 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              aria-label="Close service details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-600 to-secondary text-white shadow-glow sm:h-16 sm:w-16 sm:rounded-[24px]">
                <IconRenderer name={service.icon} className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">{service.category}</p>
                <h3 className="mt-2 pr-9 text-2xl font-semibold text-ink sm:pr-0 sm:text-3xl">{service.title}</h3>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[rgb(var(--muted-ink))] sm:mt-6 sm:text-base sm:leading-8">{service.description}</p>

            <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-6">
              <div className="rounded-[22px] border border-primary-100 bg-white/75 p-5 dark:border-primary-900 dark:bg-white/5 sm:rounded-[28px] sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Benefits</p>
                <ul className="mt-5 space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-secondary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[22px] bg-gradient-to-br from-primary-600 to-primary-800 p-[1px] shadow-halo sm:rounded-[28px]">
                <div className="h-full rounded-[21px] bg-slate-950/92 p-5 text-white sm:rounded-[27px] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/55 sm:text-xs sm:tracking-[0.35em]">Treatment Snapshot</p>
                  <p className="mt-5 text-sm text-white/72">{service.highlight}</p>
                  <div className="mt-6 rounded-[20px] border border-white/10 bg-white/5 p-4 sm:mt-8 sm:rounded-[24px] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.35em]">Estimated time</p>
                    <p className="mt-3 text-xl font-semibold sm:text-2xl">{service.duration}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onBook(service)}
                    className="button-primary mt-8 w-full justify-between bg-white text-primary-700 hover:bg-primary-50"
                  >
                    Book This Treatment
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
