'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

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

  return (
    <button
      className="text-muted-foreground decoration-muted hover:text-foreground cursor-pointer text-sm underline underline-offset-4 transition-colors"
      onClick={handleThemeToggle}
    >
      {getThemeText()}
    </button>
  )
}
