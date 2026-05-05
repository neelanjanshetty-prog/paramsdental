import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('reviews');

export default function ReviewsPage() {
  return <SeoLandingPage slug="reviews" />;
}
