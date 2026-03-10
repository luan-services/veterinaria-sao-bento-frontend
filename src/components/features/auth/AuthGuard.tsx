"use client";

import { useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "../../layout/Loading";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (!session) {
            router.replace("/login");
            return;
        }
        /* if profile is incomplete push to our complete-profile page */
        if (!session.user.profileCompleted && session.user.role !== "ADMIN") {
             router.replace("/complete-profile");
        }
    }, [session, isPending, router]);

    const isProfileComplete = session && (session.user.profileCompleted || session.user.role === "ADMIN")

    /* if isPending it means the session isnt fetched yet, if !session, we load this skeleton while the useEffect is redirecting the user to complete profile page */
    // show loading ONLY on first fetch
    if (isPending && !session) {
        return <Loading />;
    }
    
    if (!isProfileComplete) {
        return <Loading />;
    }

    /* if both pass, we return children */
    return (
        <>
            {children}
        </>
    );
}