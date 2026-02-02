"use client"; /* we use client here because login page does not need SEO */

import { useState } from "react";
import { signIn, sendVerificationEmail } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {

	const router = useRouter(); /* router is next routing state, the same as useNavigation() on SPA react */

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	/* state to handle unverified login and show send email button */
	const [isUnverified, setIsUnverified] = useState(false);

	/* state for resend email */
	const [resendLoading, setResendLoading] = useState(false);

	const handleEmailLogin = async () => {
		setLoading(true);
		setIsUnverified(false);

		await signIn.email(
			{
				email,
				password,
			}, 
			{
				onSuccess: () => {
					router.push("/dashboard"); /* push to dashboard on success */
				},
				onError: (ctx) => {

					/* this is the status for when user login and is not verified */
					if(ctx.error.status === 403) {
						setIsUnverified(true);
					}

					alert(ctx.error.message); /* ctx is the backend response from better auth routes */
					setLoading(false);
				}
			}
		);
	};

	const handleGoogleLogin = async () => {
		await signIn.social({
			provider: "google",
			callbackURL: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard` /* this is the redirect after successfull auth on google */
		});
	};

	const handleResendVerification = async () => {
        setResendLoading(true);
        
        await sendVerificationEmail({
            email,
            callbackURL: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/email-verified`
        }, {
            onSuccess: () => {
                alert("Novo link enviado! Verifique sua caixa de entrada.");
                setResendLoading(false);
                setIsUnverified(false); /* reset so they can login again */
            },
            onError: (ctx) => {
                alert(ctx.error.message);
                setResendLoading(false);
            }
        });
    };

	return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
                    
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full border text-slate-700 text-sm bg-slate-50 py-2"
                    >
                        Login com Google
                    </button>

                    <div className="text-center text-sm py-2">ou login com e-mail</div>

                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border bg-slate-50 p-2"
                    />
                    
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border bg-slate-50 p-2"
                    />
                    
                    {isUnverified &&
                        <div className="text-center">
                            <span className="text-red-700 text-sm">
                                Conta ainda não verificada. {" "}
							<button
                                onClick={handleResendVerification}
                                disabled={resendLoading}
                                className=" hover:text-red-900 underline transition-colors"
                            >
                                {resendLoading ? "Enviando..." : "Reenviar E-mail de Verificação"}
                            </button>
                            </span>

                        </div>
                    }

					<button
						onClick={handleEmailLogin}
						disabled={loading}
						className="w-full border bg-slate-50 py-2 mt-2 hover:bg-slate-100 transition-colors"
					>
						{loading ? "Entrando..." : "Entrar na conta"}
					</button>

                    <div className="pt-4 text-center">
                        <button
                            onClick={() => router.push("/register")}
                            className="text-sm text-slate-500 hover:underline"
                        >
                            Não tem conta? Cadastre-se grátis
                        </button>
                    </div>
            </div>
        </div>
    );
}