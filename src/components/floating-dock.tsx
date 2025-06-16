'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Book, Image } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { DockItem, dockItems } from '@/constants/links'

// Map icon names to Lucide components
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Home,
  Briefcase,
  Book,
  Image,
}

export default function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
      <TooltipProvider>
        <motion.div
          className={cn(
            'flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-lg dark:border-black/20 dark:bg-black/10',
          )}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {dockItems.map((item, index) => {
            const IconComponent = iconMap[item.iconName]
            if (!IconComponent) return null // Fallback if iconName is invalid
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <motion.a
                    href={item.href}
                    className="relative rounded-full p-2 transition-colors hover:bg-white/20 dark:hover:bg-black/20"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredIndex === index ? 1.3 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <IconComponent className="h-6 w-6" />
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
                </TooltipTrigger>
                <TooltipContent side="top" className="text-sm">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
