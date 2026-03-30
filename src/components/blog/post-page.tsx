'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, PenToolIcon } from 'lucide-react'
import AnimationContainer from '@/components/global/animation-container'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { readingTimeFromHtml } from '@/lib/reading-time'
import parse from 'html-react-parser'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

export interface BlogPost {
  title: string
  slug: string
  content: string
  created_at: string
  author_name: string
  tags: string[]
}

export default function BlogPostPage({ blog }: { blog: BlogPost }) {
  const router = useRouter()

  return (
    <AnimationContainer
      animation="fadeUp"
      delay={0.1}
      className="bg-primary/5 text-foreground mx-auto max-w-3xl rounded-lg p-6 transition-colors"
    >
      <article aria-labelledby="blog-post-title">
        <button
          onClick={() => router.push('/blog')}
          className="text-foreground mb-6 flex items-center gap-2 text-sm font-medium hover:underline"
          aria-label="Return to the blog listing"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Return to Blog
        </button>

        <header>
          <h1 id="blog-post-title" className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            {blog.title}
          </h1>

          {blog.tags.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-2" aria-label="Post tags">
              {blog.tags.map(tag => (
                <li key={tag}>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}

          <p className="text-muted-foreground mb-2 text-sm" aria-label="Post metadata">
            <time dateTime={blog.created_at}>
              {format(new Date(blog.created_at), 'dd MMM yyyy')}
            </time>
            {' � '}
            {readingTimeFromHtml(blog.content)}
          </p>
        </header>

        <hr className="border-primary/10 my-4 border-t" aria-hidden="true" />

        <div className="prose prose-sm dark:prose-invert mb-6 max-w-none">
          {parse(blog.content)}
        </div>

        <hr className="border-primary/10 my-6 border-t" aria-hidden="true" />

        <footer className="text-muted-foreground flex items-center gap-2 text-sm">
          <PenToolIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-foreground flex items-center gap-1 font-medium">
            {blog.author_name || 'Anonymous'}
            <RiVerifiedBadgeFill className="text-primary h-4 w-4" aria-hidden="true" />
          </span>
        </footer>
      </article>
    </AnimationContainer>
  )
}
