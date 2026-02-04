import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const posts = [
    {
        title: "My First Blog Post",
        description: "An introduction to my new portfolio and blog.",
        date: "2024-02-04",
        slug: "first-post",
    },
    // Add more posts here
];

export default function BlogPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
                <p className="text-muted-foreground mt-2">
                    Thoughts on software development, design, and technology.
                </p>
            </div>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <div className="text-sm text-muted-foreground mb-1">{post.date}</div>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>{post.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
