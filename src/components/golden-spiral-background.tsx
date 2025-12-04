'use client'

import { useEffect, useRef } from 'react'

export default function GoldenSpiralBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const relX = e.clientX / innerWidth - 0.5 // -0.5 to 0.5
      const relY = e.clientY / innerHeight - 0.5

      const offsetX = relX * 30 // tune intensity
      const offsetY = relY * 30

      el.style.transform = `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), 0)`
    }

    // initial center
    el.style.transform = 'translate3d(-50%, -50%, 0)'

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed top-1/2 left-1/2 -z-10 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 1000 1000"
        className="text-foreground/20 dark:text-foreground/10 h-[305vmin] w-[305vmin] opacity-[0.5]"
      >
        {/* Golden rectangles (approx) */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="382"
          y="0"
          width="618"
          height="618"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <rect
          x="382"
          y="382"
          width="382"
          height="382"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <rect
          x="618"
          y="382"
          width="236"
          height="236"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <rect
          x="618"
          y="528"
          width="146"
          height="146"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <rect
          x="764"
          y="528"
          width="90"
          height="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />

        {/* Golden spiral (soft, organic) */}
        <path
          d="
            M 1000 500
            A 500 500 0 0 0 500 0
            A 310 310 0 0 0 382 382
            A 190 190 0 0 0 618 528
            A 118 118 0 0 0 764 618
            A 73 73 0 0 0 854 573
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
