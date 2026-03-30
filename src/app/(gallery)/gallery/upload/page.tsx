import UploadGalleryPage from '@/components/gallery/upload'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Upload to Gallery | ${siteConfig.name}`,
  description:
    'Add photography, artwork, or design work to the gallery with titles, tags, and location details.',
  path: '/gallery/upload',
  image: siteConfig.images.gallery,
  keywords: ['gallery upload', 'upload photography', 'visual portfolio'],
  noIndex: true,
})

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full" aria-labelledby="gallery-upload-heading">
        <UploadGalleryPage />
      </section>
    </div>
  )
}

export default Page
