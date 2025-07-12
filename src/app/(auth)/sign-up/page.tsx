import SignUp from '@/components/auth/sign-up'

import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Sign Up – Create an Account | ${siteName}`,
  description: `Join ${siteName} by creating a free account. Start uploading blogs, sharing designs, and customizing your profile.`,
  keywords: ['sign up', 'register', 'create account', 'portfolio signup', siteName],
  openGraph: {
    title: `Sign Up – ${siteName}`,
    description: `Create your personal account on ${siteName} to start publishing blogs, uploading visuals, and saving your work.`,
    url: `${siteUrl}/sign-up`,
    images: [
      {
        url: '/assets/0g-signup.png',
        width: 1200,
        height: 630,
        alt: `Sign Up – ${siteName}`,
      },
    ],
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Sign Up – ${siteName}`,
    description: `Register now to access the full experience on ${siteName}, your personal developer portfolio.`,
    images: ['/assets/0g-signup.png'],
  },
  metadataBase: new URL(siteUrl),
}

const SignUpPage = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <SignUp />
      </section>
    </div>
  )
}

export default SignUpPage
