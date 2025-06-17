import { Particles } from '@/components/ui/particles'
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
    <main className="relative w-full">
      <Particles className="absolute inset-0 z-0" quantity={100} ease={80} refresh />
      {children}
    </main>
  )
}
