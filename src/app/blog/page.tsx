"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogPage() {
    const posts = BLOG_POSTS;

    return (
        <div className="flex flex-col bg-white min-h-screen">
            {/* Header Section */}
            <section className="py-16 bg-slate-50 border-b border-black/5">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col gap-4 max-w-[800px]">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#FDC435] font-black text-xs tracking-[0.3em] uppercase"
                        >
                            The Written Word
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-black"
                        >
                            STORIES & <br />
                            <span className="italic text-[#FDC435]">REFLECTIONS.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-500 font-medium leading-relaxed"
                        >
                            Exploring the intersection of software quality, global travel, and the lessons learned in between.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Posts List Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col border-t border-black/5">
                        {posts.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative border-b border-black/5 last:border-0"
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 group/link transition-all duration-500"
                                >
                                    <div className="flex flex-col gap-3 max-w-[800px]">
                                        {/* Metadata line */}
                                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            <span className="text-[#FDC435]">{post.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                            <span>{post.location}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                            <span>{post.date}</span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tighter leading-[1.1] group-hover/link:text-[#FDC435] group-hover/link:italic transition-all duration-500 uppercase">
                                            {post.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="hidden sm:block text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-[550px] opacity-60 group-hover/link:opacity-100 transition-opacity duration-500">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    {/* Visual Reveal Arrow */}
                                    <div className="mt-6 md:mt-0 flex items-center gap-4">
                                        <div className="h-[2px] w-0 bg-[#FDC435] group-hover/link:w-8 transition-all duration-500" />
                                        <div className="relative p-3 rounded-full border border-black/5 group-hover/link:bg-[#FDC435] group-hover/link:border-[#FDC435] transition-all duration-500">
                                            <ArrowRight className="w-5 h-5 text-black group-hover/link:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>

                                {/* Subtle numbering background */}
                                <div className="absolute top-8 sm:top-10 -right-4 text-7xl sm:text-8xl font-black text-black/[0.02] pointer-events-none group-hover:text-[#FDC435]/[0.05] transition-colors -z-10">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
