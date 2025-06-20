import FloatingDock from '@/components/floating-dock'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Authentication - Log in / Register your account`,
  description: `Log in / Register your account`,
  openGraph: {
    title: `Authentication - Log in / Register your account`,
    description: `Log in / Register your account`,
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

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative w-full">
      {children}
      <FloatingDock />
      <Toaster richColors />
    </main>
  )
}
