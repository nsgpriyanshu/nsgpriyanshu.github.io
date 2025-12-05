'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { IoDocumentText } from 'react-icons/io5'
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
      <div className="flex flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="text-muted-foreground flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-muted-foreground/70">Developed by nsgpriyanshu</span>
          </div>
        </div>

        {/* Center — Document Icon + Resume Link */}
        <motion.a
          href="/resume.pdf"
          download
          whileHover={reduce ? {} : { y: -2 }}
          whileTap={reduce ? {} : { scale: 0.98 }}
          className="text-muted-foreground hover:text-primary flex flex-col items-center gap-1 transition-colors"
        >
          <IoDocumentText className="text-lg md:text-xl" />
          <span className="text-xs md:text-sm">Resume</span>
        </motion.a>

        {/* Right side */}
        <div className="text-muted-foreground flex flex-col items-end gap-1 text-sm">
          <p className="text-muted-foreground/70">Social Handles:</p>
          <div className="flex gap-1">
            {socialLinks.map(link => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduce ? {} : { y: -3 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </AnimationContainer>
  )
}
