import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Gallery – Moments, Designs & Memories | ${siteName}`,
  description: `A personal collection of my favorite photos, original designs, and meaningful memories captured over time. Explore the visual side of ${siteName}.`,
  keywords: [
    'personal gallery',
    'memories',
    'photography',
    'digital art',
    'visual archive',
    'designs',
    'nsgpriyanshu',
    'portfolio',
  ],
  openGraph: {
    title: `Gallery – Visual Memories & Designs | ${siteName}`,
    description: `Step into my world through pictures and projects. This gallery showcases personal moments, creative designs, and memories that matter.`,
    url: `${siteUrl}gallery`,
    images: [
      {
        url: '/assets/og-gallery.png',
        width: 1200,
        height: 630,
        alt: `Gallery Preview – ${siteName}`,
      },
    ],
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Gallery – My Visual Journey | ${siteName}`,
    description: `A look into my visual world—photos I’ve taken, things I’ve designed, and snapshots of life’s best moments.`,
    images: ['/assets/og-gallery.png'],
  },
  metadataBase: new URL(siteUrl),
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">{children}</div>
      <Footer />
    </main>
  )
}
