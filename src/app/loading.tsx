'use client'

import Wrapper from '@/components/global/wrapper'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingPage() {
  return (
    <Wrapper className="bg-background flex min-h-screen items-center justify-center">
      <main className="w-full max-w-5xl px-4 py-12">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-3/4" aria-hidden />
            <Skeleton className="h-4 w-1/3" aria-hidden />
            <Skeleton className="mt-2 h-10 w-40" aria-hidden />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Skeleton className="h-40 w-full" aria-hidden />
            <Skeleton className="h-40 w-full" aria-hidden />
            <Skeleton className="h-40 w-full" aria-hidden />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
