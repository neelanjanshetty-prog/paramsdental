import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('doctors');

export default function DoctorsPage() {
  return <SeoLandingPage slug="doctors" />;
}
