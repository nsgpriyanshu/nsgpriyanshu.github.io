import SignIn from '@/components/auth/sign-in'

import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Sign In – Access Your Account | ${siteName}`,
  description: `Securely log in to your ${siteName} account to access exclusive features and manage your profile.`,
  keywords: ['sign in', 'login', 'portfolio access', 'account login', siteName],
  openGraph: {
    title: `Sign In – ${siteName}`,
    description: `Log in to your personal portfolio account on ${siteName} to view saved content, uploads, and settings.`,
    url: `${siteUrl}sign-in`,
    images: [
      {
        url: '/assets/og-signin.png',
        width: 1200,
        height: 630,
        alt: `Sign In – ${siteName}`,
      },
    ],
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Sign In – ${siteName}`,
    description: `Access your personal dashboard on ${siteName} by securely logging in.`,
    images: ['/assets/og-signin.png'],
  },
  metadataBase: new URL(siteUrl),
}

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <SignIn />
      </section>
    </div>
  )
}

export default Page
