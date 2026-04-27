'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Clock3, Mail, PhoneCall } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { appointmentSlots, services, siteConfig } from '@/data/site';
import { buildUpcomingDates } from '@/utils/date';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

type AppointmentFormData = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type ApiErrorResponse = {
  error?: string;
};

const defaultValues: AppointmentFormData = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

function getClinicDateTime(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    isoDate: `${values.year}-${values.month}-${values.day}`,
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
}

function getSlotMinutes(slot: string) {
  const match = slot.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/);

  if (!match) {
    return 0;
  }

  const [, hourText, minuteText, period] = match;
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const normalizedHour = period === 'PM' && hour !== 12 ? hour + 12 : period === 'AM' && hour === 12 ? 0 : hour;

  return normalizedHour * 60 + minute;
}

export function AppointmentSection() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [now, setNow] = useState(() => new Date());
  const availableDates = useMemo(() => buildUpcomingDates(7), []);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({ defaultValues, mode: 'onChange' });

  const selectedDate = watch('preferredDate');
  const selectedTime = watch('preferredTime');
  const clinicNow = getClinicDateTime(now);
  const todayIso = clinicNow.isoDate;
  const availableTimeSlots = useMemo(() => {
    const dateToCheck = selectedDate || todayIso;

    if (dateToCheck !== todayIso) {
      return appointmentSlots;
    }

    return appointmentSlots.filter((slot) => getSlotMinutes(slot) > clinicNow.minutes);
  }, [clinicNow.minutes, selectedDate, todayIso]);

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setValue('service', customEvent.detail, { shouldValidate: true, shouldDirty: true });
    };

    window.addEventListener('prefill-service', handlePrefill);

    return () => window.removeEventListener('prefill-service', handlePrefill);
  }, [setValue]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedTime && !availableTimeSlots.includes(selectedTime)) {
      setValue('preferredTime', '', { shouldDirty: true, shouldValidate: true });
    }
  }, [availableTimeSlots, selectedTime, setValue]);

  const onSubmit = async (data: AppointmentFormData) => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      throw new Error(result?.error ?? 'Unable to book appointment');
    }

    setSubmitError('');
    setShowSuccess(true);
    reset(defaultValues);
    window.setTimeout(() => setShowSuccess(false), 3200);
  };

  return (
    <section id="appointment" className="section-shell">
      <div className="section-container">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Booking"
                title="Book a premium appointment experience"
                description="Choose your treatment, preferred date, and available time slot. We will confirm every detail and share pre-visit guidance."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass-panel rounded-[24px] p-5 shadow-panel sm:rounded-[30px] sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-600 to-secondary text-white sm:h-14 sm:w-14 sm:rounded-[20px]">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-500 sm:text-xs sm:tracking-[0.35em]">What to expect</p>
                    <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-ink))] sm:leading-7">
                      Consultation-led visits, transparent treatment planning, and a luxury clinical setting designed to feel calm from the first minute.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 md:gap-4">
                  <div className="flex min-w-0 items-center gap-2 rounded-[18px] border border-primary-100 bg-white/80 p-3 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px] sm:p-4 md:block">
                    <PhoneCall className="h-4 w-4 shrink-0 text-primary-600" />
                    <div className="min-w-0 md:mt-3">
                      <p className="truncate text-xs font-semibold text-ink sm:text-sm">{siteConfig.phone}</p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[rgb(var(--muted-ink))] sm:text-xs sm:tracking-[0.24em]">Call</p>
                    </div>
                  </div>
                  <div className="flex min-w-0 items-center gap-2 rounded-[18px] border border-primary-100 bg-white/80 p-3 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px] sm:p-4 md:block">
                    <Mail className="h-4 w-4 shrink-0 text-primary-600" />
                    <div className="min-w-0 md:mt-3">
                      <p className="truncate text-xs font-semibold text-ink sm:text-sm">{siteConfig.email}</p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[rgb(var(--muted-ink))] sm:text-xs sm:tracking-[0.24em]">Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right">
            <div className="glass-panel gradient-border rounded-[24px] p-4 shadow-halo sm:rounded-[34px] sm:p-6 md:p-8">
              <form
                className="space-y-5 sm:space-y-6"
                onSubmit={handleSubmit(async (formData) => {
                  try {
                    await onSubmit(formData);
                  } catch (error) {
                    console.error(error);
                    setSubmitError(error instanceof Error ? error.message : 'Something went wrong while booking. Please try again or contact the clinic directly.');
                  }
                })}
              >
                <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Full Name</span>
                    <input
                      {...register('fullName', { required: 'Please enter your name' })}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm shadow-sm transition focus:border-primary-400 focus:bg-white dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    />
                    {errors.fullName ? <span className="text-xs text-rose-500">{errors.fullName.message}</span> : null}
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Phone Number</span>
                    <input
                      {...register('phone', {
                        required: 'Please enter your phone number',
                        minLength: { value: 10, message: 'Please enter a valid phone number' },
                      })}
                      placeholder="081233 38324"
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm shadow-sm transition focus:border-primary-400 focus:bg-white dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
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
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm shadow-sm transition focus:border-primary-400 focus:bg-white dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    />
                    {errors.email ? <span className="text-xs text-rose-500">{errors.email.message}</span> : null}
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-ink">Select Service</span>
                    <select
                      {...register('service', { required: 'Please choose a treatment' })}
                      className="w-full rounded-xl border border-primary-100 bg-white/70 px-4 py-3 text-sm shadow-sm transition focus:border-primary-400 focus:bg-white dark:border-primary-900 dark:bg-white/5 sm:rounded-2xl"
                    >
                      <option value="">Choose a service</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.service ? <span className="text-xs text-rose-500">{errors.service.message}</span> : null}
                  </label>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-semibold text-ink">Preferred Date</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:grid-cols-4 sm:gap-3 xl:grid-cols-7">
                    {availableDates.map((date) => (
                      <button
                        key={date.iso}
                        type="button"
                        onClick={() => setValue('preferredDate', date.iso, { shouldValidate: true, shouldDirty: true })}
                        className={`rounded-[16px] border px-3 py-3 text-left transition sm:rounded-[22px] sm:px-4 sm:py-4 ${
                          selectedDate === date.iso
                            ? 'border-primary-600 bg-primary-600 text-white shadow-glow'
                            : 'border-primary-100 bg-white/70 text-ink hover:border-primary-300 dark:border-primary-900 dark:bg-white/5'
                        }`}
                      >
                        <p className="text-[10px] uppercase tracking-[0.18em] opacity-70 sm:text-xs sm:tracking-[0.28em]">{date.day}</p>
                        <p className="mt-1 text-lg font-semibold sm:mt-2 sm:text-xl">{date.date}</p>
                        <p className="text-[10px] uppercase tracking-[0.18em] opacity-70 sm:text-xs sm:tracking-[0.3em]">{date.month}</p>
                      </button>
                    ))}
                  </div>
                  {errors.preferredDate ? (
                    <span className="mt-2 block text-xs text-rose-500">{errors.preferredDate.message}</span>
                  ) : null}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-semibold text-ink">Preferred Time</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 md:grid-cols-4">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setValue('preferredTime', slot, { shouldValidate: true, shouldDirty: true })}
                        className={`rounded-xl border px-3 py-3 text-sm font-medium transition sm:rounded-2xl sm:px-4 ${
                          selectedTime === slot
                            ? 'border-primary-600 bg-primary-600 text-white shadow-glow'
                            : 'border-primary-100 bg-white/70 text-ink hover:border-primary-300 dark:border-primary-900 dark:bg-white/5'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {availableTimeSlots.length === 0 ? (
                    <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-ink))]">
                      No more slots are available for today. Please choose another date.
                    </p>
                  ) : null}
                  {errors.preferredTime ? (
                    <span className="mt-2 block text-xs text-rose-500">{errors.preferredTime.message}</span>
                  ) : null}
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-ink">Message</span>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Share your concerns, goals, or preferred callback time."
                    className="w-full rounded-[18px] border border-primary-100 bg-white/70 px-4 py-3 text-sm shadow-sm transition focus:border-primary-400 focus:bg-white dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px]"
                  />
                </label>

                <input type="hidden" {...register('preferredDate', { required: 'Please choose a preferred date' })} />
                <input type="hidden" {...register('preferredTime', { required: 'Please choose a preferred time' })} />

                <button type="submit" disabled={isSubmitting} className="button-primary w-full justify-center py-3.5 disabled:opacity-70 sm:py-4">
                  {isSubmitting ? 'Booking your appointment...' : 'Confirm Appointment'}
                </button>

                {submitError ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:rounded-2xl">
                    {submitError}
                  </div>
                ) : null}
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            className="fixed inset-0 z-[118] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-panel max-w-md rounded-[24px] p-6 text-center shadow-halo sm:rounded-[32px] sm:p-8"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink sm:text-2xl">Your appointment has been booked successfully!</h3>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                Our team will contact you shortly to confirm your time slot and visit details.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
