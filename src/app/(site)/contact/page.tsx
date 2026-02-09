"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Message sent!", {
                    description: "Thank you for reaching out. I'll get back to you soon.",
                });
                (event.target as HTMLFormElement).reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
                <p className="text-muted-foreground mt-2">
                    Have a question or want to work together? Send me a message.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                    <CardDescription>I'll respond as soon as I can.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="How can I help you?"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
