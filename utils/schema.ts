import { blogPosts, doctors, siteConfig } from '@/data/site';

const socialProfiles = [
  'https://www.instagram.com/paramsdental',
  'https://www.facebook.com/paramsdental',
  'https://www.linkedin.com/company/paramsdental',
];

function getAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function stripContext<T extends Record<string, unknown>>(schema: T) {
  const { ['@context']: _context, ...rest } = schema;
  return rest;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
    name: siteConfig.name,
    description: siteConfig.description,
    image: getAbsoluteUrl('/og-image.svg'),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1175, 1st A Main Rd, Hoshalli Extension, Vijayanagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560040',
      addressCountry: 'IN',
    },
    medicalSpecialty: 'Dentistry',
    openingHours: ['Mo-Sa 10:00-20:30'],
    priceRange: '$$',
    sameAs: socialProfiles,
    employee: doctors.map((doctor) => ({
      '@type': 'Person',
      name: doctor.name,
      jobTitle: doctor.role,
      description: doctor.bio,
      image: getAbsoluteUrl(doctor.image),
      knowsAbout: doctor.specialties,
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    })),
  };
}

export function getHomepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/blogs?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getSiteSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      stripContext(getOrganizationSchema()),
      stripContext(getHomepageSchema()),
    ],
  };
}

export function getBlogSchema(slug: string) {
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/icon.svg'),
      },
    },
    image: getAbsoluteUrl('/og-image.svg'),
    mainEntityOfPage: getAbsoluteUrl(`/blogs/${post.slug}`),
  };
}
