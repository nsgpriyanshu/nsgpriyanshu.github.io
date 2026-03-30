import BlurCursor from '@/components/global/blur-cursor'
import HapticsProvider from '@/components/global/haptics-provider'
import PageTransitionWrapper from '@/components/global/page-transitions'
import ClickPulse from '@/components/global/click-pulse'
import { SoundProvider } from '@/context/sound-context'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { generateMetadata, siteConfig } from '@/utils'
import { ThemeProvider } from 'next-themes'
import { Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = generateMetadata({
  title: `${siteConfig.name} | Developer Portfolio, Blog, and Gallery`,
  description: siteConfig.description,
  path: '/',
  image: siteConfig.images.home,
  keywords: ['developer portfolio', 'frontend developer', 'creative technologist'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geistMono.variable} dark:text-foreground dark:bg-background max-h-screen overflow-x-hidden font-mono antialiased`,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            <HapticsProvider />
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
            <ClickPulse />
            <BlurCursor />
            <Toaster richColors={true} theme="dark" />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
