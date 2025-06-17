import About from '@/components/home/about'
import Projects from '@/components/home/featured-project'
import HeroSection from '@/components/home/hero'
import Pricing from '@/components/home/pricing'

const HomePage = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <HeroSection />
      </section>
      <section className="w-full">
        <About />
      </section>
      <section className="w-full">
        <Projects />
      </section>
      <section className="w-full">
        <Pricing />
      </section>
    </div>
  )
}

export default HomePage
