import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const projects = [
    {
        title: "EcoShop Mobile App",
        description: "A minimalist e-commerce platform built with React Native and Smooth animations.",
        image: "/project2.png",
        tags: ["React Native", "Framer Motion", "Tailwind"],
        github: "#",
        demo: "#",
    },
    {
        title: "Nexus Analytics Dashboard",
        description: "Enterprise-grade SaaS dashboard with real-time data visualization and dark mode.",
        image: "/project1.png",
        tags: ["Next.js", "Recharts", "shadcn/ui"],
        github: "#",
        demo: "#",
    },
];

export default function ProjectsPage() {
    const accentColor = "#FDC435"; // Default accent

    return (
        <div className="flex flex-col bg-white min-h-screen">
            {/* Header Section */}
            <section className="py-16 sm:py-20 bg-white border-b border-black/5 relative overflow-hidden">
                <div style={{ backgroundColor: `${accentColor}0d` }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10" />

                <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back Home
                    </Link>
                    <div className="flex flex-col gap-4 max-w-[900px]">
                        <span style={{ color: accentColor }} className="font-black text-[10px] tracking-[0.4em] uppercase">
                            The Portfolio
                        </span>
                        <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black leading-[0.9] uppercase break-all">
                            CRAFTED <br />
                            <span style={{ color: accentColor }}>SOLUTIONS.</span>
                        </h1>
                        <p className="max-w-[600px] text-slate-500 text-sm sm:text-lg font-medium leading-relaxed mt-2">
                            A selection of my favorite projects and technical experiments, focusing on performance and user experience.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-12 sm:py-20">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {projects.map((project) => (
                        <Card key={project.title} className="overflow-hidden flex flex-col group border-black/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/[0.05] transition-all duration-700 rounded-3xl">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                            <CardHeader className="p-6 sm:p-8 pb-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-black/5 text-[10px] font-black uppercase tracking-widest border-none px-3 py-1">{tag}</Badge>
                                    ))}
                                </div>
                                <CardTitle className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-500">{project.title}</CardTitle>
                                <CardDescription className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow p-8 pt-0">
                                {/* Additional content could go here */}
                            </CardContent>
                            <CardFooter className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <MagneticWrapper strength={0.2} className="w-full sm:w-auto">
                                    <Button asChild variant="outline" size="lg" className="w-full rounded-full border-black/5 hover:border-black font-black uppercase tracking-widest text-[10px] px-8 h-12 shadow-sm transition-all">
                                        <Link href={project.github}>
                                            <Github className="mr-2 h-4 w-4" /> Github
                                        </Link>
                                    </Button>
                                </MagneticWrapper>
                                <MagneticWrapper strength={0.2} className="w-full sm:w-auto">
                                    <Button asChild size="lg" className="w-full rounded-full bg-black hover:bg-zinc-800 font-black uppercase tracking-widest text-[10px] px-8 h-12 shadow-xl shadow-black/20 transition-all">
                                        <Link href={project.demo}>
                                            <ExternalLink className="mr-2 h-4 w-4 text-[#FDC435]" /> Live Demo
                                        </Link>
                                    </Button>
                                </MagneticWrapper>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
