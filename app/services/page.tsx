import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('services');

export default function ServicesPage() {
  return <SeoLandingPage slug="services" />;
}
