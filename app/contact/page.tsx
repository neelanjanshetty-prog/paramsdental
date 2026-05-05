import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('contact');

export default function ContactPage() {
  return <SeoLandingPage slug="contact" />;
}
