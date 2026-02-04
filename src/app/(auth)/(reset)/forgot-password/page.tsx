"use client"; /* we use client here because login page does not need SEO */

import { useState } from "react";
import { requestPasswordReset } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

    const router = useRouter(); /* router is next routing state, the same as useNavigation() on SPA react */

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, Setsuccess] = useState(false);

    const handleRequestReset = async () => {
        setLoading(true);
        
        await requestPasswordReset({
            email,
            redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reset-password`
        }, {
            onSuccess: () => {
                Setsuccess(true);
                setLoading(false);
            },
            onError: (ctx) => {
                alert(ctx.error.message);
                setLoading(false);
            }
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
                    <div className="text-center text-sm py-2">reset de password</div>
                    {success &&
                        <div className="text-green-600 text-center"> enviamos um email com as instruções para reset da senha </div>
                    }
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border bg-slate-50 p-2"
                    />

                    <button
                        onClick={handleRequestReset}
                        disabled={loading}
                        className="w-full border bg-slate-50 py-2 mt-2 hover:bg-slate-100 transition-colors"
                    >
                        {loading ? "Enviando..." : "Enviar e-mail"}
                    </button>
            </div>
        </div>
    );
}