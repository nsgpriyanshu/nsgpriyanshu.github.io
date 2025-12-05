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
  SiNodedotjs,
  SiMysql,
  SiSupabase,
  SiShadcnui,
  SiGit,
  SiNextdotjs,
  SiReact,
  SiFramer,
  SiNextui,
} from 'react-icons/si'
import { FaGithub } from 'react-icons/fa'
import { featuredProjects } from '@/constants/projects'
import { motion } from 'framer-motion'

interface AboutProps {
  onClose: () => void
}

export default function About({ onClose }: AboutProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-96 rounded-2xl border shadow-lg backdrop-blur-sm md:w-2xl">
        <div className="scrollbar-hidden relative h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground text-3xl font-bold">About Me</DialogTitle>
          </DialogHeader>
          <div className="text-muted-foreground/70 mt-4 text-sm">
            <p>
              Hey there! I’m <span className="text-primary font-medium">ŊʂƓ PRIYANSHU</span>, a
              B.Tech CSE student and the CEO of{' '}
              <span className="text-primary font-semibold">Creator's World</span> — a creative space
              for creative people. I love writing clean code, building beautiful websites, and
              pushing the boundaries of front-end development using{' '}
              <span className="text-primary font-semibold">Next.js</span>,{' '}
              <span className="text-primary font-semibold">Tailwind CSS</span>, and{' '}
              <span className="text-primary font-semibold">TypeScript</span>. I’ve worked on Discord
              bots, developer tools, and open-source projects — all while blending creativity with
              precision. Let’s connect, collaborate, and create something meaningful together!
            </p>
          </div>

          <DialogHeader className="mt-6">
            <DialogTitle className="text-foreground text-3xl font-bold">Skills</DialogTitle>
          </DialogHeader>

          <div className="text-muted-foreground mt-4 space-y-6 text-2xl">
            <div>
              <p className="text-primary mb-2 text-center text-sm font-semibold">Languages</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[SiTypescript, SiJavascript, SiPython, SiC, SiHtml5, SiCss3].map((Icon, i) => (
                  <motion.div whileHover={{ scale: 1.2 }} key={i}>
                    <Icon className="hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary mb-2 text-center text-sm font-semibold">Frontend</p>
              <div className="flex justify-center gap-4">
                {[SiReact, SiNextdotjs].map((Icon, i) => (
                  <motion.div whileHover={{ scale: 1.2 }} key={i}>
                    <Icon className="hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary mb-2 text-center text-sm font-semibold">Backend</p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiNodedotjs className="hover:text-primary transition-colors" />
                </motion.div>
              </div>
            </div>

            <div>
              <p className="text-primary mb-2 text-center text-sm font-semibold">UI / Motion</p>
              <div className="flex justify-center gap-4">
                {[SiShadcnui, SiFramer, SiNextui].map((Icon, i) => (
                  <motion.div whileHover={{ scale: 1.2 }} key={i}>
                    <Icon className="hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary mb-2 text-center text-sm font-semibold">Database</p>
              <div className="flex justify-center gap-4">
                {[SiSupabase, SiMysql].map((Icon, i) => (
                  <motion.div whileHover={{ scale: 1.2 }} key={i}>
                    <Icon className="hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary mb-2 text-center text-sm font-semibold">
                CI / Integration
              </p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiGit className="hover:text-primary transition-colors" />
                </motion.div>
              </div>
            </div>
          </div>

          <DialogHeader className="mt-6">
            <DialogTitle className="text-foreground text-3xl font-bold">
              Featured Projects
            </DialogTitle>
          </DialogHeader>
          <div className="text-muted-foreground/70 mt-4 space-y-3 text-sm">
            {featuredProjects.map(project => (
              <div
                key={project.githubUrl}
                className={`block rounded-lg border px-4 py-3 transition-all ${
                  project.private
                    ? 'border-primary/10 hover:border-primary/20 bg-primary/5 hover:bg-primary/10 dark:hover:bg-background/20'
                    : 'border-muted bg-muted cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">
                    {project.private ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {project.name}
                      </a>
                    ) : (
                      <span>{project.name}</span>
                    )}
                  </span>
                  <FaGithub className="text-muted-foreground text-lg" />
                </div>
                <p className="mt-1 text-xs">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
