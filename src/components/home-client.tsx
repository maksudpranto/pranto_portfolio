"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Camera, MapPin, SearchCheck } from "lucide-react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";

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
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
                            className="flex flex-col gap-10"
                        >
                            <div className="flex flex-col gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-3 text-black text-xs tracking-[0.4em] uppercase font-black"
                                >
                                    <div style={{ backgroundColor: heroAccent }} className="h-[2px] w-8 translate-y-px" />
                                    {settings?.hero?.rolePrefix ? `${settings.hero.rolePrefix} ${role}` : role}
                                </motion.div>
                                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-black uppercase">
                                    {settings?.hero?.titleFirst || name.split(' ')[0]} <span style={{ color: heroAccent }}>{settings?.hero?.titleSecond || name.split(' ')[1]}</span>
                                </h1>
                            </div>

                            <p className="max-w-[550px] text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
                                {settings?.hero?.description || description.split('. ')[0] + '.'}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap items-center gap-6"
                            >
                                {socialLinks.map((social: any, i: number) => {
                                    const Icon = iconMap[social.icon] || social.icon;
                                    const isPath = typeof Icon === "string" && Icon.startsWith('/');

                                    return (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -8, scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ backgroundColor: heroAccent, '--hover-color': heroAccent } as any}
                                            className="p-3.5 sm:p-4 text-white rounded-2xl transition-all duration-500 shadow-xl shadow-black/10 hover:shadow-[var(--hover-color)]/40 group relative overflow-hidden flex items-center justify-center min-w-[48px] min-h-[48px] sm:min-w-[52px] sm:min-h-[52px]"
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
                                <div className="relative w-full aspect-[4/5] sm:h-[550px] overflow-hidden rounded-[3rem] sm:rounded-[4rem] border border-black/5 bg-slate-50 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 z-10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent z-10 opacity-60" />
                                    <Image
                                        src="/pranto.jpg"
                                        alt={name}
                                        fill
                                        className="object-cover object-top scale-110"
                                        priority
                                    />
                                </div>

                                {/* Floating Iconic Badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-black/5 z-20"
                                >
                                    <SearchCheck style={{ color: heroAccent }} className="w-5 h-5 sm:w-8 sm:h-8" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/2 -left-4 sm:-left-8 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-black/5 z-20"
                                >
                                    <Camera className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
                                </motion.div>
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-2 left-1/2 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-xl border border-black/5 z-20"
                                >
                                    <MapPin className="w-5 h-5 sm:w-8 sm:h-8 text-red-500" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

            {/* About Me Narrative Section */}
            <section id="about" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                        {/* Image Collage Side */}
                        <div className="lg:col-span-5 relative order-2 lg:order-1">
                            <div className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl rotate-2">
                                <Image
                                    src="/pranto.jpg"
                                    alt="Exploring the world"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-10 -right-6 w-1/2 aspect-square rounded-3xl overflow-hidden border-8 border-white shadow-2xl skew-y-3 z-20"
                            >
                                <Image
                                    src="/pranto.jpg"
                                    alt="Macro details"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <div style={{ backgroundColor: `${aboutAccent}33` }} className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] -z-10" />
                        </div>

                        {/* Narrative Content Side */}
                        <div className="lg:col-span-7 flex flex-col gap-8 order-1 lg:order-2">
                            <div className="flex flex-col gap-4 relative z-10">
                                <span style={{ color: aboutAccent }} className="font-black text-xs tracking-[0.4em] uppercase">{settings?.about?.label || 'My Narrative'}</span>
                                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none text-black uppercase">
                                    {settings?.about?.headingNormal?.split(' ').slice(0, -1).join(' ') || 'THE INTERSECTION'} <br />
                                    {settings?.about?.headingNormal?.split(' ').slice(-1) || 'OF PRECISION &'} <br />
                                    <span style={{ color: aboutAccent }} className="italic font-black">{settings?.about?.headingItalic || 'EXPLORATION.'}</span>
                                </h2>
                            </div>

                            <div className="flex flex-col gap-6 text-slate-600 text-lg sm:text-xl font-medium leading-relaxed">
                                <p>
                                    {description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
                                <div>
                                    <div className="text-4xl font-black text-black">{settings?.about?.stat1Value || '5+'}</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{settings?.about?.stat1Label || 'Years Testing'}</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-black">{settings?.about?.stat2Value || '200k+'}</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{settings?.about?.stat2Label || 'Moments Captured'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />

            {/* Simplified Professional Experience Section */}
            <section className="py-16 sm:py-24 lg:py-32 overflow-hidden relative">
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex flex-col mb-16 gap-4 relative z-10">
                        <span style={{ color: expAccent }} className="font-black text-xs tracking-[0.4em] uppercase">{settings?.experience?.label || 'Professional Path'}</span>
                        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none text-black uppercase">
                            {settings?.experience?.headingNormal || 'PROFESSIONAL'} <br />
                            <span style={{ color: expAccent }}>{settings?.experience?.headingAccent || 'JOURNEY.'}</span>
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

                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-500">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">at</span>
                                        <span style={{ color: expAccent }} className="font-bold text-lg tracking-tight uppercase">
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
            <section className="py-24 sm:py-32 relative overflow-hidden">
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff, ${themeColor}0d, #ffffff)` }} />
                {/* Decorative Background Elements */}
                <div style={{ backgroundColor: `${eduAccent}0d` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10" />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex flex-col items-start mb-20 gap-4 relative z-10">
                        <span style={{ color: eduAccent }} className="font-black text-xs tracking-[0.4em] uppercase">{settings?.education?.label || 'Academic Excellence'}</span>
                        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none uppercase">
                            {settings?.education?.headingNormal || 'SCHOLASTIC'} <br />
                            <span style={{ color: eduAccent }}>{settings?.education?.headingAccent || 'PURSUITS.'}</span>
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

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight group-hover:translate-x-3 transition-transform duration-500">
                                            {edu.institution}
                                        </h3>
                                        <div className="flex items-center gap-3 group-hover:translate-x-3 transition-transform duration-500 delay-75">
                                            <div style={{ backgroundColor: eduAccent }} className="w-2 h-2 rounded-full" />
                                            <span className="text-slate-600 font-bold text-lg">
                                                {edu.degree}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:items-end gap-2 shrink-0">
                                        <div className="flex items-center gap-2">
                                            <span style={{ color: eduAccent }} className="text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 bg-black text-white rounded-full">
                                                {edu.period}
                                            </span>
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
