import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarCheck2, CheckCircle2, MapPinned, PhoneCall } from 'lucide-react';
import { AppointmentSection } from '@/components/sections/AppointmentSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { DentistsSection } from '@/components/sections/DentistsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { findSeoPage, getSeoPageMetadata } from '@/app/seo-pages';
import { siteConfig } from '@/data/site';
import { getBreadcrumbSchema, getFAQSchema } from '@/utils/schema';

function SupportSection({ slug }: { slug: string }) {
  if (slug === 'services') {
    return (
      <>
        <ServicesSection />
        <FAQSection />
      </>
    );
  }

  if (slug === 'doctors') {
    return <DentistsSection />;
  }

  if (slug === 'reviews') {
    return <ReviewsSection />;
  }

  if (slug === 'contact') {
    return <ContactSection />;
  }

  if (slug === 'book-appointment') {
    return <AppointmentSection />;
  }

  return <FAQSection />;
}

export function getRouteMetadata(slug: string) {
  const page = findSeoPage(slug);

  if (!page) {
    return {};
  }

  return getSeoPageMetadata(page);
}

export function SeoLandingPage({ slug }: { slug: string }) {
  const page = findSeoPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: page.h1, path: page.path },
  ]);
  const hasFaqSection = !['doctors', 'reviews', 'contact', 'book-appointment'].includes(page.slug);
  const faqSchema = hasFaqSection ? getFAQSchema() : null;
  const bookingService = page.bookingService ?? page.h1;
  const bookingHref = `/book-appointment?service=${encodeURIComponent(bookingService)}#appointment`;

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <section className="section-shell flex min-h-[auto] items-center pt-28 sm:min-h-[72vh] md:pt-32">
        <div className="absolute inset-0 bg-aurora" />
        <div className="mesh-overlay absolute inset-0 opacity-35" />
        <div className="section-container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div>
              <span className="section-kicker">{page.eyebrow}</span>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl md:mt-6 md:text-7xl md:leading-[0.95]">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[rgb(var(--muted-ink))] md:mt-6 md:text-xl md:leading-8">
                {page.intro}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href={bookingHref} className="button-primary w-full gap-2 sm:w-auto">
                  {page.primaryCta ?? 'Book Appointment'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={siteConfig.phoneHref} className="button-secondary w-full gap-2 sm:w-auto">
                  <PhoneCall className="h-4 w-4" />
                  Call Clinic
                </a>
              </div>
            </div>

            <div className="glass-panel gradient-border rounded-[24px] p-5 shadow-halo sm:rounded-[34px] sm:p-7">
              <div className="grid gap-3">
                {page.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-[18px] border border-primary-100 bg-white/75 p-4 dark:border-primary-900 dark:bg-white/5 sm:rounded-[24px]"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-600" />
                    <p className="text-sm font-semibold text-ink">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[20px] border border-primary-100 bg-white/75 p-5 dark:border-primary-900 dark:bg-white/5 sm:rounded-[26px]">
                <MapPinned className="h-5 w-5 text-primary-600" />
                <p className="mt-3 text-sm font-semibold text-ink">Vijayanagar, Bengaluru</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[rgb(var(--muted-ink))]">
                  {siteConfig.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-container">
          <div className="grid gap-5 md:grid-cols-2">
            {page.sections.map((section) => (
              <div
                key={section.title}
                className="glass-panel rounded-[24px] border border-white/60 p-5 shadow-panel sm:rounded-[30px] sm:p-6"
              >
                <CalendarCheck2 className="h-6 w-6 text-primary-600" />
                <h2 className="mt-4 text-2xl font-semibold text-ink">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="button-secondary">
              Services
            </Link>
            <Link href="/doctors" className="button-secondary">
              Doctors
            </Link>
            <Link href="/invisalign" className="button-secondary">
              Invisalign
            </Link>
            <Link href="/dental-implants" className="button-secondary">
              Dental Implants
            </Link>
            <Link href="/root-canal-treatment" className="button-secondary">
              Root Canal Treatment
            </Link>
          </div>
        </div>
      </section>

      <SupportSection slug={page.slug} />
      <Footer />
    </PageTransition>
  );
}
