'use client'

import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { Input } from '@/components/ui/input'
import { Blog } from '@/types/blog'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { NotebookPenIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const BlogPage: React.FC = () => {
  const { resolvedTheme } = useTheme()

  const supabase = createClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: userData, error } = await supabase.auth.getUser()
      if (!error && userData.user) {
        setIsAuthenticated(true)
      }
    }
    checkAuth()
  }, [supabase])

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, author:author_id(*)')
        .order('publish_date', { ascending: false })

      if (!error && data) {
        setBlogs(data)
        setFilteredBlogs(data)
      } else {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [supabase])

  // Filter blogs based on search and tags
  useEffect(() => {
    let results = blogs
    if (search) {
      results = results.filter(
        b =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          JSON.stringify(b.content).toLowerCase().includes(search.toLowerCase()),
      )
    }
    if (activeTag) {
      results = results.filter(b => b.tags?.includes(activeTag))
    }
    setFilteredBlogs(results)
  }, [search, activeTag, blogs])

  const uniqueTags = Array.from(new Set(blogs.flatMap(b => b.tags || [])))

  return (
    <Wrapper className="relative min-h-screen py-12 lg:py-16">
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h1 className="text-foreground text-3xl font-medium md:text-4xl lg:text-5xl">
            Blog & Articles
          </h1>
        </AnimationContainer>
        <AnimationContainer animation="fadeUp" delay={0.3}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
            Read the articles and stories, that I have crafted in my life.
          </p>
        </AnimationContainer>
      </div>

      {/* Search and Tags */}
      <AnimationContainer animation="fadeUp" delay={0.4}>
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-4">
          <Input
            placeholder="Search for inspiration..."
            className="border-primary/20 bg-primary/10 text-muted-foreground dark:border-secondary/20 dark:bg-secondary/10 w-full rounded-lg border p-3 text-sm backdrop-blur-sm md:text-base"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {uniqueTags.map(tag => (
              <Badge
                key={tag}
                variant={tag === activeTag ? 'default' : 'outline'}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className="text-muted-foreground hover:bg-primary hover:text-foreground dark:hover:bg-secondary cursor-pointer rounded-lg px-3 py-1 text-xs transition-all duration-200 md:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </AnimationContainer>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <AnimationContainer key={blog.id} animation="fadeUp" delay={0.2 * ((index % 3) + 1)}>
            <div className="border-primary/20 bg-primary/10 dark:border-secondary/20 dark:bg-secondary/10 relative min-h-[400px] overflow-hidden rounded-2xl border backdrop-blur-md">
              <Link
                href={`/blog/${blog.slug}`}
                className="group relative z-10 flex h-full flex-col p-5"
              >
                {blog.image_url && (
                  <div className="mb-4 h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      width={400}
                      height={200}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={e => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none' // Hide image on error
                      }}
                    />
                  </div>
                )}
                <h3 className="text-foreground mb-2 line-clamp-2 text-xl font-medium md:text-2xl">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 text-sm md:text-base">
                  {typeof blog.content === 'string'
                    ? blog.content.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...'
                    : JSON.stringify(blog.content).slice(0, 150) + '...'}
                </p>
                {/* Author Info */}
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={blog.author?.profile_picture || '/assets/default-avatar.png'}
                    alt={blog.author?.name || 'Author'}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-foreground text-sm font-semibold">
                      {blog.author?.name || 'Unknown Author'}
                    </span>
                    {blog.author?.role && (
                      <span className="text-muted-foreground text-xs">{blog.author.role}</span>
                    )}
                    <p className="text-muted-foreground text-xs">
                      {new Date(blog.publish_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </AnimationContainer>
        ))}
      </div>

      {/* CTA Buttons */}
      <AnimationContainer animation="fadeUp" delay={0.5}>
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          {isAuthenticated && (
            <Link href="/blog/upload">
              <Button
                size="lg"
                className="bg-primary/10 hover:bg-primary/20 text-foreground dark:bg-secondary/10 dark:hover:bg-secondary/20 w-full transition-colors md:w-auto"
              >
                <NotebookPenIcon className="mr-2 h-5 w-5" /> Share Your Story
              </Button>
            </Link>
          )}
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}

export default BlogPage
