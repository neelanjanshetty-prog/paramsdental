'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FAQSection() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Clear answers before you book"
            description="The most common questions patients ask about comfort, timing, and treatment planning."
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeQuestion === index;

            return (
              <Reveal key={faq.question} delay={0.05 * index}>
                <div className="glass-panel overflow-hidden rounded-[28px] shadow-panel">
                  <button
                    type="button"
                    onClick={() => setActiveQuestion(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-lg font-semibold text-ink">{faq.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.24 }}>
                      <ChevronDown className="h-5 w-5 text-primary-600" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-primary-100/60 px-6 py-5 text-sm leading-7 text-[rgb(var(--muted-ink))] dark:border-primary-900/60">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
