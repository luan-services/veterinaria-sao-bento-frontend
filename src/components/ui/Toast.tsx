"use client"

import { ReactNode } from 'react';
import { toastStore } from '@/src/lib/toastStore';

import { InfoIcon } from '../icons/InfoIcon';
import { SuccessIcon } from '../icons/SuccessIcon';
import { AlertIcon } from '../icons/AlertIcon';
import { DangerIcon } from '../icons/DangerIcon';

interface ToastProps {
    id: string;
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
        <span className="text-success-fg"> 
            <SuccessIcon size={24}/>
        </span>
    ),
    danger: (
        <span className="text-danger-fg"> 
            <DangerIcon size={24}/>
        </span>
    ),
    warning: (
        <span className="text-alert-fg"> 
            <AlertIcon size={24}/>
        </span>
    ),
    info: (
        <span className="text-default-fg"> 
            <InfoIcon size={24}/>
        </span>
    ),
};

export function Toast({ id, title, message, variant = 'info', icon, action }: ToastProps) {

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