'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { LogIn } from 'lucide-react'
import { useAppHaptics } from '@/hooks/use-app-haptics'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const router = useRouter()
  const supabase = createClient()
  const { error: hapticError, success: hapticSuccess } = useAppHaptics()

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
      hapticError()
      console.error('Sign-in error:', error.message)
      toast.error(error.message)
    } else {
      hapticSuccess()
      toast.success('Signin successful! Redirecting...')
      router.push('/')
    }
  }

  return (
    <Wrapper className="flex min-h-screen items-center justify-center py-12">
      <AnimationContainer animation="fadeUp" delay={0.2} className="w-auto">
        <div className="border-primary/20 bg-primary/5 dark:bg-background/20 dark:border-primary/20 relative grid grid-cols-1 overflow-hidden rounded-[30px] border backdrop-blur-sm">
          <div className="flex items-center justify-center px-6 py-8">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xs space-y-4"
              aria-labelledby="sign-in-heading"
              aria-describedby="sign-in-description"
            >
              <div className="space-y-2 text-left">
                <h1 id="sign-in-heading" className="text-foreground text-2xl font-bold">
                  Sign in
                </h1>
                <p id="sign-in-description" className="text-muted-foreground text-sm">
                  Enter your credentials to access your account
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="sign-in-email" className="text-muted-foreground text-sm">
                  Email address
                </label>
                <Input
                  id="sign-in-email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sign-in-password" className="text-muted-foreground text-sm">
                  Password
                </label>
                <Input
                  id="sign-in-password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                  aria-describedby="sign-in-password-hint"
                  className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                />
                <p id="sign-in-password-hint" className="text-muted-foreground text-xs">
                  Use the password associated with your account.
                </p>
              </div>

              <Button
                type="submit"
                className="bg-primary/10 hover:bg-primary/20 text-foreground border-primary/20 border backdrop-blur-xs transition-colors"
              >
                <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}
