'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface SoundContextType {
  isSoundOn: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function useSoundContext() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext must be used within SoundProvider')
  }
  return context
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('soundOn') !== 'false'
    }
    return true
  })

  const [isMounted, setIsMounted] = useState(false)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const bgmSoundRef = useRef<HTMLAudioElement | null>(null)
  const isBgmPlayingRef = useRef(false)
  const isSoundOnRef = useRef(isSoundOn)
  const suppressNextClickRef = useRef(false)
  const lastClickTimeRef = useRef(0)

  // Create audio elements and register a single click handler once on mount.
  useEffect(() => {
    setIsMounted(true)

    // Load audio files once
    clickSoundRef.current = new Audio('/sounds/click_one.wav')
    clickSoundRef.current.volume = 0.5

    bgmSoundRef.current = new Audio('/sounds/background_music_one.mp3')
    bgmSoundRef.current.volume = 0.5
    bgmSoundRef.current.loop = true

    // Use a click handler that reads the latest `isSoundOn` via ref
    const handleClick = (e: MouseEvent) => {
      const now = Date.now()

      // If sound is disabled, do nothing immediately
      if (!isSoundOnRef.current) return

      // If a click was handled very recently, skip to avoid double-play
      if (now - lastClickTimeRef.current < 150) return

      // If toggle requested suppression for the next click, allow exactly one play
      if (suppressNextClickRef.current) {
        suppressNextClickRef.current = false
      }

      lastClickTimeRef.current = now

      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0
        clickSoundRef.current.play().catch(err => console.warn('Click sound blocked:', err))
      }

      // Dispatch a custom event with click coordinates for visual feedback (ripple)
      try {
        const detail = { x: e.clientX, y: e.clientY }
        document.dispatchEvent(new CustomEvent('app:click', { detail }))
      } catch (err) {
        // ignore
      }

      if (bgmSoundRef.current && !isBgmPlayingRef.current) {
        bgmSoundRef.current
          .play()
          .then(() => {
            isBgmPlayingRef.current = true
            console.log('BGM started')
          })
          .catch(err => console.warn('BGM blocked:', err))
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      if (bgmSoundRef.current) {
        bgmSoundRef.current.pause()
        bgmSoundRef.current.currentTime = 0
        isBgmPlayingRef.current = false
      }
    }
  }, [])

  // Keep a ref in sync with the current `isSoundOn` so handlers can read latest value.
  useEffect(() => {
    isSoundOnRef.current = isSoundOn
  }, [isSoundOn])

  const toggleSound = () => {
    const newState = !isSoundOn
    setIsSoundOn(newState)
    localStorage.setItem('soundOn', newState.toString())
    // Ensure handlers read the latest sound state immediately
    isSoundOnRef.current = newState

    // If toggle is triggered by user click, suppress duplicate click sound
    // so the click plays only once (handled by the document click listener).
    suppressNextClickRef.current = true

    if (newState) {
      // Sound turned ON: try to play BGM (should succeed if called from a user gesture)
      if (bgmSoundRef.current && !isBgmPlayingRef.current) {
        bgmSoundRef.current
          .play()
          .then(() => {
            isBgmPlayingRef.current = true
            console.log('BGM started via toggle')
          })
          .catch(err => console.warn('BGM blocked on toggle:', err))
      }
    } else {
      // Sound turned OFF: pause BGM
      if (bgmSoundRef.current) {
        bgmSoundRef.current.pause()
        bgmSoundRef.current.currentTime = 0
        isBgmPlayingRef.current = false
        console.log('BGM paused via toggle')
      }
    }
  }

  if (!isMounted) return null

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound }}>{children}</SoundContext.Provider>
  )
}
