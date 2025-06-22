import UploadGalleryPage from '@/components/gallery/upload'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Stranger — Upload to Gallery`,
  description: 'Showcase your creativity by uploading visual content and artwork to the gallery.',
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
