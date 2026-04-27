import { blogPosts, services } from '@/data/site';

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getBlogIllustration(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  const assetIndex = index >= 0 ? index + 1 : 1;
  return `/illustrations/blog-${assetIndex}.svg`;
}
