'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

export default function UploadGalleryPage() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>(null)
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
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!title.trim() || !image || !photographerName.trim()) {
      toast.error('Title, image, and photographer name are required')
      return
    }

    setLoading(true)
    const imageExtension = image.name.split('.').pop()
    const imagePath = `image-${Date.now()}.${imageExtension}` // Simplified image path

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      toast.error('User not authenticated')
      setLoading(false)
      return
    }

    // Upload image to Supabase storage
    const { error: uploadError } = await supabase.storage.from('gallery').upload(imagePath, image)

    if (uploadError) {
      toast.error(`Failed to upload image: ${uploadError.message}`)
      setLoading(false)
      return
    }

    // Insert metadata into gallery table
    const { data, error: insertError } = await supabase.from('gallery').insert([
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
      console.log('Insert successful:', data) // Debug log
      toast.success('Image uploaded successfully!', {
        duration: 5000, // Ensure toast stays visible longer
      })
      router.push('/gallery') // Redirect to gallery list
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl space-y-6 px-4">
      <h1 className="text-foreground text-3xl font-bold">Upload to Gallery</h1>

      <div className="space-y-2">
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

      <div className="space-y-2">
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

      <div className="space-y-2">
        <label htmlFor="location" className="text-muted-foreground text-sm">
          Location (Optional)
        </label>
        <Input
          id="location"
          placeholder="Enter location where photo was taken"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
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
        <label htmlFor="image" className="text-muted-foreground text-sm">
          Upload Image
        </label>
        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        {image && <p className="text-muted-foreground text-sm">{image.name}</p>}
      </div>

      <Button onClick={handleUpload} disabled={loading} className="w-full">
        {loading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </div>
  )
}
