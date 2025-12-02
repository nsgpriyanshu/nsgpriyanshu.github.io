'use client'

import { Skeleton } from '@/components/ui/skeleton'
import AnimationContainer from '@/components/global/animation-container'

export default function GallerySkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <AnimationContainer animation="fadeUp" delay={0.1}>
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <Skeleton className="shimmer h-10 w-48" aria-hidden />
            <Skeleton className="shimmer h-4 w-64" aria-hidden />
          </div>
          <Skeleton className="shimmer h-10 w-32" aria-hidden />
        </div>

        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="shimmer h-10 w-full max-w-md" aria-hidden />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="shimmer h-6 w-16" aria-hidden />
            ))}
          </div>
        </div>
      </AnimationContainer>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <AnimationContainer key={index} animation="fadeUp" delay={0.15 + index * 0.05}>
            <div className="space-y-4">
              <Skeleton className="shimmer aspect-[4/3] w-full rounded-lg" aria-hidden />
              <div className="space-y-2">
                <Skeleton className="shimmer h-5 w-3/4" aria-hidden />
                <Skeleton className="shimmer h-3 w-48" aria-hidden />
                <Skeleton className="shimmer h-3 w-40" aria-hidden />
                <div className="flex flex-wrap gap-2 pt-2">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="shimmer h-5 w-12" aria-hidden />
                  ))}
                </div>
              </div>
            </div>
          </AnimationContainer>
        ))}
      </div>
    </div>
  )
}
