import type { MetadataRoute } from 'next';
import { blogPosts, siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/blogs'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blogs/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),
  ];
}
