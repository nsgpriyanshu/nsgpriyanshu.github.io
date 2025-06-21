import UploadBlogPage from '@/components/blog/upload'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Stranger — Upload Blog`,
  description: 'Share your ideas and publish blog posts that reflect your thoughts and creativity.',
}

const BlogUploadPage = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <UploadBlogPage />
      </section>
    </div>
  )
}

export default BlogUploadPage
