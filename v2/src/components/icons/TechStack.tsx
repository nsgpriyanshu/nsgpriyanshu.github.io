'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import {
  SiHtml5,
  SiJavascript,
  SiCss3,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiMarkdown,
} from 'react-icons/si'

const TechStacks = () => {
  const animation = {
    hide: { x: -8, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  return (
    <>
      <motion.p
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.2 }}
        className="mb-3 text-center text-base lg:text-start"
      >
        My current tech stack
      </motion.p>

      <TooltipProvider delayDuration={0}>
        <motion.ul
          initial="hide"
          animate="show"
          transition={{ delayChildren: 0.2, staggerChildren: 0.05 }}
          className="mx-auto flex flex-wrap items-center justify-center gap-x-5 lg:mx-0"
        >
          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-black dark:hover:text-white">
                  <SiNextdotjs className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next.js</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#61DAFB]">
                  <SiReact className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>React</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#3178C6]">
                  <SiTypescript className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Typescript</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#38B2AC]">
                  <SiTailwindcss className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tailwind CSS</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#8CC84B]">
                  <SiNodedotjs className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Node.js</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#E34F26]">
                  <SiHtml5 className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>HTML5</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#1572B6]">
                  <SiCss3 className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>CSS3</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-[#F7DF1E]">
                  <SiJavascript className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>JavaScript</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>

          <motion.li variants={animation} className="opacity-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-neutral-700 transition duration-300 ease-out hover:text-orange-400">
                  <SiMarkdown className="md-w-8 md-h-8 h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>MDX</p>
              </TooltipContent>
            </Tooltip>
          </motion.li>
        </motion.ul>
      </TooltipProvider>
    </>
  )
}

export default TechStacks
