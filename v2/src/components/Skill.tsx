import React from 'react'
import AnimationContainer from '@/components/global/animation'
import TechStacks from './icons/TechStack'

const Skills = () => {
    return (
        <AnimationContainer customClassName='w-full py-12 lg:py-16'>

            <h2 className='mb-8 text-2xl font-bold tracking-tight text-center lg:text-start'>
                Skills
            </h2>

            <p className='w-full text-base font-normal leading-7 text-justify'>
            Mastering the art of web development, I specialize in Node.js. Armed with a keen eye for design, I wield tools like Canva to craft captivating visual narratives. Moreover, my proficiency in AI optimization empowers me to elevate project functionalities. With adept moderation skills, I ensure seamless interactions within Discord communities.
            </p>
            <AnimationContainer customClassName='flex flex-col justify-center items-center lg:items-start mb-5 mx-auto lg:mx-0'>
                <div className='flex flex-col items-center justify-center lg:items-start'>
                    <TechStacks />
                </div>
            </AnimationContainer>
        </AnimationContainer>
    )
}

export default Skills