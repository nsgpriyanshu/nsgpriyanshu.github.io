'use client'

import { FaGithub } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { HiMiniDocumentText } from 'react-icons/hi2'
import { IoBook, IoBriefcase, IoBrowsers, IoDocumentText, IoMail, IoPerson } from 'react-icons/io5'
import AnimationContainer from './global/animation'
import { Button } from './ui/button'
import MotionButton from './ui/motion-button'

const Footer = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/me.pdf'
    link.download = 'me.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <footer className="mx-auto flex w-full flex-col items-center justify-center lg:max-w-screen-md">
      <hr className="h-px w-full border bg-neutral-100 dark:border-neutral-900" />

      <AnimationContainer customClassName="w-full grid grid-cols-3 place-items-center gap-2 lg:gap-4 mx-4 py-12 lg:py-8">
        <div className="flex flex-col space-y-4">
          <MotionButton href="/" delay={0}>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
            >
              <GoHomeFill className="mr-2 inline-block h-5 w-5" />
              Home
            </Button>
          </MotionButton>

          <MotionButton href="/about" delay={0.5}>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
            >
              <IoPerson className="mr-2 inline-block h-5 w-5" />
              About
            </Button>
          </MotionButton>
        </div>

        <div className="flex flex-col space-y-4">
          <MotionButton href="/blog" delay={0}>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
            >
              <IoBook className="mr-2 inline-block h-5 w-5" />
              Blog
            </Button>
          </MotionButton>

          <MotionButton href="/contact" delay={0.5}>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
            >
              <IoMail className="mr-2 inline-block h-5 w-5" />
              Contact
            </Button>
          </MotionButton>

          <MotionButton href="/notes" delay={1}>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
            >
              <HiMiniDocumentText className="mr-2 inline-block h-5 w-5" />
              Notes
            </Button>
          </MotionButton>
        </div>

        <div className="flex h-full flex-col space-y-4">
          <MotionButton href="https://github.com/nsgpriyanshu" target="_blank" delay={0}>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
            >
              <FaGithub className="mr-2 inline-block h-5 w-5" />
              GitHub
            </Button>
          </MotionButton>

          <MotionButton href="#" delay={1} target="_blank" download>
            <Button
              variant="ghost"
              size="sm"
              className="font-normal text-neutral-800 transition ease-out hover:opacity-70 dark:text-neutral-200"
              onClick={handleDownload}
            >
              <IoDocumentText className="mr-2 inline-block h-5 w-5" />
              My CV
            </Button>
          </MotionButton>
        </div>
      </AnimationContainer>
    </footer>
  )
}

export default Footer
