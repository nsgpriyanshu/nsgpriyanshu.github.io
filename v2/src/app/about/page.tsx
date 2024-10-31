import AboutSection from '@/components/containers/AboutSection'
import GradientBackground from '@/components/global/gradient-background'
import React from 'react'

const About = () => {
  return (
    // <GradientBackground>
    <main className="relative !z-[999] flex flex-col items-center justify-center px-4">
      <AboutSection />
    </main>
    // </GradientBackground>
  )
}

export default About
