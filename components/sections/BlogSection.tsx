'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { blogPosts } from '@/data/site';
import { formatBlogDate } from '@/utils/date';
import { getBlogIllustration } from '@/utils/site-helpers';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

export function BlogSection() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const haystack = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <section id="blogs" className="section-shell">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title="Expert dental guidance patients can actually use"
            description="Helpful articles, treatment education, and smile care advice written for modern patients."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 max-w-xl">
            <label className="glass-panel flex items-center gap-3 rounded-full px-4 py-3 shadow-panel">
              <Search className="h-4 w-4 text-primary-600" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search blog posts"
                className="w-full bg-transparent text-sm text-ink placeholder:text-[rgb(var(--muted-ink))]"
              />
            </label>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} className="h-[390px]" />)
            : filteredPosts.map((post, index) => (
                <Reveal key={post.slug} delay={0.05 * index}>
                  <article className="glass-panel overflow-hidden rounded-[30px] shadow-panel transition hover:-translate-y-1">
                    <div className="relative aspect-[16/10] overflow-hidden">
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
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-600 dark:bg-primary-950/50 dark:text-primary-200">
                          {post.category}
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-[rgb(var(--muted-ink))]">
                          {formatBlogDate(post.publishedAt)}
                        </span>
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold text-ink">{post.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">{post.excerpt}</p>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>

        {!loading && filteredPosts.length === 0 ? (
          <div className="glass-panel mt-8 rounded-[30px] px-6 py-10 text-center text-sm text-[rgb(var(--muted-ink))]">
            No blog posts matched your search.
          </div>
        ) : null}

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Link href="/blogs" className="button-secondary">
              View All Articles
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
