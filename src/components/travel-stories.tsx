"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

export function TravelStories({ stories, accentColor = "#FDC435" }: { stories: any[], accentColor?: string }) {

    return (
        <div className="flex flex-col gap-4">
            {stories.map((story, i) => (
                <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative bg-white border-b border-black/5 transition-all duration-700 overflow-hidden rounded-xl hover:shadow-xl hover:shadow-black/[0.02]"
                    style={{ '--hover-bg': `${accentColor}1a` } as any}
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[var(--hover-bg)] to-transparent"
                        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}0d, transparent)` }}
                    />
                    <Link
                        href={`/blog/${story.slug}`}
                        className="flex flex-row items-center justify-between p-4 sm:p-10 group/link transition-all duration-500 gap-4 sm:gap-12"
                    >
                        {/* Slick Left Accent on Hover */}
                        <div style={{ backgroundColor: accentColor }} className="absolute left-0 top-0 w-1 sm:w-1.5 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                        <div className="flex flex-row items-center gap-4 sm:gap-10 flex-1 relative z-10">
                            {/* Posh Image Thumbnail */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-16 h-16 sm:w-56 sm:h-40 rounded-lg sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg border border-black/5 shrink-0"
                            >
                                <Image
                                    src={story.image || "/images/placeholder.jpg"}
                                    alt={story.title}
                                    fill
                                    className="object-cover group-hover/link:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500" />
                            </motion.div>

                            <div className="flex flex-col gap-1.5 sm:gap-4 max-w-[800px] flex-1">
                                {/* Refined Metadata line */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {story.category && (
                                        <span style={{ color: accentColor }} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-black text-white rounded-full text-[7px] sm:text-[9px]">{story.category}</span>
                                    )}
                                    {story.location && (
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <MapPin style={{ color: accentColor }} className="w-2 h-2 sm:w-3 sm:h-3" />
                                            <span>{story.location}</span>
                                        </div>
                                    )}
                                    {story.date && (
                                        <>
                                            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-200" />
                                            <span className="hidden sm:block">
                                                {new Date(story.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Posh Title */}
                                <h3 className="text-sm sm:text-3xl lg:text-4xl font-black text-black leading-snug group-hover/link:sm:translate-x-3 transition-all duration-500 line-clamp-3">
                                    {story.title || story.slug?.replace(/-/g, ' ')}
                                </h3>

                                {/* Excerpt */}
                                <p className="hidden sm:block text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-[600px] opacity-70 group-hover/link:translate-x-3 transition-all duration-500 delay-75">
                                    {story.excerpt}
                                </p>
                            </div>
                        </div>

                        {/* Interactive Reveal Button */}
                        <div className="flex items-center gap-2 sm:gap-6 relative z-10 shrink-0">
                            <div style={{ backgroundColor: accentColor }} className="hidden sm:block h-[2px] w-0 group-hover/link:w-12 transition-all duration-700" />
                            <MagneticWrapper strength={0.2}>
                                <div style={{ '--hover-bg': accentColor } as any} className="relative p-2 sm:p-4 rounded-full border border-black/5 bg-slate-50 group-hover/link:bg-[var(--hover-bg)] group-hover/link:border-[var(--hover-bg)] group-hover/link:rotate-12 transition-all duration-500 shadow-sm group-hover/link:shadow-xl group-hover/link:shadow-[var(--hover-bg)]/20">
                                    <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-black group-hover/link:translate-x-1 transition-transform" />
                                </div>
                            </MagneticWrapper>
                        </div>
                    </Link>

                    {/* Sophisticated Numerical Index */}
                    <div style={{ color: `${accentColor}08` }} className="absolute bottom-2 right-4 sm:bottom-4 sm:right-10 text-[4rem] sm:text-[10rem] font-black group-hover:opacity-10 transition-opacity duration-700 select-none pointer-events-none leading-none -z-10">
                        0{i + 1}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
