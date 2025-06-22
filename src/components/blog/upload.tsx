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
      toast.error('User not authenticated')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.from('blog').insert([
      {
        title,
        slug,
        content,
        author_id: user.id,
        tags,
      },
    ])

    console.log({ data, error })

    if (error) {
      toast.error(`Failed to upload blog: ${error.message}`)
      console.error(error)
    } else {
      toast.success('Blog uploaded successfully!')
      router.push(`/blog/${slug}`)
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl space-y-6 px-4">
      <h1 className="text-foreground text-3xl font-bold">Write a Blog</h1>

      <div className="space-y-2">
        <label htmlFor="title" className="text-muted-foreground text-sm">
          Blog Title
        </label>
        <Input
          id="title"
          placeholder="Enter your blog title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-muted-foreground text-sm">
          Tags (press Enter to add)
        </label>
        <Input
          id="tags"
          placeholder="Add tags like tech, frontend, etc."
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-sm">
              {tag}
              <button onClick={() => removeTag(tag)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="editor" className="text-muted-foreground text-sm">
          Blog Content
        </label>
        <TiptapEditor content={content} setContent={setContent} />
      </div>

      <Button
        onClick={handleUpload}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2Icon className="h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <CloudUploadIcon className="h-4 w-4" />
            Upload Blog
          </>
        )}
      </Button>
    </div>
  )
}
