'use client'
import { GithubIcon } from 'lucide-react'
import AnimationContainer from '../global/animation-container'
import Wrapper from '../global/wrapper'
import { Button } from '../ui/button'
import { MagicCard } from '../ui/magic-card'
import SectionBadge from '../ui/section-badge'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    name: 'nstypocolors',
    description:
      'A TypeScript color package tailored for TypeScript developers, simplifying color management.',
    git_url: 'https://github.com/nsgpriyanshu/nstypocolors',
  },
  {
    id: 2,
    name: 'nscore',
    description:
      'An open-source Discord app designed to boost community engagement with informative features.',
    git_url: 'https://github.com/nsgpriyanshu/nscore',
  },
  {
    id: 3,
    name: 'nsdocs',
    description:
      'A production-level guide for building Discord apps, offering developer-friendly resources.',
    git_url: 'https://github.com/nsgpriyanshu/nsdocs',
  },
]

export default function Projects() {
  return (
    <Wrapper className="from-background relative bg-gradient-to-b to-neutral-900/10 py-20 lg:py-32">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <SectionBadge title="Projects" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <h2 className="from-foreground bg-gradient-to-b to-neutral-400 bg-clip-text text-2xl !leading-tight font-medium text-transparent md:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
            Welcome to my project showcase! Discover my latest creations, blending TypeScript,
            Discord apps, and creative hubs. Explore the source code on my{' '}
            <Link
              href="https://github.com/nsgpriyanshu"
              target="_blank"
              className="text-primary hover:underline"
            >
              GitHub
            </Link>{' '}
            profile.
          </p>
        </AnimationContainer>
      </div>

      <div className="mt-12">
        <AnimationContainer animation="fadeUp" delay={0.5}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <MagicCard
                key={project.id}
                className="group relative mx-auto w-full max-w-[320px] rounded-xl p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:bg-neutral-800/50 hover:shadow-lg"
              >
                <h3 className="text-foreground group-hover:text-primary mb-2 text-start text-lg font-semibold tracking-tight transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-muted-foreground mb-3 text-justify text-sm leading-6 font-normal transition-opacity duration-300 group-hover:opacity-90">
                  {project.description || 'No description available.'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:border-primary/50 w-full transition-transform duration-300 group-hover:scale-105"
                >
                  <Link
                    href={project.git_url}
                    target="_blank"
                    className="text-foreground flex items-center gap-2 text-sm font-medium"
                  >
                    <GithubIcon className="group-hover:text-primary h-4 w-4 transition-colors duration-300" />
                    GitHub
                  </Link>
                </Button>
                {/* Hover Border Glow */}
              </MagicCard>
            ))}
          </div>
        </AnimationContainer>
      </div>
    </Wrapper>
  )
}
