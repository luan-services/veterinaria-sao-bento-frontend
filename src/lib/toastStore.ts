import { ReactNode } from 'react';

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info' | 'custom';

export interface ToastOptions {
    message?: string;
    action?: { label: string; onClick: () => void };
    icon?: ReactNode; 
}

export interface ToastData extends ToastOptions {
    id: string;
    title: string;
    variant: ToastVariant;
}

let toasts: ToastData[] = [];
let listeners: Array<() => void> = [];

const randomizeId = () => 'toast-' + Math.random().toString(36).slice(2, 8);

export const toastStore = {
	getSnapshot: () => toasts,

	subscribe: (listener: () => void) => {
		listeners.push(listener);
		return () => { listeners = listeners.filter((l) => l !== listener); };
	},
	
	add: (data: Omit<ToastData, 'id'>) => {
		const id = randomizeId();
		toasts = [{ id, ...data }, ...toasts]; 
		listeners.forEach((l) => l());
		setTimeout(() => toastStore.dismiss(id), 4000);
	},
	
	dismiss: (id: string) => {
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