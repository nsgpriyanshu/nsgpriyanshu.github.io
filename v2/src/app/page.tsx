import HomeSection from '@/components/containers/HomeSection'
import GradientBackground from '@/components/global/gradient-background'

export default function Home() {
  return (
    <GradientBackground>
      <main className="relative !z-[999] flex flex-col items-center justify-center px-4 pt-20">
        <HomeSection />
      </main>
    </GradientBackground>
  )
}
