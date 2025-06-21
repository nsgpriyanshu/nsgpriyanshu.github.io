import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Home - ${process.env.NEXT_PUBLIC_APP_DESCRIPTION}`,
  description: `${process.env.NEXT_PUBLIC_APP_DESCRIPTION}`,
  openGraph: {
    title: `Home - ${process.env.NEXT_PUBLIC_APP_DESCRIPTION}`,
    description: `${process.env.NEXT_PUBLIC_APP_DESCRIPTION}`,
    images: [
      {
        url: '/assets/og_main.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image',
      },
    ],
  },
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen w-full px-4 py-8 sm:px-6">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
