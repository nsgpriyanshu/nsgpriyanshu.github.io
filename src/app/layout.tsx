import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { generateMetadata } from '@/utils'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { Geist_Mono } from 'next/font/google'
import FloatingDock from '@/components/floating-dock'
import { Cursor } from '@/components/cursor'

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
          `${geistMono.variable} text-foreground dark:bg-backgorund min-h-screen overflow-x-hidden font-mono antialiased`,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors theme="dark" position="bottom-center" />
          {children}
          <Cursor />
          <FloatingDock />
        </ThemeProvider>
      </body>
    </html>
  )
}
