import SignIn from '@/components/auth/sign-in'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Sign In | ${siteConfig.name}`,
  description: 'Sign in securely to manage blog posts, gallery uploads, and your account settings.',
  path: '/sign-in',
  image: siteConfig.images.signIn,
  keywords: ['sign in', 'login', 'account access'],
  noIndex: true,
})

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full" aria-labelledby="sign-in-heading">
        <SignIn />
      </section>
    </div>
  )
}

export default Page
