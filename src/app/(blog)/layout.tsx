import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog — Explore articles and stories written by me`,
  description: `Discover thoughtful articles and engaging stories authored by me on a range of topics.`,
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen w-full px-4 py-8 sm:px-6">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
