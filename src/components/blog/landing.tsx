'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AnimationContainer from '@/components/global/animation-container'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'

interface Blog {
  id: number
  title: string
  slug: string
  content: string
  created_at: string
  tags: string[]
  author_name: string
}

export default function LandingPage() {
  const supabase = createClient()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setBlogs(data)
    }

    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }

    fetchBlogs()
    checkAuth()
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))

  return (
    <div className="bg-background text-foreground mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <AnimationContainer animation="fadeUp" delay={0.1}>
        <div className="mb-4 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start">
            <h1 className="text-foreground text-4xl font-bold sm:text-left">Blogs</h1>
            <p className="text-muted-foreground mb-2 text-sm">Read the insights, shared by me</p>
          </div>

          {isAuthenticated && (
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push('/blog/upload')}
            >
              Write Blog
            </Button>
          )}
        </div>

        <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground max-w-md border"
          />
          <div className="mt-2 flex flex-wrap gap-2 sm:mt-0">
            <Badge
              variant={selectedTag === '' ? 'default' : 'outline'}
              onClick={() => setSelectedTag('')}
              className="cursor-pointer"
            >
              All
            </Badge>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                onClick={() => setSelectedTag(tag)}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </AnimationContainer>

      <div className="grid gap-6">
        {filteredBlogs.map((blog, index) => (
          <div key={blog.id}>
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <div
                onClick={() => router.push(`/blog/${blog.slug}`)}
                className="hover:bg-primary/10 cursor-pointer rounded-lg p-2 transition-colors"
              >
                <div className="text-muted-foreground mb-2 text-xs">
                  {format(new Date(blog.created_at), 'dd MMM yyyy')}
                </div>
                <h2 className="text-foreground mb-1 text-xl font-semibold">{blog.title}</h2>
                <div className="text-muted-foreground mb-2 text-xs">By {blog.author_name}</div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-muted text-muted-foreground text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimationContainer>
            {index < filteredBlogs.length - 1 && <hr className="border-primary/10 my-6 border-t" />}
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="text-muted-foreground text-center">No blogs found.</p>
        )}
      </div>
    </div>
  )
}
