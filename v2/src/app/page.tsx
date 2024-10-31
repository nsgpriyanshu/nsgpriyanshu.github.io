import HomeSection from '@/components/containers/HomeSection'
import GradientBackground from '@/components/global/gradient-background'
import { siteConfig } from '@/config/siteConfig'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.siteDescription,
}

export default function Home() {
  return (
    // <GradientBackground>
    <main className="relative !z-[999] flex flex-col items-center justify-center px-4 pt-20">
      <HomeSection />
    </main>
    // </GradientBackground>
  )
}
