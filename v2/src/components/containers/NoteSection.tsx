import AnimationContainer from '../global/animation'
import SectionContainer from '../global/section-containers'

const NoteSection = () => {
  return (
    <SectionContainer>
      <div className="mt-0 flex w-full flex-col items-start lg:mt-8">
        <AnimationContainer customClassName="w-full py-12 lg:py-16">
          <h2 className="mb-8 text-center text-4xl font-semibold capitalize !leading-[1.5] tracking-wide md:text-5xl">
            Notes
          </h2>
          <p className="w-full text-justify text-base font-normal leading-7">
            Welcome to my Notes page! This is where I capture thoughts, ideas, and observations as
            they come—whether it&apos;s brainstorming for a project, learning something new, or
            reflecting on personal experiences. These notes are more spontaneous and unfiltered,
            giving you a glimpse into my evolving journey. It&apos;s a space for growth, creativity,
            and curiosity. Feel free to explore, and maybe you'll find something that resonates or
            sparks inspiration along the way!
          </p>
        </AnimationContainer>
        <AnimationContainer customClassName="w-full flex flex-col relative gap-5 mb-8">
          <h1>Coming Soon</h1>
        </AnimationContainer>
      </div>
    </SectionContainer>
  )
}

export default NoteSection
