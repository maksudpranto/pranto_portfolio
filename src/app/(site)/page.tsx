import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Code, Sparkles, ArrowRight, Github, Twitter, Linkedin, Facebook, Instagram, Mail, Camera, MapPin, SearchCheck, Briefcase, Settings2, Database, GraduationCap } from "lucide-react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { TravelStories } from "@/components/travel-stories";
import { reader } from "@/lib/keystatic";
import { HomeClient } from "@/components/home-client";

export default async function Home() {
  // Fetch profile data
  const profile = await reader.singletons.profile.read();

  // Extract settings from the consolidated profile data
  const themeColorData = (profile as any)?.appearance?.themeColor;
  const themeColor = themeColorData?.value || '#FDC435';
  const settings = (profile as any)?.sections;

  const experienceEntries = await reader.collections.experience.all();
  const educationEntries = await reader.collections.education.all();
  const photographyEntries = await reader.collections.photos.all();
  const blogEntries = await reader.collections.blog.all();
  const photoCategories = await reader.collections.categories.all();

  const categoriesList = photoCategories
    .map(c => ({ id: c.slug, name: c.entry.name || c.slug }));

  const experiences = experienceEntries
    .map(entry => ({
      ...entry.entry,
      company: entry.entry.company || entry.slug
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const education = educationEntries
    .map(entry => ({
      ...entry.entry,
      degree: entry.entry.degree || entry.slug
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const photos = photographyEntries
    .filter(entry => (entry.entry as any).showOnHomepage) // Only show photos marked for homepage
    .map(entry => ({
      ...entry.entry,
      id: entry.slug
    }));

  const stories = blogEntries.map(entry => {
    const { content, ...data } = entry.entry;
    return {
      ...data,
      id: entry.slug,
      slug: entry.slug
    };
  });

  return (
    <div className="flex flex-col bg-white text-zinc-950 selection:bg-[#FDC435]/30 min-h-screen">
      <HomeClient
        profile={profile}
        experiences={experiences}
        education={education}
        settings={settings}
        themeColor={themeColor}
      />

      {/* Section Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      {/* Photography Section */}
      <section id="photography" className="py-24 sm:py-32 relative">
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col mb-16 gap-4 relative z-10">
            <span style={{ color: themeColor }} className="font-black text-xs tracking-[0.4em] uppercase">
              {settings?.photography?.label || 'Visual Journal'}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none uppercase">
              {settings?.photography?.headingNormal || 'STILL'} <br />
              <span style={{ color: themeColor }}>
                {settings?.photography?.headingAccent || 'MOMENTS.'}
              </span>
            </h2>
            <p className="max-w-[600px] text-slate-500 text-lg font-medium leading-relaxed mt-4">
              {settings?.photography?.description}
            </p>
          </div>
          <PhotographyGallery
            photos={photos}
            accentColor={themeColor}
            variant="stacked"
            showLoadMore={false}
            categories={categoriesList}
            initialFilter="All"
            autoPlay={(settings as any)?.photography?.autoSlider}
            interval={(settings as any)?.photography?.sliderInterval}
          />

        </div>
      </section>

      {/* Section Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      {/* Blog Section */}
      <section id="blog" className="py-24 sm:py-32 relative">
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col mb-16 gap-4">
            <span style={{ color: themeColor }} className="font-black text-xs tracking-[0.4em] uppercase">
              {settings?.blog?.label || 'Travel Chronicles'}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none uppercase">
              {settings?.blog?.headingNormal || 'DISPATCHES FROM THE'} <br />
              <span style={{ color: themeColor }}>
                {settings?.blog?.headingAccent || 'ROAD.'}
              </span>
            </h2>
            <p className="max-w-[600px] text-slate-500 text-lg font-medium leading-relaxed mt-4">
              {settings?.blog?.description}
            </p>
          </div>
          <TravelStories stories={stories} accentColor={themeColor} />

          {/* See All Stories Button */}
          <div className="flex justify-center mt-16">
            <Link
              href="/blog"
              className="group relative flex items-center gap-4 px-10 py-5 bg-white border border-black/5 rounded-full transition-all duration-700 shadow-sm hover:shadow-xl overflow-hidden"
              style={{ '--hover-bg': `${themeColor}0d` } as any}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[var(--hover-bg)] to-transparent"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${themeColor}1a, transparent)` }}
              />
              <div style={{ backgroundColor: themeColor }} className="absolute left-0 top-0 w-1 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-black group-hover:translate-x-2 transition-transform duration-500 relative z-10">
                See All Stories
              </span>
              <div style={{ backgroundColor: themeColor }} className="p-2 rounded-full group-hover:rotate-12 transition-all duration-500 shadow-sm relative z-10">
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
