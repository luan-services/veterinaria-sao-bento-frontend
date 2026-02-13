"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLElement>{
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg'; 
}

const sizeVariants = {
    sm: "max-w-64 p-2",
    md: "max-w-80 p-4",
    lg: "max-w-96 p-6",
    xl: "max-w-120 p-8",
};

export const Card = ({ children, className = "", size = "lg" }: CardProps) => {
    const colors = "bg-card text-default-fg border-default-border"

    return (
        <div 
            className={`w-full border shadow-md rounded-md ${colors} ${sizeVariants[size]} ${className}`}
        >
            {children}
        </div>
    );
};