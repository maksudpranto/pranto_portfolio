import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

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
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground mt-2">
                    A selection of my favorite projects and experiments.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {projects.map((project) => (
                    <Card key={project.title} className="overflow-hidden flex flex-col">
                        <div className="relative aspect-video">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform hover:scale-105"
                            />
                        </div>
                        <CardHeader>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            {/* Additional content could go here */}
                        </CardContent>
                        <CardFooter className="gap-4">
                            <Button asChild variant="outline" size="sm">
                                <Link href={project.github}>
                                    <Github className="mr-2 h-4 w-4" /> Github
                                </Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href={project.demo}>
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
