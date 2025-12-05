'use client'

import { useEffect, useRef } from 'react'

export default function BlurCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let isMoving = false

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY

      if (!isMoving) {
        isMoving = true
        // Clear pending timeout
        if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
      }
    }

    // Natural Movement Engine with optimized timing
    const followCursor = () => {
      if (!cursor) return

      // Inertia
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12

      // Organic micro-overshoot with reduced calculations
      const dx = target.x - pos.x
      const dy = target.y - pos.y

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        pos.x += Math.sin(dx * 0.02) * 0.35
        pos.y += Math.sin(dy * 0.02) * 0.35

        // Soft jitter (reduced frequency)
        const jitterX = (Math.random() - 0.5) * 0.6
        const jitterY = (Math.random() - 0.5) * 0.6

        // Dynamic scale based on speed
        const speed = Math.min(Math.sqrt(dx * dx + dy * dy) / 90, 0.3)
        const scale = 1 + speed

        // Shadow drift with memoized calculation
        const shadowX = dx * 0.04
        const shadowY = dy * 0.04

        cursor.style.setProperty('--shadow-x', `${shadowX}px`)
        cursor.style.setProperty('--shadow-y', `${shadowY}px`)
        cursor.style.setProperty('--scale', `${scale}`)

        cursor.style.transform = `translate(${pos.x - 16 + jitterX}px, ${pos.y - 16 + jitterY}px) scale(${scale})`
      }

      rafRef.current = requestAnimationFrame(followCursor)
    }

    followCursor()

    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 rounded-full border border-black/20 bg-black/10 shadow-lg backdrop-blur-xs will-change-transform dark:border-white/20 dark:bg-white/10"
    />
  )
}
