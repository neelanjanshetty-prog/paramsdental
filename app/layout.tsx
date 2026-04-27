import type { Metadata } from 'next';
import { Inter, Montserrat, Poppins } from 'next/font/google';
import 'swiper/css';
import 'swiper/css/pagination';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { FloatingButtons } from '@/components/FloatingButtons';
import { SiteShell } from '@/components/providers/SiteShell';
import { siteConfig } from '@/data/site';
import { getSiteSchemaGraph } from '@/utils/schema';

const themeInitScript = `
(function() {
  try {
    var storageKey = 'params-theme';
    var storedTheme = window.localStorage.getItem(storageKey);
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : prefersDark ? 'dark' : 'light';

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
})();
`;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Param's Dental | Premium Dental Clinic Website",
    template: "%s | Param's Dental",
  },
  description: siteConfig.description,
  keywords: [
    "Param's Dental",
    'dental clinic Bangalore',
    'premium dentist',
    'teeth whitening',
    'root canal',
    'dental implants',
    'braces and aligners',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: "Param's Dental | Premium Dental Clinic Website",
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: "Param's Dental preview image",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Param's Dental | Premium Dental Clinic Website",
    description: siteConfig.description,
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = getSiteSchemaGraph();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        <SiteShell>
          <Navbar />
          <main>{children}</main>
          <FloatingButtons />
        </SiteShell>
      </body>
    </html>
  );
}
