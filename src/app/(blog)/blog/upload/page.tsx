import UploadBlogPage from '@/components/blog/upload'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Write a Blog | ${siteConfig.name}`,
  description:
    'Create and publish a new blog post with rich formatting, tags, and polished presentation.',
  path: '/blog/upload',
  image: siteConfig.images.blog,
  keywords: ['write blog', 'publish article', 'blog editor'],
  noIndex: true,
})

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full" aria-labelledby="blog-upload-heading">
        <UploadBlogPage />
      </section>
    </div>
  )
}

export default Page
