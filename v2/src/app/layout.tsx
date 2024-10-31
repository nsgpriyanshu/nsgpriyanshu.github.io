import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import { ModeToggle } from '@/components/global/theme-switcher'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/siteConfig'
import Footer from '@/components/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const viewport: Viewport = {
  themeColor: '#1c1917',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.links.siteUrl),
  title: {
    default: siteConfig.siteName,
    template: `%s - ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  keywords: 'Discord, app hub, creators, collaboration, innovation',
  creator: 'nsgpriyanshu',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.svg',
  },
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: siteConfig.links.siteUrl,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.links.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    images: [
      {
        url: siteConfig.links.twitterImage,
        alt: siteConfig.siteName,
      },
    ],
    site: siteConfig.links.twitter,
    creator: siteConfig.links.twitter,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('min-h-screen antialiased transition')}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow, nocache" />
        <meta property="og:image" content={siteConfig.links.ogImage} />
        <meta property="og:site_name" content={siteConfig.siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.links.twitter} />
        <meta name="twitter:creator" content={siteConfig.links.twitter} />
        <meta name="twitter:title" content={siteConfig.siteName} />
        <meta name="twitter:description" content={siteConfig.siteDescription} />
        <meta name="twitter:image" content={siteConfig.links.twitterImage} />
        <link rel="canonical" href={siteConfig.links.siteUrl} />
      </head>
      <body
        className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-rose-600/90 dark:bg-[#1c1917] dark:text-rose-100/90`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <svg
            className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
            width="100%"
            height="100%"
          >
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.80"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
          <ModeToggle />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="h-full bg-top bg-no-repeat opacity-[0.3] dark:bg-[url('https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9')]" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
