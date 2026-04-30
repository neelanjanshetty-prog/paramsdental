import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { siteConfig } from '@/data/site';

const lastUpdated = 'April 30, 2026';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Privacy Policy for Param's Dental, including how appointment, inquiry, and WhatsApp communication data is collected, used, and protected.",
  alternates: {
    canonical: '/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: 'Information We Collect',
    paragraphs: [
      "When you contact Param's Dental, book an appointment, submit an inquiry, or communicate with us through WhatsApp, phone, email, or website forms, we may collect your name, phone number, email address, preferred appointment date and time, treatment interest, message details, and communication history.",
      'We may also receive basic technical information such as browser type, device information, IP address, pages visited, and form submission timestamps to keep the website secure and improve service quality.',
    ],
  },
  {
    title: 'How We Use Information',
    paragraphs: [
      'We use your information to respond to inquiries, confirm or manage appointments, provide dental care information, send service-related updates, answer questions, improve our website, maintain clinic records, and comply with applicable legal or regulatory requirements.',
      'If you contact us on WhatsApp, we may use WhatsApp to send appointment confirmations, reminders, follow-up messages, clinic updates related to your inquiry, and customer support responses.',
    ],
  },
  {
    title: 'WhatsApp Communications',
    paragraphs: [
      'By sending us a WhatsApp message or opting in to receive WhatsApp updates, you agree that we may communicate with you through WhatsApp for clinic-related purposes. Message frequency depends on your requests and appointment activity.',
      'You can opt out of WhatsApp messages at any time by replying STOP or by contacting us using the details below. After an opt-out request, we may still contact you where necessary for transactional, safety, or legal reasons.',
    ],
  },
  {
    title: 'Sharing of Information',
    paragraphs: [
      'We do not sell your personal information. We may share information only with clinic staff, dental professionals involved in your care, trusted service providers that help operate our website or communications, payment or booking support providers where applicable, and government or legal authorities when required by law.',
      'Service providers are expected to use information only for the services they perform for us and to protect it appropriately.',
    ],
  },
  {
    title: 'Data Retention and Security',
    paragraphs: [
      'We keep personal information only as long as reasonably necessary for appointments, patient support, clinic administration, legal compliance, dispute resolution, and recordkeeping. Retention periods may vary depending on the type of information and applicable healthcare requirements.',
      'We use reasonable administrative, technical, and organizational safeguards to protect personal information. However, no internet or messaging platform can be guaranteed to be completely secure.',
    ],
  },
  {
    title: 'Your Choices and Rights',
    paragraphs: [
      'You may ask us to access, correct, update, or delete your personal information where applicable. You may also withdraw consent for promotional or WhatsApp communications by contacting us or replying STOP on WhatsApp.',
      'Some information may need to be retained where required for clinic records, legal obligations, billing, safety, or legitimate business purposes.',
    ],
  },
  {
    title: 'Children',
    paragraphs: [
      'Our services may be used for children only with involvement from a parent or guardian. We do not knowingly collect personal information from children directly without appropriate guardian involvement.',
    ],
  },
  {
    title: 'Updates to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised last updated date.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-36 md:pt-40">
        <div className="section-container">
          <div className="max-w-4xl">
            <span className="section-kicker">Legal</span>
            <h1 className="mt-6 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-base leading-8 text-[rgb(var(--muted-ink))] sm:text-lg">
              This policy explains how {siteConfig.name} collects, uses, stores, and protects
              information shared through our website, appointments, inquiries, and WhatsApp
              communications.
            </p>
            <p className="mt-4 text-sm font-medium text-primary-700 dark:text-primary-200">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="glass-panel rounded-[2rem] p-6 sm:p-8"
                >
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-[rgb(var(--muted-ink))] sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[2rem] border border-primary-100 bg-white/70 p-6 shadow-panel dark:border-primary-900/70 dark:bg-white/5">
              <h2 className="font-display text-2xl font-semibold text-ink">Contact Us</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                <p>
                  For privacy requests, WhatsApp opt-out support, or questions about this policy,
                  contact Param&apos;s Dental.
                </p>
                <p className="whitespace-pre-line">{siteConfig.address}</p>
                <a
                  href={siteConfig.phoneHref}
                  className="block font-semibold text-primary-700 transition hover:text-primary-900 dark:text-primary-200"
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block font-semibold text-primary-700 transition hover:text-primary-900 dark:text-primary-200"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary mt-2 w-full"
                >
                  Contact on WhatsApp
                </a>
                <Link href="/" className="button-secondary w-full">
                  Back to Home
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </PageTransition>
  );
}
