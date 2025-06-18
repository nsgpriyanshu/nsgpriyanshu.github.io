'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface AboutProps {
  onClose: () => void
}

export default function About({ onClose }: AboutProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/10">
        <DialogHeader>
          <DialogTitle className="text-foreground text-3xl font-bold">About Me</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground mt-4 text-sm">
          <p>
            Hey there! I’m <span className="text-foreground font-medium">ŊʂƓ PRIYANSHU</span>, a
            B.Tech CSE student and the CEO of{' '}
            <span className="text-foreground font-semibold">Creator's World</span> — a creative
            space for creative people. I love writing clean code, building beautiful websites, and
            pushing the boundaries of front-end development using{' '}
            <span className="text-foreground font-semibold">Next.js</span>,{' '}
            <span className="text-foreground font-semibold">Tailwind CSS</span>, and{' '}
            <span className="text-foreground font-semibold">TypeScript</span>. I’ve worked on
            Discord bots, developer tools, and open-source projects — all while blending creativity
            with precision. Let’s connect, collaborate, and create something meaningful together!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
