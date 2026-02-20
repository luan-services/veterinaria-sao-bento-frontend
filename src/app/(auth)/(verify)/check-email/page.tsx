"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Card } from "@/src/components/ui/Card";
import { TextButton } from "@/src/components/ui/TextButton";

export default function CheckEmailPage() {
    const router = useRouter();

    /* time left before redirect */
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        /* update time left */
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev > 0 ? prev - 1 : prev);
        }, 1000);

        /* trigger countdown */
        const timeout = setTimeout(() => {
            router.replace("/login");
        }, 5000);

        /* cleanup functions */
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
        
    }, [router]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-default p-2 sm:p-8 md:p-12">
            <Card className="max-w-200" size="xl">
                <h1 className="p-4 text-center text-2xl font-semibold text-default-fg">
                    Verifique seu E-mail
                </h1>

                <p className="pb-2 text-muted-fg text-center">
                    Enviamos um link de confirmação para o seu endereço de e-mail. Por favor, clique no link para ativar sua conta.
                </p>

                <p className="pb-8 text-sm text-muted-fg text-center">
                    Não recebeu? Verifique sua pasta de spam ou lixo eletrônico.
                </p>

                <p className="pb-2 text-sm text-default-fg text-center">
                    Redirecionando para login em {timeLeft}s...
                </p>

                <TextButton
                    className="w-full justify-center mb-2"
                    onClick={() => router.replace('/login')}
                    variant="primary"
                >
                    Voltar para login agora
                </TextButton>
            </Card>
        </main>
    );
}