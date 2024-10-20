import Image from 'next/image'
import AnimationContainer from '@/components/global/animation'
import { Crosshair2Icon, RocketIcon } from '@radix-ui/react-icons'
import { HyperText } from './ui/hyper-text'

const Hero = () => {
  return (
    <div className="relative flex w-full flex-col-reverse items-center justify-between py-12 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] lg:flex-row lg:py-16">
      <AnimationContainer customClassName="flex flex-col items-center justify-between max-w-lg lg:items-start p-0 lg:pr-8">
        <h3 className="flex flex-row gap-2 text-sm text-neutral-800 dark:text-neutral-400 lg:text-xl">
          Salutations, Code Crafter{' '}
          <span className="dark:text-forground text-foreground">
            <RocketIcon className="h-5 w-5" />
          </span>
        </h3>
        <HyperText
          className="py-2 text-xl font-bold text-foreground sm:text-3xl lg:py-4 lg:text-5xl"
          text="Priyanshu"
        />
        <h3 className="text-center text-base text-neutral-800 dark:text-neutral-400 lg:text-start lg:text-lg">
          <span className="font-medium text-foreground dark:text-foreground">
            Writing code and building design{' '}
          </span>
          to build beautiful and functional web applications.
        </h3>
        <h3 className="mt-2 flex flex-row gap-2 text-sm lg:text-xl">
          <Crosshair2Icon /> <span className="text-neutral-800 dark:text-neutral-400">India</span>
        </h3>
      </AnimationContainer>

      <AnimationContainer customClassName="mb-8 relative lg:mb-0">
        <Image
          src="/icons/nsgpriyanshured.jpeg"
          alt="Priyanshu"
          height={3000}
          width={3000}
          sizes="50vw"
          priority
          className="h-[10rem] w-[10rem] rounded-lg object-cover object-top grayscale filter transition duration-300 ease-out hover:grayscale-0 lg:h-[20rem] lg:w-[20rem]"
        />
        <div className="absolute left-0 right-1/2 top-0 -z-10 block h-44 w-44 rounded-full bg-red-500/40 blur-[5rem] md:hidden"></div>
      </AnimationContainer>
    </div>
  )
}

export default Hero
