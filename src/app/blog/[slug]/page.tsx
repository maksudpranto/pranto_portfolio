import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
            <header className="relative bg-white overflow-hidden pt-20 sm:pt-28 pb-20">
                {/* Premium Blurry Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12]"
                        style={{ backgroundColor: post.themeColor || '#FDC435' }}
                    />
                    <div
                        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08]"
                        style={{ backgroundColor: post.themeColor || '#FDC435' }}
                    />
                    <div
                        className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.05]"
                        style={{ backgroundColor: post.themeColor || '#FDC435' }}
                    />
                </div>

                <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#FDC435] transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Stories
                    </Link>

                    <div className="flex flex-col gap-6 mb-16 max-w-[900px]">
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

                    {/* Hero Image */}
                    <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-2xl shadow-black/10 border border-black/5">
                        <Image
                            src={post.image || "/images/placeholder.jpg"}
                            alt={post.title}
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
                <div
                    className="prose prose-lg max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FDC435] hover:prose-a:text-[#FDC435]/80 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
            </div>
        </article>
    );
}
