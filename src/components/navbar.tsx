"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-black/5">
            <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between px-6 sm:px-12">
                <Link href="/" className="font-black text-2xl tracking-tighter text-black group flex items-center gap-1">
                    <span className="text-[#FDC435]">MH</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-[#FDC435] transition-colors" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-bold tracking-wide transition-all hover:text-[#FDC435]",
                                pathname === item.href ? "text-black border-b-2 border-[#FDC435]" : "text-slate-500 hover:text-black"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button asChild size="sm" className="rounded-full bg-black hover:bg-[#FDC435] text-white hover:text-black font-bold px-8 shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 border-none">
                        <Link href="/contact">Work with me</Link>
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-black">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white border-black/10 text-black">
                            <nav className="flex flex-col gap-8 pt-16">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-3xl font-black transition-colors uppercase",
                                            pathname === item.href ? "text-[#FDC435]" : "text-slate-400 hover:text-black"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button asChild className="mt-8 bg-black text-white hover:bg-[#FDC435] hover:text-black rounded-full h-14 text-lg font-bold border-none transition-colors">
                                    <Link href="/contact">Contact Me</Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
