import { NextResponse } from 'next/server';
import { fallbackReviews, googleReviewSummary, type Review } from '@/data/site';

export const dynamic = 'force-dynamic';

type GooglePlaceReviewNew = {
  name?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    name?: string;
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: {
      text?: string;
    };
    publishTime?: string;
    authorAttribution?: {
      displayName?: string;
      photoUri?: string;
    };
  }>;
};

type GooglePlaceReviewLegacy = {
  status?: string;
  error_message?: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: Array<{
      author_name?: string;
      profile_photo_url?: string;
      rating?: number;
      relative_time_description?: string;
      text?: string;
      time?: number;
    }>;
  };
};

type ReviewsPayload = {
  averageRating: number;
  totalReviews: number | null;
  reviews: Review[];
  source: 'live' | 'fallback';
  googleMapsUrl: string;
  fetchedAt: string;
  nextRefreshAt: string;
  isStale?: boolean;
};

type CachedReviews = {
  payload: ReviewsPayload;
  expiresAt: number;
};

const defaultRefreshSeconds = 30 * 60;

let cachedReviews: CachedReviews | null = null;

function getRefreshMs() {
  const configuredSeconds = Number(
    process.env.GOOGLE_REVIEWS_REFRESH_SECONDS ?? process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_REFRESH_SECONDS
  );

  if (Number.isFinite(configuredSeconds) && configuredSeconds > 0) {
    return configuredSeconds * 1000;
  }

  return defaultRefreshSeconds * 1000;
}

function getConfiguredNumber(value: string | undefined, fallback: number) {
  const configuredValue = Number(value);

  if (Number.isFinite(configuredValue) && configuredValue > 0) {
    return configuredValue;
  }

  return fallback;
}

function getConfiguredOptionalNumber(value: string | undefined, fallback: number | null) {
  const configuredValue = Number(value);

  if (Number.isFinite(configuredValue) && configuredValue > 0) {
    return configuredValue;
  }

  return fallback;
}

function getFallbackAverageRating() {
  return getConfiguredNumber(
    process.env.GOOGLE_REVIEWS_FALLBACK_RATING ?? process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_FALLBACK_RATING,
    googleReviewSummary.averageRating
  );
}

function getFallbackTotalReviews() {
  return getConfiguredOptionalNumber(
    process.env.GOOGLE_REVIEWS_FALLBACK_TOTAL ?? process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_FALLBACK_TOTAL,
    googleReviewSummary.totalReviews
  );
}

function getGoogleMapsUrl() {
  return (
    process.env.GOOGLE_MAPS_REVIEWS_URL ??
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_REVIEWS_URL ??
    googleReviewSummary.reviewsUrl
  );
}

function sortReviewsByTime(reviews: Review[]) {
  return [...reviews].sort((a, b) => b.time - a.time);
}

function buildResponse(payload: ReviewsPayload) {
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

function buildFallbackPayload(refreshMs: number): ReviewsPayload {
  const now = Date.now();

  return {
    averageRating: getFallbackAverageRating(),
    totalReviews: getFallbackTotalReviews(),
    reviews: fallbackReviews,
    source: 'fallback',
    googleMapsUrl: getGoogleMapsUrl(),
    fetchedAt: new Date(now).toISOString(),
    nextRefreshAt: new Date(now + refreshMs).toISOString(),
  };
}

async function fetchLegacyPlaceReviews(apiKey: string, placeId: string, refreshMs: number, now: number): Promise<ReviewsPayload> {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'rating,user_ratings_total,url,reviews',
    reviews_sort: 'newest',
    key: apiKey,
  });
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`, {
    cache: 'no-store',
  });
  const place = (await response.json()) as GooglePlaceReviewLegacy;

  if (!response.ok || place.status !== 'OK' || !place.result) {
    throw new Error(place.error_message ?? `Google Place Details request failed with status ${response.status}`);
  }

  const reviews = sortReviewsByTime(
    place.result.reviews?.map((review, index) => ({
      id: `google-review-${review.time ?? index}`,
      author_name: review.author_name ?? 'Google user',
      profile_photo_url: review.profile_photo_url ?? fallbackReviews[index % fallbackReviews.length].profile_photo_url,
      rating: review.rating ?? 5,
      relative_time_description: review.relative_time_description ?? 'Recently',
      text: review.text ?? "Loved the experience at Param's Dental.",
      time: review.time ?? Math.floor(Date.now() / 1000),
    })) ?? []
  );

  return {
    averageRating: place.result.rating ?? getFallbackAverageRating(),
    totalReviews: place.result.user_ratings_total ?? (reviews.length || getFallbackTotalReviews()),
    reviews: reviews.length ? reviews : fallbackReviews,
    source: 'live',
    googleMapsUrl: place.result.url ?? getGoogleMapsUrl(),
    fetchedAt: new Date(now).toISOString(),
    nextRefreshAt: new Date(now + refreshMs).toISOString(),
  };
}

async function fetchNewPlaceReviews(apiKey: string, placeId: string, refreshMs: number, now: number): Promise<ReviewsPayload> {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask':
        'rating,userRatingCount,googleMapsUri,reviews.name,reviews.rating,reviews.relativePublishTimeDescription,reviews.text,reviews.publishTime,reviews.authorAttribution',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Google Places request failed with status ${response.status}`);
  }

  const place = (await response.json()) as GooglePlaceReviewNew;
  const reviews = sortReviewsByTime(
    place.reviews?.map((review, index) => ({
      id: review.name ?? `google-review-${review.publishTime ?? index}`,
      author_name: review.authorAttribution?.displayName ?? 'Google user',
      profile_photo_url: review.authorAttribution?.photoUri ?? fallbackReviews[index % fallbackReviews.length].profile_photo_url,
      rating: review.rating ?? 5,
      relative_time_description: review.relativePublishTimeDescription ?? 'Recently',
      text: review.text?.text ?? "Loved the experience at Param's Dental.",
      time: review.publishTime ? Math.floor(new Date(review.publishTime).getTime() / 1000) : Math.floor(Date.now() / 1000),
    })) ?? []
  );

  return {
    averageRating: place.rating ?? getFallbackAverageRating(),
    totalReviews: place.userRatingCount ?? (reviews.length || getFallbackTotalReviews()),
    reviews: reviews.length ? reviews : fallbackReviews,
    source: 'live',
    googleMapsUrl: place.googleMapsUri ?? getGoogleMapsUrl(),
    fetchedAt: new Date(now).toISOString(),
    nextRefreshAt: new Date(now + refreshMs).toISOString(),
  };
}

export async function GET() {
  const refreshMs = getRefreshMs();
  const now = Date.now();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID ?? process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (cachedReviews && cachedReviews.expiresAt > now) {
    return buildResponse(cachedReviews.payload);
  }

  if (!apiKey || !placeId) {
    return buildResponse(buildFallbackPayload(refreshMs));
  }

  try {
    const payload = await fetchLegacyPlaceReviews(apiKey, placeId, refreshMs, now).catch(() =>
      fetchNewPlaceReviews(apiKey, placeId, refreshMs, now)
    );

    cachedReviews = {
      payload,
      expiresAt: now + refreshMs,
    };

    return buildResponse(payload);
  } catch (error) {
    console.error('Google reviews fallback triggered', error);

    if (cachedReviews) {
      return buildResponse({
        ...cachedReviews.payload,
        isStale: true,
      });
    }

    return buildResponse(buildFallbackPayload(refreshMs));
  }
}
