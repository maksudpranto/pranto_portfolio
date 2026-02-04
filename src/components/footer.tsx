"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, Coffee, Mail, Home, User, Camera, BookOpen } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-white/90 backdrop-blur-md text-zinc-950 overflow-hidden pt-12 pb-6 border-t border-black/5 shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.1)] z-50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FDC435]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">

                    {/* CTA Section */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.9]">
                                LET'S CONNECT <br />
                                <span className="text-[#FDC435]">TOGETHER.</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-slate-600 text-lg max-w-md font-medium leading-relaxed"
                        >
                            Want to chat? I'm always open to discussing new opportunities and creative ideas.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <a
                                href="mailto:maksudpranto@gmail.com"
                                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FDC435] hover:text-black transition-all duration-300 group shadow-xl shadow-black/5"
                            >
                                <span>Let's Talk</span>
                                <Mail className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <h3 className="text-sm font-bold tracking-[0.2em] text-[#FDC435] uppercase">Explore</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: 'Home', href: '/', icon: Home },
                                    { name: 'About', href: '/#about', icon: User },
                                    { name: 'Photography', href: '/#photography', icon: Camera },
                                    { name: 'Blog', href: '/blog', icon: BookOpen }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-bold text-zinc-950 hover:text-[#FDC435] transition-colors w-fit group flex items-center gap-3"
                                    >
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-[#FDC435] transition-colors" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            <h3 className="text-sm font-bold tracking-[0.2em] text-[#FDC435] uppercase">Socials</h3>
                            <div className="flex flex-col gap-4">
                                {SOCIAL_LINKS.map((social, i) => {
                                    const Icon: any = social.icon;
                                    const isPath = typeof Icon === "string";

                                    return (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ '--hover-color': social.color } as any}
                                            className="text-lg font-medium text-slate-500 hover:text-black transition-colors flex items-center gap-3 group"
                                        >
                                            <div
                                                className="p-2 bg-[#FDC435] rounded-lg group-hover:bg-[var(--hover-color)] transition-colors duration-300 flex items-center justify-center shadow-md shadow-[#FDC435]/20"
                                            >
                                                {isPath ? (
                                                    <div className="relative w-4 h-4">
                                                        <Image
                                                            src={Icon}
                                                            alt={social.label}
                                                            fill
                                                            className="object-contain group-hover:invert"
                                                        />
                                                    </div>
                                                ) : (
                                                    <Icon className="w-4 h-4 text-black group-hover:text-white transition-colors" />
                                                )}
                                            </div>
                                            <span>{social.label}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                        <span>&copy; {currentYear} Maksud Hossain.</span>
                        <span className="hidden sm:inline">All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
