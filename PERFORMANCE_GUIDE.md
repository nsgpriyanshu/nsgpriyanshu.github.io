# Performance Optimization Guide

## Quick Start

### 1. Run Lighthouse Audit

```bash
npm run build
npm start
# Open DevTools → Lighthouse → Analyze page load
```

### 2. Test Accessibility

```bash
# Keyboard Navigation Test
# 1. Open site in browser
# 2. Press Tab repeatedly - navigate through all interactive elements
# 3. Press Enter/Space on buttons to activate
# 4. Arrow keys on hero name to cycle variants
```

### 3. Check Bundle Size

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts:
# const withBundleAnalyzer = require('@next/bundle-analyzer')()
# export default withBundleAnalyzer(nextConfig)

npm run build  # Shows bundle analysis
```

---

## Performance Metrics Target

| Metric                         | Target  | Current\* |
| ------------------------------ | ------- | --------- |
| Largest Contentful Paint (LCP) | < 2.5s  | TBD       |
| First Input Delay (FID)        | < 100ms | TBD       |
| Cumulative Layout Shift (CLS)  | < 0.1   | TBD       |
| First Contentful Paint (FCP)   | < 1.8s  | TBD       |
| Time to Interactive (TTI)      | < 3.8s  | TBD       |

\*Run Lighthouse to get current values

---

## Image Optimization Checklist

- [x] Using Next.js Image component
- [x] Priority attribute on hero image
- [x] Lazy loading on gallery/blog
- [x] Supabase remote patterns configured
- [x] Image format optimization (auto WebP)
- [ ] Adaptive image sizes (srcset)
- [ ] Blur placeholder for images

### Add Blur Placeholder:

```tsx
<Image
  src={imagePath}
  placeholder="blur"
  blurDataURL={blurDataUrl} // Required with placeholder="blur"
/>
```

---

## Code Splitting & Lazy Loading

### Current Implementation

- ✅ Route-based splitting (Next.js default)
- ✅ Modal components can be lazy loaded
- ✅ Heavy libraries tree-shaken

### To Add:

```tsx
import dynamic from 'next/dynamic'

const About = dynamic(() => import('@/components/home/about'), {
  loading: () => <div>Loading...</div>,
})
```

---

## Font Optimization

### Current Setup

```tsx
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'], // ✅ Reduces font size
})
```

### Performance Impact

- Latin subset: ~60KB → ~35KB
- Variable font: Single file for all weights
- CSS variables: Automatic fallback

---

## CSS Performance

### Tailwind CSS 4 Optimizations

- Built-in PurgeCSS removes unused styles
- Utility-first reduces CSS duplication
- JIT mode compiles only used classes

### Custom Animations

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

---

## Caching Configuration

### Add to `next.config.ts`:

```typescript
export default {
  // ... other config

  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}
```

---

## Core Web Vitals Monitoring

### Add web-vitals package:

```bash
npm install web-vitals
```

### Usage:

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log) // Cumulative Layout Shift
getFID(console.log) // First Input Delay
getFCP(console.log) // First Contentful Paint
getLCP(console.log) // Largest Contentful Paint
getTTFB(console.log) // Time to First Byte
```

---

## Accessibility Testing Tools

### Browser Extensions

- **WAVE** (WebAIM): Visual feedback for accessibility issues
- **axe DevTools**: Automated accessibility audits
- **Lighthouse** (Chrome built-in): Comprehensive audit

### Keyboard Testing

```
Tab         → Navigate forward
Shift+Tab   → Navigate backward
Enter       → Activate buttons/links
Space       → Toggle checkboxes, activate buttons
Arrow Keys  → Cycle hero name variants
```

### Screen Reader Testing

- **Windows**: NVDA (free)
- **macOS**: VoiceOver (built-in)
- **iOS/Android**: Built-in accessibility

---

## Recommended Monitoring

### Services

- **Vercel Analytics**: Deployment-integrated performance
- **Google Analytics 4**: User behavior + Web Vitals
- **LogRocket**: Session replay + errors

### Setup:

```tsx
// pages/_app.tsx or app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
```

---

## Performance Checklist

### Images

- [x] Using Next.js Image component
- [x] Priority on hero image
- [x] Lazy loading elsewhere
- [ ] Blur placeholders
- [ ] Responsive image sizes

### Code

- [x] Tree-shaking enabled
- [x] Code splitting by route
- [ ] Component lazy loading
- [x] Unused dependencies removed

### CSS/Fonts

- [x] Tailwind purged
- [x] Fonts subset
- [x] No inline CSS bloat
- [x] Shimmer animation optimized

### Caching

- [x] Static assets cached
- [x] Image CDN (Supabase)
- [ ] Browser cache headers
- [ ] Service worker (optional)

### Monitoring

- [ ] Lighthouse regular audits
- [ ] Google PageSpeed Insights
- [ ] Core Web Vitals dashboard
- [ ] User feedback monitoring

---

## Production Deployment

### Pre-deployment Checklist:

```bash
# 1. Run build locally
npm run build

# 2. Check for errors
npm run lint

# 3. Run Lighthouse on local build
npm start
# DevTools → Lighthouse

# 4. Deploy to Vercel
git push origin main

# 5. Monitor Vercel Analytics
# Dashboard → Analytics
```

### Monitor After Deploy:

- Check Vercel analytics for real-world metrics
- Monitor Lighthouse scores in CI/CD
- Set performance budgets

---

## References

- [Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Framer Motion Performance](https://www.framer.com/motion/performance/)
- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
