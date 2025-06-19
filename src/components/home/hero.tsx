'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ModeToggle } from '../global/theme-toggle'
import AnimationContainer from '../global/animation-container'
import { navigationLinks } from '@/constants/link'
import { socialLinks } from '@/constants/social-link'
import useSound from 'use-sound'
import About from './about'

export default function Hero() {
  const [isSoundOn, setIsSoundOn] = useState(false)
  const [play] = useSound('/sounds/click_one.wav', { volume: 1.0 })
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const handleClick = () => {
    if (isSoundOn) play()
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-6"
      onClick={handleClick}
    >
      <AnimationContainer animation="fadeDown" delay={0} className="w-full max-w-5xl">
        <nav className="flex items-start justify-between py-6">
          <div className="flex flex-col items-start space-y-3">
            <div className="text-muted-foreground text-sm">
              Based in <span className="decoration-muted underline underline-offset-4">India</span>
            </div>
            <ModeToggle />
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="text-muted-foreground decoration-muted hover:text-foreground text-sm underline underline-offset-4 transition-colors"
            >
              {isSoundOn ? 'Disable Sound' : 'Enable Sound'}
            </button>
          </div>
          <div className="text-muted-foreground flex flex-col space-y-3 text-sm">
            {navigationLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </AnimationContainer>

      <AnimationContainer animation="fadeUp" delay={1} className="w-full max-w-5xl text-center">
        <main className="flex flex-col items-center px-6 py-10">
          <div className="relative mb-8 h-56 w-56 overflow-hidden rounded-full md:h-72 md:w-72">
            <Image
              src="/assets/stranger_head.png"
              alt="ŊʂƓ PRIYANSHU"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-foreground mb-6 text-4xl font-bold md:text-6xl">
            ŊʂƓ
            <br />
            Priyanshu
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-lg md:text-xl">
            Behold the <span className="text-foreground font-semibold">Future</span>
            <br />
            back to the Past
          </p>
          <AnimationContainer animation="scaleUp" delay={2} className="inline-block">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="text-foreground rounded-lg border border-black/10 bg-white/10 px-8 py-3 text-sm backdrop-blur-sm transition-all hover:bg-white/20 dark:border-white/10 dark:bg-black/10 dark:hover:bg-black/20"
            >
              Explore
            </button>
          </AnimationContainer>
        </main>
      </AnimationContainer>

      <AnimationContainer animation="fadeUp" delay={3} className="w-full max-w-5xl text-center">
        <div className="text-muted-foreground mt-8 text-sm">
          <p>Want to connect with me?</p>
          <a
            href="https://contact-priyanshu-ps.vercel.app/"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Send a Hi
          </a>
        </div>
      </AnimationContainer>

      <AnimationContainer animation="fadeDown" delay={0} className="w-full max-w-5xl">
        <div className="flex items-start justify-between py-6">
          {/* Left side: Copyright */}
          <div className="text-muted-foreground flex flex-col items-start space-y-2 text-sm">
            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <span>© {new Date().getFullYear()}</span>
              <span>Developed by nsgpriyanshu</span>
            </div>
          </div>

          {/* Right side: Social Links */}
          <div className="text-muted-foreground flex flex-col items-end space-y-2 text-sm">
            <p>Social Handles:</p>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </AnimationContainer>

      {isAboutOpen && <About onClose={() => setIsAboutOpen(false)} />}
    </div>
  )
}
