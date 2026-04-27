# Param's Dental

Premium, animated, mobile-first dental clinic website built with Next.js, React, Tailwind CSS, Framer Motion, GSAP, Lenis, Swiper, Lucide icons, and a custom Three.js hero scene.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- GSAP ScrollTrigger
- Lenis smooth scrolling
- Swiper.js
- Three.js

## Key Features

- Sticky glassmorphism navbar with animated mobile menu
- Luxury hero with 3D tooth-inspired scene and animated stats
- Filterable services with modal treatment details
- Booking form with real-time validation, slot selection, and success popup
- Separate contact/inquiry form with map embed and floating contact cards
- Google reviews carousel with live Places API route and fallback data
- Searchable blog cards plus full blog detail pages with related posts and share links
- Animated FAQ accordion
- Testimonial plus before/after comparison slider
- Dark/light mode toggle
- Floating WhatsApp and booking actions
- Metadata, sitemap, robots, manifest, and schema markup

## Project Structure

```text
app/
  api/
    appointments/route.ts
    inquiries/route.ts
    reviews/route.ts
  blogs/
    [slug]/page.tsx
    page.tsx
  globals.css
  layout.tsx
  loading.tsx
  manifest.ts
  not-found.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  providers/
  sections/
  ui/
  FloatingButtons.tsx
  Footer.tsx
  Navbar.tsx
  SmoothScroll.tsx
data/
  site.ts
hooks/
  useActiveSection.ts
  useGsapParallax.ts
  useMounted.ts
  useScrollAnimation.ts
pages/
  api/health.ts
public/
  illustrations/
  reviews/
  icon.svg
  og-image.svg
styles/
  tokens.css
utils/
  cn.ts
  date.ts
  emailjs.ts
  schema.ts
  site-helpers.ts
api/
  express-server.example.js
```

## Environment Variables

Use `.env.example` as the base:

```bash
cp .env.example .env.local
```

Required for optional integrations:

- `GOOGLE_MAPS_API_KEY`
- `GOOGLE_PLACE_ID`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

## Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the values from `.env.example` in the Vercel project settings.
4. Deploy.

The app already includes `sitemap`, `robots`, metadata, Open Graph tags, and JSON-LD schema.

## Backend-Ready Notes

- The Next.js API routes accept booking and inquiry submissions today.
- If EmailJS variables are configured, the routes also attempt to send notification emails.
- `api/express-server.example.js` shows how to move the same data model into a Node.js + Express + MongoDB backend.
