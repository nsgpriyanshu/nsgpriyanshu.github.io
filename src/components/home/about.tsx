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
      <DialogContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-96 rounded-2xl border shadow-lg backdrop-blur-md md:w-2xl">
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
          <div className="dark:text-muted-foreground mt-4 space-y-6 text-2xl">
            <div>
              <p className="text-foreground mb-2 text-center text-sm font-semibold">Languages</p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiTypescript
                    title="TypeScript"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiJavascript
                    title="JavaScript"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiPython title="Python" className="hover:text-foreground transition-colors" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiC title="C" className="hover:text-foreground transition-colors" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiHtml5 title="HTML5" className="hover:text-foreground transition-colors" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiCss3 title="CSS3" className="hover:text-foreground transition-colors" />
                </motion.div>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-2 text-center text-sm font-semibold">
                Frontend Frameworks
              </p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiReact title="React" className="hover:text-foreground transition-colors" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiNextdotjs
                    title="Next.js"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-2 text-center text-sm font-semibold">Backend</p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiNodedotjs
                    title="Node.js"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-2 text-center text-sm font-semibold">
                UI / Motion Libraries
              </p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiShadcnui
                    title="shadcn/ui"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiFramer
                    title="Framer-motion"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiNextui title="NextUi" className="hover:text-foreground transition-colors" />
                </motion.div>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-2 text-center text-sm font-semibold">Database</p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiSupabase
                    title="Supabase"
                    className="hover:text-foreground transition-colors"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiMysql title="MySQL" className="hover:text-foreground transition-colors" />
                </motion.div>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-2 text-center text-sm font-semibold">
                CI / Integration
              </p>
              <div className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <SiGit title="Git" className="hover:text-foreground transition-colors" />
                </motion.div>
              </div>
            </div>
          </div>

          <DialogHeader className="mt-6">
            <DialogTitle className="text-foreground text-3xl font-bold">
              Featured Projects
            </DialogTitle>
          </DialogHeader>
          <div className="dark:text-muted-foreground mt-4 space-y-3 text-sm">
            {featuredProjects.map(project => (
              <div
                key={project.githubUrl}
                className={`block rounded-lg border px-4 py-3 transition-colors ${
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
                        className="hover:underline"
                      >
                        {project.name}
                      </a>
                    ) : (
                      <span>{project.name}</span>
                    )}
                  </span>
                  <FaGithub className="text-lg" />
                </div>
                <p className="dark:text-muted-foreground mt-1 text-xs">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
