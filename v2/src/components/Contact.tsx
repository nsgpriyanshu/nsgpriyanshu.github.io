'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import AnimationContainer from './global/animation'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'

// Zod Schema for Form Validation
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: "Enter a valid email address with '@'." }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
})

function ContactForm() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const result = contactSchema.safeParse({ name, email, message })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as string] = issue.message
      })
      setErrors(fieldErrors) // Store validation errors
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your message and attachments have been sent.',
        })
        setName('')
        setEmail('')
        setMessage('')
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit form.',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
      })
    }
  }

  return (
    <>
      <AnimationContainer customClassName="w-full py-12 lg:py-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight lg:text-start">
          Get in Touch
        </h2>
        <p className="w-full text-justify text-base font-normal leading-7">
          Something on your mind? Feel free to drop me a message.
        </p>
      </AnimationContainer>

      <AnimationContainer customDelay={0.2}>
        <form onSubmit={handleSubmit}>
          <div className="mx-4 flex h-auto flex-col items-center justify-center overflow-hidden rounded-lg">
            <Card className="w-full max-w-2xl rounded-lg dark:border-neutral-800 dark:bg-transparent">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-rose-100/90">
                  Mail Box
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Form Fields */}
                <Label htmlFor="name" className="text-neutral-800 dark:text-rose-100/90">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="text-neutral-900 dark:text-neutral-100"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

                <Label htmlFor="email" className="text-neutral-800 dark:text-rose-100/90">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="text-neutral-900 dark:text-neutral-100"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

                <Label htmlFor="message" className="text-neutral-800 dark:text-rose-100/90">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="text-neutral-900 dark:text-neutral-100"
                  rows={10}
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  type="submit"
                  className="w-full gap-2 py-3 text-sm font-bold dark:bg-rose-200 dark:text-neutral-900"
                >
                  <PaperPlaneIcon className="h-6 w-6" /> Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </AnimationContainer>
    </>
  )
}

export default ContactForm
