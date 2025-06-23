'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { LogIn } from 'lucide-react'

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const router = useRouter()
  const supabase = createClient()
  const { resolvedTheme } = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      console.error('Sign-in error:', error.message)
      toast.error(error.message)
    } else {
      toast.success('Signin successful! Redirecting...')
      router.push('/')
    }
  }

  return (
    <Wrapper className="flex min-h-screen items-center justify-center py-12">
      <AnimationContainer animation="fadeUp" delay={0.2} className="w-auto">
        <div className="border-primary/20 bg-primary/5 dark:bg-background/20 dark:border-primary/20 relative grid grid-cols-1 overflow-hidden rounded-[30px] border backdrop-blur-lg">
          <div className="flex items-center justify-center px-6 py-8">
            <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
              <div className="space-y-2 text-left">
                <h2 className="text-foreground text-2xl font-bold">Sign in</h2>
                <p className="text-muted-foreground text-sm">
                  Enter your credentials to access your account
                </p>
              </div>

              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
              />

              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
                className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
              />

              <Button
                type="submit"
                className="bg-primary/10 hover:bg-primary/20 text-foreground border-primary/20 border backdrop-blur-sm transition-colors"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}
