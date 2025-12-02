'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Pulse = { id: number; x: number; y: number }

export default function ClickPulse() {
  const [pulses, setPulses] = useState<Pulse[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent
      if (!ev?.detail) return
      const { x, y } = ev.detail as { x: number; y: number }
      const id = Date.now() + Math.floor(Math.random() * 1000)
      setPulses(prev => [...prev, { id, x, y }])

      // remove after animation
      window.setTimeout(() => {
        setPulses(prev => prev.filter(p => p.id !== id))
      }, 650)
    }

    document.addEventListener('app:click', handler as EventListener)
    return () => document.removeEventListener('app:click', handler as EventListener)
  }, [])

  if (reduce) return null

  return (
    <>
      {pulses.map(p => {
        const size = 24
        return (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.85, scale: 0.2 }}
            animate={{ opacity: 0, scale: 6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: size,
              height: size,
              borderRadius: 9999,
              pointerEvents: 'none',
              zIndex: 9999,
              background: 'rgba(255,255,255,0.14)',
              boxShadow: '0 6px 18px rgba(255,255,255,0.12)',
            }}
          />
        )
      })}
    </>
  )
}
