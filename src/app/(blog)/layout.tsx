import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Blog – Articles, Insights & Stories | ${siteName}`,
  description: `Read original articles, personal stories, and insights written by ${siteName}. I share thoughts on technology, creativity, learning, and life.`,
  keywords: [
    'blog',
    'articles',
    'writing',
    'thoughts',
    'stories',
    'nsgpriyanshu',
    'developer blog',
    'personal blog',
  ],
  openGraph: {
    title: `Blog – Writings by ${siteName}`,
    description: `Explore a collection of posts, essays, and reflections by ${siteName}—on development, design, creativity, and personal growth.`,
    url: `${siteUrl}/blog`,
    images: [
      {
        url: '/assets/og-blog.png',
        width: 1200,
        height: 630,
        alt: `Blog Cover – ${siteName}`,
      },
    ],
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog – Thoughts, Stories & More | ${siteName}`,
    description: `A space where I write about what I learn, build, and experience—explore all blog posts from ${siteName}.`,
    images: ['/assets/og-blog.png'],
  },
  metadataBase: new URL(siteUrl),
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen w-full px-4 py-8 sm:px-6">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
