'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useSoundContext } from '@/context/sound-context'
import { ModeToggle } from './global/theme-toggle'
import { navigationLinks } from '@/constants/link'
import AnimationContainer from './global/animation-container'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const { isSoundOn, toggleSound } = useSoundContext()
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)

  const [localTime, setLocalTime] = useState('')
  const [localDate, setLocalDate] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update time & date every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

      const date = now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

      setLocalTime(time)
      setLocalDate(date)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimationContainer delay={0.5} animation="fadeDown">
      <header
        className={`sticky top-0 z-40 mx-auto w-full max-w-5xl px-4 py-4 transition-all duration-300 sm:px-6 ${
          isScrolled ? 'bg-primary/5 dark:bg-background/50 rounded-b-2xl backdrop-blur-md' : ''
        }`}
        role="banner"
      >
        <nav
          className="flex flex-row items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start gap-2">
            <motion.div
              className="text-muted-foreground text-sm"
              whileHover={reduce ? {} : { x: 2 }}
              role="status"
              aria-live="polite"
            >
              Based in <span className="decoration-muted underline underline-offset-4">India</span>
            </motion.div>

            <ModeToggle />

            <motion.button
              onClick={toggleSound}
              whileTap={reduce ? {} : { scale: 0.95 }}
              whileHover={reduce ? {} : { x: 2 }}
              className="text-muted-foreground decoration-muted hover:text-foreground focus-visible:ring-primary dark:focus-visible:ring-offset-background rounded-sm text-sm underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label={`${isSoundOn ? 'Disable' : 'Enable'} sound effects`}
            >
              {isSoundOn ? 'Disable Sound' : 'Enable Sound'}
            </motion.button>
          </div>

          {/* CENTER — LOCAL TIME & DATE */}
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground text-xs tracking-wider">{localDate}</span>
            <motion.span
              className="text-primary text-sm font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {localTime}
            </motion.span>
          </div>

          {/* RIGHT SIDE — NAVIGATION */}
          <div className="text-muted-foreground flex flex-col gap-3 text-sm">
            {navigationLinks.map(link => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={reduce ? {} : { y: -3, x: 2 }}
                  whileTap={reduce ? {} : { scale: 0.95 }}
                  className={`focus-visible:ring-primary dark:focus-visible:ring-offset-background relative rounded-sm px-1 py-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isActive ? 'text-primary font-semibold' : 'hover:text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="from-primary to-primary/50 absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r"
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={reduce ? false : { scaleX: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.a>
              )
            })}
          </div>
        </nav>
      </header>
    </AnimationContainer>
  )
}
