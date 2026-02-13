import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { reader } from "@/lib/keystatic";
import Markdoc from "@markdoc/markdoc";
import React from "react";

export async function generateStaticParams() {
    const slugs = await reader.collections.blog.list();
    return slugs.map((slug: string) => ({
        slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await reader.collections.blog.read(slug);

    if (!post) {
        notFound();
    }

    const { content, ...meta } = post;
    const contentData = await content();
    const document = (contentData as any)?.node;
    const transformed = document ? Markdoc.transform(document) : null;
    const renderedContent = transformed ? Markdoc.renderers.react(transformed, React) : null;

    return (
        <article className="min-h-screen bg-white">
            {/* Header / Hero Section */}
            <header className="relative bg-white overflow-hidden pt-20 sm:pt-28 pb-20">
                {/* Premium Blurry Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12]"
                        style={{ backgroundColor: meta.accentColor || '#FDC435' }}
                    />
                    <div
                        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08]"
                        style={{ backgroundColor: meta.accentColor || '#FDC435' }}
                    />
                    <div
                        className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.05]"
                        style={{ backgroundColor: meta.accentColor || '#FDC435' }}
                    />
                </div>

                <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
                    <Link
                        href="/#blog"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#FDC435] transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Stories
                    </Link>

                    <div className="flex flex-col gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-[900px]">
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <span style={{ color: meta.accentColor || '#FDC435' }}>Travel Chronicles</span>
                            {meta.date && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                    <span>{meta.date}</span>
                                </>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter leading-[1.1] uppercase break-all">
                            {meta.title || "Untitled Post"}
                        </h1>

                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 sm:mt-2">
                            <Calendar style={{ color: meta.accentColor || '#FDC435' }} className="w-3 h-3 sm:w-4 sm:h-4" />
                            {meta.date || "N/A"}
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-2xl shadow-black/10 border border-black/5">
                        <Image
                            src={meta.image || "/images/placeholder.jpg"}
                            alt={meta.title || "Blog Post"}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain max-h-[75vh]"
                            priority
                        />
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <div className="max-w-[1200px] mx-auto px-6 sm:px-12 py-10 sm:py-16">
                <div className="prose prose-lg max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FDC435] hover:prose-a:text-[#FDC435]/80 transition-colors">
                    {renderedContent}
                </div>
            </div>
        </article>
    );
}
