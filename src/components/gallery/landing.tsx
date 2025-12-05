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
import { LucideMapPin, Trash2, AlertTriangle, X, Check } from 'lucide-react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

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
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [targetToDelete, setTargetToDelete] = useState<GalleryItem | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error('Error fetching gallery:', error)
      else setGallery(data || [])
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
    return data.publicUrl
  }

  const handleDelete = async () => {
    if (!targetToDelete) return
    const { error } = await supabase.from('gallery').delete().eq('id', targetToDelete.id)

    if (error) {
      console.error('Failed to delete:', error)
    } else {
      setGallery(prev => prev.filter(item => item.id !== targetToDelete.id))
    }

    setConfirmDelete(false)
    setTargetToDelete(null)
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
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition"
            >
              All
            </Badge>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                onClick={() => setSelectedTag(tag)}
                className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition"
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
            <div className="group bg-primary/5 hover:bg-primary/10 rounded-xl p-3 shadow transition-all duration-200">
              <div
                className="relative mb-3 aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={getImageUrl(item.image_path)}
                  alt={item.title}
                  fill
                  className="rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h2 className="text-foreground text-lg font-semibold">{item.title}</h2>
              <p className="text-muted-foreground/70 flex items-center gap-1 text-sm">
                By{' '}
                <span className="text-muted-foreground flex items-center gap-1 font-medium">
                  {item.photographer_name}
                  <RiVerifiedBadgeFill className="text-muted-foreground/70 h-4 w-4" />
                </span>{' '}
                • {format(new Date(item.created_at), 'dd MMM yyyy')}
              </p>

              {item.location && (
                <p className="text-muted-foreground/50 flex items-center gap-1 text-xs">
                  <LucideMapPin size={14} className="text-primary" />
                  {item.location}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-muted text-muted-foreground text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {isAuthenticated && (
                <div className="mt-3 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setTargetToDelete(item)
                      setConfirmDelete(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </AnimationContainer>
        ))}

        {filteredGallery.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">No images found.</p>
        )}
      </div>

      {/* Glassmorphic Dialog for Image Preview */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-full max-w-3xl rounded-2xl border shadow-2xl backdrop-blur-sm">
          {selectedImage && (
            <>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={getImageUrl(selectedImage.image_path)}
                  alt={selectedImage.title}
                  fill
                  className="rounded-lg border object-cover"
                  priority
                />
              </div>
              <div className="text-muted-foreground/70 mt-4 space-y-2 text-sm">
                <h2 className="text-foreground text-2xl font-bold">{selectedImage.title}</h2>
                <p className="text-muted-foreground/70">
                  Shot by{' '}
                  <span className="text-foreground flex items-center gap-1 font-medium">
                    {selectedImage.photographer_name}{' '}
                    <RiVerifiedBadgeFill className="text-muted-foreground h-4 w-4" />
                  </span>{' '}
                  On: {format(new Date(selectedImage.created_at), 'dd MMM yyyy')}
                </p>
                {selectedImage.location && (
                  <p className="flex items-center gap-1">
                    <LucideMapPin size={16} className="text-primary" />
                    {selectedImage.location}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-muted text-muted-foreground text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      {confirmDelete && targetToDelete && (
        <div className="bg-background/10 fixed inset-0 z-50 flex items-center justify-center">
          <div className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-96 rounded-2xl border p-6 text-center shadow-lg backdrop-blur-sm md:w-2xl">
            <div className="flex flex-col items-center">
              <AlertTriangle className="text-destructive mb-4 h-8 w-8" />
              <h3 className="text-foreground mb-2 text-lg font-semibold">Confirm Delete</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this photo?
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setConfirmDelete(false)}
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
