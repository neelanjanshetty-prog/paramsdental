import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('dental-implants');

export default function DentalImplantsPage() {
  return <SeoLandingPage slug="dental-implants" />;
}
