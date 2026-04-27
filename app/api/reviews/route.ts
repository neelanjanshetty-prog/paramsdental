import { NextResponse } from 'next/server';
import { fallbackReviews } from '@/data/site';

type GooglePlaceReview = {
  name?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
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

const defaultGoogleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Param%27s+Dental';

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({
      averageRating: 4.9,
      totalReviews: 128,
      reviews: fallbackReviews,
      source: 'fallback',
      googleMapsUrl: defaultGoogleMapsUrl,
    });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'rating,userRatingCount,googleMapsUri,reviews.rating,reviews.relativePublishTimeDescription,reviews.text,reviews.publishTime,reviews.authorAttribution',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Google Places request failed with status ${response.status}`);
    }

    const place = (await response.json()) as GooglePlaceReview;
    const reviews =
      place.reviews?.map((review, index) => ({
        id: `google-review-${index}`,
        author_name: review.authorAttribution?.displayName ?? 'Google user',
        profile_photo_url: review.authorAttribution?.photoUri ?? fallbackReviews[index % fallbackReviews.length].profile_photo_url,
        rating: review.rating ?? 5,
        relative_time_description: review.relativePublishTimeDescription ?? 'Recently',
        text: review.text?.text ?? "Loved the experience at Param's Dental.",
        time: review.publishTime ? Math.floor(new Date(review.publishTime).getTime() / 1000) : Math.floor(Date.now() / 1000),
      })) ?? fallbackReviews;

    return NextResponse.json({
      averageRating: place.rating ?? 4.9,
      totalReviews: place.userRatingCount ?? reviews.length,
      reviews,
      source: 'live',
      googleMapsUrl: place.googleMapsUri ?? defaultGoogleMapsUrl,
    });
  } catch (error) {
    console.error('Google reviews fallback triggered', error);

    return NextResponse.json({
      averageRating: 4.9,
      totalReviews: 128,
      reviews: fallbackReviews,
      source: 'fallback',
      googleMapsUrl: defaultGoogleMapsUrl,
    });
  }
}
