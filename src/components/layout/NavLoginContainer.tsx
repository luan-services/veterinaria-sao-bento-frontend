"use client"

import { useSession, signOut, updateUser } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export const NavLoginContainer = () => {

    const router = useRouter();

    const { data: session, isPending, refetch } = useSession(); /* this better auth hook searches on the backend for an active session */
    
    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    refetch();
                },
            },
        });
    };
    
    if (isPending) { /* loading state, in the future, you can make a loading.tsx skeleton page */
        return (
            <div>loading...</div>
        );
    }

    if (!session) { /* if there is no active session could render a forbidden page here */
        return (
            <div>   
                <Button onClick={() => router.push("/login")} variant="primary">
                    Entrar
                </Button>
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <Button onClick={() => router.push("/login")} variant="primary">
                Minha Area
            </Button>
            <Button onClick={handleLogout} variant="ghost">
                Encerrar Sessão
            </Button>
        </div>
    );
}