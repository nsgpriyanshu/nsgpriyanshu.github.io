'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ImageUpIcon, Loader2Icon, X } from 'lucide-react'
import Image from 'next/image'

export default function UploadGalleryPage() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [photographerName, setPhotographerName] = useState('')
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!title.trim() || !image || !photographerName.trim()) {
      toast.error('Title, image, and photographer name are required')
      return
    }

    setLoading(true)
    const imageExtension = image.name.split('.').pop()
    const imagePath = `image-${Date.now()}.${imageExtension}`

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      toast.error('User not authenticated')
      setLoading(false)
      return
    }

    const { error: uploadError } = await supabase.storage.from('gallery').upload(imagePath, image)

    if (uploadError) {
      toast.error(`Failed to upload image: ${uploadError.message}`)
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('gallery').insert([
      {
        title,
        image_path: imagePath,
        tags,
        location: location.trim() || null,
        photographer_name: photographerName,
      },
    ])

    if (insertError) {
      toast.error(`Failed to save gallery entry: ${insertError.message}`)
      await supabase.storage.from('gallery').remove([imagePath])
    } else {
      toast.success('Image uploaded successfully!')
      router.push('/gallery')
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl space-y-6 px-4">
      <h1 className="text-foreground text-3xl font-bold">Upload to Gallery</h1>

      {/* Title */}
      <div className="space-y-1">
        <label htmlFor="title" className="text-muted-foreground text-sm">
          Image Title
        </label>
        <Input
          id="title"
          placeholder="Enter image title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Photographer */}
      <div className="space-y-1">
        <label htmlFor="photographer" className="text-muted-foreground text-sm">
          Photographer Name
        </label>
        <Input
          id="photographer"
          placeholder="Enter photographer's name"
          value={photographerName}
          onChange={e => setPhotographerName(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="space-y-1">
        <label htmlFor="location" className="text-muted-foreground text-sm">
          Location (Optional)
        </label>
        <Input
          id="location"
          placeholder="Where was this photo taken?"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="space-y-1">
        <label htmlFor="tags" className="text-muted-foreground text-sm">
          Tags (press Enter to add)
        </label>
        <Input
          id="tags"
          placeholder="Add tags like nature, portrait, etc."
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="hover:bg-primary hover:text-background flex items-center gap-1 text-xs transition"
            >
              {tag}
              <button onClick={() => removeTag(tag)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label htmlFor="image" className="text-muted-foreground text-sm">
          Upload Image
        </label>
        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        {image && imagePreview && (
          <div className="border-primary/10 bg-primary/5 mt-3 overflow-hidden rounded-lg border p-2">
            <Image
              src={imagePreview}
              alt="Preview"
              width={800}
              height={600}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleUpload}
        disabled={loading}
        className="hover:bg-primary/90 flex w-full items-center justify-center gap-2 transition"
      >
        {loading ? (
          <>
            <Loader2Icon className="h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <ImageUpIcon className="h-4 w-4" />
            Upload Image
          </>
        )}
      </Button>
    </div>
  )
}
