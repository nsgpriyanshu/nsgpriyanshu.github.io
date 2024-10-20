'use client'

import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import AnimationContainer from './animation'

const GradientBackground = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()

  useEffect(() => {
    let animationCancelled = false

    const startAnimation = async () => {
      while (!animationCancelled) {
        await controls.start({
          x: [0, 80, 0, -80, 0],
          y: [0, -80, 0, 80, 0],
          transition: { duration: 8, repeat: Infinity },
        })
      }
    }

    startAnimation()

    return () => {
      animationCancelled = true
      controls.stop()
    }
  }, [controls])

  return (
    <AnimationContainer>
      <div className="min-h-screen w-full">
        <div className="absolute inset-0 z-[20] hidden lg:flex"></div>
        <div className="absolute inset-0 z-[20] hidden items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)] lg:flex"></div>

        {/* Red Gradient Blob */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          animate={controls}
          className="absolute left-[45%] top-[5rem] z-[15] hidden h-[18rem] w-[30rem] rounded-full blur-[11rem] lg:flex"
          style={{
            background: 'radial-gradient(circle, rgb(246, 4, 1) 0%, rgba(246, 4, 1, 0) 70%)',
          }}
        />

        {/* Gold Gradient Blob */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          animate={controls}
          className="absolute right-[45%] top-[5rem] z-[15] mt-[5rem] hidden h-[18rem] w-[30rem] rounded-full blur-[11rem] lg:flex"
          style={{
            background:
              'radial-gradient(circle, rgb(203, 185, 143) 0%, rgba(203, 185, 143, 0) 70%)',
          }}
        />

        {children}
      </div>
    </AnimationContainer>
  )
}

export default GradientBackground
