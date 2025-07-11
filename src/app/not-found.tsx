'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Wrapper from '@/components/global/wrapper'
import AnimationContainer from '@/components/global/animation-container'
import { Ghost, TriangleAlertIcon } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <Wrapper className="flex min-h-screen items-center justify-center px-4">
      <AnimationContainer animation="fadeUp" delay={0.2}>
        <div className="bg-primary/5 dark:bg-background/10 w-full max-w-md rounded-3xl px-10 py-8 text-center shadow-xl backdrop-blur-md">
          <TriangleAlertIcon className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h1 className="text-foreground mb-2 text-3xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => router.push('/')} variant="default">
            Go Home
          </Button>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}
