'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import { fallbackReviews, type Review } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

type ReviewsResponse = {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  source: 'live' | 'fallback';
  googleMapsUrl: string;
};

export function ReviewsSection() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const payload = (await response.json()) as ReviewsResponse;

        if (isMounted) {
          setData(payload);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setData({
            averageRating: 4.9,
            totalReviews: 128,
            reviews: fallbackReviews,
            source: 'fallback',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Param%27s+Dental',
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section-shell">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="Google Reviews"
            title="Loved by patients who expect premium care"
            description="This section is wired for live Google Places reviews and gracefully falls back to curated testimonials when API credentials are not configured."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <div className="glass-panel rounded-full px-5 py-3 text-sm font-semibold text-ink shadow-panel">
              {isLoading ? 'Loading review summary...' : `${data?.averageRating.toFixed(1) ?? '4.9'} average rating`}
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-[rgb(var(--muted-ink))]">
              {isLoading ? 'Fetching latest reviews' : `${data?.totalReviews ?? 128} reviews`}
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
          ) : data ? (
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
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="h-full w-full object-cover"
                          loading="lazy"
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
