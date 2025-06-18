'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isFirstClick, setIsFirstClick] = React.useState(true)

  const handleThemeToggle = () => {
    if (isFirstClick) {
      setTheme('system')
      setIsFirstClick(false)
    } else if (theme === 'system' || theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    }
  }

  const getThemeText = () => {
    if (isFirstClick) return 'Switch Theme'
    switch (theme) {
      case 'system':
        return 'System Mode'
      case 'light':
        return 'Light Mode'
      case 'dark':
        return 'Dark Mode'
      default:
        return 'Switch Theme'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="text-muted-foreground decoration-muted hover:text-foreground cursor-pointer text-sm underline underline-offset-4 transition-colors"
        onClick={handleThemeToggle}
      >
        {getThemeText()}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-lg border border-black/10 bg-white/10 backdrop-blur-sm dark:border-white/10 dark:bg-black/10"
      >
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
