"use client";

import React from "react";
import { useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeClosedIcon } from "../icons/EyeClosedIcon";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'danger';
}

const variantStyles = {
    default: "border-default-border focus:border-default-accent-border focus:shadow-ring-gray",
    danger:  "border-danger-border focus:border-danger-border focus:shadow-ring-danger",
};

export const Input = ({ className = "", variant = "default", type, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const colors = variantStyles[variant];
    const sizing = "h-12 px-4 text-sm";

    if (type === "password") {
        return (
            <div className="relative flex w-full items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`flex w-full rounded-md border bg-transparent text-default-fg placeholder:text-muted-fg pr-12
                        transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 
                        ${colors} ${sizing} ${className}`} 
                    {...props}
                />
                <button
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-muted-fg hover:text-default-fg focus:outline-none disabled:opacity-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={props.disabled}
                >
                    <span className="cursor-pointer text-muted-fg hover:text-default-fg transition-colors duration-200">
                        {showPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
                    </span>
                </button>
            </div>
        );
    }

    if (type === "file") {
        return (
            <input
                type="file"
                className={`flex w-full rounded-md border bg-transparent text-default-fg placeholder:text-muted-fg transition-all 
                    duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer p-0 pr-4 
                    file:mr-4 file:h-full file:cursor-pointer file:border-0 file:border-r file:border-default-border 
                    file:bg-transparent file:px-4 file:py-2 file:text-sm file:font-medium file:text-default-fg 
                    hover:file:bg-default-border/50 ${colors} ${sizing} ${className}`}
                {...props}
            />
        );
    }

    return (
        <input
            className={`flex w-full rounded-md border bg-transparent text-default-fg placeholder:text-muted-fg 
                transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${colors} ${sizing} ${className}`}
            {...props}
        />
    );
};