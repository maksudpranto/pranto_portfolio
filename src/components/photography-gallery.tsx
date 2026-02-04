"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhotographyGallery() {
    const [filter, setFilter] = useState("All");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);

    const photos = [
        {
            id: 1,
            title: "Into the Ocean",
            location: "Teknaf, Cox's Bazar, Bangladesh",
            date: "Oct 2023",
            category: "Nature",
            image: "/images/IMG_0092.jpg",
            aspect: "aspect-video",
        },
        {
            id: 2,
            title: "Kyoto After Rain",
            location: "Kashiani, Bangladesh",
            date: "May 2023",
            category: "Urban",
            image: "/images/kashiani.JPG",
            aspect: "aspect-[4/4]",
        },
        {
            id: 3,
            title: "Misty Valleys",
            location: "Sapa, Vietnam",
            date: "Aug 2023",
            category: "Nature",
            image: "/images/travel_mountain_peak.png",
            aspect: "aspect-[4/5]",
        },
        {
            id: 4,
            title: "Midnight Neon",
            location: "Shibuya, Tokyo",
            date: "May 2023",
            category: "Urban",
            image: "/images/travel_kyoto_street.png",
            aspect: "aspect-square",
        },
        {
            id: 5,
            title: "Ocean Solitude",
            location: "Bali, Indonesia",
            date: "Jan 2024",
            category: "Moments",
            image: "/images/travel_mountain_peak.png",
            aspect: "aspect-video",
        }
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
                    {["All", "Nature", "Urban", "Moments"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setFilter(cat);
                                setVisibleCount(4);
                            }}
                            className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${filter === cat
                                ? "bg-black text-[#FDC435] border-black"
                                : "bg-transparent text-slate-400 border-black/5 hover:border-[#FDC435] hover:text-black"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <span className="text-sm font-bold text-slate-400">
                    Showing {visiblePhotos.length} of {filteredPhotos.length} moments
                </span>
            </div>

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
                            <div className={`relative ${photo.aspect} w-full rounded-[2.5rem] overflow-hidden border border-black/5 bg-slate-50 shadow-xl`}>
                                <Image
                                    src={photo.image}
                                    alt={photo.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-[#FDC435]" />
                                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">{photo.location}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 pl-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black text-[#FDC435] uppercase tracking-[0.3em]">{photo.date}</span>
                                    <h3 className="text-3xl sm:text-4xl font-black text-black tracking-tight group-hover:text-[#FDC435] transition-colors duration-300">
                                        {photo.title}
                                    </h3>
                                </div>
                                <div className="h-[1px] w-12 bg-[#FDC435]/30 group-hover:w-full transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {visibleCount < filteredPhotos.length && (
                <div className="flex justify-center pt-8">
                    <Button
                        variant="outline"
                        onClick={() => setVisibleCount(prev => prev + 2)}
                        className="h-16 px-12 rounded-full border-2 border-black/5 hover:border-[#FDC435] hover:bg-[#FDC435] hover:text-black transition-all font-bold text-lg"
                    >
                        Load More Stories
                    </Button>
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
                                    src={filteredPhotos[selectedIndex].image}
                                    alt={filteredPhotos[selectedIndex].title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="text-center flex flex-col gap-3 max-w-[800px]">
                                <span className="text-[#FDC435] text-sm font-black uppercase tracking-[0.4em] mb-2">
                                    {filteredPhotos[selectedIndex].date}
                                </span>
                                <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                                    {filteredPhotos[selectedIndex].title.toUpperCase()}
                                </h3>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                                    <MapPin className="w-3 h-3 inline-block mr-2 text-[#FDC435]" />
                                    {filteredPhotos[selectedIndex].location}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
