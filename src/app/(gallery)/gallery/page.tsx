import LandingPage from '@/components/gallery/landing'
import StructuredData from '@/components/seo/structured-data'
import { absoluteUrl, siteConfig } from '@/utils'

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteConfig.name} Gallery`,
          description: 'Photography, designs, and visual work by Priyanshu.',
          url: absoluteUrl('/gallery'),
        }}
      />
      <section className="w-full" aria-label="Gallery items">
        <LandingPage />
      </section>
    </div>
  )
}

export default Page
