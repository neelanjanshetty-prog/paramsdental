import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Param's Dental",
    short_name: 'Params Dental',
    description: 'Premium animated dental clinic website',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5FAFD',
    theme_color: '#0D4C92',
    icons: [
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
