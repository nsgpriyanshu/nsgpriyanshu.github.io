'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Loader2 } from 'lucide-react'
import AnimationContainer from '@/components/global/animation-container'
import { cn } from '@/lib/utils'
import parse from 'html-react-parser'
import { createClient } from '@/lib/supabase/client'

interface Blog {
  title: string
  slug: string
  content: string
  created_at: string
  author: {
    name: string
  }
}

export default function BlogDetailPage() {
  const router = useRouter()
  const { slug } = router.query
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return

      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog')
        .select('title, slug, content, created_at, author(name)')
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Error fetching blog:', error)
      } else {
        // Supabase returns author as an array, extract the first element
        setBlog({
          ...data,
          author: Array.isArray(data.author) ? data.author[0] : data.author,
        })
      }
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
    <AnimationContainer animation="fadeUp" delay={0.1} className="mx-auto max-w-3xl p-6">
      <div
        className={cn(
          'border-primary/10 bg-primary/5 rounded-2xl border p-6 shadow-xl backdrop-blur-md',
          'dark:border-primary/10 dark:bg-background/10',
        )}
      >
        <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{blog.title}</h1>
        <div className="text-muted-foreground mb-6 text-sm">
          By <span className="text-foreground font-medium">{blog.author?.name}</span> •{' '}
          {new Date(blog.created_at).toLocaleDateString()}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">{parse(blog.content)}</div>
      </div>
    </AnimationContainer>
  )
}
