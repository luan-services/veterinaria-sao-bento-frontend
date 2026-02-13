"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'danger' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const sizeVariants = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-8 text-base",
};

const colorVariants = {
    primary: "bg-btn-primary text-btn-primary-fg hover:opacity-90 border-transparent",
    danger:  "bg-btn-danger text-btn-danger-fg hover:opacity-90 border-transparent",
    outline: "bg-transparent border-input-border text-default-fg hover:bg-default-border/10",
    ghost:   "bg-transparent border-transparent text-default-fg hover:bg-",
};

export const Button = ({ children, className = "", variant = "primary", size = "md", ...props }: ButtonProps) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border";

    return (
        <button 
            className={`${baseStyles} ${colorVariants[variant]} ${sizeVariants[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};