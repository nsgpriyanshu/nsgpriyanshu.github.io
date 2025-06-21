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

  useEffect(() => {
    setIsMounted(true)

    // Load audio files
    clickSoundRef.current = new Audio('/sounds/click_one.wav')
    clickSoundRef.current.volume = 0.5

    bgmSoundRef.current = new Audio('/sounds/background_music_one.mp3')
    bgmSoundRef.current.volume = 0.5
    bgmSoundRef.current.loop = true

    // Play click sound on every click, if sound is ON
    const handleClick = () => {
      if (isSoundOn) {
        if (clickSoundRef.current) {
          clickSoundRef.current.currentTime = 0
          clickSoundRef.current.play().catch(err => console.warn('Click sound blocked:', err))
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
  }, [isSoundOn]) // React to sound state

  const toggleSound = () => {
    setIsSoundOn(prev => {
      const newState = !prev
      localStorage.setItem('soundOn', newState.toString())

      if (newState) {
        // Sound turned ON: play BGM if not already playing
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

      return newState
    })
  }

  if (!isMounted) return null

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound }}>{children}</SoundContext.Provider>
  )
}
