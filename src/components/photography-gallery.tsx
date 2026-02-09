"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export function PhotographyGallery({
    photos,
    accentColor = "#FDC435",
    variant = "default",
    showLoadMore = true,
    categories = [],
    initialFilter = "All"
}: {
    photos: any[],
    accentColor?: string,
    variant?: "default" | "slick",
    showLoadMore?: boolean,
    categories?: { id: string, name: string }[],
    initialFilter?: string
}) {
    const [filter, setFilter] = useState(initialFilter);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(variant === "slick" ? 8 : 4);

    const displayCategories = categories && categories.length > 0 ? [{ id: "All", name: "All" }, ...categories] : [
        { id: "All", name: "All" },
        { id: "Nature", name: "Nature" },
        { id: "Urban", name: "Urban" },
        { id: "Moments", name: "Moments" },
        { id: "Flower", name: "Flower" }
    ];

    const filteredPhotos = filter === "All" ? photos : photos.filter(p => p.category === filter);
    const visiblePhotos = filteredPhotos.slice(0, visibleCount);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
        }
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex flex-wrap gap-4">
                    {displayCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setFilter(cat.id);
                                setVisibleCount(variant === "slick" ? 8 : 4);
                            }}
                            style={filter === cat.id ? { backgroundColor: 'black', borderColor: 'black' } : { '--hover-border': accentColor } as any}
                            className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${filter === cat.id
                                ? "text-white shadow-2xl shadow-black/30 scale-105"
                                : "bg-white/50 text-black/60 border-black/10 hover:border-[var(--hover-border)] hover:text-black hover:bg-white"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
                <span className="text-sm font-bold text-slate-400">
                    Showing {visiblePhotos.length} of {filteredPhotos.length} moments
                </span>
            </div>

            {variant === "slick" ? (
                /* Slick Modern Gallery Style (For Photography Page) */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
                    <AnimatePresence mode="popLayout">
                        {visiblePhotos.map((photo, i) => (
                            <motion.div
                                layout
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-slate-50 border border-black/5 aspect-[4/5]"
                                onClick={() => setSelectedIndex(i)}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={photo.image}
                                        alt={photo.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Slick Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <div className="flex flex-col gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2">
                                                <MapPin style={{ color: accentColor }} className="w-3 h-3" />
                                                <span className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em]">{photo.location}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">
                                                {photo.title}
                                            </h3>
                                            <span style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.3em] mt-1">{photo.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                /* Original Bold Gallery Style (For Homepage) */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <AnimatePresence mode="popLayout">
                        {visiblePhotos.map((photo, i) => (
                            <motion.div
                                layout
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col gap-8 group cursor-zoom-in"
                                onClick={() => setSelectedIndex(i)}
                            >
                                <div className={`relative ${photo.aspect || 'aspect-video'} w-full rounded-[2.5rem] overflow-hidden border border-black/5 bg-slate-50 shadow-xl`}>
                                    <Image
                                        src={photo.image}
                                        alt={photo.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                        <MapPin style={{ color: accentColor }} className="w-3 h-3" />
                                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">{photo.location}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 pl-4">
                                    <div className="flex flex-col gap-1">
                                        <span style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.3em]">{photo.date}</span>
                                        <h3 style={{ '--hover-color': accentColor } as any} className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight group-hover:text-[var(--hover-color)] transition-colors duration-300">
                                            {photo.title}
                                        </h3>
                                    </div>
                                    <div style={{ backgroundColor: accentColor }} className="h-[1px] w-12 opacity-30 group-hover:w-full transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {showLoadMore && visibleCount < filteredPhotos.length && (
                <div className="flex justify-center pt-12">
                    <button
                        onClick={() => setVisibleCount(prev => prev + (variant === "slick" ? 8 : 2))}
                        className="group relative flex items-center gap-4 px-10 py-5 bg-white border border-black/5 rounded-full transition-all duration-700 shadow-sm hover:shadow-xl overflow-hidden"
                        style={{ '--hover-bg': `${accentColor}1a` } as any}
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[var(--hover-bg)] to-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}1a, transparent)` }}
                        />
                        <div style={{ backgroundColor: accentColor }} className="absolute left-0 top-0 w-1 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-black group-hover:translate-x-2 transition-transform duration-500">
                            {variant === "slick" ? "Load More Moments" : "Load More Stories"}
                        </span>
                        <div style={{ backgroundColor: accentColor }} className="p-2 rounded-full group-hover:rotate-12 transition-all duration-500 shadow-sm">
                            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 sm:p-12"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                            className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <button
                            onClick={handlePrev}
                            className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full h-full flex flex-col items-center justify-center gap-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full max-w-[1000px] h-[60vh] sm:h-[70vh]">
                                <Image
                                    src={visiblePhotos[selectedIndex].image}
                                    alt={visiblePhotos[selectedIndex].title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="text-center flex flex-col gap-3 max-w-[800px]">
                                <span style={{ color: accentColor }} className="text-sm font-black uppercase tracking-[0.4em] mb-2">
                                    {visiblePhotos[selectedIndex].date}
                                </span>
                                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                                    {visiblePhotos[selectedIndex].title?.toUpperCase() || "UNTITLED MOMENT"}
                                </h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                                    <MapPin style={{ color: accentColor }} className="w-3 h-3 inline-block mr-2" />
                                    {visiblePhotos[selectedIndex].location}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
