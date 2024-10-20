import SectionContainer from '@/components/global/section-containers'
import Hero from '../Hero'
import AbuotMe from '../About'
import Experience from '../Journey'
import FeaturedProjects from '../FeaturedProjects'
import Skills from '../Skill'
import ContactForm from '../Contact'

const HomeSection = () => {
  return (
    <SectionContainer>
      <div className="flex w-full flex-col items-start">
        <Hero />
        <AbuotMe />
        <Experience />
        <FeaturedProjects />
        <Skills />
        <ContactForm />
      </div>
    </SectionContainer>
  )
}

export default HomeSection
