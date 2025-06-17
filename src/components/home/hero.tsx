'use client'
import Image from 'next/image'
import AnimationContainer from '../global/animation-container'
import Wrapper from '../global/wrapper'
import { Button } from '../ui/button'
import SectionBadge from '../ui/section-badge'
import { useTheme } from 'next-themes'
import { Marquee } from '../ui/marquee'
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
} from 'react-icons/si'
import Link from 'next/link'

const Hero = () => {
  const { resolvedTheme } = useTheme()
  // Array of icon components for skills
  const myskills = [
    { icon: SiTypescript, name: 'TypeScript' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: SiPython, name: 'Python' },
    { icon: SiHtml5, name: 'HTML' },
    { icon: SiCss3, name: 'CSS' },
    { icon: SiTailwindcss, name: 'Tailwind CSS' },
  ]

  // Select image based on theme
  const profileImageSrc =
    resolvedTheme === 'light' ? '/icons/intro_profile_pic.png' : '/icons/intro_profile_pic.png'
  const profileImageAlt = resolvedTheme === 'light' ? 'Profile Pic (Light)' : 'Profile Pic (Dark)'

  return (
    <Wrapper className="relative h-full min-h-screen w-full flex-1 pt-20 lg:pt-32">
      <div className="flex h-full w-full flex-col lg:flex-row lg:gap-16">
        <div className="flex w-full flex-col items-start gap-10 py-8">
          <div className="flex flex-col items-start gap-4">
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <SectionBadge title="Overview" />
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.4}>
              <h1 className="from-foreground bg-gradient-to-r to-neutral-500 bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                Behold the{' '}
                <span className="mr-4 bg-[#f10a0a] bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                  Future
                </span>
                Back to the{' '}
                <span className="bg-[#f10a0a] bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                  Past
                </span>
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.6}>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Hi, I am passionate about creating innovative solutions that bridge the gap between
                the past and the future. My journey is a blend of nostalgia and forward-thinking,
                where I strive to bring the best of both worlds into my work.
              </p>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0.8}>
              <div className="w-full">
                <Link href="https://discord.gg/VUMVuArkst">
                  <Button size="lg" className="w-full md:w-auto">
                    Lets Connect
                  </Button>
                </Link>
              </div>
            </AnimationContainer>
          </div>

          <AnimationContainer animation="fadeUp" delay={1}>
            <div className="flex flex-col items-start gap-4 py-4">
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">My skills</p>
              <div className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-lg">
                <Marquee className="select-none [--duration:20s] [--gap:1rem]" repeat={1}>
                  {myskills.map((skill, index) => (
                    <div
                      key={index}
                      className="text-muted-foreground flex h-16 items-center justify-center"
                    >
                      <skill.icon className="h-12 w-12" title={skill.name} />
                    </div>
                  ))}
                </Marquee>
                <div className="from-background pointer-events-none absolute inset-x-0 -top-1 z-40 h-1/3 bg-gradient-to-b to-transparent"></div>
                <div className="from-background pointer-events-none absolute inset-x-0 -bottom-1 z-40 h-1/3 bg-gradient-to-t to-transparent"></div>
              </div>
            </div>
          </AnimationContainer>
        </div>

        <AnimationContainer animation="fadeRight" delay={0.4}>
          <div className="relative flex h-min w-full flex-col items-start justify-start overflow-hidden">
            <div className="relative w-full lg:h-[500px] lg:w-[500px]">
              <Image
                src={profileImageSrc}
                alt={profileImageAlt}
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 500px"
                className="relative z-20 h-full w-full rounded-xl object-contain lg:rounded-2xl"
              />
              <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 z-30 h-1/4 bg-gradient-to-t to-transparent" />
            </div>
          </div>
        </AnimationContainer>
      </div>
    </Wrapper>
  )
}

export default Hero
