import { TravelStories } from "@/components/travel-stories";
import { reader } from "@/lib/keystatic";

export default async function BlogPage() {
    const profile = await reader.singletons.profile.read();
    const settings = (profile as any)?.sections?.blog;
    const accentColor = settings?.accentColor || "#FDC435";

    const blogEntries = await reader.collections.blog.all();
    const stories = blogEntries.map(entry => {
        const { content, ...data } = entry.entry;
        return {
            ...data,
            id: entry.slug,
            slug: entry.slug
        };
    });

    return (
        <div className="flex flex-col bg-white min-h-screen">
            {/* Header Section */}
            <section className="py-24 sm:py-32 bg-slate-50 border-b border-black/5 relative overflow-hidden">
                <div style={{ backgroundColor: `${accentColor}0d` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10" />

                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col gap-6 max-w-[900px]">
                        <span style={{ color: accentColor }} className="font-black text-xs tracking-[0.4em] uppercase">
                            {settings?.label || 'The Written Word'}
                        </span>
                        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-black leading-[0.85] uppercase">
                            {settings?.headingNormal || 'STORIES &'} <br />
                            <span style={{ color: accentColor }}>{settings?.headingAccent || 'REFLECTIONS.'}</span>
                        </h1>
                        <p className="max-w-[600px] text-slate-500 text-lg sm:text-xl font-medium leading-relaxed mt-4">
                            {settings?.description || 'Exploring the intersection of software quality, global travel, and the lessons learned in between.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Stories Section */}
            <section className="py-12 sm:py-24">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <TravelStories stories={stories} accentColor={accentColor} />
                </div>
            </section>
        </div>
    );
}
