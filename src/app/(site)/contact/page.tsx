"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Send, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const accentColor = "#FDC435";

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
        <div className="flex flex-col bg-white min-h-screen">
            {/* Header Section */}
            <section className="py-16 sm:py-20 bg-white border-b border-black/5 relative overflow-hidden">
                <div style={{ backgroundColor: `${accentColor}0d` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10" />

                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back Home
                    </Link>
                    <div className="flex flex-col gap-4 max-w-[900px]">
                        <span style={{ color: accentColor }} className="font-black text-[10px] tracking-[0.4em] uppercase">
                            Get in Touch
                        </span>
                        <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black leading-[0.9] uppercase break-all">
                            LET'S <br />
                            <span style={{ color: accentColor }}>CONNECT.</span>
                        </h1>
                        <p className="max-w-[600px] text-slate-500 text-sm sm:text-lg font-medium leading-relaxed mt-2">
                            Whether you have a project in mind or just want to say hello, my inbox is always open.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Contact Info Side */}
                <div className="lg:col-span-5 flex flex-col gap-10 sm:gap-12">
                    <div className="flex flex-col gap-6 sm:gap-8">
                        <div className="flex items-start gap-4 sm:gap-6 group">
                            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-black/5 group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-sm shrink-0">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-[#FDC435] transition-colors" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Me</span>
                                <a href="mailto:hello@pranto.io" className="text-lg sm:text-xl font-black text-black hover:italic transition-all break-all">hello@pranto.io</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 sm:gap-6 group">
                            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-black/5 group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-sm shrink-0">
                                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-[#FDC435] transition-colors" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</span>
                                <span className="text-lg sm:text-xl font-black text-black">Dhaka, Bangladesh</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 sm:gap-6 group">
                            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-black/5 group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-sm shrink-0">
                                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-[#FDC435] transition-colors" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Me</span>
                                <span className="text-lg sm:text-xl font-black text-black">+880 1234 567 890</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 rounded-[2rem] bg-black text-white flex flex-col gap-4 sm:gap-6 relative overflow-hidden shadow-2xl shadow-black/20">
                        <div style={{ backgroundColor: accentColor }} className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20" />
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight relative z-10 leading-tight">
                            Ready to start <br /> something amazing?
                        </h3>
                        <p className="text-white/60 font-medium leading-relaxed relative z-10 text-xs sm:text-sm">
                            I'm currently available for selective freelance projects and collaborations.
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="lg:col-span-7">
                    <Card className="border-black/5 shadow-2xl shadow-black/[0.02] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="p-6 sm:p-12 pb-4">
                            <CardTitle className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Drop a Message</CardTitle>
                            <CardDescription className="text-slate-500 text-sm sm:text-base font-medium">I'll respond as soon as I can, usually within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-12 pt-6">
                            <form onSubmit={handleSubmit} className="grid gap-6 sm:gap-8">
                                <div className="grid gap-3">
                                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                        className="h-14 rounded-xl border-black/5 bg-slate-50/50 focus:bg-white transition-all px-6 font-medium"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        className="h-14 rounded-xl border-black/5 bg-slate-50/50 focus:bg-white transition-all px-6 font-medium"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="flex min-h-[160px] w-full rounded-2xl border border-black/5 bg-slate-50/50 focus:bg-white px-6 py-4 text-sm font-medium shadow-none placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/5 transition-all text-black"
                                        placeholder="How can I help you?"
                                        required
                                    />
                                </div>
                                <MagneticWrapper strength={0.15}>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 rounded-full bg-black hover:bg-zinc-800 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-black/20 transition-all flex items-center justify-center gap-3 group"
                                    >
                                        {loading ? "Transmitting..." : (
                                            <>
                                                Send Message
                                                <Send className="w-4 h-4 text-[#FDC435] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </MagneticWrapper>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
