// src/components/ui/Toaster.tsx
'use client';

import { useSyncExternalStore } from 'react';
import { toastStore } from '@/src/lib/toastStore';
import { WebToast } from '@/src/components/ui/WebToast'; 

const emptyToasts: any[] = [];

const getServerSnapshot = () => emptyToasts;

export function Toaster() {
	const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, getServerSnapshot);

	if (toasts.length === 0) return null;

	return (
		<div className="fixed bottom-4 right-4 z-[9999] flex flex-col justify-end w-[350px] pointer-events-none">
		{toasts.map((toast, index) => {
			if (index > 2) return null;

			return (
			<div
				key={toast.id}
				className="absolute bottom-0 right-0 w-full transition-all duration-300 ease-out pointer-events-auto"
				style={{
				transform: `translateY(-${index * 16}px) scale(${1 - index * 0.05})`,
				zIndex: 100 - index,
				opacity: 1 - index * 0.2,
				}}
			>
				{toast.variant === 'custom' && toast.customComponent ? (
				toast.customComponent
				) : (
				<WebToast 
					id={toast.id} 
					title={toast.title} 
					variant={toast.variant as any} 
					message={toast.message}
					action={toast.action}
					icon={toast.icon}
				/>
				)}
			</div>
			);
		})}
		</div>
	);
}