import Footer from '@/components/footer'
import Header from '@/components/header'
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
    <main className="relative min-h-screen w-full px-4 py-8 sm:px-6">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
