"use client";

import { ReactNode } from "react";
import { cn } from "./lib/utils";

const defaultStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

const sizeClasses = {
    default: "h-10 px-4 py-2",
    lg: "h-12 rounded-lg px-10",
};

interface ButtonProps {
    className?: string;
    size?: "default" | "lg";
    variant?: "primary" | "secondary" | "outline";
    onClick?: () => void;
    children?: ReactNode;
}

export const Button = ({
    className,
    variant = "primary",
    size = "default",
    onClick,
    children,
}: ButtonProps) => {
    return (
        <button
            className={cn(
                defaultStyles,
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
