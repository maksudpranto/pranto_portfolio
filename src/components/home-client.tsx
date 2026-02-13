"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, SearchCheck, Camera } from "lucide-react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const iconMap: Record<string, any> = {
    ...Fa,
    ...Fa6,
    ...Io,
};

export function HomeClient({ profile, experiences, education, settings, themeColor }: any) {
    if (!profile) return null;

    const heroAccent = themeColor;
    const aboutAccent = themeColor;
    const expAccent = themeColor;
    const eduAccent = themeColor;

    const basicInfo = settings?.basic;
    const name = basicInfo?.name || "Maksud Hossain";
    const role = basicInfo?.role || "Software Test Engineer | Travel Storyteller";
    const description = basicInfo?.description || "";
    const socialLinks = settings?.socials?.links || [];

    return (
        <>
            {/* "Studio-Slick" Personalized Hero Section */}
            <section className="relative min-h-[90vh] flex items-start sm:items-center justify-center overflow-hidden pt-36 sm:pt-0">
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
                {/* Subtle Background Textures */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div style={{ backgroundColor: `${heroAccent}1a` }} className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
                    <div style={{ backgroundColor: `${heroAccent}0d` }} className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px]" />
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-8 sm:gap-10"
                        >
                            <div className="flex flex-col gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-2 sm:gap-3 text-black text-[8px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] uppercase font-black whitespace-nowrap"
                                >
                                    <div style={{ backgroundColor: heroAccent }} className="h-[2px] w-4 sm:w-8 translate-y-px shrink-0" />
                                    <span className="truncate sm:overflow-visible">
                                        {settings?.hero?.rolePrefix ? `${settings.hero.rolePrefix} ${role}` : role}
                                    </span>
                                </motion.div>
                                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-black uppercase break-words">
                                    {settings?.hero?.titleFirst || name.split(' ')[0]} <span style={{ color: heroAccent }}>{settings?.hero?.titleSecond || name.split(' ')[1]}</span>
                                </h1>
                            </div>

                            <p className="max-w-[550px] text-base sm:text-xl text-slate-600 leading-relaxed font-medium">
                                {settings?.hero?.description || description.split('. ')[0] + '.'}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap items-center gap-3 sm:gap-6"
                            >
                                {socialLinks.map((social: any, i: number) => {
                                    const Icon = iconMap[social.icon] || social.icon;
                                    const isPath = typeof Icon === "string" && Icon.startsWith('/');

                                    return (
                                        <MagneticWrapper key={i} strength={0.3}>
                                            <motion.a
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -4, scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{ backgroundColor: heroAccent, '--hover-color': heroAccent } as any}
                                                className="p-3 sm:p-4 text-white rounded-2xl transition-all duration-500 shadow-xl shadow-black/10 hover:shadow-[var(--hover-color)]/40 group relative overflow-hidden flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-[52px] sm:min-h-[52px]"
                                                title={social.label}
                                            >
                                                <div style={{ backgroundColor: social.color }} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="relative z-10 transition-transform group-hover:scale-110 flex items-center justify-center">
                                                    {isPath ? (
                                                        <div className="relative w-5 h-5">
                                                            <Image
                                                                src={Icon}
                                                                alt={social.label}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    ) : Icon ? (
                                                        <Icon className="w-5 h-5" />
                                                    ) : null}
                                                </div>
                                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />
                                            </motion.a>
                                        </MagneticWrapper>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        {/* Interactive Visual Element */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10 group"
                            >
                                <div className="relative w-full aspect-[4/5] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden rounded-[3rem] sm:rounded-[4rem] border border-black/5 bg-slate-50 shadow-2xl group-hover:scale-[1.01] transition-transform duration-700 z-10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent z-10 opacity-60" />
                                    <Image
                                        src={settings?.hero?.image || "/pranto.jpg"}
                                        alt={name}
                                        fill
                                        className="object-cover object-top scale-110 group-hover:scale-105 transition-transform duration-1000"
                                        priority
                                    />
                                </div>

                                {/* Floating Iconic Badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-1 -right-1 sm:-top-4 sm:-right-4 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-black/5 z-20"
                                >
                                    <SearchCheck style={{ color: heroAccent }} className="w-4 h-4 sm:w-8 sm:h-8" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/2 -left-2 sm:-left-8 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-black/5 z-20"
                                >
                                    <Camera className="w-4 h-4 sm:w-8 sm:h-8 text-black" />
                                </motion.div>
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-1 left-1/4 sm:left-1/2 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-black/5 z-20"
                                >
                                    <MapPin className="w-4 h-4 sm:w-8 sm:h-8 text-red-500" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

            {/* About Me Narrative Section - Immersive Redesign */}
            <section id="about" className="relative overflow-hidden bg-white border-y border-black/5">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                    <div
                        className="absolute top-1/2 left-1/4 -translate-y-1/2 text-[10rem] sm:text-[25rem] font-black text-black/[0.01] sm:text-black/[0.02] tracking-tighter leading-none whitespace-nowrap"
                    >
                        NARRATIVE
                    </div>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col lg:flex-row items-stretch py-12 sm:py-32 lg:py-40 gap-16 lg:gap-32">
                        {/* Image Side - Aligned with Content Height */}
                        <div className="w-full lg:w-[45%] relative min-h-[400px] sm:min-h-[500px] lg:min-h-0 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative lg:absolute lg:inset-0 h-[400px] sm:h-[500px] lg:h-auto overflow-hidden rounded-2xl border border-black/5 bg-slate-100 shadow-2xl"
                            >
                                <Image
                                    src={settings?.about?.image || "/pranto.jpg"}
                                    alt="About portrait"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30" />
                            </motion.div>
                        </div>

                        {/* Content Section - Leading and Stats */}
                        <div className="w-full lg:w-[55%] flex flex-col justify-center gap-8 lg:gap-12 order-1 lg:order-2 lg:pl-16 relative z-10">
                            <div className="flex flex-col gap-6 sm:gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 sm:gap-4"
                                >
                                    <div style={{ backgroundColor: aboutAccent }} className="w-8 sm:w-12 h-[1px]" />
                                    <span style={{ color: aboutAccent }} className="font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase font-heading">
                                        {settings?.about?.label || 'The Narrative'}
                                    </span>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-black uppercase font-heading"
                                >
                                    <span>{settings?.about?.headingNormal?.split(' ').slice(0, -1).join(' ') || 'THE INTERSECTION'}</span>
                                    <span className="flex flex-wrap items-center gap-3 sm:gap-4">
                                        <span>{settings?.about?.headingNormal?.split(' ').slice(-1) || 'OF'}</span>
                                        <span style={{ color: aboutAccent }} className="font-black drop-shadow-sm tracking-tight">
                                            {settings?.about?.stat1Label?.includes('Testing') ? 'PRECISION' : 'MOMENTS'}
                                        </span>
                                    </span>
                                    <span style={{ color: aboutAccent }} className="italic font-light opacity-90 block mt-1 sm:mt-2 text-xl sm:text-4xl lg:text-5xl normal-case">
                                        {settings?.about?.headingItalic || '& Exploration.'}
                                    </span>
                                </motion.h2>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col gap-6 text-slate-500 text-base sm:text-lg font-medium leading-relaxed max-w-[600px]"
                            >
                                <p className="text-justify [text-justify:inter-word] sm:text-left md:text-justify hyphens-auto mt-2 first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-black first-letter:mr-2 sm:first-letter:mr-3 first-letter:float-left first-letter:leading-none" style={{ '--first-letter-color': aboutAccent } as any}>
                                    {description}
                                </p>
                            </motion.div>

                            {/* Stats Grid - Glassmorphic Cards */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="p-4 sm:p-8 rounded-2xl bg-neutral-50 border border-black/5 group hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                                >
                                    <div style={{ color: `${aboutAccent}10` }} className="absolute top-2 right-4 sm:top-4 sm:right-6 text-3xl sm:text-6xl font-black uppercase tracking-tighter">01</div>
                                    <div className="relative z-10">
                                        <div className="text-2xl sm:text-5xl font-black text-black tracking-tighter mb-1 sm:mb-2 group-hover:translate-x-1 transition-transform">{settings?.about?.stat1Value || '5+'}</div>
                                        <div className="h-px w-6 sm:w-8 bg-black/10 mb-2 sm:mb-3 group-hover:w-full transition-all duration-700" />
                                        <div className="text-[7px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">{settings?.about?.stat1Label || 'Years Testing'}</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="p-4 sm:p-8 rounded-2xl bg-neutral-50 border border-black/5 group hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                                >
                                    <div style={{ color: `${aboutAccent}10` }} className="absolute top-2 right-4 sm:top-4 sm:right-6 text-3xl sm:text-6xl font-black uppercase tracking-tighter">02</div>
                                    <div className="relative z-10">
                                        <div className="text-2xl sm:text-5xl font-black text-black tracking-tighter mb-1 sm:mb-2 group-hover:translate-x-1 transition-transform">{settings?.about?.stat2Value || '200k+'}</div>
                                        <div className="h-px w-6 sm:w-8 bg-black/10 mb-2 sm:mb-3 group-hover:w-full transition-all duration-700" />
                                        <div className="text-[7px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">{settings?.about?.stat2Label || 'Moments Captured'}</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

            {/* Simplified Professional Experience Section */}
            <section className="py-12 sm:py-32 overflow-hidden relative border-b border-black/5">
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col mb-10 sm:mb-16 gap-4 sm:gap-6 relative z-10">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div style={{ backgroundColor: expAccent }} className="w-8 sm:w-12 h-[1px]" />
                            <span style={{ color: expAccent }} className="font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase">{settings?.experience?.label || 'Professional Path'}</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-black uppercase font-heading">
                            {settings?.experience?.headingNormal || 'PROFESSIONAL'} <span style={{ color: expAccent }}>{settings?.experience?.headingAccent || 'JOURNEY.'}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {(experiences || []).map((exp: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-10 bg-white border-b border-black/5 transition-all duration-700 overflow-hidden rounded-xl hover:shadow-xl hover:shadow-black/[0.02]"
                                style={{ '--hover-bg': `${themeColor}0d` } as any}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${themeColor}0d, transparent)` }}
                                />
                                {/* Slick Left Accent on Hover */}
                                <div style={{ backgroundColor: expAccent }} className="absolute left-0 top-0 w-1 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                                <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
                                    <h3 className="text-base sm:text-3xl font-black text-black tracking-tight group-hover:translate-x-2 transition-transform duration-500 whitespace-nowrap truncate">
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center gap-2 sm:gap-3 group-hover:translate-x-2 transition-transform duration-500 whitespace-nowrap truncate">
                                        <span className="text-slate-400 font-bold text-[9px] sm:text-xs uppercase tracking-widest shrink-0">at</span>
                                        <span style={{ color: expAccent }} className="font-bold text-[11px] sm:text-lg tracking-tight uppercase truncate">
                                            {exp.company}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 sm:mt-0 flex flex-col sm:items-end gap-1">
                                    <span className="text-lg font-bold text-black/40 group-hover:text-black transition-colors duration-500">
                                        {exp.period}
                                    </span>
                                    <div style={{ backgroundColor: expAccent }} className="h-1 w-12 opacity-10 group-hover:opacity-100 transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

            {/* Premium Studio-Slick Education Section */}
            <section className="py-12 sm:py-32 relative overflow-hidden bg-white">
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
                {/* Decorative Background Elements */}
                <div style={{ backgroundColor: `${eduAccent}0d` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10" />

                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <div className="flex flex-col items-start mb-10 sm:mb-20 gap-4 sm:gap-6 relative z-10">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div style={{ backgroundColor: eduAccent }} className="w-8 sm:w-12 h-[1px]" />
                            <span style={{ color: eduAccent }} className="font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase">{settings?.education?.label || 'Academic Excellence'}</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black leading-[0.95] uppercase font-heading">
                            {settings?.education?.headingNormal || 'SCHOLASTIC'} <span style={{ color: eduAccent }}>{settings?.education?.headingAccent || 'PURSUITS.'}</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        {(education || []).map((edu: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative p-6 sm:p-10 bg-white border-b border-black/5 transition-all duration-700 overflow-hidden rounded-xl hover:shadow-xl hover:shadow-black/[0.02]"
                                style={{ '--hover-bg': `${themeColor}0d` } as any}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${themeColor}0d, transparent)` }}
                                />
                                {/* Slick Left Accent on Hover */}
                                <div style={{ backgroundColor: eduAccent }} className="absolute left-0 top-0 w-1.5 h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 min-w-0">
                                    <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
                                        <h3 className="text-base sm:text-3xl font-black text-black tracking-tight group-hover:translate-x-3 transition-transform duration-500 whitespace-nowrap truncate">
                                            {edu.institution}
                                        </h3>
                                        <div className="flex items-center gap-2 sm:gap-3 group-hover:translate-x-3 transition-transform duration-500 delay-75 whitespace-nowrap truncate">
                                            <div style={{ backgroundColor: eduAccent }} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" />
                                            <span className="text-slate-600 font-bold text-[11px] sm:text-lg truncate">
                                                {edu.degree}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:items-end gap-2 shrink-0">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm group-hover:shadow-md transition-all duration-300">
                                                <span style={{ backgroundColor: eduAccent }} className="w-1.5 h-1.5 rounded-full" />
                                                <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">
                                                    {edu.period}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: eduAccent }} className="h-0.5 w-12 opacity-10 group-hover:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Floating Numerical Index */}
                                <div style={{ color: `${eduAccent}08` }} className="absolute bottom-2 right-8 text-[8rem] font-black group-hover:opacity-10 transition-opacity duration-700 select-none pointer-events-none leading-none -z-10">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
