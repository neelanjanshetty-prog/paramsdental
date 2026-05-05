'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const partnerLogos = [
  {
    name: 'iTero',
    src: '/images/partners/itero.png',
    width: 2392,
    height: 954,
  },
  {
    name: 'IndiLase Laser',
    src: '/images/partners/indilase-laser.png',
    width: 1254,
    height: 1254,
  },
  {
    name: 'Aligntech Faculty',
    src: '/images/partners/aligntech-faculty.webp',
    width: 300,
    height: 300,
  },
  {
    name: 'Acteon',
    src: '/images/partners/acteon.jpg',
    width: 2560,
    height: 517,
  },
  {
    name: 'Diamond+ Invisalign Provider',
    src: '/images/partners/invisalign-diamond-plus.webp',
    width: 1000,
    height: 431,
  },
  {
    name: 'Invisalign First',
    src: '/images/partners/invisalign-first.png',
    width: 637,
    height: 851,
  },
  {
    name: 'Invisalign Gold+ Provider',
    src: '/images/partners/invisalign-gold-provider.png',
    width: 758,
    height: 200,
  },
  {
    name: 'Invisalign Teen Provider',
    src: '/images/partners/invisalign-teen-provider.png',
    width: 938,
    height: 481,
  },
];

const carouselLogos = [...partnerLogos, ...partnerLogos];

export function PartnersSlider() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14" aria-labelledby="partners-heading">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="Technology & Partners"
            title={
              <>
                Equipment We Use & <br className="hidden md:block" />
                Official Partners
              </>
            }
            description="A glimpse at the trusted dental technology, aligner systems, and partner certifications supporting care at Param's Dental."
            align="center"
          />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="partners-marquee mt-8 md:mt-10" aria-label="Param's Dental equipment and partner logos">
          <div className="partners-track">
            {carouselLogos.map((logo, index) => (
              <div className="partner-logo-frame" key={`${logo.name}-${index}`} aria-hidden={index >= partnerLogos.length}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-full w-full object-contain"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <style jsx>{`
        .partners-marquee {
          margin-inline: auto;
          max-width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
        }

        .partners-track {
          display: flex;
          width: max-content;
          gap: 1rem;
          padding-block: 0.25rem;
          animation: partners-scroll 34s linear infinite;
        }

        .partners-marquee:hover .partners-track {
          animation-play-state: paused;
        }

        .partner-logo-frame {
          display: flex;
          height: 8.5rem;
          width: 14rem;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(181, 225, 240, 0.8);
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.82);
          padding: 1.1rem;
          box-shadow: 0 18px 42px rgba(13, 76, 146, 0.08);
          backdrop-filter: blur(14px);
        }

        @keyframes partners-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(calc(-50% - 0.5rem), 0, 0);
          }
        }

        @media (min-width: 768px) {
          .partners-track {
            gap: 1.25rem;
          }

          .partner-logo-frame {
            height: 9.5rem;
            width: 17rem;
            border-radius: 1.25rem;
            padding: 1.25rem;
          }

          @keyframes partners-scroll {
            to {
              transform: translate3d(calc(-50% - 0.625rem), 0, 0);
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
