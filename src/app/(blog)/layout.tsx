import Footer from '@/components/footer'
import Header from '@/components/header'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Blog | ${siteConfig.name}`,
  description:
    'Read articles, notes, and reflections on technology, creativity, learning, and personal growth from Priyanshu.',
  path: '/blog',
  image: siteConfig.images.blog,
  keywords: ['developer blog', 'articles', 'writing', 'tech blog'],
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">{children}</div>
      <Footer />
    </main>
  )
}
