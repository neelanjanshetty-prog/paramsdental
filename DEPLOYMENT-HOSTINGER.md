# Hostinger Production Deployment

This project is a single full-stack Next.js app:

- Client: the pages and React components under `app/` and `components/`
- Server: Next.js API routes under `app/api/*` and `pages/api/health.ts`
- Client/server communication: same-origin requests such as `/api/appointments`, `/api/inquiries`, and `/api/reviews`

That means production should run one Next.js server. You do not need a separate Express backend unless you later add database persistence or an admin dashboard.

## Critical Hostinger Note

Hostinger "Business Web Hosting" commonly supports static/PHP hosting and may include a Node.js app manager depending on the exact panel/region, but it usually does not give you Docker. Docker deployment normally requires Hostinger VPS/KVM or another container-capable server.

Use one of these paths:

1. **Best production path: Hostinger VPS/KVM with Docker**  
   Use `Dockerfile`, `docker-compose.yml`, and `nginx/conf.d/paramsdental.conf`.

2. **If your Business plan has Node.js app support**  
   Deploy without Docker using the Node.js instructions below.

3. **If your Business plan only supports static hosting**  
   This app is not a good fit as-is because the booking, inquiry, reviews, sitemap, and server-rendered routes need Node.js. Upgrade to VPS/KVM or deploy the app on Vercel/Render/Railway and point the Hostinger domain to it.

## Production Environment

Create `.env.production` on the server from:

```bash
cp .env.production.example .env.production
```

Fill in real values. Do not commit `.env.production`.

Required for live email notifications:

```env
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```

Required for live Google reviews:

```env
GOOGLE_MAPS_API_KEY=
GOOGLE_PLACE_ID=
```

Set the public URL:

```env
NEXT_PUBLIC_SITE_URL=https://paramsdental.com
```

## Docker Deployment on Hostinger VPS/KVM

Install Docker and the Compose plugin on the VPS, then clone the repo:

```bash
git clone <your-repo-url> paramsdental
cd paramsdental
cp .env.production.example .env.production
nano .env.production
```

Build and start:

```bash
docker compose up -d --build
```

Check health:

```bash
curl -i http://127.0.0.1/api/health
docker compose ps
docker compose logs -f web
```

The included Nginx container listens on port `80` and proxies all traffic to the Next.js app on port `3000`.

### HTTPS

If Hostinger provides a panel-level reverse proxy or SSL terminator, point it to the VPS IP and keep this compose file on port `80`.

If you terminate HTTPS on the VPS yourself, add Certbot or a TLS-aware reverse proxy such as Caddy/Traefik. Do not expose the Next.js container directly to the internet.

## Node.js App Deployment Without Docker

Use this only if your Hostinger panel has a Node.js application feature.

1. Upload or clone the repository into the app directory.
2. Set Node.js version to `20.x`.
3. Set the application root to the repository root.
4. Set the startup command:

```bash
npm run start:prod
```

5. Set environment variables from `.env.production.example` in Hostinger's Node.js app settings.
   Also set:

```env
NODE_ENV=production
HOSTNAME=0.0.0.0
PORT=<the port Hostinger assigns, if the panel requires one>
```

6. Build on the server:

```bash
npm ci
npm run build
```

7. Start command:

```bash
npm run start:prod
```

8. Restart the Node.js app in hPanel.

Because this project uses `output: 'standalone'`, do not use `next start` for production.

Health URL:

```text
https://paramsdental.com/api/health
```

## DNS

In Hostinger DNS, point the domain to the production host:

```text
Type  Name  Value
A     @     <server-ip>
CNAME www   paramsdental.com
```

If using an external deployment provider instead of Hostinger VPS, use that provider's DNS records.

## Production Checks

Before switching DNS:

```bash
npm run typecheck
npm run build
docker compose up -d --build
curl -i http://127.0.0.1/api/health
```

After DNS/SSL:

```bash
curl -i https://paramsdental.com/api/health
```

Manually test:

- Home page loads on mobile and desktop.
- Appointment form posts to `/api/appointments`.
- Contact form posts to `/api/inquiries`.
- Reviews endpoint returns `source: live` after Google credentials are configured, or `source: fallback` without them.
- WhatsApp, phone, email, sitemap, and robots URLs use the production domain.

## Current Backend Scope

The API routes validate form submissions and send EmailJS notifications. They do not persist data to MongoDB yet, even though `MONGODB_URI` is reserved in the env template. If you need appointment history, staff login, or admin reporting, add a database-backed backend before relying on this for operations.
