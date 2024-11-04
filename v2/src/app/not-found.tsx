import AnimationContainer from '@/components/global/animation'
import GradientBackground from '@/components/global/gradient-background'
import SectionContainer from '@/components/global/section-containers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    // <GradientBackground>
    <main className="relative !z-[999] flex flex-col items-center justify-center px-4 pt-20">
      <SectionContainer>
        <AnimationContainer customClassName="flex flex-col items-center justify-center mx-auto py-16">
          <div className="flex h-full flex-col items-center justify-center">
            <span className="custom-shadow rounded-md bg-gradient-to-br from-pink-400 to-red-600 px-3.5 py-1 text-sm">
              404
            </span>
            <h1 className="mt-5 text-3xl font-bold md:text-5xl">Not Found</h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-base font-medium text-neutral-800 dark:text-neutral-400">
              The page you are looking for does not exist. If you believe this is a mistake or need
              further assistance, feel free to{' '}
              <Link href="/https://github.com/Shreyas-29/portfolio-shreyas/issues">
                <b>open an issue</b>
              </Link>
              . Thank you for your understanding.
            </p>
            <Link href="/">
              <Button variant="secondary" className="mt-8">
                Back to homepage
              </Button>
            </Link>
          </div>
        </AnimationContainer>
      </SectionContainer>
    </main>
    // </GradientBackground>
  )
}

export default NotFound
