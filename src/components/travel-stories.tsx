"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Quote } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export function TravelStories() {
    const stories = BLOG_POSTS;

    return (
        <div className="flex flex-col">
            {stories.map((story, i) => (
                <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative border-b border-black/5 last:border-0"
                >
                    <Link
                        href={`/blog/${story.slug}`}
                        className="flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 group/link transition-all duration-500"
                    >
                        <div className="flex flex-col gap-3 max-w-[800px]">
                            {/* Metadata line */}
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <span className="text-[#FDC435]">{story.category}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <span>{story.location}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <span>{story.date}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tighter leading-[1.1] group-hover/link:text-[#FDC435] group-hover/link:italic transition-all duration-500 uppercase">
                                {story.title}
                            </h3>

                            {/* Excerpt - visible on desktop/tablet, hidden on very small screens to keep it clean */}
                            <p className="hidden sm:block text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-[550px] opacity-60 group-hover/link:opacity-100 transition-opacity duration-500">
                                {story.excerpt}
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
                        0{story.id}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
