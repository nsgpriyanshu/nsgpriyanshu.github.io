'use client'
import Image from 'next/image'
import Link from 'next/link'
import AnimationContainer from '../global/animation-container'
import Wrapper from '../global/wrapper'
import { Button } from '../ui/button'

import SectionBadge from '../ui/section-badge'
import { useTheme } from 'next-themes'
import { Marquee } from '../ui/marquee'

const Hero = () => {
  const { resolvedTheme } = useTheme()
  const myskills = ['/assets/skills_one.webp', '/assets/skills_two.webp']

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
              <SectionBadge title="Worlds largest app hub" />
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.4}>
              {/* <h1 className="from-foreground bg-gradient-to-r to-neutral-500 bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                You have stepped into the{' '}
                <span className="from-[#f10a0a] bg-gradient-to-r to-bg-primary bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                  Creator's Worlds
                </span>
              </h1> */}
              <h1 className="from-foreground bg-gradient-to-r to-neutral-500 bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                You have stepped into the{' '}
                <span className="bg-[#f10a0a] bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                  C
                </span>
                reator&apos;s{' '}
                <span className="bg-[#f10a0a] bg-clip-text text-5xl !leading-tight font-medium text-transparent lg:text-6xl">
                  W
                </span>
                orlds
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.6}>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                The ultimate destination for creators to showcase their work, connect with
                like-minded individuals, and explore a world of creativity. Join us today and
                unleash your creative potential!
              </p>
            </AnimationContainer>
          </div>

          <AnimationContainer animation="fadeUp" delay={0.8}>
            <div className="w-full">
              <Link href="https://discord.gg/VUMVuArkst">
                <Button size="lg" className="w-full md:w-auto">
                  Explore More
                </Button>
              </Link>
            </div>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={1}>
            <div className="flex flex-col items-start gap-4 py-4">
              <p className="text-muted-foreground text-sm md:text-base">Our skillss</p>
              <div className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-lg">
                <Marquee className="select-none [--duration:40s] [--gap:2rem]">
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className="text-muted-foreground flex h-16 items-center justify-center"
                    >
                      <Image
                        src={myskills[index % myskills.length]}
                        alt={`skills ${index + 1}`}
                        width={100}
                        height={40}
                        className="h-20 w-auto object-contain"
                      />
                    </div>
                  ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 -right-1 z-40 w-1/3 bg-gradient-to-l dark:from-[#000000]"></div>
                <div className="pointer-events-none absolute inset-y-0 -left-1 z-40 w-1/3 bg-gradient-to-r dark:from-[#000000]"></div>
              </div>
            </div>
          </AnimationContainer>
        </div>

        <AnimationContainer animation="fadeRight" delay={0.4}>
          <div className="relative flex h-min w-full flex-col items-start justify-start overflow-visible">
            <div className="relative w-full lg:aspect-[1.3884514435695539/1] lg:h-[auto,720px] lg:w-[1000px]">
              <div className="light:from-white pointer-events-none absolute inset-y-0 right-1/4 z-50 hidden h-full w-1/3 bg-gradient-to-l from-[#000000] lg:block dark:from-[#000000]"></div>
              <div className="lg:absolute lg:inset-0">
                <div className="light:bg-white/10 absolute -top-4 -right-4 -bottom-4 -left-4 z-10 m-1 rounded-2xl border border-white/20 bg-black/10 backdrop-blur-md lg:m-0 lg:h-[400px] lg:rounded-2xl dark:bg-black/10">
                  {/* Glassmorphism effect: semi-transparent [#000000] with blur, theme-responsive */}
                </div>
                <Image
                  src={profileImageSrc}
                  alt={profileImageAlt}
                  sizes="500px"
                  width={560}
                  height={560}
                  className="relative z-20 h-auto min-w-full rounded-xl object-contain lg:rounded-2xl"
                />
              </div>
            </div>
          </div>
        </AnimationContainer>
      </div>
      <AnimationContainer
        animation="scaleUp"
        delay={1.2}
        className="absolute -top-[8%] left-1/4 -z-10 h-auto w-2/3"
      >
        <Image
          src="/assets/hero_gradient.png"
          alt="CW Gradient Background"
          width={1024}
          height={1024}
          className="h-auto w-full object-cover"
        />
      </AnimationContainer>
    </Wrapper>
  )
}

export default Hero
