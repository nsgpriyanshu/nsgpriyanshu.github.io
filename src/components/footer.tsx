'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { socialLinks } from '@/constants/social-link'
import AnimationContainer from './global/animation-container'

export default function Footer() {
  const reduce = useReducedMotion()

  return (
    <AnimationContainer
      animation="fadeDown"
      delay={4}
      className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6"
    >
      <footer className="flex flex-row items-center justify-between gap-4" aria-label="Site footer">
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-muted-foreground/70">Developed by nsgpriyanshu</span>
          </div>
        </div>

        <div className="text-muted-foreground flex flex-col items-end gap-2 text-sm">
          <p className="text-muted-foreground/70">Social Handles:</p>
          <ul className="flex gap-4" aria-label="Social links">
            {socialLinks.map(link => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduce ? {} : { y: -3 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  className="hover:text-primary transition-colors"
                  aria-label={`${link.label} profile (opens in a new tab)`}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </AnimationContainer>
  )
}
