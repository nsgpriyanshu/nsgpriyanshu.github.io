import BlogSection from '@/components/containers/BlogSection'
import GradientBackground from '@/components/global/gradient-background'
import React from 'react'

const Blogs = () => {
  return (
    // <GradientBackground>
    <main className="relative !z-[999] flex flex-col items-center justify-center px-0 pt-20 md:px-4">
      <BlogSection />
    </main>
    // </GradientBackground>
  )
}

export default Blogs
