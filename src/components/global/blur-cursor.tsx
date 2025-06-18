'use client'

import { useEffect, useRef } from 'react'

export default function BlurCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current

    const moveCursor = (e: MouseEvent) => {
      if (!cursor) return

      cursor.animate(
        [
          {
            transform: `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`,
          },
        ],
        {
          duration: 150,
          fill: 'forwards',
          easing: 'ease-out',
        },
      )
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-md dark:bg-white/10"
    />
  )
}
