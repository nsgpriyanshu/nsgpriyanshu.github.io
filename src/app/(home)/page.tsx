import About from '@/components/home/about'
import HeroSection from '@/components/home/hero'

const HomePage = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full">
        <HeroSection />
      </section>
      {/* <section className="w-full">
        <About />
      </section> */}
    </div>
  )
}

export default HomePage
