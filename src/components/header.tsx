'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useSoundContext } from '@/context/sound-context'
import { ModeToggle } from './global/theme-toggle'
import { navigationLinks } from '@/constants/link'
import AnimationContainer from './global/animation-container'

export default function Header() {
  const { isSoundOn, toggleSound } = useSoundContext()

  const reduce = useReducedMotion()

  return (
    <AnimationContainer delay={0.5} animation="fadeDown">
      <header className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
        <nav className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="text-muted-foreground text-sm">
              Based in <span className="decoration-muted underline underline-offset-4">India</span>
            </div>
            <ModeToggle />
            <motion.button
              onClick={toggleSound}
              whileTap={reduce ? {} : { scale: 0.98 }}
              className="text-muted-foreground decoration-muted hover:text-foreground text-sm underline underline-offset-4 transition-colors"
            >
              {isSoundOn ? 'Disable Sound' : 'Enable Sound'}
            </motion.button>
          </div>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm">
            {navigationLinks.map(link => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={reduce ? {} : { y: -3 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </nav>
      </header>
    </AnimationContainer>
  )
}
