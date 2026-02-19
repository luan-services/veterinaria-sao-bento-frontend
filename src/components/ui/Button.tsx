"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default'| 'primary' | 'danger' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeVariants = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-8 text-base",
    xl: "h-14 px-10 text-lg",
};

const colorVariants = {
    default: "bg-btn-default text-btn-default-fg border-transparent hover:opacity-90",
    primary: "bg-btn-primary text-btn-primary-fg border-transparent hover:opacity-90",
    danger:  "bg-btn-danger text-btn-danger-fg border-transparent hover:opacity-90",
    outline: "bg-btn-outline text-btn-outline-fg border-primary-border hover:bg-btn-accent hover:text-btn-accent-fg",
    ghost:   "bg-btn-ghost text-btn-ghost-fg border-transparent hover:bg-btn-accent hover:text-btn-accent-fg",
};

export const Button = ({ children, className = "", variant = "default", size = "md", ...props }: ButtonProps) => {
    
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