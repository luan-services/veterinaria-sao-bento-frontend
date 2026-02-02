"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckEmailPage() {
    const router = useRouter();

    /* time left before redirect */
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        /* update time left */
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        /* trigger countdown */
        const timeout = setTimeout(() => {
            router.push("/login");
        }, 5000);

        /* cleanup functions */
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
        
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="w-full space-y-4 max-w-md bg-white p-8 border text-slate-700 text-center">
                
                <h1 className="text-2xl font-semibold text-slate-800">
                    Verifique seu E-mail
                </h1>

                <p className="text-slate-600">
                    Enviamos um link de confirmação para o seu endereço de e-mail. 
                    Por favor, clique no link para ativar sua conta.
                </p>

                <div className="p-4 bg-slate-50 rounded text-sm text-slate-500">
                    Não recebeu? Verifique sua pasta de spam ou lixo eletrônico.
                </div>

                <p className="text-sm text-slate-400">
                    Redirecionando para login em {timeLeft}s...
                </p>

                <button
                    onClick={() => router.push('/login')}
                    className="w-full border bg-slate-50 py-2 mt-4 hover:bg-slate-100 transition-colors"
                >
                    Voltar para login agora
                </button>
            </div>
        </div>
    );
}