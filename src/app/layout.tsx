import BlurCursor from '@/components/global/blur-cursor'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { generateMetadata } from '@/utils'
import { ThemeProvider } from 'next-themes'
import { Geist_Mono } from 'next/font/google'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = generateMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geistMono.variable} dark:text-foreground dark:bg-backgorund min-h-screen overflow-x-hidden font-mono antialiased`,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BlurCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
