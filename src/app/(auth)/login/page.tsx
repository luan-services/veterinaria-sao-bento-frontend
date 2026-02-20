"use client"; /* we use client here because login page does not need SEO */

import { useState } from "react";
import { signIn, sendVerificationEmail } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import sao_bento_logo from "@/public/sao-bento-logo.svg"
import sao_bento_logo_dark from "@/public/sao-bento-logo-dark.svg"

import { Card } from "@/src/components/ui/Card";
import { GoogleSignInButton } from "@/src/components/ui/GoogleSignInButton";

export default function LoginPage() {

	const router = useRouter(); /* router is next routing state, the same as useNavigation() on SPA react */

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

    /* google sign in must have its own loading state to set the loading text */
    const [googleSignInLoading, setGoogleSignInLoading] = useState(false);

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
        setGoogleSignInLoading(true);
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
        <main className="flex min-h-screen items-center justify-center bg-default p-2">
                <Card className="max-w-120" size="xl">
                    {/* logo container */}
                    <div className="flex w-full justify-center">
                        {/* must revert classnames after testing */}
                        <Image
                            src={sao_bento_logo}
                            alt="Logo"
                            className="hidden dark:block w-full max-w-50 h-auto mb-8"
                        />
                        <Image
                            src={sao_bento_logo_dark}
                            alt="Logo"
                            className="dark:hidden w-full max-w-50 h-auto mb-8"
                        />
                    </div>

                    <h1 className="text-center text-lg text-default-fg font-semibold">
                        Entrar em Veterinária São Bento
                    </h1>

                    <p className="text-center text-sm text-muted-fg font-medium"> 
                        Faça login para acessar o painel do usuário
                    </p>

                    <div>login aq</div>

                    <div className="flex py-4 px-2 items-center">
                        <div className="grow border-b border-muted-fg"></div>
                        <span className="shrink px-4 text-muted-fg text-sm">ou</span>
                        <div className="grow border-b border-muted-fg"></div>
                    </div>

                    <GoogleSignInButton
                        onClick={handleGoogleLogin}
                        disabled={googleSignInLoading}
                    >
                       {googleSignInLoading ? "Carregando..." : "Continue com o Google"}
                    </GoogleSignInButton>
                </Card>
        </main>
    );

	return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
                    


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
                            onClick={() => router.push("/forgot-password")}
                            className="text-sm text-slate-500 hover:underline"
                        >
                            Esqueceu sua senha? Clique aqui
                        </button>
                    </div>

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