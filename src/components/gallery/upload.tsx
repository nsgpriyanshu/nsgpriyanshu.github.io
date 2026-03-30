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
import { useAppHaptics } from '@/hooks/use-app-haptics'

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!title.trim() || !image || !photographerName.trim()) {
      hapticError()
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
      hapticError()
      toast.error('User not authenticated')
      setLoading(false)
      return
    }

    const { error: uploadError } = await supabase.storage.from('gallery').upload(imagePath, image)

    if (uploadError) {
      hapticError()
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
      hapticError()
      toast.error(`Failed to save gallery entry: ${insertError.message}`)
      await supabase.storage.from('gallery').remove([imagePath])
    } else {
      hapticSuccess()
      toast.success('Image uploaded successfully!')
      router.push('/gallery')
    }

    setLoading(false)
  }

  return (
    <section
      className="mx-auto mt-10 w-full max-w-3xl space-y-6 px-4"
      aria-labelledby="gallery-upload-heading"
    >
      <div className="space-y-2">
        <h1 id="gallery-upload-heading" className="text-foreground text-3xl font-bold">
          Upload to Gallery
        </h1>
        <p id="gallery-upload-description" className="text-muted-foreground text-sm">
          Add a visual with descriptive metadata so it is easier to browse and discover.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <label htmlFor="title" className="text-muted-foreground/70 text-sm">
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
        <label htmlFor="photographer" className="text-muted-foreground/70 text-sm">
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
        <label htmlFor="location" className="text-muted-foreground/70 text-sm">
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
        <label htmlFor="tags" className="text-muted-foreground/70 text-sm">
          Tags (press Enter to add)
        </label>
        <Input
          id="tags"
          placeholder="Add tags like nature, portrait, etc."
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          aria-describedby="gallery-tags-help"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
        />
        <p id="gallery-tags-help" className="text-muted-foreground text-xs">
          Press Enter to add a tag. Remove tags using the small close buttons.
        </p>
        <ul className="flex flex-wrap gap-2 pt-1" aria-label="Selected image tags">
          {tags.map(tag => (
            <li key={tag}>
              <Badge
                variant="secondary"
                className="hover:bg-primary hover:text-background flex items-center gap-1 text-xs transition"
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

      {/* Image Upload */}
      <div className="space-y-2">
        <label htmlFor="image" className="text-muted-foreground/70 text-sm">
          Upload Image
        </label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          aria-describedby="gallery-image-help"
          onChange={handleImageChange}
        />
        <p id="gallery-image-help" className="text-muted-foreground text-xs">
          Choose a single image file to preview before upload.
        </p>
        {image && imagePreview && (
          <div className="border-primary/10 bg-primary/5 mt-3 overflow-hidden rounded-lg border p-2">
            <Image
              src={imagePreview}
              alt={`Preview of ${title || 'selected image'}`}
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
            <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
            Uploading...
          </>
        ) : (
          <>
            <ImageUpIcon className="h-4 w-4" aria-hidden="true" />
            Upload Image
          </>
        )}
      </Button>
    </section>
  )
}
