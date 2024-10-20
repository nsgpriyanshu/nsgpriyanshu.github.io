import ContactSection from '@/components/containers/ContactSection'
import GradientBackground from '@/components/global/gradient-background'
import React from 'react'

const Contact = () => {
  return (
    <GradientBackground>
      <main className="relative !z-[999] flex flex-col items-center justify-center px-4 pt-5">
        <ContactSection />
      </main>
    </GradientBackground>
  )
}

export default Contact
