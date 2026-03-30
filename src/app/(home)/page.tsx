import Hero from '@/components/home/hero'
import StructuredData from '@/components/seo/structured-data'
import { absoluteUrl, siteConfig } from '@/utils'

const Page = () => {
  return (
    <div className="flex max-h-screen flex-col">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.creator,
          url: absoluteUrl('/'),
          jobTitle: 'Developer',
          description: siteConfig.description,
          sameAs: ['https://github.com/nsgpriyanshu', 'https://x.com/nsgpriyanshu'],
        }}
      />
      <section aria-label="Introduction">
        <Hero />
      </section>
    </div>
  )
}

export default Page
