'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import AnimationContainer from '@/components/global/animation-container'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { LucideMapPin } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  image_path: string
  tags: string[]
  location?: string
  photographer_name: string
  created_at: string
}

export default function GalleryPage() {
  const supabase = createClient()
  const router = useRouter()
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching gallery:', error)
      } else if (data) {
        setGallery(data)
        console.log('Fetched gallery data:', data) // Debug log
      }
    }

    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }

    fetchGallery()
    checkAuth()
  }, [supabase])

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(gallery.flatMap(item => item.tags)))

  const getImageUrl = (path: string) => {
    const { data } = supabase.storage.from('gallery').getPublicUrl(path)
    console.log('Image URL:', data.publicUrl) // Debug log
    return data.publicUrl
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <AnimationContainer animation="fadeUp" delay={0.1}>
        <div className="mb-4 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start">
            <h1 className="text-foreground text-4xl font-bold">Gallery</h1>
            <p className="text-muted-foreground text-sm">
              A showcase of my best photographic shots.
            </p>
          </div>
          {isAuthenticated && (
            <Button onClick={() => router.push('/gallery/upload')}>Upload Photo</Button>
          )}
        </div>

        <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Input
            type="text"
            placeholder="Search photos by title..."
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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGallery.map(item => (
          <AnimationContainer key={item.id} animation="fadeUp" delay={0.15}>
            <div className="bg-primary/5 hover:bg-primary/10 rounded-xl p-3 shadow transition-all">
              <div
                className="bg-muted relative mb-3 aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={getImageUrl(item.image_path)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  onError={e => console.error('Image failed to load:', item.image_path)}
                />
              </div>
              <h2 className="text-foreground text-lg font-semibold">{item.title}</h2>
              <p className="text-muted-foreground text-sm">
                By <span className="font-medium">{item.photographer_name}</span> •{' '}
                {format(new Date(item.created_at), 'dd MMM yyyy')}
              </p>
              {item.location && (
                <p className="text-muted-foreground flex items-center gap-1 text-xs">
                  <span className="text-primary">
                    <LucideMapPin size={14} />
                  </span>
                  {item.location}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimationContainer>
        ))}

        {filteredGallery.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">No images found.</p>
        )}
      </div>

      {/* Glassmorphic Dialog for expanded image */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-96 rounded-2xl border shadow-lg backdrop-blur-md md:w-2xl">
          {selectedImage && (
            <>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={getImageUrl(selectedImage.image_path)}
                  alt={selectedImage.title}
                  fill={true}
                  className="rounded-lg border object-cover"
                  priority
                  onError={() =>
                    console.error('Dialog image failed to load:', selectedImage.image_path)
                  }
                />
              </div>
              <div className="dark:text-muted-foreground mt-4 space-y-2 text-sm">
                <h2 className="text-foreground text-2xl font-bold">{selectedImage.title}</h2>
                <p>
                  Shot by <span className="font-medium">{selectedImage.photographer_name}</span> •{' '}
                  {format(new Date(selectedImage.created_at), 'dd MMM yyyy')}
                </p>
                {selectedImage.location && (
                  <p className="flex items-center gap-1">
                    <span className="text-primary">
                      <LucideMapPin size={16} />
                    </span>
                    {selectedImage.location}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
