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
            Who I am?
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
            We&apos;re a passionate team building a global platform to connect and empower creators
            with innovative tools and resources.
          </p>
        </AnimationContainer>
      </div>
    </Wrapper>
  )
}
