import type { Metadata } from 'next'

const fallbackSiteUrl = 'https://nsgpriyanshu.vercel.app'

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu',
  shortName: 'nsgpriyanshu',
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'Portfolio, writing, and visual work from Priyanshu, a developer and creative builder based in India.',
  keywords: (
    process.env.NEXT_PUBLIC_APP_KEYWORDS ||
    'portfolio, developer, software engineer, frontend, blog, gallery, nsgpriyanshu'
  )
    .split(',')
    .map(keyword => keyword.trim())
    .filter(Boolean),
  creator: 'Priyanshu',
  author: 'Priyanshu',
  locale: 'en_US',
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || fallbackSiteUrl,
  twitter: '@nsgpriyanshu',
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/favicon.ico',
  },
  images: {
    default: '/assets/og-main.png',
    home: '/assets/og-main.png',
    blog: '/assets/og-blog.png',
    gallery: '/assets/og-gallery.png',
    signIn: '/assets/og-signin.png',
    signUp: '/assets/og-signup.png',
  },
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString()
}

type PageMetadataInput = {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string[]
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  path = '/',
  image = siteConfig.images.default,
  keywords = [],
  type = 'website',
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)
  const mergedKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]))

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: path,
    },
    authors: [{ name: siteConfig.author, url: siteConfig.siteUrl }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    keywords: mergedKeywords,
    category: 'technology',
    icons: {
      icon: siteConfig.icons.icon,
      apple: siteConfig.icons.apple,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            'max-image-preview': 'none',
            'max-snippet': 0,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
  }
}
