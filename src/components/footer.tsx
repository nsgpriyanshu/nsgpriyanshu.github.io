'use client'

import { socialLinks } from '@/constants/social-link'
import AnimationContainer from './global/animation-container'

export default function Footer() {
  return (
    <AnimationContainer
      animation="fadeDown"
      delay={4}
      className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6"
    >
      <div className="flex flex-row items-center justify-between gap-4">
        {/* Left side: Copyright */}
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <span>Developed by nsgpriyanshu</span>
          </div>
        </div>

        {/* Right side: Social Links */}
        <div className="text-muted-foreground flex flex-col items-end gap-2 text-sm">
          <p>Social Handles:</p>
          <div className="flex gap-4">
            {socialLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </AnimationContainer>
  )
}
