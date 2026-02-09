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
  const settings = (profile as any)?.sections;

  const experienceEntries = await reader.collections.experience.all();
  const educationEntries = await reader.collections.education.all();
  const photographyEntries = await reader.collections.photos.all();
  const blogEntries = await reader.collections.blog.all();

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

  const photos = photographyEntries.map(entry => ({
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
      />

      {/* Photography Section */}
      <section id="photography" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col mb-16 gap-4">
            <span style={{ color: settings?.photography?.accentColor || '#FDC435' }} className="font-black text-xs tracking-[0.4em] uppercase">
              {settings?.photography?.label || 'Visual Journal'}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none uppercase">
              {settings?.photography?.headingNormal || 'STILL'} <br />
              <span style={{ color: settings?.photography?.accentColor || '#FDC435' }}>
                {settings?.photography?.headingAccent || 'MOMENTS.'}
              </span>
            </h2>
            <p className="max-w-[600px] text-slate-500 text-lg font-medium leading-relaxed mt-4">
              {settings?.photography?.description}
            </p>
          </div>
          <PhotographyGallery photos={photos} accentColor={settings?.photography?.accentColor} />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 sm:py-32 bg-slate-50 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col mb-16 gap-4">
            <span style={{ color: settings?.blog?.accentColor || '#FDC435' }} className="font-black text-xs tracking-[0.4em] uppercase">
              {settings?.blog?.label || 'Travel Chronicles'}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-black leading-none uppercase">
              {settings?.blog?.headingNormal || 'DISPATCHES FROM THE'} <br />
              <span style={{ color: settings?.blog?.accentColor || '#FDC435' }}>
                {settings?.blog?.headingAccent || 'ROAD.'}
              </span>
            </h2>
            <p className="max-w-[600px] text-slate-500 text-lg font-medium leading-relaxed mt-4">
              {settings?.blog?.description}
            </p>
          </div>
          <TravelStories stories={stories} accentColor={settings?.blog?.accentColor} />

          {/* See All Stories Button */}
          <div className="flex justify-center mt-16">
            <Link
              href="/blog"
              className="group relative flex items-center gap-4 px-10 py-5 bg-white border border-black/5 rounded-full hover:bg-gradient-to-r hover:from-[#FDC435]/5 hover:via-[#FDC435]/10 hover:to-transparent transition-all duration-700 shadow-sm hover:shadow-xl hover:shadow-[#FDC435]/5 overflow-hidden"
            >
              <div style={{ backgroundColor: settings?.blog?.accentColor || '#FDC435' }} className="absolute left-0 top-0 w-1 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-black group-hover:translate-x-2 transition-transform duration-500">
                See All Stories
              </span>
              <div style={{ backgroundColor: settings?.blog?.accentColor || '#FDC435' }} className="p-2 rounded-full group-hover:rotate-12 transition-all duration-500 shadow-sm">
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
