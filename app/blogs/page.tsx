import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts, siteConfig } from '@/data/site';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { formatBlogDate } from '@/utils/date';
import { getBlogIllustration } from '@/utils/site-helpers';

export const metadata = {
  title: 'Blogs',
  description: `Educational dental articles and oral care insights from ${siteConfig.name}.`,
};

export default function BlogsPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-32">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="section-kicker">Blog Library</span>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-ink">Dental guidance with a premium editorial feel</h1>
            <p className="mt-5 text-lg leading-8 text-[rgb(var(--muted-ink))]">
              Browse every article from Param&apos;s Dental, from whitening care to orthodontic comparisons and preventive check-up advice.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="glass-panel overflow-hidden rounded-[30px] shadow-panel">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={getBlogIllustration(post.slug)}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-primary-600 dark:bg-primary-950/50 dark:text-primary-200">
                      {post.category}
                    </span>
                    <span className="text-xs uppercase tracking-[0.26em] text-[rgb(var(--muted-ink))]">
                      {formatBlogDate(post.publishedAt)}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-ink">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">{post.excerpt}</p>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </PageTransition>
  );
}
