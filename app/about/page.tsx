import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('about');

export default function AboutPage() {
  return <SeoLandingPage slug="about" />;
}
