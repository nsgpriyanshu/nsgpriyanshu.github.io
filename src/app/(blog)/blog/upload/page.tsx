import UploadBlogPage from '@/components/blog/upload'
import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Upload Blog – Share Your Thoughts | ${siteName}`,
  description: `Write and publish original blog posts that reflect your thoughts, experiences, and creativity. Share your voice with the world through ${siteName}.`,
  keywords: [
    'blog upload',
    'write blog',
    'publish post',
    'content creation',
    'share ideas',
    'blog editor',
    'nsgpriyanshu',
  ],
  openGraph: {
    title: `Upload Blog – Create & Share Posts | ${siteName}`,
    description: `Use the blog editor to write and publish meaningful posts on ${siteName}. Share your stories, ideas, and creativity.`,
    url: `${siteUrl}blog/upload`,
    images: [
      {
        url: '/assets/blog-upload-og.png',
        width: 1200,
        height: 630,
        alt: `Upload Blog – ${siteName}`,
      },
    ],
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Upload Blog – Share What Matters | ${siteName}`,
    description: `Publish your ideas, stories, or insights on ${siteName}'s blog. Easy, expressive, and yours.`,
    images: ['/assets/blog-upload-og.png'],
  },
  metadataBase: new URL(siteUrl),
}

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <UploadBlogPage />
      </section>
    </div>
  )
}

export default Page
