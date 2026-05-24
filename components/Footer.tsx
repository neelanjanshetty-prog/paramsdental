import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { sitelinkItems, siteConfig } from '@/data/site';

const socialLinks = [
  { href: 'https://www.instagram.com/paramsdentalblr/', icon: Instagram, label: 'Instagram' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(76,185,231,0.16),transparent_28%)]" />
      <div className="section-container relative py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-secondary">Param&apos;s Dental</p>
            <h3 className="mt-4 text-3xl font-semibold">Luxury dentistry with a calm clinical edge.</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">{siteConfig.description}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-secondary hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/55">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/72">
              {sitelinkItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/55">Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/72">
              <li>
                <Link href="/invisalign" className="transition hover:text-white">
                  Invisalign
                </Link>
              </li>
              <li>
                <Link href="/orthodontics" className="transition hover:text-white">
                  Orthodontics
                </Link>
              </li>
              <li>
                <Link href="/dental-implants" className="transition hover:text-white">
                  Dental Implants
                </Link>
              </li>
              <li>
                <Link href="/root-canal-treatment" className="transition hover:text-white">
                  Root Canal Treatment
                </Link>
              </li>
              <li>
                <Link href="/teeth-whitening" className="transition hover:text-white">
                  Teeth Whitening
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/55">Contact</h4>
            <div className="mt-5 space-y-3 text-sm leading-7 text-white/72">
              <p className="whitespace-pre-line">{siteConfig.address}</p>
              <a href={siteConfig.phoneHref} className="block transition hover:text-white">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="block transition hover:text-white">
                {siteConfig.email}
              </a>
              {siteConfig.hours.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p>&copy; {year} Param&apos;s Dental. All rights reserved.</p>
            <a
              href="https://ennesstudio.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Built by ENNESS Studio"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 transition hover:-translate-y-0.5 hover:border-secondary/60 hover:bg-white/[0.08] hover:text-white"
            >
              <span className="whitespace-nowrap">Built by</span>
              <span className="relative block h-7 w-20 overflow-hidden">
                <Image
                  src="/images/enness-studio-logo-white.webp"
                  alt="ENNESS Studio"
                  fill
                  className="object-contain opacity-80 transition group-hover:opacity-100"
                  sizes="80px"
                />
              </span>
            </a>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/blogs" className="transition hover:text-white">
              Blogs
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <a href="/sitemap.xml" className="transition hover:text-white">
              Sitemap
            </a>
            <Link href="/book-appointment" className="transition hover:text-white">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
