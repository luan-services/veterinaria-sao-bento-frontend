"use client"
import { ReactNode } from 'react';
import { toastStore } from '@/src/lib/toastStore';

interface WebToastProps {
    id: number;
    title: string;
    message?: string;
    variant?: 'success' | 'danger' | 'warning' | 'info';
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const defaultIcons = {
    success: (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    danger: (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

export function WebToast({ id, title, message, variant = 'info', icon, action }: WebToastProps) {

    const styles = {
        success: 'bg-white border-green-200 text-slate-800',
        danger: 'bg-white border-red-200 text-slate-800',
        warning: 'bg-white border-amber-200 text-slate-800',
        info: 'bg-white border-blue-200 text-slate-800',
    };

    return (
        <div className={`w-full p-4 border rounded-xl shadow-lg flex gap-3 ${styles[variant]}`}>
        
        <div className="flex-shrink-0 mt-0.5">
            {icon || defaultIcons[variant]}
        </div>

        <div className="flex-1">
            <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            
            <button 
                onClick={() => toastStore.dismiss(id)}
                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                aria-label="Close"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            {message && <p className="text-sm text-slate-500 mt-1">{message}</p>}

            {action && (
            <div className="mt-3 flex">
                <button
                onClick={() => {
                    action.onClick();
                    toastStore.dismiss(id); 
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
                >
                {action.label}
                </button>
            </div>
            )}
        </div>
        </div>
    );
}