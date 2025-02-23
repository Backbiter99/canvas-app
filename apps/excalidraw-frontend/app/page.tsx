"use client";

import { Button } from "@repo/ui/button";
import {
    ArrowRight,
    Pencil,
    Share2,
    Users2,
    Layers,
    Cloud,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6">
                            Collaborative Whiteboarding
                            <span className="text-blue-600"> Made Simple</span>
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                            Create, collaborate, and share beautiful diagrams
                            and sketches with your team in real-time. No sign-up
                            required.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link href={"/signin"}>
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Sign in
                                </Button>
                            </Link>
                            <Link href={"/signup"}>
                                <Button size="lg" variant="outline">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-muted/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary">
                            Everything you need to create
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Powerful features that help you bring your ideas to
                            life
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Real-time Collaboration",
                                description:
                                    "Work together with your team in real-time, see changes as they happen.",
                                icon: Users2,
                            },
                            {
                                title: "Infinite Canvas",
                                description:
                                    "Never run out of space. Create without boundaries.",
                                icon: Layers,
                            },
                            {
                                title: "Easy Sharing",
                                description:
                                    "Share your work with a simple link, no account required.",
                                icon: Share2,
                            },
                            {
                                title: "Rich Drawing Tools",
                                description:
                                    "Everything you need to express your ideas visually.",
                                icon: Pencil,
                            },
                            {
                                title: "Cloud Sync",
                                description:
                                    "Your drawings are automatically saved and synced across devices.",
                                icon: Cloud,
                            },
                            {
                                title: "Export Options",
                                description:
                                    "Export your work in multiple formats including PNG, SVG, and PDF.",
                                icon: ArrowRight,
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg bg-card border transition-all hover:shadow-lg"
                            >
                                <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Ready to start creating?
                    </h2>
                    <p className="text-xl mb-10 text-blue-100">
                        Join thousands of teams who trust our platform for their
                        visual collaboration needs.
                    </p>
                    <Button size="lg" variant="secondary">
                        <Link href="/draw">
                            Start Drawing for Free{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-background border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                Product
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Templates
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                Resources
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Tutorials
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                Company
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                Legal
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Terms
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        Security
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 border-t pt-8">
                        <p className="text-center text-muted-foreground">
                            © {new Date().getFullYear()} Your Excalidraw Clone.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
