'use client'

import { useEffect, useRef, useState } from 'react'

export default function SoundManager() {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const bgmSoundRef = useRef<HTMLAudioElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isBgmPlaying, setIsBgmPlaying] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Initialize audio elements
    clickSoundRef.current = new Audio('/sounds/click.mp3') // Replace with your click sound file
    clickSoundRef.current.volume = 0.5 // Optional: Adjust volume
    bgmSoundRef.current = new Audio('/sounds/bgm.mp3') // Replace with your BGM file
    bgmSoundRef.current.volume = 0.2 // Optional: Lower volume for BGM
    bgmSoundRef.current.loop = true // Enable looping for BGM

    // Handle click sound and start BGM on first click
    const handleClick = () => {
      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0 // Reset to start for rapid clicks
        clickSoundRef.current.play().catch(() => {
          // Handle autoplay block silently
        })
      }

      if (bgmSoundRef.current && !isBgmPlaying) {
        bgmSoundRef.current
          .play()
          .then(() => {
            setIsBgmPlaying(true)
          })
          .catch(() => {
            // Handle autoplay block silently
          })
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
      if (bgmSoundRef.current) {
        bgmSoundRef.current.pause()
        bgmSoundRef.current.currentTime = 0
      }
    }
  }, [isBgmPlaying])

  if (!isMounted) return null

  return null // No UI rendered, only handles sound logic
}
