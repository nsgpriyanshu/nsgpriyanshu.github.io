'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiC,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
} from 'react-icons/si'
import { FaGithub } from 'react-icons/fa'
import { featuredProjects } from '@/constants/projects'

interface AboutProps {
  onClose: () => void
}

export default function About({ onClose }: AboutProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 max-w-2xl rounded-2xl border shadow-lg backdrop-blur-md">
        <div className="scrollbar-hidden relative h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground text-3xl font-bold">About Me</DialogTitle>
          </DialogHeader>
          <div className="dark:text-muted-foreground mt-4 text-sm">
            <p>
              Hey there! I’m <span className="text-foreground font-medium">ŊʂƓ PRIYANSHU</span>, a
              B.Tech CSE student and the CEO of{' '}
              <span className="text-foreground font-semibold">Creator's World</span> — a creative
              space for creative people. I love writing clean code, building beautiful websites, and
              pushing the boundaries of front-end development using{' '}
              <span className="text-foreground font-semibold">Next.js</span>,{' '}
              <span className="text-foreground font-semibold">Tailwind CSS</span>, and{' '}
              <span className="text-foreground font-semibold">TypeScript</span>. I’ve worked on
              Discord bots, developer tools, and open-source projects — all while blending
              creativity with precision. Let’s connect, collaborate, and create something meaningful
              together!
            </p>
          </div>

          <DialogHeader className="mt-6">
            <DialogTitle className="text-foreground text-3xl font-bold">Skills</DialogTitle>
          </DialogHeader>
          <div className="dark:text-muted-foreground mt-4 flex flex-wrap justify-center gap-4 text-2xl">
            <SiTypescript title="TypeScript" className="hover:text-foreground transition-colors" />
            <SiJavascript title="JavaScript" className="hover:text-foreground transition-colors" />
            <SiPython title="Python" className="hover:text-foreground transition-colors" />
            <SiC title="C" className="hover:text-foreground transition-colors" />
            <SiHtml5 title="HTML5" className="hover:text-foreground transition-colors" />
            <SiCss3 title="CSS3" className="hover:text-foreground transition-colors" />
            <SiTailwindcss
              title="Tailwind CSS"
              className="hover:text-foreground transition-colors"
            />
          </div>

          <DialogHeader className="mt-6">
            <DialogTitle className="text-foreground text-3xl font-bold">
              Featured Projects
            </DialogTitle>
          </DialogHeader>
          <div className="dark:text-muted-foreground mt-4 space-y-3 text-sm">
            {featuredProjects.map(project => (
              <a
                key={project.githubUrl}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary/10 hover:border-primary/20 bg-primary/5 hover:bg-primary/10 dark:hover:bg-background/20 block rounded-lg border px-4 py-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{project.name}</span>
                  <FaGithub className="text-lg" />
                </div>
                <p className="dark:text-muted-foreground mt-1 text-xs">{project.description}</p>
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
