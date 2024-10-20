'use client'

import { links } from '@/config/siteConfig'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MobileNav from '@/components/MobileNavbar'
import { ModeToggle } from './global/theme-switcher'

const Navbar = () => {
  const pathname = usePathname()

  const [activeLink, setActiveLink] = useState('Home')

  const isBlogActive = pathname?.startsWith('/blog')

  return (
    <header className="relative z-[99999]">
      {/* Navbar Background */}
      <motion.div
        initial={{ y: -100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.7,
        }}
        className="fixed left-1/2 top-0 mx-auto hidden h-16 w-full -translate-x-1/2 overflow-hidden rounded-none border border-neutral-800/50 bg-black/20 bg-opacity-80 shadow-lg shadow-black/50 backdrop-blur-md sm:top-6 sm:h-12 sm:w-[28rem] sm:rounded-full lg:inline-block"
      >
        <motion.div
          initial={{ opacity: 0, x: '-50%' }}
          animate={{ opacity: 1, x: '-50%' }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.4,
          }}
          className="absolute bottom-0 left-1/2 mx-auto hidden h-4 w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/30 blur sm:h-2 sm:w-[35rem]"
        />
      </motion.div>

      {/* Desktop Navbar */}
      <nav className="fixed left-1/2 top-[0.5rem] z-[9999] hidden h-12 max-w-full -translate-x-1/2 overflow-x-scroll py-2 scrollbar-hide sm:top-[1.5rem] sm:h-12 sm:py-0 lg:flex">
        <ul className="flex h-full w-[28rem] items-center justify-center gap-x-4">
          {links?.map((link, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                bounce: 0.3,
                duration: 0.5,
                delay: 0.1 + index * 0.1,
              }}
              className="relative text-sm text-gray-400"
            >
              <Link
                href={link.hash}
                onClick={() => setActiveLink(link.name)}
                className={cn(
                  'flex items-center justify-center px-4 py-2 transition hover:text-white',
                  (activeLink === link.name || (isBlogActive && link.name === 'Blog')) &&
                    'text-white',
                )}
              >
                {link.name}

                {(activeLink === link.name || (isBlogActive && link.name === 'Blog')) && (
                  <motion.span
                    layoutId="activeLink"
                    transition={{
                      type: 'spring',
                      bounce: 0.3,
                    }}
                    className="absolute inset-0 -z-10 rounded-full border-t border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-neutral-900 shadow-md shadow-black/50 backdrop-blur-lg"
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Mobile & Tablet Navbar */}
      <MobileNav />
    </header>
  )
}

export default Navbar
