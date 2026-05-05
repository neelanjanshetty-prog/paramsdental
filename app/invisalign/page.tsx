import { SeoLandingPage, getRouteMetadata } from '@/components/seo/SeoLandingPage';

export const metadata = getRouteMetadata('invisalign');

export default function InvisalignPage() {
  return <SeoLandingPage slug="invisalign" />;
}
