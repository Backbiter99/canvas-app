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
                            and sketches with your team in real-time.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link href="/signin">
                                <button
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                    aria-label="Sign in"
                                >
                                    Sign in
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button
                                    className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 hover:text-white shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                    aria-label="Sign up"
                                >
                                    Sign up
                                </button>
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
                                title: "Infinite Canvas (Coming Soon)",
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
                                title: "Cloud Sync(Coming Soon)",
                                description:
                                    "Your drawings are automatically saved and synced across devices.",
                                icon: Cloud,
                            },
                            {
                                title: "Export Options(Coming Soon)",
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
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to start creating?
                    </h2>
                    <p className="text-lg sm:text-xl mb-8 text-blue-200">
                        Join the platform for your visual collaboration needs
                    </p>
                    <Link href="/signup">
                        <button
                            className="group flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white text-blue-600 border border-white hover:bg-blue-700 hover:text-white font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 mx-auto"
                            aria-label="Start Drawing for Free"
                        >
                            Sign Up Now
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-300 ">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
                    <p className="text-center text-sm text-gray-800">
                        © {new Date().getFullYear()} Excalidraw Clone. All
                        rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
