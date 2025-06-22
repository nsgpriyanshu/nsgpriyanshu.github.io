import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Gallery — Explore My Creative Work and Visual Projects`,
  description: `Browse through a curated collection of visuals, designs, and creative work from my personal and professional projects.`,
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen w-full px-4 py-8 sm:px-6">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
