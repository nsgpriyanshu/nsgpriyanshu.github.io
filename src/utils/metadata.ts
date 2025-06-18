import { Metadata } from 'next'

const siteConfig = {
  siteName: process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu',
  siteDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'My personal portfolio website',
  siteKeywords:
    process.env.NEXT_PUBLIC_APP_KEYWORDS ||
    'portfolio, developer, nsgpriyanshu, web developer, software engineer',
  links: {
    discord: 'https://discord.gg/VUMVuArkst',
    twitter: '@nsgpriyanshu',
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app/',
    ogImage: '/assets/og-main.png',
    twitterImage: '/assets/og-main.png',
  },
}

export const generateMetadata = ({
  title = `${siteConfig.siteName} - Home`,
  description = siteConfig.siteDescription,
  image = siteConfig.links.ogImage,
  icons = [
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/icons/cwfavicon_dark.ico',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      url: '/icons/cwfavicon_dark.ico',
    },
  ],
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string | null
  icons?: Metadata['icons']
  noIndex?: boolean
} = {}): Metadata => {
  const baseUrl = siteConfig.links.siteUrl
  const ogImageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`
  const twitterImageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    icons,
    keywords: siteConfig.siteKeywords,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: siteConfig.siteName,
      description: siteConfig.siteDescription,
      url: baseUrl,
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.siteName,
      images: [
        {
          url: ogImageUrl,
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
          url: twitterImageUrl,
          alt: siteConfig.siteName,
        },
      ],
      site: siteConfig.links.twitter,
      creator: siteConfig.links.twitter,
    },
  }
}
