"use client";

import { useSession, signOut, updateUser } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CompleteProfilePage() {
    const router = useRouter();

    const [cpf, setCpf] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
	const [loading, setLoading] = useState(false);
  
    const { 
        data: session, 
        isPending,
        refetch, /* used to refresh a session data */
        error
    } = useSession(); /* this better auth hook searches on the backend for an active session */

    useEffect(() => {
        if (!session && !isPending) { /* if there is no session, return to login */
            router.push("/login");
            return;
        }

        if (session?.user.profileCompleted) {
            router.push("/dashboard");
        }

    }, [session, router, isPending])

    if (isPending) { /* loading state, in the future, you can make a loading.tsx skeleton page */
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm font-medium text-slate-500 animate-pulse">Carregando dados...</p>
            </div>
        );
    }

    if (!session) { /* if there is no active session could render a forbidden page here */
        return null;
    }

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    const handleUpdateUser = async () => {
        setLoading(true);
        await updateUser({ /* calls better auth function to update user table */
            cpf: cpf,
            phone: phone
        },
        {
            onError: (ctx) => {
                alert(ctx.error.message);
                setLoading(false);
                return;
            },
            onSuccess: async () => {
                await refetch(); /* must call refetch here because the session cookie persist and is not automatically updated on page changes*/
                setLoading(false);
                router.push("/dashboard");
            }
        });

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
                <div className="w-full">
                    Você está quase lá. Precisamos de algumas informações extras antes de continuar.
                </div>


                <input
                    type="text"
                    placeholder="seu cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full border bg-slate-50"
                />

                <input
                    type="text"
                    placeholder="seu telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border bg-slate-50"
                />

                <button
                    onClick={handleUpdateUser} disabled={loading}
                    className="w-full border bg-slate-50"
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>

                <button
                    onClick={handleLogout} 
                    className="w-full border bg-slate-50"
                >
                    Sair do Sistema
                </button>
            </div>
        </div>
  );
}