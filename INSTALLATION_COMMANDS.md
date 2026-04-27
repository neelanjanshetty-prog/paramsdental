# Installation Commands - Param's Dental

## Quick Installation (Copy & Paste)

### 1. Navigate to Project Directory
```bash
cd /Users/neelanjanshetty/Documents/GitHub/paramsdental
```

### 2. Install Dependencies
```bash
npm install
```

**Time**: 2-5 minutes (depending on internet speed)

### 3. Start Development Server
```bash
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## Commands Reference

### Development
```bash
# Start dev server
npm run dev

# Start on specific port
npm run dev -- -p 3001
```

### Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Build + Start
npm run build && npm start
```

### Linting & Quality
```bash
# Check code quality
npm run lint

# Format code (if prettier is added)
npm run format
```

---

## Environment Setup

### Copy Environment File
```bash
cp .env.example .env.local
```

### Update Variables
Edit `.env.local` with your actual values:
```bash
nano .env.local
```

---

## Dependency Installation Details

The `npm install` command will install:

### Main Dependencies (Runtime)
- next (14.0.0)
- react (18.2.0)
- react-dom (18.2.0)
- framer-motion (10.16.0) - Animations
- gsap (3.12.0) - Advanced animations
- lenis (1.0.29) - Smooth scrolling
- tailwindcss (3.3.0) - CSS framework
- lucide-react (0.394.0) - Icons
- react-hook-form (7.50.0) - Form handling
- axios (1.6.0) - HTTP client
- next-seo (6.4.0) - SEO

### Dev Dependencies
- typescript
- eslint
- postcss
- autoprefixer

Total size: ~500MB (node_modules)

---

## Verify Installation

After running `npm install`, verify everything is correct:

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Verify Next.js installation
npx next --version

# List installed packages
npm list --depth=0
```

---

## Troubleshooting Installation

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Out of Memory During Build
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Cache Issues
```bash
npm cache clean --force
npm install
```

---

## Git Setup (Optional)

If you want to track changes:

```bash
# Initialize git repo
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Param's Dental website"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/paramsdental.git

# Push to GitHub
git push -u origin main
```

---

## Docker Setup (Optional)

If you want to run in Docker:

```bash
# Build Docker image
docker build -t paramsdental .

# Run Docker container
docker run -p 3000:3000 -e NEXT_PUBLIC_CLINIC_PHONE="081233 38324" paramsdental
```

---

## Next.js Development Tips

### Hot Reload
Changes are automatically reflected without restarting the server.

### Debugging
```bash
# Debug with Node inspector
node --inspect-brk ./node_modules/.bin/next dev
```

### TypeScript Errors
```bash
# Check TypeScript errors
npx tsc --noEmit
```

---

## Common Issues & Solutions

### Issue: "Port 3000 already in use"
```bash
Solution: Use different port
npm run dev -- -p 3001
```

### Issue: "Cannot find module"
```bash
Solution: Reinstall dependencies
npm install
```

### Issue: "Module not found after installation"
```bash
Solution: Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: "Build fails with TypeScript errors"
```bash
Solution: Check tsconfig.json and fix errors
npx tsc --noEmit
```

---

## Performance Tips

- Use `npm ci` instead of `npm install` for CI/CD
- Enable caching: `npm config set cache-min=999999`
- Use npm workspaces for monorepos
- Regular cleanup: `npm prune`

---

## Security

- Update packages regularly: `npm update`
- Check vulnerabilities: `npm audit`
- Fix vulnerabilities: `npm audit fix`
- Use npm ci for reproducible builds

---

## Deployment Quick Commands

### Build for Production
```bash
npm run build
```

### Test Production Build Locally
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

---

## Version Checking

```bash
# Check all installed versions
npm list

# Check specific package
npm list next

# Check for outdated packages
npm outdated
```

---

## Clean Start

If you want to start fresh:

```bash
# Remove everything
rm -rf node_modules package-lock.json .next

# Reinstall
npm install

# Run dev server
npm run dev
```

---

## Useful npm Scripts

Add these to `package.json` if needed:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next node_modules",
    "reinstall": "npm run clean && npm install"
  }
}
```

---

## Final Checklist

Before running:
- [ ] Node.js installed (v16+)
- [ ] npm installed
- [ ] Project directory downloaded/cloned
- [ ] `.env.local` file created
- [ ] Dependencies installed with `npm install`
- [ ] Port 3000 is available

---

## Getting Help

1. Check documentation: `README.md`, `SETUP_GUIDE.md`
2. Review Next.js docs: https://nextjs.org/docs
3. Check npm logs: `npm logs`
4. Search for issues on GitHub

---

**You're ready to go!** 🚀

Run `npm install` and `npm run dev` to start developing.
