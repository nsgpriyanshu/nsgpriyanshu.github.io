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
    siteUrl: 'https:///nsgpriyanshu.github.io',
    ogImage: '',
    twitterImage: '',
    twitter: '@nsgpriyanshu',
  },
}
