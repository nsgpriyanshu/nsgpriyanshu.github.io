'use client'

import { Loader2 } from 'lucide-react'
import Wrapper from '@/components/global/wrapper'

export default function LoadingPage() {
  return (
    <Wrapper className="bg-background flex min-h-screen items-center justify-center">
      <Loader2 className="text-foreground h-12 w-12 animate-spin" />
    </Wrapper>
  )
}
