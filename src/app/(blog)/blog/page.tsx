import LandingPage from '@/components/blog/landing'
import StructuredData from '@/components/seo/structured-data'
import { absoluteUrl, siteConfig } from '@/utils'

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${siteConfig.name} Blog`,
          description:
            'Articles, notes, and reflections on technology, creativity, and personal growth.',
          url: absoluteUrl('/blog'),
          publisher: {
            '@type': 'Person',
            name: siteConfig.creator,
          },
        }}
      />
      <section className="w-full" aria-label="Blog posts">
        <LandingPage />
      </section>
    </div>
  )
}

export default Page
