import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import StructuredData from '@/components/seo/structured-data'
import BlogPostPage, { type BlogPost } from '@/components/blog/post-page'
import { absoluteUrl, generateMetadata as buildMetadata, siteConfig } from '@/utils'

async function getBlog(slug: string): Promise<BlogPost | null> {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog')
    .select('title, slug, content, created_at, author_name, tags')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    return buildMetadata({
      title: `Post Not Found | ${siteConfig.name}`,
      description: 'The requested blog post could not be found.',
      path: `/blog/${slug}`,
      image: siteConfig.images.blog,
      noIndex: true,
    })
  }

  const excerpt = blog.content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155)

  return buildMetadata({
    title: `${blog.title} | ${siteConfig.name}`,
    description: excerpt || `Read ${blog.title} on ${siteConfig.name}.`,
    path: `/blog/${blog.slug}`,
    image: siteConfig.images.blog,
    keywords: blog.tags,
    type: 'article',
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) notFound()

  const excerpt = blog.content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155)

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: excerpt,
          datePublished: blog.created_at,
          dateModified: blog.created_at,
          url: absoluteUrl(`/blog/${blog.slug}`),
          mainEntityOfPage: absoluteUrl(`/blog/${blog.slug}`),
          author: {
            '@type': 'Person',
            name: blog.author_name || siteConfig.creator,
          },
          publisher: {
            '@type': 'Person',
            name: siteConfig.creator,
          },
          keywords: blog.tags.join(', '),
        }}
      />
      <BlogPostPage blog={blog} />
    </>
  )
}
