'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import { fallbackReviews, googleReviewSummary, type Review } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

type ReviewsResponse = {
  averageRating: number;
  totalReviews: number | null;
  reviews: Review[];
  source: 'live' | 'fallback';
  googleMapsUrl: string;
  fetchedAt?: string;
  nextRefreshAt?: string;
  isStale?: boolean;
};

const reviewsRefreshIntervalMs = 30 * 60 * 1000;

export function ReviewsSection() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasReviews = Boolean(data?.reviews.length);
  const reviewCountLabel = data?.totalReviews ? `${data.totalReviews} Google reviews` : 'Google reviews';

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async (showLoading = false) => {
      if (showLoading && isMounted) {
        setIsLoading(true);
      }

      try {
        const response = await fetch('/api/reviews', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Reviews request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as ReviewsResponse;

        if (isMounted) {
          setData(payload);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setData({
            averageRating: googleReviewSummary.averageRating,
            totalReviews: googleReviewSummary.totalReviews,
            reviews: fallbackReviews,
            source: 'fallback',
            googleMapsUrl: googleReviewSummary.reviewsUrl,
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews(true);
    const refreshTimer = window.setInterval(() => {
      loadReviews();
    }, reviewsRefreshIntervalMs);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <section className="section-shell">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="Google Reviews"
            title="Loved by patients who expect premium care"
            description="Recent Google feedback from patients who visit Param's Dental for thoughtful, precise, and comfortable care."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <div className="glass-panel rounded-full px-5 py-3 text-sm font-semibold text-ink shadow-panel">
              {isLoading
                ? 'Loading review summary...'
                : `${(data?.averageRating ?? googleReviewSummary.averageRating).toFixed(1)} average rating`}
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-[rgb(var(--muted-ink))]">
              {isLoading ? 'Fetching latest reviews' : reviewCountLabel}
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} className="h-[300px]" />
              ))}
            </div>
          ) : hasReviews && data ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={24}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {data.reviews.map((review) => (
                <SwiperSlide key={review.id} className="h-auto">
                  <div className="glass-panel flex h-full flex-col rounded-[30px] p-6 shadow-panel">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/60">
                        <Image
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          fill
                          className="object-cover"
                          sizes="56px"
                          unoptimized={review.profile_photo_url.startsWith('http')}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{review.author_name}</p>
                        <p className="text-xs uppercase tracking-[0.25em] text-[rgb(var(--muted-ink))]">
                          {review.relative_time_description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${review.id}-${index}`}
                          className={`h-4 w-4 ${
                            index < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="mt-5 flex-1 text-sm leading-7 text-[rgb(var(--muted-ink))]">{review.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : data ? (
            <Reveal>
              <div className="glass-panel mx-auto max-w-3xl rounded-[30px] p-8 text-center shadow-panel">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-5 text-lg font-semibold text-ink">
                  Read the newest patient feedback directly on Google.
                </p>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-ink))]">
                  Follow the link below for the current review count and latest patient comments.
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-4 text-center">
            <a
              href={data?.googleMapsUrl ?? 'https://www.google.com/maps'}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              View All Reviews on Google
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
