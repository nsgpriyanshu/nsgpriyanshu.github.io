'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Wrapper from '@/components/global/wrapper'
import AnimationContainer from '@/components/global/animation-container'

import { useTheme } from 'next-themes'

// Dynamically import TiptapEditor
const TiptapEditor = dynamic(() => import('@/components/blog/editor'), { ssr: false })

function UploadBlogPage() {
  const { resolvedTheme } = useTheme()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/sign-in')
      } else {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !user) {
      toast.error('Please complete all required fields.')
      return
    }

    setLoading(true)

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    let imageUrl = ''

    if (image) {
      const fileExt = image.name.split('.').pop()
      const filePath = `covers/${slug}.${fileExt}`

      const { data, error } = await supabase.storage.from('blog-images').upload(filePath, image)

      if (error) {
        console.error('Upload error:', error)
        toast.error(`Image upload failed: ${error.message}`)
        setLoading(false)
        return
      }

      const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      imageUrl = `${projectUrl}/storage/v1/object/public/blog-images/${filePath}`
    }

    let { data: author, error: authorError } = await supabase
      .from('authors')
      .select('*')
      .eq('id', user.id)
      .single()

    if (authorError && authorError.code === 'PGRST116') {
      const { data: newAuthor, error: insertAuthorError } = await supabase
        .from('authors')
        .insert({
          id: user.id,
          name: user.user_metadata?.name || 'Unknown',
          email: user.email,
          profile_picture: user.user_metadata?.avatar_url || null,
        })
        .select()
        .single()

      if (insertAuthorError) {
        toast.error('Failed to create author: ' + insertAuthorError.message)
        setLoading(false)
        return
      }
      author = newAuthor
    } else if (authorError) {
      toast.error('Error fetching author: ' + authorError.message)
      setLoading(false)
      return
    }

    const { error: blogError } = await supabase.from('blogs').insert({
      title,
      slug,
      content,
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      author_id: author.id,
      publish_date: new Date().toISOString(),
      image_url: imageUrl || null,
    })

    if (blogError) {
      toast.error(blogError.message)
      setLoading(false)
      return
    }

    toast.success('Blog uploaded successfully!')
    router.push('/blog')
    setLoading(false)
  }

  return (
    <Wrapper className="min-h-screen py-12 lg:py-16">
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.3}>
          <h1 className="text-foreground text-3xl font-medium md:text-4xl lg:text-5xl">
            Share your Story
          </h1>
        </AnimationContainer>
        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
            Whats in your mind? Share your thoughts, ideas, and experiences with the world. Whether
            it's a personal story, a technical insight, or a creative piece, we want to hear it!
          </p>
        </AnimationContainer>
      </div>

      {/* Form Section */}
      <AnimationContainer animation="fadeUp" delay={0.5}>
        <form
          onSubmit={handleSubmit}
          className="border-primary/20 bg-primary/10 dark:border-secondary/20 dark:bg-secondary/10 mx-auto max-w-3xl space-y-6 rounded-2xl border p-6 backdrop-blur-md md:p-8"
        >
          <Input
            placeholder="Blog Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="border-primary/20 bg-primary/10 text-muted-foreground dark:border-secondary/20 dark:bg-secondary/10 rounded-lg border p-3 text-sm backdrop-blur-sm md:text-base"
          />
          <Input
            placeholder="Tags (comma separated, e.g., Tech, Art, WhatsNew)"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="border-primary/20 bg-primary/10 text-muted-foreground dark:border-secondary/20 dark:bg-secondary/10 rounded-lg border p-3 text-sm backdrop-blur-sm md:text-base"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] ?? null)}
            className="border-primary/20 bg-primary/10 text-muted-foreground dark:border-secondary/20 dark:bg-secondary/10 rounded-lg border p-3 text-sm backdrop-blur-sm md:text-base"
          />
          <TiptapEditor content={content} setContent={setContent} />
          <Button
            type="submit"
            size="lg"
            className="bg-primary hover:bg-primary/20 text-foreground dark:bg-secondary dark:hover:bg-secondary/20 w-full transition-colors md:w-auto"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Publish Your Blog'}
          </Button>
        </form>
      </AnimationContainer>
    </Wrapper>
  )
}

export default UploadBlogPage
