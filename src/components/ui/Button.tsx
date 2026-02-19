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
    xl: "h-14 px-10 text-md",
};

const colorVariants = {
    default: "",
    primary: "bg-btn-primary text-btn-primary-fg hover:opacity-90 border-primary-border",
    danger:  "bg-btn-danger text-btn-danger-fg hover:opacity-90 border-danger-border",
    outline: "bg-transparent border-default-border text-default-fg hover:bg-default-border/10",
    ghost:   "bg-transparent border-transparent text-default-fg hover:bg-",
};

export const Button = ({ children, className = "", variant = "primary", size = "md", ...props }: ButtonProps) => {
    
    const colors = colorVariants[variant];
    const sizing = sizeVariants[size];

    return (
        <button 
            className={`flex items-center justify-center rounded-md font-medium transition-colors duration-200 border
                focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer 
                ${colors} ${sizing} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};