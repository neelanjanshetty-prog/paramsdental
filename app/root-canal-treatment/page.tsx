import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('root-canal-treatment');

export default function RootCanalTreatmentPage() {
  return <SeoLandingPage slug="root-canal-treatment" />;
}
