"use client"

import { useState } from 'react';
import { signOut } from '@/src/lib/auth-client';
import { useRouter } from "next/navigation";

import { MobileDrawer } from '@/src/components/ui/MobileDrawer'

import { PawIcon, SettingsIcon, ClipboardIcon, ScheduleIcon } from '@/src/components/icons/outline';

const navItems = [
    { href: "/dashboard", icon: PawIcon },
    { href: "/dashboard/schedule", icon: ScheduleIcon },
    { href: "/dashboard/appointments", icon: ClipboardIcon },
    { href: "/dashboard/my-profile", icon: SettingsIcon },
];

export const MobileDrawerContainer = () => {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/");
                },
            },
        });
        setLoading(false);
    };

    return (
        <>
            <MobileDrawer
                navItems={navItems}
                onLogout={handleLogout}
                isLoggingOut={loading}
            />
        </>
    )
}