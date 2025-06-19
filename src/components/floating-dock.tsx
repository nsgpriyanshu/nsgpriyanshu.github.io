'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserRoundIcon, BookMarkedIcon, GalleryHorizontalEndIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dockItems } from '@/constants/link'

// Map icon names to Lucide components
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  UserRoundIcon,
  BookMarkedIcon,
  GalleryHorizontalEndIcon,
}

export default function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
      <motion.div
        className={cn(
          'border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 flex items-center gap-4 rounded-full border px-4 py-2 shadow-lg backdrop-blur-md',
        )}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .float-animate {
              animation: float 3s ease-in-out infinite;
            }
          `}
        </style>
        {dockItems.map((item, index) => {
          const IconComponent = iconMap[item.iconName]
          if (!IconComponent) return null // Fallback if iconName is invalid
          return (
            <div key={item.title} className="flex items-center">
              <motion.a
                href={item.href}
                className="hover:bg-primary/20 relative rounded-full p-2 transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ scale: 1 }}
                animate={{ scale: hoveredIndex === index ? 1.3 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <IconComponent className="text-muted-foreground hover:text-primary h-6 w-6 transition-colors" />
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="bg-primary absolute -top-2 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
              {/* Add separators after all items except the last */}
              {index < dockItems.length - 1 && (
                <div className={cn('bg-background/10 dark:bg-primary/10 mx-2 h-6 w-[1px]')} />
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
