'use client'

import { useWebHaptics } from 'web-haptics/react'

type AppHapticIntent = 'tap' | 'success' | 'error' | 'selection'

export function useAppHaptics() {
  const { trigger, isSupported, cancel } = useWebHaptics()

  const fire = (intent: AppHapticIntent = 'tap') => {
    switch (intent) {
      case 'success':
        return trigger('success')
      case 'error':
        return trigger('error')
      case 'selection':
        return trigger(30)
      case 'tap':
      default:
        return trigger('nudge', { intensity: 0.35 })
    }
  }

  return {
    fire,
    tap: () => fire('tap'),
    success: () => fire('success'),
    error: () => fire('error'),
    selection: () => fire('selection'),
    cancel,
    isSupported,
  }
}
