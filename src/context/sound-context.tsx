'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import useSound from 'use-sound'

interface SoundContextType {
  isSoundOn: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundOn, setIsSoundOn] = useState(false)

  const toggleSound = () => setIsSoundOn(prev => !prev)

  // Background music setup
  const [playMusic, { stop }] = useSound('/sounds/background_music_one.mp3', {
    volume: 0.5,
    loop: true,
  })

  // Start or stop background music based on `isSoundOn`
  useEffect(() => {
    if (isSoundOn) {
      playMusic()
    } else {
      stop()
    }
  }, [isSoundOn, playMusic, stop])

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound }}>{children}</SoundContext.Provider>
  )
}

export const useSoundContext = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext must be used within SoundProvider')
  }
  return context
}
