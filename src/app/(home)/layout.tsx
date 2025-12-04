import Footer from '@/components/footer'
import Header from '@/components/header'
import GoldenSpiralBackground from '@/components/golden-spiral-background'
import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'My personal portfolio website'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `${siteName} - Home`,
  description: siteDescription,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS?.split(',') || [],
  openGraph: {
    title: `${siteName} - Home`,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: '/assets/og-main.png',
        width: 1200,
        height: 630,
        alt: `${siteName} Portfolio Preview`,
      },
    ],
    type: 'website',
    siteName: siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Home`,
    description: siteDescription,
    images: ['/assets/og-main.png'],
  },
  metadataBase: new URL(siteUrl),
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between sm:px-6 lg:px-0 lg:py-0">
      {/* Golden ratio background (center, fixed, parallax) */}
      <GoldenSpiralBackground />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}
