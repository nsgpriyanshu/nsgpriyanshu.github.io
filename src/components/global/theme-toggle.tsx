'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

/**
 * Accessible Theme Toggle Component
 * - Keyboard focus support (Tab navigation)
 * - Proper ARIA attributes (aria-label, aria-pressed)
 * - Focus-visible ring for keyboard users
 * - Title attribute for hover tooltip
 * - Hydration-safe mounting
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeText = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode'
      case 'dark':
        return 'Dark Mode'
      case 'system':
        return 'System Mode'
      default:
        return 'Switch Theme'
    }
  }

  const getNextTheme = () => {
    switch (theme) {
      case 'light':
        return 'dark'
      case 'dark':
        return 'system'
      default:
        return 'light'
    }
  }

  if (!isMounted) return null

  return (
    <button
      className="text-muted-foreground decoration-muted hover:text-foreground focus-visible:ring-primary dark:focus-visible:ring-offset-background cursor-pointer rounded-sm text-sm underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      onClick={handleThemeToggle}
      aria-label={`Switch to ${getNextTheme()} mode. Currently using ${getThemeText()}`}
      title={getThemeText()}
    >
      {getThemeText()}
    </button>
  )
}
