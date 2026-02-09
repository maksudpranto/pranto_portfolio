import { reader } from "@/lib/keystatic";
import { PhotographyGallery } from "@/components/photography-gallery";

export default async function PhotographyPage() {
    const profile = await reader.singletons.profile.read();
    const pageData = await reader.singletons.photographyPage.read();

    // Fallback to profile section settings if page singleton is empty (for backward compatibility or if user hasn't filled it yet)
    // But ideally we rely on pageData defaults.
    const settings = pageData || (profile as any)?.sections?.photography;

    const themeColorData = (profile as any)?.appearance?.themeColor;
    const themeColor = themeColorData?.value || '#FDC435';
    const accentColor = themeColor;

    const photographyEntries = await reader.collections.photos.all();
    const photoCategories = await reader.collections.categories.all();
    const categoriesList = photoCategories
        .map(c => ({ id: c.slug, name: c.entry.name || c.slug }));

    const photos = photographyEntries.map(entry => ({
        ...entry.entry,
        id: entry.slug
    }));

    return (
        <div className="flex flex-col bg-white min-h-screen">
            {/* Header Section */}
            <section className="py-16 sm:py-20 bg-white border-b border-black/5 relative overflow-hidden">
                <div style={{ backgroundColor: `${accentColor}0d` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10" />

                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col gap-4 max-w-[900px]">
                        <span style={{ color: accentColor }} className="font-black text-[10px] tracking-[0.4em] uppercase pt-4 sm:pt-6">
                            {settings?.label || 'Visual Journal'}
                        </span>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-black leading-[0.9] uppercase">
                            {settings?.headingNormal || 'STILL'} <br />
                            <span style={{ color: accentColor }}>{settings?.headingAccent || 'MOMENTS.'}</span>
                        </h1>
                        <p className="max-w-[600px] text-slate-500 text-base sm:text-lg font-medium leading-relaxed mt-2">
                            {settings?.description || 'Capturing the world through my lens. Every photo tells a unique story.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 sm:py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <PhotographyGallery
                        photos={photos}
                        accentColor={accentColor}
                        variant="slick"
                        categories={categoriesList}
                    />
                </div>
            </section>
        </div>
    );
}
