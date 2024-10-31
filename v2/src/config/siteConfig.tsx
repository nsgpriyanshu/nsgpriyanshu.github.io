export const links = [
  {
    name: 'Home',
    hash: '/',
  },
  {
    name: 'About',
    hash: '/about',
  },
  {
    name: 'Blog',
    hash: '/blog',
  },
  {
    name: 'Notes',
    hash: '/notes',
  },
  {
    name: 'Contact',
    hash: '/contact',
  },
] as const

export const siteConfig = {
  siteName: 'nsgpriyanshu',
  siteDescription: 'Personal portfolio of nsgpriyanshu',
  links: {
    siteUrl: 'https://priyanshu-ps.vercel.app',
    ogImage: 'https://priyanshu-ps.vercel.app/assets/preview.png',
    twitterImage: 'https://priyanshu-ps.vercel.app/assets/preview.png',
    twitter: '@nsgpriyanshu',
  },
}
