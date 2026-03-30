import Footer from '@/components/footer'
import Header from '@/components/header'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Account Access | ${siteConfig.name}`,
  description:
    'Secure account access for managing content across the portfolio, blog, and gallery.',
  path: '/sign-in',
  image: siteConfig.images.signIn,
  keywords: ['account access', 'login', 'authentication'],
  noIndex: true,
})

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative w-full">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
