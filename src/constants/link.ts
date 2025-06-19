export interface DockItem {
  href: string
  title: string
  iconName: string
}

export const dockItems: DockItem[] = [
  { href: '/', title: 'Home', iconName: 'UserRoundIcon' },
  { href: '/blog', title: 'Blog', iconName: 'BookMarkedIcon' },
  { href: '/gallery', title: 'Gallery', iconName: 'GalleryHorizontalEndIcon' },
]

export const navigationLinks = [
  { href: '/', label: 'Blog' },
  { href: '/', label: 'Gallery' },
]
