"use client";

import { useState, useEffect } from "react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { FastAverageColor } from "fast-average-color";

interface HomePhotographySectionProps {
    settings: any;
    themeColor: string;
    photos: any[];
    categoriesList: any[];
}

export function HomePhotographySection({
    settings,
    themeColor,
    photos,
    categoriesList
}: HomePhotographySectionProps) {
    const [bgColor, setBgColor] = useState(themeColor);
    const [fac] = useState(() => new FastAverageColor());

    const handleIndexChange = async (index: number) => {
        const photo = photos[index];
        if (photo?.image) {
            try {
                // Use a small timeout to allow the image to start loading if it's new
                // For cross-origin images, this might fail without proper CORS headers
                // But since these are local/same-origin, it should work.
                const color = await fac.getColorAsync(photo.image, {
                    algorithm: 'dominant'
                });
                setBgColor(color.hex);
            } catch (e) {
                // Fallback to theme color on error
                setBgColor(themeColor);
            }
        }
    };

    return (
        <section id="photography" className="py-12 sm:py-32 relative transition-colors duration-1000 border-b border-black/5">
            {/* Dynamic Background Gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none transition-colors duration-1000 ease-in-out"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #ffffff, ${bgColor}1a, #ffffff)`
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="flex flex-col mb-6 sm:mb-16 gap-4 sm:gap-6 relative z-10 transition-colors duration-1000">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div style={{ backgroundColor: themeColor }} className="w-8 sm:w-12 h-[1px]" />
                        <span style={{ color: themeColor }} className="font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase font-heading">
                            {settings?.photography?.label || 'Visual Journal'}
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black leading-[0.95] uppercase font-heading">
                        {settings?.photography?.headingNormal || 'STILL'} <br />
                        <span style={{ color: themeColor }} className="font-black drop-shadow-sm tracking-tight">
                            {settings?.photography?.headingAccent || 'MOMENTS.'}
                        </span>
                    </h2>
                    <p className="max-w-[600px] text-slate-500 text-lg font-medium leading-relaxed mt-4">
                        {settings?.photography?.description}
                    </p>
                </div>

                <PhotographyGallery
                    photos={photos}
                    accentColor={bgColor}
                    variant="stacked"
                    showLoadMore={false}
                    categories={categoriesList}
                    initialFilter="All"
                    autoPlay={(settings as any)?.photography?.autoSlider}
                    interval={(settings as any)?.photography?.sliderInterval}
                    onIndexChange={handleIndexChange}
                />
            </div>
        </section>
    );
}
