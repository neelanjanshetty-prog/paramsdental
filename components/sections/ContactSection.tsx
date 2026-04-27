'use client';

import { motion } from 'framer-motion';
import { MapPinned, MessagesSquare, Navigation, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { siteConfig } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

type InquiryFormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type ApiErrorResponse = {
  error?: string;
};

export function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({ mode: 'onChange' });

  const mapEmbed =
    process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED ??
    'https://www.google.com/maps?q=1175%2C%201st%20A%20Main%20Rd%2C%20Hoshalli%20Extension%2C%20Vijayanagar%2C%20Bengaluru%20560040&z=16&output=embed';

  const submitInquiry = async (formData: InquiryFormData) => {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      throw new Error(result?.error ?? 'Unable to submit inquiry');
    }

    setSubmitError('');
    setSuccess(true);
    reset();
    window.setTimeout(() => setSuccess(false), 2600);
  };

  return (
    <section id="contact" className="section-shell">
      <div className="section-container">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Contact"
                title="Talk to the clinic concierge"
                description="Reach out for consultations, treatment estimates, or direction assistance. We keep communication easy, warm, and responsive."
              />
            </Reveal>

            <div className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-3 md:gap-4 lg:grid-cols-1">
              {[
                {
                  icon: PhoneCall,
                  title: 'Call Now',
                  value: siteConfig.phone,
                  href: siteConfig.phoneHref,
                },
                {
                  icon: MessagesSquare,
                  title: 'WhatsApp',
                  value: 'Chat with our team',
                  href: siteConfig.whatsappUrl,
                },
                {
                  icon: Navigation,
                  title: 'Get Directions',
                  value: siteConfig.address,
                  href: siteConfig.directionsUrl,
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={0.08 * index}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="glass-panel flex items-start gap-3 rounded-[22px] p-4 shadow-panel transition hover:-translate-y-1 sm:gap-4 sm:rounded-[28px] sm:p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-primary-600 to-secondary text-white sm:h-12 sm:w-12 sm:rounded-[18px]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[rgb(var(--muted-ink))] sm:leading-7">{item.value}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="glass-panel mt-5 overflow-hidden rounded-[24px] shadow-panel sm:mt-6 sm:rounded-[32px]">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="340"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Param's Dental location map"
                  className="h-[260px] w-full border-0 sm:h-[340px]"
                />
              </div>
            </Reveal>
          </div>

          <Reveal direction="right">
            <div className="glass-panel gradient-border rounded-[24px] p-4 shadow-panel sm:rounded-[34px] sm:p-6 md:p-8">
              <form
                className="space-y-4 sm:space-y-5"
                onSubmit={handleSubmit(async (formData) => {
                  try {
                    await submitInquiry(formData);
                  } catch (error) {
                    console.error(error);
                    setSubmitError(error instanceof Error ? error.message : 'We could not send your inquiry right now. Please try again in a moment.');
                  }
                })}
              >
                <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Name</span>
                    <input
                      {...register('name', { required: 'Please enter your name' })}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    />
                    {errors.name ? <span className="text-xs text-rose-500">{errors.name.message}</span> : null}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Phone</span>
                    <input
                      {...register('phone', { required: 'Please enter your phone number' })}
                      placeholder="081233 38324"
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    />
                    {errors.phone ? <span className="text-xs text-rose-500">{errors.phone.message}</span> : null}
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Email</span>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Please enter your email',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    />
                    {errors.email ? <span className="text-xs text-rose-500">{errors.email.message}</span> : null}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Subject</span>
                    <input
                      {...register('subject', { required: 'Please enter a subject' })}
                      placeholder="What can we help with?"
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    />
                    {errors.subject ? <span className="text-xs text-rose-500">{errors.subject.message}</span> : null}
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-ink">Message</span>
                  <textarea
                    {...register('message', { required: 'Please enter your message' })}
                    rows={6}
                    placeholder="Tell us about your concern, preferred contact mode, or appointment needs."
                    className="w-full rounded-[18px] border border-primary-100 bg-white/70 px-4 py-3 text-sm dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px]"
                  />
                  {errors.message ? <span className="text-xs text-rose-500">{errors.message.message}</span> : null}
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[20px] border border-primary-100 bg-white/70 p-4 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px] sm:p-5">
                    <MapPinned className="h-5 w-5 text-primary-600" />
                    <p className="mt-3 text-sm font-semibold text-ink">Clinic Address</p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[rgb(var(--muted-ink))] sm:leading-7">{siteConfig.address}</p>
                  </div>
                  <div className="rounded-[20px] border border-primary-100 bg-white/70 p-4 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px] sm:p-5">
                    <p className="text-sm font-semibold text-ink">Working Hours</p>
                    <div className="mt-2 space-y-1 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                      {siteConfig.hours.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="button-primary w-full justify-center py-4">
                  {isSubmitting ? 'Sending your inquiry...' : 'Send Inquiry'}
                </button>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                  >
                    Your inquiry has been sent. We&apos;ll get back to you shortly.
                  </motion.div>
                ) : null}

                {submitError ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
                  >
                    {submitError}
                  </motion.div>
                ) : null}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
