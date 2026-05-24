import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Param's Dental Clinic",
    short_name: "Param's Dental",
    description:
      "Param's Dental Clinic in Vijayanagar, Bengaluru offers advanced dental care, Invisalign, implants, root canal treatment, whitening, and family dentistry.",
    start_url: '/',
    display: 'standalone',
    background_color: '#F5FAFD',
    theme_color: '#0D4C92',
    icons: [
      {
        src: '/icon.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
