import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog - Dive into the the articles and stories written by the me`,
  description: `Dive into the the articles and stories written by the me`,
  openGraph: {
    title: `Blog - Dive into the the articles and stories written by the come`,
    description: 'Dive into the the articles and stories written by the come',
    images: [
      {
        url: '/assets/og_blog.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image',
      },
    ],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative w-full">{children}</main>
}
