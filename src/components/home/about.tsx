'use client'
import AnimationContainer from '../global/animation-container'
import Wrapper from '../global/wrapper'
import SectionBadge from '../ui/section-badge'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function About() {
  return (
    <Wrapper className="relative py-20 lg:py-32">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <SectionBadge title="About" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <h2 className="from-foreground bg-gradient-to-b to-neutral-400 bg-clip-text text-2xl !leading-tight font-medium text-transparent md:text-4xl lg:text-5xl">
            Who I Am
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
            Ohh you have reaced to my bio section, I am not sure what you are looking for. Maybe you
            want to know about me, my skills, my projects or my experience.
          </p>
        </AnimationContainer>
      </div>

      <div>
        <AnimationContainer animation="fadeUp" delay={0.5}>
          <div className="mt-10 flex flex-col items-center gap-8 md:flex-row">
            <div className="relative flex-1 overflow-hidden">
              <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
                <Image
                  src="/assets/about_profile_pic.webp"
                  alt="About Me"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="relative z-20 h-full w-full rounded-xl object-contain lg:rounded-2xl"
                />
                <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 z-30 h-1/4 bg-gradient-to-t to-transparent" />
              </div>
            </div>
            <div className="flex-1 text-left">
              <p className="text-muted-foreground mb-4 text-sm md:text-base lg:text-lg">
                I am a web developer with knowledge in Next.js, React, TypeScript, JavaScript, HTML,
                and Tailwind CSS. I also manage a community on Discord where I work and share my
                creations. I am currently pursuing my B.Tech degree in Computer Science and
                Engineering. I love creating modern, fascinating, powerful, and sleek websites with
                SEO optimization.
              </p>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                My expertise in AI optimization enhances project functionalities, while my
                moderation skills foster vibrant Discord communities. Every day, I strive to learn
                and innovate, pushing the boundaries of what's possible in the digital world.
              </p>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </Wrapper>
  )
}
