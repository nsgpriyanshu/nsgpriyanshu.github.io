import React from 'react'
import { CalendarDays } from 'lucide-react'
import GradientBackground from './global/gradient-background'
import AnimationContainer from './global/animation'
import { Post } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import MarkdownRenderer from './global/markdown-render'

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  let parsedDate: Date | null = null

  const parseCustomDate = (dateString: string): Date | null => {
    const regex = /(\w+), (\d{2})-(\d{2})-(\d{4})/
    const match = dateString.match(regex)
    if (match) {
      const day = parseInt(match[2], 10) // Day
      const month = parseInt(match[3], 10) - 1 // Month (0-based)
      const year = parseInt(match[4], 10) // Year
      return new Date(year, month, day) // Create Date object
    }
    return null // Return null if parsing fails
  }

  if (post.date) {
    parsedDate = parseCustomDate(post.date)
  }

  // Calculate time ago with error handling
  const timeAgo =
    parsedDate && !isNaN(parsedDate.getTime())
      ? formatDistanceToNow(parsedDate, { addSuffix: true })
      : 'Long Time Ago'

  return (
    // <GradientBackground>
    <AnimationContainer customClassName="min-h-screen py-12">
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <article>
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="mb-4">
            <p>
              Written by {post.author} on {post.date}
            </p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                {timeAgo} {/* Display dynamic time */}
              </span>
              {/* Uncomment the view count if needed */}
              {/* <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  50 views
                </span> */}
            </div>
          </div>
          <div className="z-[999999] mt-20">
            {/* Use MarkdownRenderer to render the post content */}
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </main>
    </AnimationContainer>
    // </GradientBackground>
  )
}
