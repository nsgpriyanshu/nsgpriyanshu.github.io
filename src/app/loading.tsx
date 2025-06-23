'use client'

import { useEffect, useState } from 'react'
import Wrapper from '@/components/global/wrapper'
import AnimationContainer from '@/components/global/animation-container'

export default function LoadingPage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20) // You can adjust speed by changing this

    return () => clearInterval(interval)
  }, [])

  return (
    <Wrapper className="flex min-h-screen items-center justify-center">
      <AnimationContainer animation="fadeUp" delay={0.2}>
        <div className="border-primary/20 bg-primary/5 dark:bg-background/10 backdrop-blur-md px-10 py-8 rounded-3xl border shadow-xl text-center">
          <h1 className="text-foreground mb-2 text-4xl font-bold tracking-tight">Loading</h1>
          <p className="text-muted-foreground text-lg">Please wait while we prepare things...</p>
          <div className="text-foreground mt-6 text-6xl font-black tabular-nums">
            {count}%
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}
