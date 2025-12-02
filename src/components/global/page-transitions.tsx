'use client'

import { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, cubicBezier } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/' // key for AnimatePresence
  const reduce = useReducedMotion()

  if (reduce) return <>{children}</>

  const variants = {
    initial: { opacity: 0, y: 8 },
    // use cubic-bezier arrays for typed easing values
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.32, ease: cubicBezier(0.0, 0.0, 0.2, 1) },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.24, ease: cubicBezier(0.4, 0.0, 1, 1) } },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
