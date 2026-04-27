# Deployment Guide - Param's Dental

## Quick Start

For Hostinger production deployment, use [DEPLOYMENT-HOSTINGER.md](./DEPLOYMENT-HOSTINGER.md). This project needs a Node.js runtime because it uses Next.js API routes; pure static shared hosting is not enough for the booking, inquiry, and reviews endpoints.

### Vercel Deployment (Recommended)

Vercel is the easiest way to deploy Next.js applications. Follow these steps:

#### Step 1: Prepare Your Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Select your repository from GitHub/GitLab/Bitbucket
4. Click "Import"

#### Step 3: Configure Environment Variables
In the Vercel dashboard:
1. Go to Settings > Environment Variables
2. Add all variables from `.env.example`:
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `NEXT_PUBLIC_GOOGLE_PLACE_ID`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_CLINIC_PHONE`
   - `NEXT_PUBLIC_CLINIC_EMAIL`
   - `NEXT_PUBLIC_CLINIC_ADDRESS`

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

---

## Alternative Deployment Methods

### Netlify

1. Connect your GitHub repository
2. Build Command: `npm run build`
3. Publish Directory: `.next`
4. Add environment variables in Site Settings
5. Deploy

### AWS Amplify

1. Connect your GitHub repository
2. Select "Next.js" as the framework
3. Configure build settings
4. Add environment variables
5. Deploy

### DigitalOcean App Platform

1. Create a new app
2. Connect your GitHub repository
3. Select "Node.js" runtime
4. Configure build command: `npm run build && npm run start`
5. Add environment variables
6. Deploy

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runtime
FROM base AS runner
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t paramsdental .
docker run -p 3000:3000 -e NEXT_PUBLIC_CLINIC_PHONE="081233 38324" paramsdental
```

---

## DNS Configuration

After deployment, configure your custom domain:

### For Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### DNS Records to Add:
```
Type: A
Name: @
Value: 76.76.19.165 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## SSL/HTTPS

All deployments include automatic HTTPS:
- Vercel: Automatic with free SSL
- Netlify: Automatic with Let's Encrypt
- AWS: Request ACM certificate
- DigitalOcean: Automatic with Let's Encrypt

---

## Performance Optimization

### Image Optimization
The Next.js Image component is already optimized, but you can further optimize by:

1. Using WebP format images
2. Adding responsive images with srcSet
3. Using priority loading for above-the-fold images

### Bundle Size
Check bundle size:
```bash
npm run build
```

### Caching
Configure caching in `next.config.js`:
```js
headers: async () => {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store' }
      ]
    }
  ]
}
```

---

## Monitoring & Analytics

### Google Analytics
Add to `app/layout.tsx`:
```jsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Sentry (Error Tracking)
1. Create Sentry account
2. Install SDK: `npm install @sentry/nextjs`
3. Configure in `next.config.js`

### Vercel Analytics
- Automatically enabled on Vercel
- View in dashboard

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Domain Registration

Register your domain:
- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [Google Domains](https://domains.google)
- [Route 53 (AWS)](https://aws.amazon.com/route53/)

---

## Email Configuration

### Setup EmailJS for Contact Forms

1. Visit [EmailJS](https://www.emailjs.com/)
2. Create an account
3. Add your email service (Gmail, Outlook, etc.)
4. Create email templates
5. Get your credentials:
   - Service ID
   - Template ID
   - Public Key
6. Add to environment variables

---

## SEO Setup

After deployment:

1. **Google Search Console**
   - Add your domain
   - Submit sitemap at `/sitemap.xml`
   - Monitor indexing

2. **Google Analytics**
   - Set up tracking
   - Monitor traffic

3. **Meta Tags**
   - Already configured in metadata
   - Verify Open Graph tags

4. **Schema.org**
   - Already configured
   - Verify with [Schema Validator](https://validator.schema.org)

---

## Security Checklist

- [ ] Enable HTTPS (automatic)
- [ ] Set secure environment variables
- [ ] Enable rate limiting for API routes
- [ ] Configure CORS if needed
- [ ] Add security headers
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run build -- --no-cache
```

### Deployment Timeout
- Check for missing dependencies
- Optimize build process
- Increase timeout limits

### Environment Variables Not Loading
- Ensure .env.local is in root directory
- For production, set in deployment dashboard
- Restart development server after changing

### Performance Issues
- Check Lighthouse scores
- Optimize images
- Enable caching
- Use CDN for static assets

---

## Support

For deployment issues:
1. Check Vercel/platform documentation
2. Review build logs
3. Contact support team
4. File an issue on GitHub

---

## Next Steps

1. ✅ Deploy the website
2. ✅ Configure custom domain
3. ✅ Set up analytics
4. ✅ Configure email notifications
5. ✅ Monitor performance
6. ✅ Regular backups
7. ✅ Keep dependencies updated
