'use client';

import { useSyncExternalStore } from 'react';
import { toastStore } from '@/src/lib/toastStore';
import { Toast } from '@/src/components/ui/Toast'; 

const emptyToasts: any[] = [];

const getServerSnapshot = () => emptyToasts;

interface ToasterProps {
    position?: 'top-center' | 'bottom-center' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

const positionVariants = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
};

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
    const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, getServerSnapshot);

    if (toasts.length === 0) {
        return null;
    }

    const isTop = position.startsWith('top');
    
    const yDirection = isTop ? 1 : -1;

    return (
        <div 
            className={`fixed z-[9999] flex flex-col w-[400px] pointer-events-none ${positionVariants[position]} ${isTop ? 'justify-start' : 'justify-end'}`}
        >
            {toasts.map((toast, index) => {
                if (index > 2) {
                    return null;
                }

                return (
                    <div
                        key={toast.id}
                        className={`absolute w-full transition-all duration-300 ease-out pointer-events-auto 
                            left-0 ${isTop ? 'top-0' : 'bottom-0'}`}
                        style={{
                            transform: `translateY(${index * 16 * yDirection}px) scale(${1 - index * 0.05})`,
                            transformOrigin: isTop ? 'top center' : 'bottom center',
                            zIndex: 100 - index,
                        }}
                    >
						<Toast 
							id={toast.id} 
							title={toast.title} 
							variant={toast.variant} 
							message={toast.message}
							action={toast.action}
							icon={toast.icon}
						/>
                    </div>
                );
            })}
        </div>
    );
}