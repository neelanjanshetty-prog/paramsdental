import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('doctors');

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DoctorsPage() {
  return <SeoLandingPage slug="doctors" />;
}
