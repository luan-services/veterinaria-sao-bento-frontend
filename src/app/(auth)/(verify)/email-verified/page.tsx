"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { useEffect, useState } from "react";

export default function EmailVerifiedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    /* try to get session to check if user is really verified */
    const { data: session, isPending } = useSession(); 
    
    /* if there is any error, get it it here from the params url */
    const error = searchParams.get("error");

    /* time left before redirect */
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        /* if it's loading, don't start the timer yet */
        if (isPending) {
            return;
        }

        // 1. Define where to go based on the case
        let targetUrl = "";
        
        if (error || !(session?.user?.emailVerified)) {
            targetUrl = "/login";
        } 

        if (session?.user?.emailVerified) {
            targetUrl = "/dashboard"; 
        } 

        /* update time left */
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        /* trigger countdown */
        const timeout = setTimeout(() => {
            router.push(targetUrl);
        }, 5000);

        /* cleanup functions */
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
        
    }, [error, session, isPending, router]);

    if (isPending) {
        return <div className="p-10 text-center animate-pulse">Carregando...</div>; 
    }

    /* first case: the backend returned an error in the params, that means the link is expired or invalid */
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
                <div className="w-full space-y-4 max-w-md bg-white p-8 border text-slate-700 text-center">
                    <h1 className="text-2xl font-semibold text-red-600">Link Inválido</h1>
                    <p className="text-slate-600">Este link expirou ou é inválido.</p>
                    
                    <p className="text-sm text-slate-400">
                        Redirecionando para login em {timeLeft}s...
                    </p>
                    
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full border bg-slate-50 py-2 mt-2 hover:bg-slate-100 transition-colors"
                    >
                        Voltar para o Login agora
                    </button>
                </div>
            </div>
        );
    }

    /* second case: the user is logged in and really is verified */
    if (session?.user.emailVerified) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
                <div className="w-full space-y-4 max-w-md bg-white p-8 border text-slate-700 text-center">
                    <h1 className="text-2xl font-semibold text-green-600">E-mail Verificado!</h1>
                    <p className="text-slate-600">Sua conta foi ativada com sucesso.</p>

                    <p className="text-sm text-slate-400">
                        Entrando no dashboard em {timeLeft}s...
                    </p>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full border bg-slate-50 py-2 mt-2 hover:bg-slate-100 transition-colors"
                    >
                        Ir para o Dashboard agora
                    </button>
                </div>
            </div>
        );
    }

    /* third case: the user is not logged in and we cant check if they are verified or just manually accessed this page */
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="w-full space-y-4 max-w-md bg-white p-8 border text-slate-700 text-center">
                <h1 className="text-2xl font-semibold text-green-600">E-mail Verificado!</h1>
                <p className="text-slate-600">
                    Sua conta foi ativada! <br />
                    Como você está em um novo dispositivo, faça login para continuar.
                </p>

                <p className="text-sm text-slate-400">
                    Indo para o login em {timeLeft}s...
                </p>

                <button
                    onClick={() => router.push('/login')}
                    className="w-full border bg-slate-50 py-2 mt-2 hover:bg-slate-100 transition-colors"
                >
                    Ir para o Login agora
                </button>
            </div>
        </div>
    );
}

