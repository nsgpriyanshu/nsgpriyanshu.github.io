import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'My personal portfolio website'
const siteKeywords = process.env.NEXT_PUBLIC_APP_KEYWORDS?.split(',') || []
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Sign In or Register – Access ${siteName}`,
  description: `Securely log in or create an account to access ${siteName}. ${siteDescription}`,
  keywords: siteKeywords,
  openGraph: {
    title: `${siteName} - Authentication`,
    description: `Log in or sign up to explore my projects, skills, and experience. Get a personalized view of my developer journey on ${siteName}.`,
    url: `${siteUrl}/auth`,
    images: [
      {
        url: '/assets/og-auth.png',
        width: 1200,
        height: 630,
        alt: `${siteName} – Authentication Preview`,
      },
    ],
    type: 'website',
    siteName: siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Access ${siteName}`,
    description: `Sign in or register to unlock the full experience of my portfolio, built by ${siteName}.`,
    images: ['/assets/og-auth.png'],
  },
  metadataBase: new URL(siteUrl),
}

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative w-full">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
