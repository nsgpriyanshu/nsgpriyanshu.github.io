import Image from 'next/image'
import AnimationContainer from '@/components/global/animation'
import { Crosshair2Icon, RocketIcon } from '@radix-ui/react-icons'
import { HyperText } from './ui/hyper-text'

const Hero = () => {
  return (
    <div className="relative flex flex-col-reverse items-center justify-between w-full py-12 lg:py-16 lg:flex-row">
      <AnimationContainer customClassName="flex flex-col items-center justify-between max-w-lg lg:items-start p-0 lg:pr-8">
        <h3 className="text-sm lg:text-xl flex flex-row gap-2 text-neutral-800 dark:text-neutral-400">
          Salutations, Code Crafter{" "}
          <span className="text-foreground dark:text-forground"><RocketIcon className='h-5 w-5' /></span>
        </h3>
        <HyperText
          className="py-2 text-xl font-bold text-foreground lg:py-4 sm:text-3xl lg:text-5xl"
          text="Priyanshu"
        />
        <h3 className="text-base text-center text-neutral-800 dark:text-neutral-400 lg:text-start lg:text-lg">
          <span className="font-medium text-foreground dark:text-foreground">
            Writing code and building design{" "}
          </span>
          to build beautiful and functional web applications.
        </h3>
        <h3 className="text-sm lg:text-xl flex flex-row gap-2 mt-2">
          <Crosshair2Icon/>{" "}
          <span className="text-neutral-800 dark:text-neutral-400">India</span>
        </h3>
      </AnimationContainer>
      

      <AnimationContainer customClassName="mb-8 relative lg:mb-0">
        <Image
          src='/icons/nsgpriyanshured.jpeg'
          alt='Priyanshu'
          height={3000}
          width={3000}
          sizes='50vw'
          priority
          className="object-cover object-top w-[10rem] h-[10rem] transition duration-300 ease-out rounded-lg filter grayscale hover:grayscale-0 lg:w-[20rem] lg:h-[20rem]"
        />
        <div className="absolute block w-44 h-44 rounded-full md:hidden top-0 left-0 right-1/2 -z-10 bg-red-500/40 blur-[5rem]"></div>
      </AnimationContainer>
    </div>
  )
}

export default Hero
