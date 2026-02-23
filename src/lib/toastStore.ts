import { ReactNode } from 'react';

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info' | 'custom';

export interface ToastOptions {
    message?: string;
    action?: { label: string; onClick: () => void };
    icon?: ReactNode; 
}

export interface ToastData extends ToastOptions {
    id: number;
    title: string;
    variant: ToastVariant;
}

let toasts: ToastData[] = [];
let listeners: Array<() => void> = [];

export const toastStore = {
	getSnapshot: () => toasts,
	subscribe: (listener: () => void) => {
		listeners.push(listener);
		return () => { listeners = listeners.filter((l) => l !== listener); };
	},
	
	add: (data: Omit<ToastData, 'id'>) => {
		const id = Date.now();
		toasts = [{ id, ...data }, ...toasts]; 
		listeners.forEach((l) => l());
		setTimeout(() => toastStore.dismiss(id), 4000);
	},
	
	dismiss: (id: number) => {
		toasts = toasts.filter((t) => t.id !== id);
		listeners.forEach((l) => l());
	},
};

export const toast = {
	success: (title: string, options?: ToastOptions) => toastStore.add({ title, variant: 'success', ...options }),
	danger: (title: string, options?: ToastOptions) => toastStore.add({ title, variant: 'danger', ...options }),
	warning: (title: string, options?: ToastOptions) => toastStore.add({ title, variant: 'warning', ...options }),
	info: (title: string, options?: ToastOptions) => toastStore.add({ title, variant: 'info', ...options }),
};