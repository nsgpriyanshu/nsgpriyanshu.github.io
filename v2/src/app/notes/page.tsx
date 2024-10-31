import NoteSection from '@/components/containers/NoteSection'
import GradientBackground from '@/components/global/gradient-background'
import React from 'react'

const Notes = () => {
  return (
    // <GradientBackground>
    <main className="relative !z-[999] flex flex-col items-center justify-center px-4">
      <NoteSection />
    </main>
    /* </GradientBackground> */
  )
}

export default Notes
