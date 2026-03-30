'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import TiptapEditor from './editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CloudUploadIcon, Loader2Icon, X } from 'lucide-react'
import { useAppHaptics } from '@/hooks/use-app-haptics'

function generateSlug(title: string): string {
  const sanitized = title
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return encodeURIComponent(sanitized)
}

export default function UploadBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const supabase = createClient()
  const { error: hapticError, success: hapticSuccess } = useAppHaptics()

  const addTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleUpload = async () => {
    if (!title.trim() || !content.trim()) {
      hapticError()
      toast.error('Title and content are required')
      return
    }

    setLoading(true)
    const slug = generateSlug(title)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      hapticError()
      toast.error('User not authenticated')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('blog').insert([
      {
        title,
        slug,
        content,
        author_id: user.id,
        tags,
      },
    ])

    if (error) {
      hapticError()
      toast.error(`Failed to upload blog: ${error.message}`)
      console.error(error)
    } else {
      hapticSuccess()
      toast.success('Blog uploaded successfully!')
      router.push(`/blog/${slug}`)
    }

    setLoading(false)
  }

  return (
    <section
      className="text-foreground mx-auto mt-8 w-full max-w-3xl space-y-6 px-4"
      aria-labelledby="blog-upload-heading"
    >
      <div className="space-y-2">
        <h1 id="blog-upload-heading" className="text-3xl font-bold">
          Write a Blog
        </h1>
        <p id="blog-upload-description" className="text-muted-foreground text-sm">
          Draft, tag, and publish a new article with rich text formatting.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-muted-foreground/70 text-sm">
          Blog Title
        </label>
        <Input
          id="title"
          placeholder="Enter your blog title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground border"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-muted-foreground/70 text-sm">
          Tags (press Enter to add)
        </label>
        <Input
          id="tags"
          placeholder="Add tags like tech, frontend, etc."
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          aria-describedby="blog-tags-help"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground border"
        />
        <p id="blog-tags-help" className="text-muted-foreground text-xs">
          Press Enter to add a tag. Use the remove buttons to delete tags.
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="Selected tags">
          {tags.map(tag => (
            <li key={tag}>
              <Badge
                variant="secondary"
                className="bg-secondary text-secondary-foreground flex items-center gap-1 text-sm"
              >
                {tag}
                <button aria-label={`Remove ${tag} tag`} onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <label htmlFor="editor" className="text-muted-foreground/70 text-sm">
          Blog Content
        </label>
        <TiptapEditor content={content} setContent={setContent} />
      </div>

      <Button
        onClick={handleUpload}
        disabled={loading}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
            Uploading...
          </>
        ) : (
          <>
            <CloudUploadIcon className="h-4 w-4" aria-hidden="true" />
            Upload Blog
          </>
        )}
      </Button>
    </section>
  )
}
