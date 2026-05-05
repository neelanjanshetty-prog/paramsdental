import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { AboutSection } from '@/components/sections/AboutSection';
import { AppointmentSection } from '@/components/sections/AppointmentSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { CTASection } from '@/components/sections/CTASection';
import { DentistsSection } from '@/components/sections/DentistsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PartnersSlider } from '@/components/sections/PartnersSlider';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { getFAQSchema } from '@/utils/schema';

export const metadata: Metadata = {
  title: {
    absolute: "Param's Dental Clinic | Dentist in Vijayanagar, Bengaluru",
  },
  description:
    "Param's Dental Clinic in Vijayanagar, Bengaluru offers advanced dental care, orthodontics, Invisalign, implants, root canal treatment, teeth whitening, and family dentistry.",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const faqSchema = getFAQSchema();

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <AboutSection />
      <DentistsSection />
      <ServicesSection />
      <PartnersSlider />
      <AppointmentSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      <ReviewsSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </PageTransition>
  );
}
