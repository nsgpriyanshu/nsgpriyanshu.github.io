'use client'

import { useEffect } from 'react'

import { useAppHaptics } from '@/hooks/use-app-haptics'

const interactiveSelector = 'button, a, [role="button"], [data-haptic]'

function getInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return null
  return target.closest<HTMLElement>(interactiveSelector)
}

function isDisabled(element: HTMLElement) {
  if (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return element.disabled
  }

  return element.getAttribute('aria-disabled') === 'true'
}

export default function HapticsProvider() {
  const { fire } = useAppHaptics()

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return
      }

      const element = getInteractiveElement(event.target)
      if (!element || isDisabled(element) || element.dataset.haptic === 'off') return

      fire((element.dataset.haptic as Parameters<typeof fire>[0]) || 'tap')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return

      const element = getInteractiveElement(event.target)
      if (!element || isDisabled(element) || element.dataset.haptic === 'off') return

      fire((element.dataset.haptic as Parameters<typeof fire>[0]) || 'tap')
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [fire])

  return null
}
