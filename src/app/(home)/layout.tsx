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
  return <main className="relative w-full">{children}</main>
}
