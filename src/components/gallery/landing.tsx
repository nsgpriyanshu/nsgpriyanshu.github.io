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
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface GalleryItem {
  id: string
  title: string
  image_path: string
  tags: string[]
  location?: string
  photographer_name: string
  created_at: string
}

function GalleryCard({
  item,
  index,
  isAuth,
  onSelect,
  onDelete,
}: {
  item: GalleryItem
  index: number
  isAuth: boolean
  onSelect: (item: GalleryItem) => void
  onDelete: (item: GalleryItem) => void
}) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const normalizeImageUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http') || path.startsWith('data:')) return path

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    if (!supabaseUrl) return path

    // If path is just a filename, construct full Supabase storage URL
    if (!path.includes('/')) {
      return `${supabaseUrl}/storage/v1/object/public/gallery/${path}`
    }

    // Otherwise, assume it's already a relative path
    return `${supabaseUrl}/${path}`
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      onClick={() => onSelect(item)}
      className="group relative h-56 w-full cursor-pointer overflow-hidden rounded-lg sm:h-64 md:h-72"
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(item)
        }
      }}
    >
      <Image
        src={normalizeImageUrl(item.image_path)}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-95 sm:group-hover:scale-105"
      />

      {/* Overlay - visible on mobile, on hover on desktop */}
      <motion.div
        className="from-background/90 to-background/20 absolute inset-0 flex flex-col justify-end bg-gradient-to-t p-3 opacity-100 backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 dark:from-black/70 dark:to-black/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <h3 className="text-foreground mb-1 line-clamp-2 text-sm font-semibold">{item.title}</h3>
        {item.location && (
          <div className="text-muted-foreground mb-2 flex items-center gap-1 text-xs">
            <LucideMapPin className="h-3 w-3 flex-shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground/70 text-xs">
            {format(new Date(item.created_at), 'dd MMM yyyy')}
          </span>
        </div>
      </motion.div>

      {/* Delete button for authenticated users */}
      {isAuth && (
        <button
          onClick={e => {
            e.stopPropagation()
            onDelete(item)
          }}
          className="bg-destructive/20 hover:bg-destructive/40 absolute top-2 right-2 rounded-full p-2 opacity-0 transition-colors group-hover:opacity-100 sm:opacity-0"
        >
          <Trash2 className="text-destructive h-4 w-4" />
        </button>
      )}
    </motion.div>
  )
}

export default function LandingPage() {
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

  const handleDelete = async () => {
    if (!targetToDelete) return

    const { error } = await supabase.from('gallery').delete().eq('id', targetToDelete.id)

    if (!error) {
      setGallery(prev => prev.filter(item => item.id !== targetToDelete.id))
      setConfirmDelete(false)
      setTargetToDelete(null)
    } else {
      console.error('Delete failed:', error.message)
    }
  }

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(gallery.flatMap(item => item.tags)))

  return (
    <div>
      <AnimationContainer animation="fadeUp" delay={0.1}>
        <div className="mb-6 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start">
            <h1 className="text-foreground text-4xl font-bold">Gallery</h1>
            <p className="text-muted-foreground/70 text-sm">Visual moments, memories & designs</p>
          </div>

          {isAuthenticated && (
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push('/gallery/upload')}
            >
              Upload
            </Button>
          )}
        </div>

        <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Input
            type="text"
            placeholder="Search gallery..."
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGallery.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            isAuth={isAuthenticated}
            onSelect={setSelectedImage}
            onDelete={item => {
              setTargetToDelete(item)
              setConfirmDelete(true)
            }}
          />
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <p className="text-muted-foreground py-12 text-center">No images found.</p>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 max-w-2xl backdrop-blur-sm">
            <div className="space-y-4">
              <div className="relative h-96 w-full overflow-hidden rounded-lg backdrop-blur-md">
                <Image
                  src={
                    selectedImage.image_path
                      ? selectedImage.image_path.startsWith('http') ||
                        selectedImage.image_path.startsWith('data:')
                        ? selectedImage.image_path
                        : selectedImage.image_path.includes('/')
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${selectedImage.image_path}`
                          : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${selectedImage.image_path}`
                      : ''
                  }
                  alt={selectedImage.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h2 className="text-foreground mb-2 text-2xl font-bold">{selectedImage.title}</h2>
                {selectedImage.location && (
                  <div className="text-muted-foreground mb-3 flex items-center gap-1">
                    <LucideMapPin className="h-4 w-4" />
                    {selectedImage.location}
                  </div>
                )}
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedImage.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <span>{format(new Date(selectedImage.created_at), 'PPP')}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    By {selectedImage.photographer_name}
                    <RiVerifiedBadgeFill className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="bg-background/10 fixed inset-0 z-50 flex items-center justify-center">
          <div className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-96 rounded-2xl border p-6 text-center shadow-lg backdrop-blur-sm md:w-2xl">
            <div className="flex flex-col items-center">
              <AlertTriangle className="text-destructive mb-4 h-8 w-8" />
              <h3 className="text-foreground mb-2 text-lg font-semibold">Confirm Delete</h3>
              <p className="text-muted-foreground/70 mb-6">
                Are you sure you want to delete this image?
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
