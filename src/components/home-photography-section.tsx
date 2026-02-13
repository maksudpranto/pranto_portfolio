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
        <section id="photography" className="py-24 sm:py-32 relative transition-colors duration-1000">
            {/* Dynamic Background Gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none transition-colors duration-1000 ease-in-out"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #ffffff, ${bgColor}1a, #ffffff)`
                }}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
                <div className="flex flex-col mb-16 gap-4 relative z-10 transition-colors duration-1000">
                    <span style={{ color: bgColor }} className="font-black text-xs tracking-[0.4em] uppercase transition-colors duration-1000">
                        {settings?.photography?.label || 'Visual Journal'}
                    </span>
                    <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none uppercase">
                        {settings?.photography?.headingNormal || 'STILL'} <br />
                        <span style={{ color: bgColor }} className="transition-colors duration-1000">
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
