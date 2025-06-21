'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import AnimationContainer from '@/components/global/animation-container'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Blog {
  id: number
  title: string
  slug: string
  content: string
  created_at: string
  tags: string[]
}

export default function LandingPage() {
  const supabase = createClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setBlogs(data)
    }
    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <AnimationContainer animation="fadeUp" delay={0.1}>
        <h1 className="text-foreground mb-4 text-center text-4xl font-bold">Blogs</h1>
        <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="max-w-md"
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
        {filteredBlogs.map(blog => (
          <AnimationContainer key={blog.id} animation="fadeUp" delay={0.2}>
            <div
              className={cn(
                'border-primary/10 bg-primary/10 rounded-xl border p-6 shadow backdrop-blur-md transition-all',
                'hover:border-primary/30 hover:bg-primary/20',
              )}
            >
              <div className="text-muted-foreground mb-2 text-xs">
                {format(new Date(blog.created_at), 'dd MMM yyyy')}
              </div>
              <h2 className="text-foreground mb-2 text-xl font-semibold">{blog.title}</h2>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimationContainer>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="text-muted-foreground text-center">No blogs found.</p>
        )}
      </div>
    </div>
  )
}
