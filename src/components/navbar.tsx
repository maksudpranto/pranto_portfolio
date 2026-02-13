"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Github, Twitter, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const defaultNavItems = [
    { name: "Home", href: "/", label: "00" },
    { name: "Photography", href: "/#photography", label: "01" },
    { name: "Travel Stories", href: "/blog", label: "02" },
    { name: "About", href: "/#about", label: "03" },
];

export function Navbar({ themeColor = "#FDC435", navLinks = [], menuBackgroundText = "PRANTO" }: { themeColor?: string, navLinks?: any[], menuBackgroundText?: string }) {
    const navItems = navLinks && navLinks.length > 0 ? navLinks : defaultNavItems;
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <header className="fixed top-0 z-[100] w-full bg-white/5 backdrop-blur-md border-b border-black/5">
                <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between px-6 sm:px-12">
                    <Link
                        href="/"
                        className="font-black text-2xl tracking-tighter text-black group flex items-center gap-1 z-[110]"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className={cn("transition-colors duration-500", isOpen ? "text-black" : "text-black")}>
                            <span style={{ color: isOpen ? 'black' : themeColor }}>M</span>H
                        </span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ backgroundColor: isOpen ? 'black' : themeColor }}
                            className="w-1.5 h-1.5 rounded-full"
                        />
                    </Link>

                    <div className="flex items-center gap-6 z-[110]">
                        <MagneticWrapper strength={0.2}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="group flex items-center gap-4 focus:outline-none"
                                aria-label="Toggle Menu"
                            >
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500",
                                    isOpen ? "text-black/40" : "text-black"
                                )}>
                                    {isOpen ? "Close" : "Menu"}
                                </span>

                                <div className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5">
                                    <motion.span
                                        animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                        className={cn("w-8 h-[2px] bg-black transition-colors rounded-full", isOpen ? "bg-black" : "bg-black")}
                                    />
                                    <motion.span
                                        animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                                        className="w-8 h-[2px] bg-black rounded-full"
                                    />
                                    <motion.span
                                        animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                        className={cn("w-8 h-[2px] bg-black transition-colors rounded-full", isOpen ? "bg-black" : "bg-black")}
                                    />
                                </div>
                            </button>
                        </MagneticWrapper>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ backgroundColor: themeColor }}
                        className="fixed inset-0 z-[90] flex flex-col justify-center px-6 sm:px-12 overflow-hidden"
                    >
                        {/* Background Decorative Text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full h-full flex items-center justify-center">
                            <h1 className="text-[15vw] sm:text-[20vw] font-black text-black/[0.02] sm:text-black/[0.03] leading-none text-center uppercase break-all">
                                {menuBackgroundText}
                            </h1>
                        </div>

                        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
                            {/* Navigation Links */}
                            <nav className="lg:col-span-8 flex flex-col gap-2 sm:gap-4">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="group relative flex items-baseline gap-4 sm:gap-6"
                                        >
                                            <span className="text-[10px] sm:text-sm font-black text-black/20 group-hover:text-black transition-colors duration-300">
                                                {item.label}
                                            </span>
                                            <span className={cn(
                                                "text-3xl sm:text-6xl lg:text-8xl font-black tracking-tighter uppercase transition-all duration-500",
                                                pathname === item.href ? "text-black" : "text-black/40 group-hover:text-black group-hover:italic"
                                            )}>
                                                {item.name}
                                            </span>
                                            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-black hidden sm:block" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-12 lg:pl-12 lg:border-l border-black/10">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex flex-col gap-3 sm:gap-4"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Let's Connect</span>
                                    <div className="flex flex-wrap gap-3 sm:gap-4">
                                        {SOCIAL_LINKS.map((social, i) => {
                                            const Icon: any = social.icon;
                                            const isPath = typeof Icon === "string";
                                            return (
                                                <MagneticWrapper key={i} strength={0.3}>
                                                    <Link
                                                        href={social.href}
                                                        style={{ '--hover-brand': social.color } as any}
                                                        className="p-4 bg-black/10 text-white backdrop-blur-sm rounded-2xl transition-all duration-500 shadow-lg border border-white/20 group overflow-hidden relative flex items-center justify-center min-w-[52px] min-h-[52px]"
                                                        title={social.name}
                                                    >
                                                        <div style={{ backgroundColor: social.color }} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                        <div className="relative z-10 group-hover:scale-110 transition-transform flex items-center justify-center">
                                                            {isPath ? (
                                                                <div className="relative w-5 h-5">
                                                                    <Image
                                                                        src={Icon}
                                                                        alt={social.name}
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <Icon className="w-5 h-5" />
                                                            )}
                                                        </div>
                                                    </Link>
                                                </MagneticWrapper>
                                            );
                                        })}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-col gap-4"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Office</span>
                                    <p className="text-lg font-bold text-black/60 leading-tight">
                                        Dhaka, Bangladesh <br />
                                        Available Globally.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    {/* <Button asChild className="bg-zinc-950 text-[#FDC435] hover:bg-white hover:text-zinc-950 h-16 rounded-full px-10 text-lg font-black border-none transition-all w-full lg:w-fit">
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>Start a Project</Link>
                                    </Button> */}
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom Footer Info in Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-12 left-6 sm:left-12 right-6 sm:right-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-black/40"
                        >
                            <span>© 2026 Maksud Hossain</span>
                            <span>Powered by Quality & Passion</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
