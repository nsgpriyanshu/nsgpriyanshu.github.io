import UploadGalleryPage from '@/components/gallery/upload'
import { Metadata } from 'next'

const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'nsgpriyanshu'
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nsgpriyanshu.vercel.app'

export const metadata: Metadata = {
  title: `Upload to Gallery – Share Visual Work | ${siteName}`,
  description: `Showcase your creativity by uploading photographs, designs, or artwork to your personal gallery on ${siteName}.`,
  keywords: [
    'gallery upload',
    'upload artwork',
    'share designs',
    'creative work',
    'visual portfolio',
    'nsgpriyanshu',
  ],
  openGraph: {
    title: `Upload to Gallery – Showcase Your Visuals | ${siteName}`,
    description: `Add photos, designs, and creative visuals to your personal gallery on ${siteName}. A space to express visually.`,
    url: `${siteUrl}gallery/upload`,
    images: [
      {
        url: '/assets/gallery-pload-og.png', // Use or create this OG image
        width: 1200,
        height: 630,
        alt: `Upload to Gallery – ${siteName}`,
      },
    ],
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Upload Visuals – Gallery | ${siteName}`,
    description: `Upload and share personal visuals, photos, and creative projects directly to the gallery on ${siteName}.`,
    images: ['/assets/gallery-pload-og.png'],
  },
  metadataBase: new URL(siteUrl),
}

const GalleryUploadPage = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <UploadGalleryPage />
      </section>
    </div>
  )
}

export default GalleryUploadPage
