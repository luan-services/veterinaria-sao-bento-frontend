"use client"; /* we use client here because login page does not need SEO */

import { useState } from "react";
import { signIn, sendVerificationEmail } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import sao_bento_logo from "@/public/sao-bento-logo.svg"
import sao_bento_logo_dark from "@/public/sao-bento-logo-dark.svg"

import { Card } from "@/src/components/ui/Card";
import { GoogleSignInButton } from "@/src/components/ui/GoogleSignInButton";
import { LoginForm } from "@/src/components/features/LoginForm";
import { TextLink } from "@/src/components/ui/TextLink";

export default function LoginPage() {

    /* google sign in must have its own loading state to set the loading text */
    const [googleSignInLoading, setGoogleSignInLoading] = useState(false);

	const handleGoogleLogin = async () => {
        setGoogleSignInLoading(true);
		await signIn.social({
			provider: "google",
			callbackURL: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard` /* this is the redirect after successfull auth on google */
		});
	};

    return (
        <main className="flex min-h-screen items-center justify-center bg-default p-2 sm:p-8 md:p-12">
                <Card className="max-w-120" size="xl">
                    {/* logo container */}
                    <div className="flex w-full justify-center">
                        <Image
                            src={sao_bento_logo}
                            alt="Logo"
                            className="dark:hidden w-full max-w-50 h-auto mb-8"
                        />
                        <Image
                            src={sao_bento_logo_dark}
                            alt="Logo"
                            className="hidden dark:block w-full max-w-50 h-auto mb-8"
                        />
                    </div>

                    <h1 className="text-center text-lg text-default-fg font-semibold">
                        Entrar em Veterinária São Bento
                    </h1>

                    <p className="text-center text-xs text-muted-fg font-medium"> 
                        Faça login para acessar a área do cliente
                    </p>

                    <div className="py-4">
                        <LoginForm></LoginForm>
                    </div>

                    <div className="flex pb-4 px-2 items-center">
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

                    <div className="w-full text-center py-4">
                        <span className="text-sm font-medium text-default-fg">Não tem uma conta? </span>
                        <TextLink href="/register" variant="primary">
                            Cadastre-se
                        </TextLink>
                    </div>
                </Card>
        </main>
    );
}