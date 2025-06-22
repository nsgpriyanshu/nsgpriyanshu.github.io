'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Loader2, ArrowLeft, PenToolIcon } from 'lucide-react'
import AnimationContainer from '@/components/global/animation-container'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import parse from 'html-react-parser'

interface Blog {
  title: string
  slug: string
  content: string
  created_at: string
  author_name: string
  tags: string[]
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog')
        .select('title, slug, content, created_at, author_name, tags')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        console.error('Error fetching blog:', error?.message)
        setLoading(false)
        return
      }

      setBlog(data)
      setLoading(false)
    }

    fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-muted-foreground flex h-screen items-center justify-center">
        Blog not found.
      </div>
    )
  }

  return (
    <AnimationContainer
      animation="fadeUp"
      delay={0.1}
      className="bg-primary/5 mx-auto max-w-3xl rounded-lg p-6 transition-colors"
    >
      <div>
        {/* Return to Blog Link */}
        <button
          onClick={() => router.push('/blog')}
          className="text-foreground mb-6 flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Blog
        </button>

        {/* Heading */}
        <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{blog.title}</h1>
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Separator */}
        <hr className="border-primary/10 my-6 border-t" />

        {/* Content */}
        <div className="prose prose-sm dark:prose-invert mb-6 max-w-none">
          {parse(blog.content)}
        </div>

        {/* Separator */}
        <hr className="border-primary/10 my-6 border-t" />

        {/* Author Name and Date */}
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <PenToolIcon className="h-4 w-4" />
          <span>
            Written By{' '}
            <span className="text-foreground font-medium">{blog.author_name || 'Anonymous'}</span>
            <br />
            {format(new Date(blog.created_at), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
    </AnimationContainer>
  )
}
