import React from 'react'
import AnimationContainer from '@/components/global/animation'
import { StarIcon } from '@radix-ui/react-icons'

const AbuotMe = () => {
  return (
    <AnimationContainer customClassName="w-full py-12 lg:py-16">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight lg:text-start">About me</h2>

      <p className="w-full text-justify text-base font-normal leading-7">
        I am Priyanshu, also known as nsgpriyanshu. I am currently pursuing a Bachelor of Technology in Computer
        Science and Engineering. Alongside my studies, my passion for web development and AI
        continues to grow, and I strive to practice and learn every day.
      </p>
    </AnimationContainer>
  )
}

export default AbuotMe
