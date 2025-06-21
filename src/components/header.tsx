'use client'

import { useSoundContext } from '@/context/sound-context'
import { ModeToggle } from './global/theme-toggle'
import { navigationLinks } from '@/constants/link'

export default function Header() {
  const { isSoundOn, toggleSound } = useSoundContext()

  return (
    <header className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
      <nav className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <div className="text-muted-foreground text-sm">
            Based in <span className="decoration-muted underline underline-offset-4">India</span>
          </div>
          <ModeToggle />
          <button
            onClick={toggleSound}
            className="text-muted-foreground decoration-muted hover:text-foreground text-sm underline underline-offset-4 transition-colors"
          >
            {isSoundOn ? 'Disable Sound' : 'Enable Sound'}
          </button>
        </div>
        <div className="text-muted-foreground flex flex-col gap-2 text-sm">
          {navigationLinks.map(link => (
            <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
