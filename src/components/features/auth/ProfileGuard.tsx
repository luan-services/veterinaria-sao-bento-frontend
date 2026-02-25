"use client";

import { useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileGuard({ children }: { children: React.ReactNode }) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (!session) {
            router.push("/login");
            return;
        }
        /* if profile is complete push to our complete-profile page */
        if (!session.user.profileCompleted && session.user.role !== "ADMIN") {
             router.push("/complete-profile");
        }
    }, [session, isPending, router]);

    const isProfileComplete = session && (session.user.profileCompleted || session.user.role === "ADMIN")

    /* if isPending it means the session isnt fetched yet, if !session, we load this skeleton while the useEffect is redirecting the user to complete profile page */
    if (isPending || !isProfileComplete) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<p className="text-sm font-medium text-slate-500 animate-pulse">Carregando dados...</p>
			</div>
		);
    }

    /* if both pass, we return children */
    return (
        <>
            {children}
        </>
    );
}