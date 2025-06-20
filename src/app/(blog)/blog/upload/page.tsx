import UploadBlogPage from '@/components/blog/upload'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Upload Blog`,
  description: 'Upload your blog posts to yor thoughts',
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
