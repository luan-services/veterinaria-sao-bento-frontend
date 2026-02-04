"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { useEffect, useState } from "react";
import { resetPassword } from "@/src/lib/auth-client";

export default function EmailVerifiedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    /* get the token from the params url */
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    useEffect(() => {
        if (!token) {
            router.replace("/forgot-password"); 
        }
    }, [token, router]);

    if (!token) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<p className="text-sm font-medium text-slate-500 animate-pulse">Carregando...</p>
			</div>
		);
    }

    const handleReset = async () => {

        setLoading(true);

        if (!newPassword || !confirmPassword) {
            return setError("Preencha todos os campos");
        }


        if (newPassword !== confirmPassword) {
            return setError("Senhas nao coincidem");
        }
        const { data, error: apiError } = await resetPassword({
            newPassword: newPassword,
            token: token
        });


        if (apiError?.message) {
            return setError(apiError.message);
        } else {
            alert("alterado com sucesso, redirecionando para login");
            router.push("/login");
        }
        
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="w-full space-y-4 max-w-md bg-white p-8 border text-slate-700 text-center">
                <h1 className="text-2xl font-semibold text-green-600">Reset senha</h1>

                    <div>senha nova</div>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border bg-slate-50 p-2"
                    />
                    <div>repetir senha nova</div>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border bg-slate-50 p-2"
                    />

                    <button
                        onClick={handleReset}
                        disabled={loading}
                        className="w-full border bg-slate-50 py-2 mt-2 hover:bg-slate-100 transition-colors"
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>

                    {error && 
                        <div>{error}</div>
                    }
            </div>
        </div>
    );
}

