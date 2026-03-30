import Footer from '@/components/footer'
import Header from '@/components/header'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Gallery | ${siteConfig.name}`,
  description:
    'Browse a curated gallery of photography, design work, and personal visual moments captured by Priyanshu.',
  path: '/gallery',
  image: siteConfig.images.gallery,
  keywords: ['gallery', 'photography', 'design portfolio', 'visual work'],
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">{children}</div>
      <Footer />
    </main>
  )
}
