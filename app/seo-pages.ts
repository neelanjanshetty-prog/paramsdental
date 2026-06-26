import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export type SeoPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: string[];
  bookingService?: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  primaryCta?: string;
};

export const seoPages: SeoPage[] = [
  {
    slug: 'about',
    path: '/about',
    title: "About Param's Dental Clinic | Vijayanagar Dental Clinic",
    description:
      "Learn about Param's Dental Clinic, a Vijayanagar dental clinic in Bengaluru offering advanced dental care, family dentistry, Invisalign, implants, root canal treatment, and cosmetic dentistry.",
    eyebrow: 'About the clinic',
    h1: "About Param's Dental Clinic in Vijayanagar",
    intro:
      "Param's Dental Clinic brings advanced dental care, calm clinical planning, and family dentistry together in Vijayanagar, Bengaluru. Our team has treated 10K+ patients with a focus on clear communication, precise diagnosis, and premium comfort.",
    highlights: ['10K+ patients treated', 'Advanced dental technology', 'Family dental care'],
    bookingService: 'General Dental Consultation',
    sections: [
      {
        title: 'Premium care with local trust',
        body:
          'The clinic supports routine check-ups, preventive care, orthodontics, Invisalign, dental implants, root canal treatment, teeth whitening, and smile design in one coordinated Vijayanagar setting.',
      },
      {
        title: 'Comfort-led treatment planning',
        body:
          'Every appointment is planned around diagnosis, patient comfort, and long-term oral health, so families can make confident treatment decisions without rushed explanations.',
      },
    ],
  },
  {
    slug: 'services',
    path: '/services',
    title: "Dental Services in Vijayanagar | Param's Dental Clinic",
    description:
      "Explore dental services at Param's Dental Clinic in Vijayanagar, Bengaluru, including orthodontics, Invisalign, dental implants, root canal treatment, teeth whitening, and family dentistry.",
    eyebrow: 'Dental services',
    h1: 'Dental Services in Vijayanagar, Bengaluru',
    intro:
      'From preventive family dentistry to advanced dental care, our services are designed for comfort, precision, and natural-looking outcomes in Vijayanagar, Bengaluru.',
    highlights: ['Orthodontics and Invisalign', 'Dental implants', 'Root canal and whitening'],
    bookingService: 'General Dental Consultation',
    sections: [
      {
        title: 'Comprehensive dental care',
        body:
          'Patients can access cleaning, whitening, pediatric dentistry, crowns, extractions, emergency dental care, orthodontics, Invisalign, root canal treatment, and dental implants.',
      },
      {
        title: 'Modern diagnostics and planning',
        body:
          'Digital tools and clinician-led consultations help patients understand treatment options, timelines, expected outcomes, and maintenance before starting care.',
      },
    ],
  },
  {
    slug: 'doctors',
    path: '/doctors',
    title: "Dentists in Vijayanagar, Bengaluru | Param's Dental Clinic",
    description:
      "Meet the dentists at Param's Dental Clinic in Vijayanagar, Bengaluru, including orthodontists, Invisalign specialists, implant dentists, endodontists, and family dental clinicians.",
    eyebrow: 'Our doctors',
    h1: 'Dentists in Vijayanagar, Bengaluru',
    intro:
      'Our multidisciplinary dentists bring together orthodontics, Invisalign planning, implant dentistry, root canal care, cosmetic dentistry, and family dental care.',
    highlights: ['Orthodontic expertise', 'Implant and root canal specialists', 'Gentle family care'],
    bookingService: 'General Dental Consultation',
    sections: [
      {
        title: 'Specialist-led dental care',
        body:
          'The team includes clinicians focused on orthodontics, Invisalign, implants, root canal treatment, oral surgery, prosthodontics, and preventive dentistry.',
      },
      {
        title: 'A calm patient experience',
        body:
          'Appointments are built around careful diagnosis, practical treatment planning, and a premium chairside experience for adults, children, and seniors.',
      },
    ],
  },
  {
    slug: 'reviews',
    path: '/reviews',
    title: "Patient Reviews | Param's Dental Clinic Bengaluru",
    description:
      "Read patient reviews for Param's Dental Clinic in Vijayanagar, Bengaluru, trusted for advanced dental care, Invisalign, implants, root canal treatment, whitening, and family dentistry.",
    eyebrow: 'Patient reviews',
    h1: "Patient Reviews for Param's Dental Clinic Bengaluru",
    intro:
      'Patients choose our Vijayanagar clinic for attentive doctors, clean facilities, advanced dental care, and a smooth treatment experience from consultation to aftercare.',
    highlights: ['5.0 Google rating', '10K+ patients treated', 'Premium clinical experience'],
    bookingService: 'General Dental Consultation',
    sections: [
      {
        title: 'Trusted for clear communication',
        body:
          'Patients often mention detailed explanations, gentle treatment, and organized follow-up across Invisalign, root canal treatment, implants, whitening, and routine visits.',
      },
      {
        title: 'A reassuring setting',
        body:
          'The clinic is designed to feel calm and precise, helping nervous patients and families feel more comfortable before treatment begins.',
      },
    ],
  },
  {
    slug: 'contact',
    path: '/contact',
    title: "Contact Param's Dental Clinic | Vijayanagar, Bengaluru",
    description:
      "Contact Param's Dental Clinic in Vijayanagar, Bengaluru. Call +91 81233 38324 or visit 1175, 1st A Main Rd for dental appointments, Invisalign, implants, and family dental care.",
    eyebrow: 'Contact',
    h1: "Contact Param's Dental Clinic in Vijayanagar",
    intro:
      "Reach Param's Dental Clinic for appointment support, treatment enquiries, directions, and consultation planning in Vijayanagar, Bengaluru.",
    highlights: ['Call +91 81233 38324', 'Near Hosahalli Metro Station', 'Online booking available'],
    bookingService: 'General Dental Consultation',
    sections: [
      {
        title: 'Clinic address',
        body:
          'Visit us at 1175, 1st A Main Rd, Hoshalli Extension, Stage 1, Vijayanagar, Bengaluru, Karnataka 560040.',
      },
      {
        title: 'Treatment enquiries',
        body:
          'The team can help with questions about orthodontics, Invisalign, dental implants, root canal treatment, teeth whitening, and family dentistry.',
      },
    ],
  },
  {
    slug: 'book-appointment',
    path: '/book-appointment',
    title: "Book Dental Appointment in Vijayanagar | Param's Dental Clinic",
    description:
      "Book a dental appointment at Param's Dental Clinic in Vijayanagar, Bengaluru for advanced dental care, Invisalign, implants, root canal treatment, whitening, and family dentistry.",
    eyebrow: 'Book appointment',
    h1: 'Book a Dental Appointment in Vijayanagar',
    intro:
      'Schedule a consultation for advanced dental care, orthodontics, Invisalign, dental implants, root canal treatment, teeth whitening, or family dentistry.',
    highlights: ['Online booking form', 'Call support available', 'Treatment-led scheduling'],
    bookingService: 'General Dental Consultation',
    sections: [
      {
        title: 'Simple appointment planning',
        body:
          'Choose your preferred service, date, and time. The clinic team will confirm your visit and guide you on anything needed before the appointment.',
      },
      {
        title: 'Care for all ages',
        body:
          "Families can book preventive visits, children's dental care, cosmetic consultations, orthodontic reviews, and advanced restorative care.",
      },
    ],
    primaryCta: 'Start Booking',
  },
  {
    slug: 'orthodontics',
    path: '/orthodontics',
    title: "Orthodontist in Vijayanagar, Bengaluru | Param's Dental Clinic",
    description:
      "Consult an orthodontist in Vijayanagar, Bengaluru at Param's Dental Clinic for braces, aligners, Invisalign planning, bite correction, and smile alignment.",
    eyebrow: 'Orthodontics',
    h1: 'Orthodontist in Vijayanagar, Bengaluru',
    intro:
      "Orthodontic care at Param's Dental Clinic focuses on straighter teeth, balanced bites, and confident smiles through braces, aligners, and digital planning.",
    highlights: ['Braces and aligners', 'Bite correction', 'Orthodontist-led planning'],
    bookingService: 'Orthodontics',
    sections: [
      {
        title: 'Personalized alignment plans',
        body:
          'Every orthodontic plan begins with an evaluation of tooth position, bite, jaw relationship, lifestyle needs, and long-term oral health.',
      },
      {
        title: 'Options for teens and adults',
        body:
          'Treatment options include braces and clear aligners, with recommendations based on complexity, comfort, aesthetics, and predictability.',
      },
    ],
  },
  {
    slug: 'invisalign',
    path: '/invisalign',
    title: "Invisalign Treatment in Vijayanagar | Param's Dental Clinic",
    description:
      "Get Invisalign treatment in Vijayanagar at Param's Dental Clinic with orthodontist-led clear aligner planning, digital scans, and follow-up for discreet smile correction.",
    eyebrow: 'Invisalign',
    h1: 'Invisalign Treatment in Vijayanagar',
    intro:
      'Invisalign clear aligners offer a discreet, removable way to improve tooth alignment with digital planning and orthodontist-led care in Vijayanagar.',
    highlights: ['Clear aligners', 'Digital scan planning', 'Discreet orthodontic care'],
    bookingService: 'Invisalign',
    sections: [
      {
        title: 'Designed around your smile',
        body:
          'The Invisalign process maps tooth movement digitally, helping patients preview the plan and understand the discipline required for predictable results.',
      },
      {
        title: 'Comfortable and removable',
        body:
          'Aligners can be removed for meals and brushing, making them a practical option for many adults and teens seeking a subtler orthodontic experience.',
      },
    ],
  },
  {
    slug: 'dental-implants',
    path: '/dental-implants',
    title: "Dental Implants in Vijayanagar, Bengaluru | Param's Dental Clinic",
    description:
      "Explore dental implants in Vijayanagar, Bengaluru at Param's Dental Clinic for missing tooth replacement, implant crowns, bite support, and natural-looking restoration.",
    eyebrow: 'Dental implants',
    h1: 'Dental Implants in Vijayanagar, Bengaluru',
    intro:
      'Dental implants replace missing teeth with stable, natural-looking restorations planned for bite comfort, appearance, and long-term oral health.',
    highlights: ['Missing tooth replacement', 'Implant crowns', 'Long-term bite support'],
    bookingService: 'Dental Implants',
    sections: [
      {
        title: 'Stable tooth replacement',
        body:
          'Implants can help restore chewing strength, support jawbone health, and avoid removable gaps when a patient is clinically suitable.',
      },
      {
        title: 'Planned for function and aesthetics',
        body:
          'The clinic evaluates gum health, bone support, bite forces, and smile line before recommending an implant treatment pathway.',
      },
    ],
  },
  {
    slug: 'root-canal-treatment',
    path: '/root-canal-treatment',
    title: "Root Canal Treatment in Vijayanagar | Param's Dental Clinic",
    description:
      "Book root canal treatment in Vijayanagar at Param's Dental Clinic for tooth pain, infection control, endodontic care, and natural tooth preservation.",
    eyebrow: 'Root canal treatment',
    h1: 'Root Canal Treatment in Vijayanagar',
    intro:
      'Modern root canal treatment removes infection, relieves tooth pain, and helps preserve the natural tooth with careful endodontic protocols.',
    highlights: ['Tooth pain relief', 'Natural tooth preservation', 'Modern endodontic care'],
    bookingService: 'Root Canal Treatment',
    sections: [
      {
        title: 'Focused on comfort',
        body:
          'Treatment is planned with anesthesia, disinfection, and restoration in mind so patients can move from pain to function as calmly as possible.',
      },
      {
        title: 'When root canal care helps',
        body:
          'A root canal may be recommended for deep decay, infection, lingering sensitivity, swelling, or trauma when saving the natural tooth is the best option.',
      },
    ],
  },
  {
    slug: 'teeth-whitening',
    path: '/teeth-whitening',
    title: "Teeth Whitening in Vijayanagar, Bengaluru | Param's Dental Clinic",
    description:
      "Teeth whitening in Vijayanagar, Bengaluru at Param's Dental Clinic for brighter smiles, stain removal, cosmetic dentistry, and safe enamel-first whitening plans.",
    eyebrow: 'Teeth whitening',
    h1: 'Teeth Whitening in Vijayanagar, Bengaluru',
    intro:
      'Professional teeth whitening can brighten the smile by lifting stains from coffee, tea, food habits, and daily wear while protecting enamel.',
    highlights: ['Cosmetic whitening', 'Stain management', 'Enamel-first protocols'],
    bookingService: 'Teeth Whitening',
    sections: [
      {
        title: 'A cleaner cosmetic result',
        body:
          'The clinic evaluates tooth shade, stain type, sensitivity, and oral health before recommending an in-clinic whitening plan.',
      },
      {
        title: 'Part of smile care',
        body:
          'Whitening may be paired with cleaning, polishing, restorative updates, or smile makeover planning when patients want a more complete result.',
      },
    ],
  },
];

export function findSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function getSeoPageMetadata(page: SeoPage): Metadata {
  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      title: page.title,
      description: page.description,
      url: new URL(page.path, siteConfig.url).toString(),
      siteName: siteConfig.name,
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: `${page.h1} at ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/og-image.svg'],
    },
  };
}
