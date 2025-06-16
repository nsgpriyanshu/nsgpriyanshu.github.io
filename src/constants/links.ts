export interface DockItem {
  title: string
  iconName: string // Store icon name instead of JSX
  href: string
}

export const dockItems: DockItem[] = [
  { title: 'Home', iconName: 'Home', href: '/' },
  { title: 'Projects', iconName: 'Briefcase', href: '/projects' },
  { title: 'Blog', iconName: 'Book', href: '/blog' },
  { title: 'Gallery', iconName: 'Image', href: '/gallery' },
]
