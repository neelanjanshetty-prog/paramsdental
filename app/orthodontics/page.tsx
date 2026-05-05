import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('orthodontics');

export default function OrthodonticsPage() {
  return <SeoLandingPage slug="orthodontics" />;
}
