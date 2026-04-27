'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { services, type Service, type ServiceCategory } from '@/data/site';
import { MouseGlowCard } from '@/components/ui/MouseGlowCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { ServiceModal } from '@/components/ui/ServiceModal';

const categories: ServiceCategory[] = [
  'All',
  'Preventive',
  'Cosmetic',
  'Restorative',
  'Orthodontic',
  'Surgical',
  'Emergency',
];

function sendBookingPrefill(service: Service) {
  window.dispatchEvent(new CustomEvent('prefill-service', { detail: service.title }));
  document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') {
      return services;
    }

    return services.filter((service) => service.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="services" className="section-shell">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Precision treatments for every stage of your smile"
            description="Where Luxury Meets Painless Dentistry & Invisalign Excellence"
            align="center"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:py-3 sm:text-sm ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-glow'
                    : 'glass-panel text-[rgb(var(--muted-ink))] hover:text-primary-700 dark:hover:text-primary-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {filteredServices.map((service, index) => (
            <Reveal key={service.slug} delay={0.04 * index}>
              <MouseGlowCard className="glass-panel rounded-[24px] border border-white/60 p-5 shadow-panel sm:rounded-[30px] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-600 to-secondary text-white shadow-glow sm:h-14 sm:w-14 sm:rounded-[20px]">
                    <IconRenderer name={service.icon} className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-600 dark:bg-primary-950/40 dark:text-primary-200 sm:text-xs sm:tracking-[0.22em]">
                    {service.category}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-ink sm:mt-6 sm:text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-ink))] sm:mt-4 sm:leading-7">{service.shortDescription}</p>

                <div className="mt-5 flex items-end justify-between gap-4 sm:mt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">Treatment time</p>
                    <p className="mt-2 text-sm font-semibold text-ink">{service.duration}</p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </MouseGlowCard>
            </Reveal>
          ))}
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(service) => {
          setSelectedService(null);
          sendBookingPrefill(service);
        }}
      />
    </section>
  );
}
