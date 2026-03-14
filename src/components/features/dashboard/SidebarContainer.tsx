"use client"

import { useState } from 'react';
import { signOut } from '@/src/lib/auth-client';
import { useRouter } from "next/navigation";

import Image from "next/image";
import sao_bento_logo_full from "@/public/sao-bento-logo-full.svg"
import sao_bento_logo_full_dark from "@/public/sao-bento-logo-full-dark.svg"

import { Sidebar } from '@/src/components/ui/Sidebar'
import { PawIcon, SettingsIcon, ClipboardIcon, ScheduleIcon } from '../../icons/outline';

const navItems = [
    { name: "Meus Pets", href: "/dashboard", icon: PawIcon },
    { name: "Agendar consulta", href: "/dashboard/schedule", icon: ScheduleIcon },
    { name: "Consultas", href: "/dashboard/appointments", icon: ClipboardIcon },
    { name: "Configurações", href: "/dashboard/my-profile", icon: SettingsIcon },
];

export const SidebarContainer = () => {

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
            <Sidebar
                navItems={navItems}
                onLogout={handleLogout}
                isLoggingOut={loading}
            >
                <Image
                    src={sao_bento_logo_full}
                    alt="Logo do Centro Veterinário São Bento"
                    className="dark:hidden max-w-20 sm:max-w-24 lg:max-w-28"
                />
                <Image
                    src={sao_bento_logo_full_dark}
                    alt="Logo do Centro Veterinário São Bento"
                    className="hidden dark:block max-w-20 sm:max-w-24 lg:max-w-28"
                />   
            </Sidebar>
        </>
    )
}