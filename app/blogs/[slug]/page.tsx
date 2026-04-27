import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { notFound } from 'next/navigation';
import { blogPosts, siteConfig } from '@/data/site';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { formatBlogDate } from '@/utils/date';
import { getBlogSchema } from '@/utils/schema';
import { getBlogBySlug, getBlogIllustration, getRelatedPosts } from '@/utils/site-helpers';

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.seoDescription,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      url: `${siteConfig.url}/blogs/${post.slug}`,
      type: 'article',
      images: [{ url: getBlogIllustration(post.slug) }],
    },
  };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const shareUrl = `${siteConfig.url}/blogs/${post.slug}`;
  const blogSchema = getBlogSchema(post.slug);

  return (
    <>
      {blogSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      ) : null}
      <PageTransition>
        <article className="section-shell pt-32">
          <div className="section-container">
            <div className="max-w-4xl">
              <span className="section-kicker">{post.category}</span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">{post.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.25em] text-[rgb(var(--muted-ink))]">
                <span>{formatBlogDate(post.publishedAt)}</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="glass-panel mt-10 overflow-hidden rounded-[36px] shadow-halo">
              <div className="relative aspect-[16/7]">
                <Image
                  src={getBlogIllustration(post.slug)}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-semibold text-ink md:text-3xl">{section.title}</h2>
                    <div className="mt-5 space-y-5 text-base leading-8 text-[rgb(var(--muted-ink))]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-6 space-y-3 rounded-[28px] border border-primary-100 bg-white/75 p-6 text-sm leading-7 text-[rgb(var(--muted-ink))] dark:border-primary-900 dark:bg-white/5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <aside className="space-y-6">
                <div className="glass-panel rounded-[30px] p-6 shadow-panel">
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Key Takeaways</p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                    {post.takeaways.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel rounded-[30px] p-6 shadow-panel">
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-500">Share</p>
                  <div className="mt-5 flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white/70 text-primary-700 dark:border-primary-900 dark:bg-white/5 dark:text-primary-200"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white/70 text-primary-700 dark:border-primary-900 dark:bg-white/5 dark:text-primary-200"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white/70 text-primary-700 dark:border-primary-900 dark:bg-white/5 dark:text-primary-200"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            <section className="mt-16">
              <h2 className="text-3xl font-semibold text-ink">Related posts</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug} className="glass-panel overflow-hidden rounded-[30px] shadow-panel">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={getBlogIllustration(relatedPost.slug)}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.28em] text-primary-500">{relatedPost.category}</p>
                      <h3 className="mt-3 text-xl font-semibold text-ink">{relatedPost.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">{relatedPost.excerpt}</p>
                      <Link href={`/blogs/${relatedPost.slug}`} className="mt-5 inline-flex text-sm font-semibold text-primary-700">
                        Read Article
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </article>
        <Footer />
      </PageTransition>
    </>
  );
}
