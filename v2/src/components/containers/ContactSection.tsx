import Contact from '../Contact'
import AnimationContainer from '../global/animation'
import SectionContainer from '../global/section-containers'

const ContactSection = () => {
  return (
    <SectionContainer>
      <div className="mt-0 flex w-full flex-col items-start lg:mt-8">
        <AnimationContainer customClassName="w-full py-12 lg:py-16">
          <h2 className="mb-8 text-center text-4xl font-semibold capitalize !leading-[1.5] tracking-wide md:text-5xl">
            Contact
          </h2>
          {/* <p className='w-full text-base font-normal leading-7 text-justify'>
                    
                    </p> */}
        </AnimationContainer>
        <AnimationContainer customClassName="w-full flex flex-col relative gap-5 mb-8">
          <Contact />
        </AnimationContainer>
      </div>
    </SectionContainer>
  )
}

export default ContactSection
