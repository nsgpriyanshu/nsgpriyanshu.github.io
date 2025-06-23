'use client'

import { useState } from 'react'
import Image from 'next/image'
import useSound from 'use-sound'
import About from './about'
import AnimationContainer from '../global/animation-container'
import { useSoundContext } from '@/context/sound-context'

export default function Hero() {
  const { isSoundOn } = useSoundContext()
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [playClick] = useSound('/sounds/click_one.wav', { volume: 1.0 })

  const handleClick = () => {
    if (isSoundOn) playClick()
  }

  return (
    <div
      className="flex h-[720px] w-full flex-col items-center justify-between px-4 py-6 sm:px-6 md:h-screen"
      onClick={handleClick}
    >
      {/* Hero Section */}
      <AnimationContainer animation="fadeUp" delay={1} className="w-full max-w-5xl text-center">
        <main className="flex flex-col items-center">
          <div className="relative mb-6 h-56 w-56 overflow-hidden rounded-full shadow-lg md:h-72 md:w-72">
            <Image
              src="/assets/stranger_head.png"
              alt="ŊʂƓ PRIYANSHU"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-primary mb-6 text-4xl font-bold md:text-6xl">
            ŊʂƓ
            <br />
            Priyanshu
          </h1>

          <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-lg md:text-xl">
            Behold the <span className="text-primary font-semibold">Future</span>
            <br />
            back to the Past
          </p>

          <AnimationContainer animation="scaleUp" delay={2} className="inline-block">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="border-border bg-background/20 text-primary hover:bg-primary/10 hover:text-primary rounded-xl border px-6 py-2 text-sm backdrop-blur-md transition-all sm:text-base"
            >
              Explore
            </button>
          </AnimationContainer>
        </main>
      </AnimationContainer>

      {/* Contact Section */}
      <AnimationContainer animation="fadeUp" delay={3} className="w-full max-w-5xl text-center">
        <div className="text-muted-foreground text-sm sm:text-base">
          <p>Want to connect with me?</p>
          <a
            href="https://contact-priyanshu-ps.vercel.app/"
            className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Send a Hi
          </a>
        </div>
      </AnimationContainer>

      {/* About Modal */}
      {isAboutOpen && <About onClose={() => setIsAboutOpen(false)} />}
    </div>
  )
}
