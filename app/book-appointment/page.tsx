import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('book-appointment');

export default function BookAppointmentPage() {
  return <SeoLandingPage slug="book-appointment" />;
}
