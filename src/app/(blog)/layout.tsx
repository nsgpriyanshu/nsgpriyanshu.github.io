import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog - Dive into the the articles and stories written by the me`,
  description: `Dive into the the articles and stories written by the me`,
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative w-full">{children}</main>
}
