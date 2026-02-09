"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";


export function PhotographyGallery({
    photos,
    accentColor = "#FDC435",
    variant = "default",
    showLoadMore = true,
    categories = [],
    initialFilter = "All",
    autoPlay = false,
    interval = 5000
}: {
    photos: any[],
    accentColor?: string,
    variant?: "default" | "slick" | "futuristic" | "stacked",
    showLoadMore?: boolean,
    categories?: { id: string, name: string }[],
    initialFilter?: string,
    autoPlay?: boolean,
    interval?: number
}) {
    const [filter, setFilter] = useState(initialFilter);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0); // For stacked carousel
    const [visibleCount, setVisibleCount] = useState(variant === "stacked" ? 100 : variant === "futuristic" ? 9 : variant === "slick" ? 8 : 4);

    // Auto-reset current index when filter changes
    const onFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setCurrentIndex(0);
        setVisibleCount(variant === "stacked" ? 100 : variant === "futuristic" ? 9 : variant === "slick" ? 8 : 4);
    };

    const displayCategories = categories && categories.length > 0 ? [{ id: "All", name: "All" }, ...categories] : [
        { id: "All", name: "All" },
        { id: "Nature", name: "Nature" },
        { id: "Urban", name: "Urban" },
        { id: "Moments", name: "Moments" },
        { id: "Flower", name: "Flower" }
    ];

    const filteredPhotos = filter === "All" ? photos : photos.filter(p => p.category === filter);
    const visiblePhotos = variant === "stacked" ? filteredPhotos : filteredPhotos.slice(0, visibleCount);

    const handlePrevCarousel = () => {
        setCurrentIndex(prev => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    };

    const handleNextCarousel = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % filteredPhotos.length);
    }, [filteredPhotos.length]);

    // Auto-sliding logic
    useEffect(() => {
        if (!autoPlay || variant !== "stacked" || filteredPhotos.length <= 1) return;

        const timer = setInterval(() => {
            handleNextCarousel();
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, variant, handleNextCarousel, filteredPhotos.length]);

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
            <div className={`flex flex-col sm:flex-row items-center ${variant === 'stacked' ? 'justify-center sm:justify-center relative' : 'justify-between'} gap-8`}>
                <div className={`flex flex-wrap gap-4 ${variant === 'stacked' ? 'justify-center flex-1' : ''}`}>
                    {displayCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                onFilterChange(cat.id);
                            }}
                            style={filter === cat.id ? { backgroundColor: variant === 'futuristic' ? accentColor : 'black', borderColor: variant === 'futuristic' ? accentColor : 'black' } : { '--hover-border': accentColor } as any}
                            className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${filter === cat.id
                                ? "text-white shadow-2xl shadow-black/30 scale-105"
                                : variant === 'futuristic'
                                    ? "bg-black/5 text-black/40 border-black/5 hover:border-[var(--hover-border)] hover:text-black hover:bg-white/80"
                                    : "bg-white/50 text-black/60 border-black/10 hover:border-[var(--hover-border)] hover:text-black hover:bg-white"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
                {variant === "stacked" ? (
                    <a href="/photography" className="group flex items-center gap-2 px-6 py-2 rounded-full border border-black/10 hover:border-black transition-all">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/60 group-hover:text-black">View More</span>
                        <ArrowRight className="w-3 h-3 text-black/40 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </a>
                ) : (
                    <span className="text-sm font-bold text-slate-400">
                        Showing {visiblePhotos.length} of {filteredPhotos.length} moments
                    </span>
                )}
            </div>

            {variant === "stacked" ? (
                /* Full-Width Stretched Stacked Carousel Gallery */
                <div className="relative flex flex-col items-center gap-12 py-12 w-full overflow-hidden">
                    <div className="relative w-full h-[450px] sm:h-[650px] flex items-center justify-center">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {filteredPhotos.length > 0 && [
                                (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
                                currentIndex,
                                (currentIndex + 1) % filteredPhotos.length,
                            ].filter((idx, i, arr) => arr.indexOf(idx) === i).map((idx, position) => {
                                const photo = filteredPhotos[idx];
                                if (!photo) return null;

                                const isCenter = idx === currentIndex;
                                const isLeft = idx === (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
                                const isRight = idx === (currentIndex + 1) % filteredPhotos.length;

                                if (filteredPhotos.length === 1 && !isCenter) return null;
                                if (filteredPhotos.length === 2 && isRight && position === 2) return null;

                                return (
                                    <motion.div
                                        key={photo.id}
                                        initial={{ opacity: 0, scale: 0.8, x: isLeft ? -400 : isRight ? 400 : 0 }}
                                        animate={{
                                            opacity: isCenter ? 1 : 0.3,
                                            scale: isCenter ? 1 : 0.85,
                                            x: isCenter ? 0 : isLeft ? '-70%' : '70%',
                                            zIndex: isCenter ? 30 : 20,
                                            filter: isCenter ? "blur(0px)" : "blur(4px)",
                                            rotate: isCenter ? 0 : isLeft ? -2 : 2
                                        }}
                                        exit={{ opacity: 0, scale: 0.8, x: isLeft ? -400 : isRight ? 400 : 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute w-[85vw] sm:w-[60vw] max-w-[900px] aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] cursor-pointer group"
                                        onClick={() => isCenter ? setSelectedIndex(idx) : setCurrentIndex(idx)}
                                    >
                                        <Image
                                            src={photo.image}
                                            alt={photo.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                            priority={isCenter}
                                        />

                                        {isCenter && (
                                            <div className="absolute bottom-10 right-10 z-10">
                                                <div className="p-5 bg-white/90 backdrop-blur-md rounded-full shadow-2xl transform scale-110 rotate-12 transition-all duration-700 group-hover:scale-125 group-hover:rotate-0">
                                                    <ArrowRight className="w-8 h-8 text-black -rotate-45" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Premium Floating Title Overlay for Stacked */}
                                        {isCenter && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end transition-all duration-700">
                                                <div className="flex flex-col gap-4 transform translate-y-0 transition-transform duration-700">
                                                    <div className="flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                                                        <MapPin className="w-3 h-3 text-white drop-shadow-sm" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-sm">{photo.location}</span>
                                                    </div>
                                                    <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">{photo.title}</h3>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-6 mt-8">
                        <button
                            onClick={handlePrevCarousel}
                            className="p-4 bg-white border border-black/5 hover:bg-slate-50 rounded-full shadow-sm hover:shadow-md transition-all text-black/40 hover:text-black"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNextCarousel}
                            className="p-4 bg-white border border-black/5 hover:bg-slate-50 rounded-full shadow-sm hover:shadow-md transition-all text-black/40 hover:text-black"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            ) :
                variant === "futuristic" ? (
                    /* Futuristic Posh Uniform Gallery (For Homepage) */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {visiblePhotos.map((photo, i) => {
                                return (
                                    <motion.div
                                        layout
                                        key={photo.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="group relative cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-zinc-900 border border-black/5 shadow-2xl shadow-black/10 aspect-video"
                                        onClick={() => setSelectedIndex(i)}
                                    >
                                        <div className="relative w-full h-full overflow-hidden">
                                            <Image
                                                src={photo.image}
                                                alt={photo.title}
                                                fill
                                                className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1 group-hover:brightness-110"
                                            />

                                            {/* Futuristic Glassmorphic Overlay - Persistently Visible */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-10 overflow-hidden">
                                                {/* Top corner scanning line effect */}
                                                <div style={{ backgroundColor: accentColor }} className="absolute top-0 left-0 w-20 h-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

                                                <div className="flex flex-col gap-4 transform transition-all duration-700 ease-out">
                                                    <div className="flex items-center gap-3">
                                                        <div style={{ backgroundColor: accentColor }} className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                                                        <span className="text-[10px] text-white/70 font-black uppercase tracking-[0.4em]">{photo.location || "Earth"}</span>
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase leading-none italic group-hover:translate-x-2 transition-transform duration-500">
                                                            {photo.title}
                                                        </h3>
                                                        <p style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.5em] mt-2 brightness-125 saturate-150 opacity-100 group-hover:opacity-100 transition-opacity duration-500">
                                                            MOMENT REF_{photo.id?.slice(0, 4)} // {photo.date}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-6 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        <div className="h-px flex-1 bg-white/10" />
                                                        <div className="flex items-center gap-2 group/btn cursor-pointer">
                                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest group-hover/btn:text-white transition-colors">View Details</span>
                                                            <ArrowRight className="w-3 h-3 text-white/40 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Persistent Glass corner tag (Subtle) */}
                                            <div className="absolute top-6 right-6 px-4 py-2 bg-black/30 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2 group-hover:bg-black/50 transition-all duration-500">
                                                <MapPin style={{ color: accentColor }} className="w-3 h-3" />
                                                <span className="text-[9px] text-white font-black uppercase tracking-widest">{photo.location}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : variant === "slick" ? (
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
                    /* Original Bold Gallery Style (For Homepage - Legacy) */
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
                        onClick={() => setVisibleCount(prev => prev + (variant === "futuristic" ? 4 : variant === "slick" ? 8 : 2))}
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
