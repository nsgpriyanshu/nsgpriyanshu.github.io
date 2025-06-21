'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import TiptapEditor from './editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\x00-\x7F]+/g, '')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function UploadBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

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

    const { error } = await supabase.from('blog').insert([
      {
        title,
        slug,
        content,
        author_id: user.id,
      },
    ])

    if (error) {
      toast.error('Failed to upload blog')
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
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="editor" className="text-muted-foreground text-sm">
          Blog Content
        </label>
        <TiptapEditor content={content} setContent={setContent} />
      </div>

      <Button onClick={handleUpload} disabled={loading} className="w-full">
        {loading ? 'Uploading...' : 'Upload Blog'}
      </Button>
    </div>
  )
}
