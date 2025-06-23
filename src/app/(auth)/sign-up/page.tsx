'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { UserPlus } from 'lucide-react'

export default function SignUpPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const router = useRouter()
  const supabase = createClient()
  const { resolvedTheme } = useTheme()

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
      console.error('Sign-up error:', error.message)
      toast.error(error.message)
    } else {
      toast.success('Signup successful! Please check your email for verification.')
    }
  }

  return (
    <Wrapper className="flex min-h-screen items-center justify-center py-12">
      <AnimationContainer animation="fadeUp" delay={0.2} className="w-auto">
        <div className="border-primary/20 bg-primary/5 dark:bg-background/20 dark:border-primary/20 relative overflow-hidden rounded-[30px] border backdrop-blur-lg">
          <div className="flex items-center justify-center px-6 py-8">
            <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
              <div className="space-y-2 text-left">
                <h2 className="text-foreground text-2xl font-bold">Create an Account</h2>
                <p className="text-muted-foreground text-sm">
                  Enter your info to create your account.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="First name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                />
                <Input
                  placeholder="Last name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="bg-background/20 border-border focus:ring-primary text-foreground placeholder:text-muted-foreground border focus:ring-2"
                />
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

              <div>
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
                <p className="text-muted-foreground mt-1 text-xs">Minimum 8 characters required.</p>
              </div>

              <Button
                type="submit"
                className="bg-primary/10 hover:bg-primary/20 text-foreground border-primary/20 border backdrop-blur-sm transition-colors"
              >
                <UserPlus className="mr-2 h-4 w-4" />
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
