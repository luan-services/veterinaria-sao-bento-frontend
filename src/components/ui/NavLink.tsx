"use client";

import React from "react";
import Link, { LinkProps } from "next/link";

interface NavLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
    variant?: 'default'| 'primary';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeVariants = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
};

const colorVariants = {
    default: "text-muted-fg hover:text-default-fg hover:bg-primary",
    primary: "text-muted-fg hover:text-brand-fg hover:bg-primary",
};

export const NavLink = ({ children, href, className = "", variant = "default", size = "md", ...props }: NavLinkProps) => {
    const colors = colorVariants[variant];
    const sizing = sizeVariants[size];

    return (
        <Link 
            href={href}
            className={`font-medium rounded-lg px-3 py-2 transition-colors duration-200 bg-transparent border-none p-0 inline-flex focus:outline-none cursor-pointer ${colors} ${sizing} ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};