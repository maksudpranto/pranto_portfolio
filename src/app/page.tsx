"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Globe, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Banner Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl border mt-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Redefining Digital Excellence</span>
          </div>

          <h1 className="max-w-[800px] text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
            Crafting the <span className="text-primary">Future</span> of Web.
          </h1>

          <p className="max-w-[650px] text-lg text-muted-foreground sm:text-2xl leading-relaxed">
            I build high-performance, visually stunning applications that push the boundaries of what's possible on the web.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
              <Link href="/projects">
                Explore Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full backdrop-blur-sm border-foreground/10 hover:bg-foreground/5 transition-all hover:scale-105 active:scale-95">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-blue-500/20 rounded-full blur-[140px] animate-pulse delay-700" />
      </section>

      {/* Featured Skills / Tech Stack */}
      <section className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            title: "Frontend Development",
            description: "Expertise in React, Next.js, and Tailwind CSS for building responsive, high-performance web applications.",
            icon: <Globe className="h-8 w-8 text-primary" strokeWidth={1.5} />,
          },
          {
            title: "Backend Engineering",
            description: "Designing robust APIs and server-side logic using Node.js, Express, and modern database systems.",
            icon: <Code className="h-8 w-8 text-primary" strokeWidth={1.5} />,
          },
          {
            title: "Full-Stack Solutions",
            description: "Seamlessly integrating frontend and backend to deliver complete, scalable products from scratch.",
            icon: <Sparkles className="h-8 w-8 text-primary" strokeWidth={1.5} />,
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col gap-5 p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="p-4 w-fit rounded-xl bg-primary/10 shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed italic">
              &quot;{feature.description}&quot;
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
