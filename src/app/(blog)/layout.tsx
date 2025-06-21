import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog - Dive into the the articles and stories written by the me`,
  description: `Dive into the the articles and stories written by the me`,
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
