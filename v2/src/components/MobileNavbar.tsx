'use client'

import { links } from '@/config/siteConfig'
import { AnimatePresence, motion } from 'framer-motion'
import { Squeeze as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './global/theme-switcher'

const MobileNav = () => {
  const MotionButton = motion(Button)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  }

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }

    // Set initial state on mount
    handleBodyOverflow()

    // Cleanup effect on unmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <nav className="fixed left-0 right-0 top-0 flex h-16 w-full bg-black/20 backdrop-blur-md lg:hidden">
      <div className="relative flex w-full items-center justify-between px-5">
        <ModeToggle />
        <div className="relative z-[99999] flex items-center">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color="#fff"
            direction="left"
            distance="md"
            size={20}
            rounded
          />
        </div>

        <AnimatePresence presenceAffectsLayout>
          {isOpen && (
            <motion.div
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              variants={variants}
              transition={{
                type: 'spring',
                bounce: 0.15,
                duration: 0.5,
              }}
              className="backdrop-blur-4xl fixed inset-0 z-[9999] h-screen w-full rounded-lg bg-neutral-100 dark:bg-neutral-950"
            >
              <ul className="flex w-full flex-col items-start space-y-3 px-6 py-3 pt-16">
                {links?.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      type: 'spring',
                      bounce: 0.15,
                      duration: 0.2,
                      delay: 0.1 * index,
                    }}
                    onClick={() => setIsOpen(false)}
                    className="w-full transform cursor-pointer rounded-md px-4 py-2 text-start text-lg font-normal transition hover:bg-neutral-400 active:scale-95 active:opacity-80 dark:hover:bg-neutral-900"
                  >
                    <Link href={link.hash} className="w-full text-start">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default MobileNav
