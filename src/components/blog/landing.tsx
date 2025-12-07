'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AnimationContainer from '@/components/global/animation-container'
import { format } from 'date-fns'
import { readingTimeFromHtml } from '@/lib/reading-time'
import { createClient } from '@/lib/supabase/client'
import { Trash2, AlertTriangle, X, Check, Clock } from 'lucide-react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Blog {
  id: number
  title: string
  slug: string
  content: string
  created_at: string
  tags: string[]
  author_name: string
}

function BlogCard({
  blog,
  index,
  isAuth,
  onDelete,
}: {
  blog: Blog
  index: number
  isAuth: boolean
  onDelete: () => void
}) {
  const router = useRouter()
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        onClick={() => router.push(`/blog/${blog.slug}`)}
        className="hover:bg-primary/10 cursor-pointer rounded-lg p-2 transition-all duration-300 hover:translate-x-1"
      >
        <div className="text-muted-foreground/50 mb-2 text-xs">
          {format(new Date(blog.created_at), 'dd MMM yyyy')} ·{' '}
          <span className="inline-flex items-center gap-1">
            <Clock className="text-muted-foreground/80 h-3 w-3" />
            {readingTimeFromHtml(blog.content)}
          </span>
        </div>
        <h2 className="text-foreground mb-1 text-xl font-semibold">{blog.title}</h2>
        <div className="text-muted-foreground/70 mb-2 flex items-center gap-1 text-xs">
          By {blog.author_name}
          <RiVerifiedBadgeFill className="text-muted-foreground/70 h-3 w-3" />
        </div>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {isAuth && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10"
            onClick={e => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export default function LandingPage() {
  const supabase = createClient()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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
  }, [supabase])

  const handleDelete = async () => {
    if (selectedBlogId === null) return

    const { error } = await supabase.from('blog').delete().eq('id', selectedBlogId)

    if (!error) {
      setBlogs(prev => prev.filter(blog => blog.id !== selectedBlogId))
      setShowDeleteConfirm(false)
      setSelectedBlogId(null)
    } else {
      console.error('Delete failed:', error.message)
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))

  return (
    <div>
      <AnimationContainer animation="fadeUp" delay={0.1}>
        <div className="mb-6 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start">
            <h1 className="text-foreground text-4xl font-bold sm:text-left">Blogs</h1>
            <p className="text-muted-foreground/70 text-sm">Read the insights, shared by me</p>
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

      <div className="space-y-6">
        {filteredBlogs.map((blog, index) => (
          <div key={blog.id}>
            <BlogCard
              blog={blog}
              index={index}
              isAuth={isAuthenticated}
              onDelete={() => {
                setSelectedBlogId(blog.id)
                setShowDeleteConfirm(true)
              }}
            />
            {index < filteredBlogs.length - 1 && <hr className="border-primary/10 my-6" />}
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <p className="text-muted-foreground py-8 text-center">No blogs found.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="bg-background/10 fixed inset-0 z-50 flex items-center justify-center">
          <div className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-96 rounded-2xl border p-6 text-center shadow-lg backdrop-blur-sm md:w-2xl">
            <div className="flex flex-col items-center">
              <AlertTriangle className="text-destructive mb-4 h-8 w-8" />
              <h3 className="text-foreground mb-2 text-lg font-semibold">Confirm Delete</h3>
              <p className="text-muted-foreground/70 mb-6">
                Are you sure you want to delete this blog?
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
