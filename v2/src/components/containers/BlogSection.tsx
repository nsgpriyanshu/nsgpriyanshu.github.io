import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Image from 'next/image'
import MagicCard from '@/components/ui/magic-card'
import AnimationContainer from '../global/animation'
import SectionContainer from '../global/section-containers'

const BlogSection = () => {
  const posts = getAllPosts()

  return (
    <SectionContainer>
      <AnimationContainer customClassName="w-full py-12 lg:py-16">
        <h2 className="mb-8 text-center text-4xl font-semibold capitalize !leading-[1.5] tracking-wide md:text-5xl">
          Blog
        </h2>
        <p className="w-full text-justify text-base font-normal leading-7">
          Hey, thank you for reaching out to me. I will try to reply to you as soon as possible.
        </p>
      </AnimationContainer>
      <AnimationContainer customClassName="w-full flex flex-col relative gap-5 mb-8">
        <ul>
          {posts.map(post => (
            <MagicCard key={post.slug} className="mb-6 w-auto rounded-lg p-6 md:max-w-[48rem]">
              <Link href={`/blog/${post.slug}`} passHref>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="mt-2">{post.description}</p>
                <Image
                  width={30}
                  height={30}
                  src={post.profilePicture}
                  alt={post.author}
                  className="mt-4 rounded-md"
                />
                <p className="mt-2">
                  {post.author}, {post.role}
                </p>
                <p className="mt-2">{post.date}</p>
              </Link>
            </MagicCard>
          ))}
        </ul>
      </AnimationContainer>
    </SectionContainer>
  )
}

export default BlogSection
