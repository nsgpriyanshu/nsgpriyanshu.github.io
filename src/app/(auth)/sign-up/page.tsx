import SignUp from '@/components/auth/sign-up'
import { generateMetadata, siteConfig } from '@/utils'

export const metadata = generateMetadata({
  title: `Sign Up | ${siteConfig.name}`,
  description:
    'Create an account to publish blog posts, upload gallery items, and manage your content.',
  path: '/sign-up',
  image: siteConfig.images.signUp,
  keywords: ['sign up', 'register', 'create account'],
  noIndex: true,
})

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <section className="w-full" aria-labelledby="sign-up-heading">
        <SignUp />
      </section>
    </div>
  )
}

export default Page
