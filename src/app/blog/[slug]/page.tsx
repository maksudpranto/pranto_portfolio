import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Header / Hero Section */}
            <header className="bg-slate-50 border-b border-black/5 py-20 sm:py-28">
                <div className="max-w-[900px] mx-auto px-6 sm:px-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#FDC435] transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Stories
                    </Link>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <span className="text-[#FDC435]">{post.category}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span>{post.location}</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tighter leading-[1.1] uppercase">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <div className="max-w-[900px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
                <div
                    className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FDC435] hover:prose-a:text-[#FDC435]/80 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
            </div>
        </article>
    );
}
