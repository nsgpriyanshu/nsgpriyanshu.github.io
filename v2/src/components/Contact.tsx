"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AnimationContainer from './global/animation';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Zod Schema for Validation
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Email must contain a valid "@" symbol.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validateForm = () => {
    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { name, email, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent successfully.',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit form.',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    }
  };

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

      <AnimationContainer customDelay={0.2} customClassName="w-full">
        <div className="relative mx-auto flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <div className="w-full">
            <Card className="mx-auto w-full rounded-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                  Mail Box
                </CardTitle>
              </CardHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <CardContent className="space-y-6 px-8 py-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-800 dark:text-neutral-400">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="text-neutral-900 dark:text-neutral-100"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-800 dark:text-neutral-400">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="text-neutral-900 dark:text-neutral-100"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-neutral-800 dark:text-neutral-400">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="text-neutral-900 dark:text-neutral-100"
                      rows={5}
                      required
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>
                </CardContent>

                {/* Submit Button */}
                <CardFooter className="items-center justify-center px-8 pb-8">
                  <Button
                    variant="default"
                    type="submit"
                    className="w-2xl gap-2 py-3 text-sm font-bold"
                  >
                    <PaperPlaneIcon className="h-6 w-6" /> Send Message
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </AnimationContainer>
    </>
  );
}

export default ContactForm;