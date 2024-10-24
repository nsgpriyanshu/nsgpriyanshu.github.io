import AnimationContainer from '@/components/global/animation'
import SectionContainer from '@/components/global/section-containers'
import Skills from '../Skill'

const AboutSection = () => {
  return (
    <SectionContainer>
      <div className="mt-0 flex w-full flex-col items-start lg:mt-8">
        <AnimationContainer customClassName="w-full py-12 lg:py-16">
          <h2 className="mb-8 text-center text-4xl font-semibold capitalize !leading-[1.5] tracking-wide md:text-5xl">
            About
          </h2>
          <p className="w-full text-justify text-base font-normal leading-7">
            Hey, I'm nsgpriyanshu, an avid explorer of the AI realm. I double up as an AI content
            creator and proudly helm my Discord community as CEO. My passions are as diverse as they
            come, from the melodies of music to the strokes of a pencil, and the cinematic wonders
            on screen. Delving into an array of captivating activities fuels my creativity and
            curiosity.
          </p>
        </AnimationContainer>
        <AnimationContainer customClassName="w-full flex flex-col relative gap-5 mb-8">
          <Skills />
        </AnimationContainer>
        <AnimationContainer customClassName="w-full flex flex-col relative gap-5 mb-8">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight lg:text-start">Future Vision</h2>
          <p className="w-full text-justify text-base font-normal leading-7">
           I am passionate about learning and researching more about web development. I aim to create innovative websites using 3D technologies like Three.js or React Fiber. Additionally, I aspire to build something impactful—something that could change the world, or at the very least, make a 1% difference in people's lives.
          </p>
        </AnimationContainer>
      </div>
    </SectionContainer>
  )
}

export default AboutSection
