'use client'

import { useEffect, useState, memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Ripple = { id: number; x: number; y: number }

// Memoized ripple component to avoid unnecessary re-renders
const RippleWave = memo(
  ({
    id,
    x,
    y,
    delay = 0,
    duration = 1.4,
    scale = 3.2,
  }: {
    id: number
    x: number
    y: number
    delay?: number
    duration?: number
    scale?: number
  }) => {
    const baseSize = delay === 0 ? 24 : 40

    return (
      <motion.div
        key={id}
        initial={{
          opacity: delay === 0 ? 0.6 : 0.25,
          scale: 0,
          filter: delay === 0 ? 'blur(0px)' : 'blur(0px)',
        }}
        animate={{
          opacity: 0,
          scale,
          filter: delay === 0 ? 'blur(8px)' : 'blur(2px)',
        }}
        transition={{
          duration,
          delay,
          ease: [0.12, 0.65, 0.1, 1],
        }}
        style={{
          position: 'fixed',
          left: x - baseSize / 2,
          top: y - baseSize / 2,
          width: baseSize,
          height: baseSize,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: delay === 0 ? 999 : 998,
          background:
            delay === 0
              ? 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.0) 70%)'
              : 'none',
          border: delay === 0 ? 'none' : '1px solid rgba(180,200,255,0.15)',
          backdropFilter: delay === 0 ? 'blur(6px)' : 'blur(2px)',
          mixBlendMode: 'screen',
          willChange: 'transform, opacity',
        }}
      />
    )
  },
)

RippleWave.displayName = 'RippleWave'

export default function ClickPulse() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const handler = (e: Event) => {
      const ev = e as CustomEvent
      if (!ev?.detail) return
      const { x, y } = ev.detail as { x: number; y: number }
      const id = Date.now() + Math.floor(Math.random() * 1000)

      setRipples(prev => [...prev, { id, x, y }])

      window.setTimeout(() => {
        setRipples(prev => prev.filter(p => p.id !== id))
      }, 1600)
    }

    document.addEventListener('app:click', handler as EventListener)
    return () => document.removeEventListener('app:click', handler as EventListener)
  }, [reduce])

  if (reduce) return null

  const renderedRipples = useMemo(
    () =>
      ripples.map(r => (
        <div key={r.id}>
          <RippleWave id={r.id} x={r.x} y={r.y} delay={0} duration={1.4} scale={3.2} />
          <RippleWave
            id={parseInt(`${r.id}2`)}
            x={r.x}
            y={r.y}
            delay={0.05}
            duration={1.6}
            scale={4}
          />
          <motion.div
            key={`${r.id}-refraction`}
            initial={{
              opacity: 0.5,
              scale: 0,
            }}
            animate={{
              opacity: 0,
              scale: 2.8,
            }}
            transition={{
              duration: 1.2,
              ease: [0.2, 0.75, 0.1, 1],
            }}
            style={{
              position: 'fixed',
              left: r.x - 14,
              top: r.y - 14,
              width: 28,
              height: 28,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 1000,
              border: '2px solid rgba(120,170,255,0.25)',
              filter: 'blur(1px)',
              mixBlendMode: 'screen',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      )),
    [ripples],
  )

  return <>{renderedRipples}</>
}
