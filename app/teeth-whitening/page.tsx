import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('teeth-whitening');

export default function TeethWhiteningPage() {
  return <SeoLandingPage slug="teeth-whitening" />;
}
