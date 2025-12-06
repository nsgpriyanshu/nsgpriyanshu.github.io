'use client'

import { useEffect, useRef } from 'react'

export default function BlurCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Refs to manage interactive hover target
  const hoverRectRef = useRef<DOMRect | null>(null)
  const isHoveringRef = useRef(false)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    // Size interpolation for hover targets
    const size = { w: 12, h: 12 }
    const targetSize = { w: 12, h: 12 }
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

    // Pointer handlers to detect interactive elements (links, buttons, explicit attribute)
    const interactiveSelector = 'a, button, [data-cursor-grow], .interactive'

    const handlePointerOver = (e: PointerEvent) => {
      const el = (e.target as Element)?.closest?.(interactiveSelector) as Element | null
      if (el && cursor) {
        const rect = el.getBoundingClientRect()
        hoverRectRef.current = rect
        isHoveringRef.current = true
        // set the target position to element center so cursor moves to cover it
        target.x = rect.left + rect.width / 2
        target.y = rect.top + rect.height / 2
        // compute target size with small padding
        const padding = 10
        targetSize.w = Math.max(24, rect.width + padding)
        targetSize.h = Math.max(24, rect.height + padding)
        // make cursor less rounded for wide elements
        const borderRadius = rect.width / rect.height > 2 ? '0.5rem' : '9999px'
        cursor.style.borderRadius = borderRadius
      }
    }

    const handlePointerOut = (e: PointerEvent) => {
      const el = (e.target as Element)?.closest?.(interactiveSelector) as Element | null
      if (el && cursor) {
        hoverRectRef.current = null
        isHoveringRef.current = false
        // restore defaults
        targetSize.w = 12
        targetSize.h = 12
        cursor.style.borderRadius = '9999px'
      }
    }

    // Natural Movement Engine with optimized timing
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const followCursor = () => {
      if (!cursor) return
      if (prefersReducedMotion) {
        // simple follow without size/overshoot
        pos.x = target.x
        pos.y = target.y
        cursor.style.transform = `translate(${pos.x - 8}px, ${pos.y - 8}px)`
        rafRef.current = requestAnimationFrame(followCursor)
        return
      }

      // Inertia for position
      pos.x += (target.x - pos.x) * 0.14
      pos.y += (target.y - pos.y) * 0.14

      // soft overshoot
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      pos.x += Math.sin(dx * 0.02) * 0.25
      pos.y += Math.sin(dy * 0.02) * 0.25

      // interpolate size smoothly
      size.w += (targetSize.w - size.w) * 0.18
      size.h += (targetSize.h - size.h) * 0.18

      // jitter for liveliness
      const jitterX = (Math.random() - 0.5) * 0.4
      const jitterY = (Math.random() - 0.5) * 0.4

      // compute scale for subtle depth effect
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy) / 120, 0.25)
      const scale = 1 + speed

      // shadow drift
      const shadowX = dx * 0.03
      const shadowY = dy * 0.03
      cursor.style.setProperty('--shadow-x', `${shadowX}px`)
      cursor.style.setProperty('--shadow-y', `${shadowY}px`)
      cursor.style.setProperty('--scale', `${scale}`)

      // apply size and position
      cursor.style.width = `${size.w}px`
      cursor.style.height = `${size.h}px`
      cursor.style.transform = `translate(${pos.x - size.w / 2 + jitterX}px, ${pos.y - size.h / 2 + jitterY}px) scale(${scale})`

      rafRef.current = requestAnimationFrame(followCursor)
    }

    followCursor()

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('pointerover', handlePointerOver)
    window.addEventListener('pointerout', handlePointerOut)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('pointerover', handlePointerOver)
      window.removeEventListener('pointerout', handlePointerOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 rounded-full border border-black/20 bg-black/10 shadow-lg backdrop-blur-xs will-change-transform dark:border-white/20 dark:bg-white/10"
      style={{ width: 12, height: 12 }}
    />
  )
}
