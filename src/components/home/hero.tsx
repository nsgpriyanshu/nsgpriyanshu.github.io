'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import useSound from 'use-sound'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import About from './about'
import AnimationContainer from '../global/animation-container'
import { useSoundContext } from '@/context/sound-context'

/**
 * Accessible Hero Component
 * - Keyboard navigation support (arrow keys, space)
 * - Screen reader friendly name cycling
 * - Proper ARIA labels and roles
 * - Focus management for modals
 * - Image alt text for accessibility
 */
export default function Hero() {
  const { isSoundOn } = useSoundContext()
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [playClick] = useSound('/sounds/click_one.wav', { volume: 1.0 })

  // Interactive name variants on mouse movement
  const nameVariants = [
    { line1: 'ŊʂƓ', line2: 'Priyanshu' },
    { line1: 'Priyanshu', line2: '' },
    { line1: 'PS', line2: '' },
    { line1: 'CEO', line2: 'Go Beyond' },
  ]
  const [currentName, setCurrentName] = useState(nameVariants[0])
  const idxRef = useRef(0)
  const lastChangeRef = useRef(0)
  const reduce = useReducedMotion()
  const nameElementRef = useRef<HTMLHeadingElement>(null)

  const handleClick = () => {
    if (isSoundOn) playClick()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault()
      idxRef.current = (idxRef.current + 1) % nameVariants.length
      setCurrentName(nameVariants[idxRef.current])
      nameElementRef.current?.setAttribute('aria-live', 'polite')
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      idxRef.current = (idxRef.current - 1 + nameVariants.length) % nameVariants.length
      setCurrentName(nameVariants[idxRef.current])
      nameElementRef.current?.setAttribute('aria-live', 'polite')
    }
  }

  return (
    <div
      className="flex h-auto w-full flex-col items-center justify-center px-4 py-6 sm:px-6"
      onClick={handleClick}
      role="main"
    >
      {/* Hero Section - Horizontal Layout */}
      <AnimationContainer
        animation="fadeUp"
        delay={1}
        className="flex w-full max-w-[980px] flex-1 flex-col items-center justify-between gap-8 md:flex-row"
      >
        {/* Left Side: Name & Quote */}
        <div className="flex flex-col items-center text-center md:flex-1 md:items-start md:text-left">
          <h1
            ref={nameElementRef}
            className="text-primary focus-visible:ring-primary dark:focus-visible:ring-offset-background mb-6 cursor-pointer rounded-sm px-2 py-1 text-4xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-6xl lg:text-7xl"
            tabIndex={0}
            aria-label="Name variant selector. Use arrow keys or space to cycle through variants"
            onMouseMove={() => {
              if (reduce) return
              // throttle changes to ~200ms
              const now = Date.now()
              if (now - lastChangeRef.current < 200) return
              lastChangeRef.current = now

              idxRef.current = (idxRef.current + 1) % nameVariants.length
              setCurrentName(nameVariants[idxRef.current])
            }}
            onMouseEnter={() => {
              // start cycling from next
              idxRef.current = 0
            }}
            onMouseLeave={() => {
              // revert to default
              idxRef.current = 0
              setCurrentName(nameVariants[0])
            }}
            onKeyDown={handleKeyDown}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentName.line1}
                initial={reduce ? {} : { opacity: 0, y: 6 }}
                animate={reduce ? {} : { opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="block"
                aria-hidden="false"
              >
                {currentName.line1}
              </motion.span>

              <motion.span
                key={currentName.line2}
                initial={reduce ? {} : { opacity: 0, y: 6 }}
                animate={reduce ? {} : { opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="block"
                aria-hidden={!currentName.line2}
              >
                {currentName.line2}
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="text-muted-foreground mb-8 max-w-sm text-lg md:text-xl">
            Behold the <span className="text-primary font-semibold">Future</span>
            <br />
            back to the Past
          </p>
        </div>

        {/* Right Side: Image & Button */}
        <div className="flex flex-col items-center md:flex-1">
          <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full md:h-64 md:w-64 lg:h-80 lg:w-80">
            <Image
              src="/assets/stranger_head.png"
              alt="Priyanshu - a developer and creative thinker based in India"
              fill
              className="object-cover"
              priority
              loading="eager"
            />
          </div>

          <AnimationContainer animation="scaleUp" delay={2} className="inline-block">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="border-border bg-background/20 text-primary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary dark:focus-visible:ring-offset-background rounded-xl border px-6 py-2 text-sm backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-base"
              aria-label="Open about me modal"
            >
              Explore
            </button>
          </AnimationContainer>
        </div>
      </AnimationContainer>

      {/* Contact Section */}
      <AnimationContainer animation="fadeUp" delay={3} className="mt-auto mb-4 w-full text-center">
        <div className="text-muted-foreground text-sm sm:text-base">
          <p>
            Want to connect with me?{' '}
            <a
              href="https://contact-priyanshu-ps.vercel.app/"
              className="text-primary hover:text-primary/80 focus-visible:ring-primary dark:focus-visible:ring-offset-background rounded-sm px-1 underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send a message (opens in new tab)"
            >
              Send a Hi
            </a>
          </p>
        </div>
      </AnimationContainer>

      {/* About Modal */}
      {isAboutOpen && <About onClose={() => setIsAboutOpen(false)} />}
    </div>
  )
}
