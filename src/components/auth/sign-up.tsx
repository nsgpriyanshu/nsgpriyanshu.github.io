'use client'

import { useState } from 'react'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { UserPlus } from 'lucide-react'
import { useAppHaptics } from '@/hooks/use-app-haptics'

export default function SignUp() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const supabase = createClient()
  const { error: hapticError, success: hapticSuccess } = useAppHaptics()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.first_name,
          last_name: form.last_name,
        },
      },
    })

    if (error) {
      hapticError()
      console.error('Sign-up error:', error.message)
      toast.error(error.message)
    } else {
      hapticSuccess()
      toast.success('Signup successful! Please check your email for verification.')
    }
  }

  return (
    <Wrapper className="flex min-h-screen items-center justify-center py-12">
      <AnimationContainer animation="fadeUp" delay={0.2} className="w-auto">
        <div className="border-primary/20 bg-primary/5 dark:bg-background/20 dark:border-primary/20 relative overflow-hidden rounded-[30px] border backdrop-blur-sm">
          <div className="flex items-center justify-center px-6 py-8">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xs space-y-4"
              aria-labelledby="sign-up-heading"
              aria-describedby="sign-up-description"
            >
              <div className="space-y-2 text-left">
                <h1 id="sign-up-heading" className="text-foreground text-2xl font-bold">
                  Create an Account
                </h1>
                <p id="sign-up-description" className="text-muted-foreground text-sm">
                  Enter your info to create your account.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="sign-up-first-name" className="text-muted-foreground text-sm">
                    First name
                  </label>
                  <Input
                    id="sign-up-first-name"
                    placeholder="First name"
                    name="first_name"
                    autoComplete="given-name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sign-up-last-name" className="text-muted-foreground text-sm">
                    Last name
                  </label>
                  <Input
                    id="sign-up-last-name"
                    placeholder="Last name"
                    name="last_name"
                    autoComplete="family-name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="sign-up-email" className="text-muted-foreground text-sm">
                  Email address
                </label>
                <Input
                  id="sign-up-email"
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
                <label htmlFor="sign-up-password" className="text-muted-foreground text-sm">
                  Password
                </label>
                <Input
                  id="sign-up-password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                  aria-describedby="sign-up-password-hint"
                  className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                />
                <p id="sign-up-password-hint" className="text-muted-foreground text-xs">
                  Minimum 8 characters required.
                </p>
              </div>

              <Button
                type="submit"
                className="bg-primary/10 hover:bg-primary/20 text-foreground border-primary/20 border backdrop-blur-sm transition-colors"
              >
                <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                Create Account
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-foreground underline hover:opacity-80">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}
