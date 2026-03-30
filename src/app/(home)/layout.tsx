import Footer from '@/components/footer'
import Header from '@/components/header'
import GoldenSpiralBackground from '@/components/golden-spiral-background'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `${siteConfig.name} | Home`,
  description:
    'Explore Priyanshus portfolio, writing, experiments, and visual work across development, design, and storytelling.',
  path: '/',
  image: siteConfig.images.home,
  keywords: ['home page', 'portfolio website', 'developer portfolio'],
})

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between sm:px-6 lg:px-0 lg:py-0">
      <GoldenSpiralBackground />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}
