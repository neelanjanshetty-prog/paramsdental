# Directory Structure - Param's Dental Website

```
paramsdental/
│
├── 📁 app/
│   ├── 📁 api/
│   │   ├── 📁 appointments/
│   │   │   └── route.ts                  # Appointment booking endpoint
│   │   └── 📁 inquiries/
│   │       └── route.ts                  # Inquiry form endpoint
│   │
│   ├── globals.css                       # Global styles and animations
│   ├── layout.tsx                        # Root layout with metadata & fonts
│   └── page.tsx                          # Home page
│
├── 📁 components/
│   ├── Navbar.tsx                        # Sticky navigation bar
│   ├── FloatingButtons.tsx               # WhatsApp & Book Appointment buttons
│   ├── SmoothScroll.tsx                  # Lenis smooth scrolling
│   ├── Footer.tsx                        # Footer section
│   │
│   └── 📁 sections/
│       ├── HeroSection.tsx               # Hero section with animation
│       ├── AboutSection.tsx              # About the clinic
│       ├── ServicesSection.tsx           # Services grid with modal
│       ├── AppointmentSection.tsx        # Booking form
│       ├── BlogSection.tsx               # Blog articles
│       ├── FAQSection.tsx                # FAQ accordion
│       ├── TestimonialSection.tsx        # Patient testimonials carousel
│       └── CTASection.tsx                # Call-to-action section
│
├── 📁 hooks/
│   └── useScrollAnimation.ts             # Scroll animation hook
│
├── 📁 public/
│   └── images/                           # Images and assets folder
│
├── 📄 package.json                       # Dependencies and scripts
├── 📄 tsconfig.json                      # TypeScript configuration
├── 📄 next.config.js                     # Next.js configuration
├── 📄 tailwind.config.js                 # Tailwind CSS configuration
├── 📄 postcss.config.js                  # PostCSS configuration
├── 📄 .eslintrc.json                     # ESLint configuration
├── 📄 .gitignore                         # Git ignore file
├── 📄 .env.example                       # Environment variables template
├── 📄 .env.local                         # Local environment variables
├── 📄 README.md                          # Project documentation
├── 📄 DEPLOYMENT.md                      # Deployment guide
└── 📄 DIRECTORY_STRUCTURE.md             # This file

```

## File Descriptions

### Core Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.js` | Next.js build and runtime configuration |
| `tailwind.config.js` | Tailwind CSS theme customization |
| `postcss.config.js` | PostCSS plugin configuration |
| `.eslintrc.json` | ESLint rules for code quality |

### App Directory

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with metadata, fonts, and providers |
| `app/page.tsx` | Home page (imports all sections) |
| `app/globals.css` | Global styles, animations, custom classes |
| `app/api/appointments/route.ts` | API endpoint for booking appointments |
| `app/api/inquiries/route.ts` | API endpoint for contact inquiries |

### Components

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Fixed navigation with mobile menu |
| `FloatingButtons.tsx` | Floating WhatsApp and Book Appointment buttons |
| `SmoothScroll.tsx` | Lenis smooth scrolling provider |
| `Footer.tsx` | Footer with links and social media |

### Section Components

| Section | Features |
|---------|----------|
| `HeroSection.tsx` | Animated hero with statistics and CTA buttons |
| `AboutSection.tsx` | Company overview with feature cards |
| `ServicesSection.tsx` | 8 services with interactive modal details |
| `AppointmentSection.tsx` | Booking form with validation |
| `BlogSection.tsx` | 6 blog cards with categories |
| `FAQSection.tsx` | 6 FAQs with animated accordion |
| `TestimonialSection.tsx` | Patient testimonials carousel |
| `CTASection.tsx` | Call-to-action with animated background |

### Hooks

| Hook | Purpose |
|------|---------|
| `useScrollAnimation.ts` | Trigger animations on scroll |

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

## Key Features by File

### Animations
- **Framer Motion**: All components use motion features
- **GSAP**: Available for advanced scroll effects
- **Custom Animations**: CSS keyframes in `globals.css`

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Glassmorphism**: Custom glass effect utility
- **Responsive**: Mobile-first design with breakpoints

### Forms
- **React Hook Form**: Form handling with validation
- **API Integration**: Connected to `/api` endpoints
- **Real-time Validation**: Client-side validation

### SEO
- **Metadata**: Configured in `layout.tsx`
- **Schema.org**: Structured data for search engines
- **Open Graph**: Social media sharing support

### Performance
- **Image Optimization**: Next.js Image component ready
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand

## Customization Points

1. **Colors**: Edit `tailwind.config.js`
2. **Fonts**: Edit `app/layout.tsx`
3. **Content**: Edit individual section components
4. **API Endpoints**: Edit `app/api/` routes
5. **Animations**: Adjust Framer Motion props or CSS

## Dependencies

### Runtime
- `next`: React framework
- `react`: UI library
- `framer-motion`: Animation library
- `gsap`: Advanced animations
- `lenis`: Smooth scrolling
- `tailwindcss`: CSS framework
- `lucide-react`: Icon library
- `react-hook-form`: Form handling
- `axios`: HTTP client

### Dev
- `typescript`: Type safety
- `eslint`: Code quality
- `postcss`: CSS processing
- `autoprefixer`: CSS vendor prefixes

## Building & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Deploy
- Vercel: Connect GitHub, auto-deploy
- Other platforms: Run `npm run build` then `npm start`

## Security & Best Practices

- ✅ Environment variables for sensitive data
- ✅ Input validation on forms
- ✅ HTTPS/SSL support
- ✅ CSP headers ready
- ✅ Responsive design
- ✅ Accessibility features
- ✅ SEO optimization
- ✅ Performance optimized

## Support & Documentation

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- ⚡ [Framer Motion Docs](https://www.framer.com/motion/)
- 📱 [React Docs](https://react.dev)

---

Last Updated: 2024
Built for Param's Dental Clinic
