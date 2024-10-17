"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AnimationContainer from './global/animation';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, email, message };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSuccess(true);
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setError('Failed to submit form.');
            }
        } catch {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <>
            <AnimationContainer customClassName='w-full py-12 lg:py-16'>
                <h2 className='mb-8 text-2xl font-bold tracking-tight text-center lg:text-start'>
                    Get in Touch
                </h2>
                <p className='w-full text-base font-normal leading-7 text-justify'>
                    Something on your mind? Feel free to drop me a message.
                </p>
            </AnimationContainer>
            <AnimationContainer customDelay={0.2} customClassName='w-full'>
                <div className="relative mx-auto flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                    {/* Contact Form Area */}
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
                                            onChange={(e) => setName(e.target.value)}
                                            className="text-neutral-900 dark:text-neutral-100"
                                            required />
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
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="text-neutral-900 dark:text-neutral-100"
                                            required />
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
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="text-neutral-900 dark:text-neutral-100"
                                            rows={5}
                                            required />
                                    </div>
                                </CardContent>

                                {/* Submit Button */}
                                <CardFooter className="px-8 pb-8 justify-center items-center">
                                    <Button variant="default" type="submit" className="w-2xl py-3 text-sm font-bold gap-2">
                                        <span><PaperPlaneIcon className='w-6 h-6'/></span> Send Message
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>

                    {/* Success/Error Popup */}
                    {success && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="rounded-md bg-neutral-200 p-6 text-center shadow-md dark:bg-zinc-950">
                                <h2 className="text-lg font-semibold text-green-600">Success!</h2>
                                <p className="text-neutral-800 dark:text-neutral-200">
                                    Your message has been sent successfully.
                                </p>
                                <Button onClick={() => setSuccess(false)} className="mt-4">
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="rounded-md bg-neutral-200 p-6 text-center shadow-md dark:bg-zinc-950">
                                <h2 className="text-lg font-semibold text-red-600">Error</h2>
                                <p className="text-neutral-800 dark:text-neutral-200">
                                    Something went wrong! Please try again later.
                                </p>
                                <Button onClick={() => setError('')} className="mt-4">
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </AnimationContainer>
        </>
    );
}

export default ContactForm;

