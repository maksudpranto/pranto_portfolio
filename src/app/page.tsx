"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Globe, Code, Sparkles, ArrowRight, Github, Twitter, Linkedin, Facebook, Instagram, Mail, Camera, MapPin, SearchCheck, Heart, Briefcase, Settings2, BarChart3, Database } from "lucide-react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { TravelStories } from "@/components/travel-stories";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col bg-white text-zinc-950 selection:bg-[#FDC435]/30 min-h-screen">
      {/* "Studio-Slick" Personalized Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-black/5">
        {/* Subtle Background Textures */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FDC435]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-100 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center z-10 py-12 lg:py-0">
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
                className="flex items-center gap-3 text-black text-sm tracking-wide uppercase font-bold"
              >
                <div className="h-[2px] w-8 bg-[#FDC435]" />
                Software Test Engineer | Travel Storyteller
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1] text-black">
                ENSURING <span className="text-[#FDC435]">QUALITY,</span> <br />
                CAPTURING <span className="text-[#FDC435]">MOMENTS.</span>
              </h1>
            </div>

            <p className="max-w-[550px] text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
              Ensuring product quality by profession, capturing moments by passion.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              {SOCIAL_LINKS.map((social, i) => {
                const Icon: any = social.icon;
                const isPath = typeof Icon === "string";

                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ '--hover-color': social.color } as any}
                    className="p-3.5 sm:p-4 bg-[#FDC435] text-white rounded-2xl hover:bg-[var(--hover-color)] transition-all duration-500 shadow-xl shadow-[#FDC435]/20 hover:shadow-[var(--hover-color)]/40 group relative overflow-hidden flex items-center justify-center min-w-[48px] min-h-[48px] sm:min-w-[52px] sm:min-h-[52px]"
                    title={social.label}
                  >
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
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Slick Asymmetric Image Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end perspective-1000"
          >
            <div className="relative group w-full max-w-[280px] sm:max-w-[450px] mx-auto lg:mx-0 mt-12 lg:mt-0">
              {/* Decorative Panels */}
              <motion.div
                animate={{ rotate: [-12, -8, -12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-24 h-24 sm:w-40 sm:h-40 bg-[#FDC435]/10 backdrop-blur-3xl rounded-3xl border border-black/5 z-0"
              />
              <motion.div
                animate={{ rotate: [12, 8, 12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-32 h-32 sm:w-48 sm:h-48 bg-slate-100 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border border-black/5 z-0"
              />

              {/* Main Image Container */}
              <div className="relative w-full aspect-[4/5] sm:h-[550px] overflow-hidden rounded-[3rem] sm:rounded-[4rem] border border-black/5 bg-slate-50 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent z-10 opacity-60" />
                <Image
                  src="/pranto.jpg"
                  alt="Maksud Hossain"
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
                <SearchCheck className="w-5 h-5 sm:w-8 sm:h-8 text-[#FDC435]" />
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Narrative Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-white">
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
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 h-48 bg-[#FDC435]/20 rounded-full blur-[80px] -z-10" />
            </div>

            {/* Narrative Content Side */}
            <div className="lg:col-span-7 flex flex-col gap-8 order-1 lg:order-2">
              <div className="flex flex-col gap-4">
                <span className="text-[#FDC435] font-black text-xs tracking-[0.3em] uppercase">My Narrative</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-black">
                  THE INTERSECTION <br />
                  OF PRECISION & <br />
                  <span className="italic text-[#FDC435]">EXPLORATION.</span>
                </h2>
              </div>

              <div className="flex flex-col gap-6 text-slate-600 text-lg sm:text-xl font-medium leading-relaxed">
                <p>
                  As a <span className="text-black font-bold border-b-2 border-[#FDC435]/30">Software Test Engineer</span>, my life is defined by the pursuit of perfection. I thrive in the details, finding the edge cases that others miss and ensuring that every digital experience is as seamless as it is robust.
                </p>
                <p>
                  But when the screen goes dark, my true journey begins. With a <span className="text-black font-bold">camera in hand</span> and a passport full of stamps, I trade bug reports for travel stories. To me, testing code and capturing moments are two sides of the same coin.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
                <div>
                  <div className="text-4xl font-black text-black">5+</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Years Testing</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-black">200k+</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Moments Captured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Professional Experience Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 border-y border-black/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col mb-16 gap-4">
            <span className="text-[#FDC435] font-black text-xs tracking-[0.3em] uppercase">Professional Path</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black">JOURNEY.</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                role: "Senior Product Acceptance Analyst",
                company: "SELISE Digital Platform",
                period: "July, 2025 — PRESENT",
              },
              {
                role: "SQA Engineer",
                company: "Grameenphone (Augmented)",
                period: "April, 2023 — July,2025",
              },
              {
                role: "SQA Engineer",
                company: "DreamOnline LTD.",
                period: "Sept, 2021 — April,2023",
              },
              {
                role: "Analyst",
                company: "Quantanite Bangladesh LTD.",
                period: "March, 2020 - Sept, 2021",
              }
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-10 bg-white hover:bg-slate-50 border-b border-black/5 transition-all duration-500 overflow-hidden"
              >
                {/* Slick Left Accent on Hover */}
                <div className="absolute left-0 top-0 w-1 h-full bg-[#FDC435] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                    <span className="text-[#FDC435] font-bold text-sm tracking-widest uppercase">
                      {exp.company}
                    </span>
                  </div>
                </div>

                <div className="mt-6 sm:mt-0 flex flex-col sm:items-end gap-1">
                  <span className="text-lg font-bold text-black/40 group-hover:text-black transition-colors duration-500">
                    {exp.period}
                  </span>
                  <div className="h-1 w-12 bg-black/5 group-hover:bg-[#FDC435] transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center mb-24 gap-4">
            <span className="text-[#FDC435] font-bold text-xs tracking-[0.3em] uppercase">Tech Stack & Talents</span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-black uppercase">EXPERTISE.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Test Automation",
                icon: <Settings2 className="w-6 h-6" />,
                skills: ["Selenium", "Playwright", "Appium", "Cypress", "PyTest"]
              },
              {
                category: "QA Lifecycle",
                icon: <SearchCheck className="w-6 h-6" />,
                skills: ["Jira", "TestRail", "Agile/Scrum", "CI/CD", "LoadRunner"]
              },
              {
                category: "Engineering",
                icon: <Code className="w-6 h-6" />,
                skills: ["React", "TypeScript", "Node.js", "Python", "SQL"]
              },
              {
                category: "Passions",
                icon: <Camera className="w-6 h-6" />,
                skills: ["Traveling", "Photography", "Storytelling", "Editing"]
              }
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 sm:p-10 bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-[#FDC435]/10 border border-transparent hover:border-[#FDC435]/50 transition-all duration-500"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-black text-[#FDC435] rounded-2xl group-hover:rotate-12 transition-transform duration-500">
                      {cat.icon}
                    </div>
                    <div className="h-[2px] w-12 bg-black/5 group-hover:bg-[#FDC435] transition-colors duration-500" />
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-xl font-bold tracking-tight text-black">{cat.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, j) => (
                        <span
                          key={j}
                          className="px-4 py-1.5 rounded-full border border-black/5 bg-white sm:bg-slate-100 group-hover:bg-slate-50 text-[11px] font-bold uppercase tracking-widest hover:bg-[#FDC435] hover:text-black hover:border-[#FDC435] transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Photography (Visual Storytelling) Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[#FDC435] font-bold text-xs tracking-[0.3em] uppercase">Visual Storytelling</span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-black">
                TRAVEL <br />
                <span className="italic text-[#FDC435]">PHOTOGRAPHY.</span>
              </h2>
            </div>
            <p className="max-w-[450px] text-slate-500 text-lg font-medium leading-relaxed">
              Capturing the soul of places through my lens. Every shot is a moment of connection, every frame tells a story.
            </p>
          </div>

          <PhotographyGallery />
        </div>
      </section>

      {/* Travel Stories (Depth & Reflection) Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[#FDC435] font-bold text-xs tracking-[0.3em] uppercase">Reflection & Depth</span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-black text-left">
                TRAVEL <br />
                <span className="italic text-[#FDC435]">STORIES.</span>
              </h2>
            </div>
            <p className="max-w-[450px] text-slate-500 text-lg font-medium leading-relaxed">
              Beyond the lens, exploring the parallels between the road and life. Reflections on journey, resilience, and balance.
            </p>
          </div>

          <TravelStories />
        </div>
      </section>

      {/* Strategic Vision Grid */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Automation Architect",
                description: "Designing end-to-end testing frameworks that scale with complexity and ensure product integrity.",
                icon: <BarChart3 className="w-8 h-8" />,
                tag: "CORE ROLE"
              },
              {
                title: "Quality Strategist",
                description: "Balancing speed and quality to deliver flawless digital experiences at any scale.",
                icon: <Globe className="w-8 h-8" />,
                tag: "STRATEGY"
              },
              {
                title: "Persistent Explorer",
                description: "Applying the same curiosity and attention to detail from SQA to every moment I capture.",
                icon: <Heart className="w-8 h-8" />,
                tag: "LIFE"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col gap-6 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-black/5 hover:border-[#FDC435]/50 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="text-black mb-2 p-3 bg-slate-50 rounded-2xl w-fit group-hover:bg-[#FDC435] transition-colors">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">{feature.tag}</span>
                  <h3 className="text-2xl font-bold text-black group-hover:text-[#FDC435] transition-colors">{feature.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

