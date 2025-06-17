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
            'flex items-center gap-4 rounded-full border border-black/10 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10',
          )}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {dockItems.map((item, index) => {
            const IconComponent = iconMap[item.iconName]
            if (!IconComponent) return null // Fallback if iconName is invalid
            return (
              <div key={item.title} className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={item.href}
                      className="relative rounded-full p-2 transition-colors hover:bg-[#f10a0a]/20"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredIndex === index ? 1.3 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <IconComponent className="h-6 w-6 text-white transition-colors hover:text-[#f10a0a]" />
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.span
                            className="absolute -top-2 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-[#f10a0a]"
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
                {/* Add separators after Home, Blog, and Projects icons */}
                {item.title === 'Home' || item.title === 'Blog' || item.title === 'Projects' ? (
                  <div className={cn('mx-2 h-6 w-[1px] bg-black/10 dark:bg-white/10')} />
                ) : null}
              </div>
            )
          })}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
