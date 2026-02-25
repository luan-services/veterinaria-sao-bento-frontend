"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { resetPassword } from "@/src/lib/auth-client";
import { toast } from "@/src/lib/toastStore";
import { translateError } from "@/src/lib/errorMap";

import Image from "next/image";
import sao_bento_logo from "@/public/sao-bento-logo.svg"
import sao_bento_logo_dark from "@/public/sao-bento-logo-dark.svg"

import { Card } from "@/src/components/ui/Card";
import { TextButton } from "@/src/components/ui/TextButton";
import { Loading } from "@/src/components/layout/Loading";
import { ResetPasswordForm } from "@/src/components/features/ResetPasswordForm";
import type { ResetPasswordFormData } from "@/src/components/features/ResetPasswordForm";

export default function ResetPassowrdPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    /* get the token from the params url */
    const token = searchParams.get("token");
    
    useEffect(() => {
        if (!token) {
            router.replace("/forgot-password"); 
        }
    }, [token, router]);

    if (!token) {
		return (
			<Loading />
		);
    }

    const handleReset = async (formData: ResetPasswordFormData) => {
        const { data, error } = await resetPassword({
            newPassword: formData.password,
            token: token
        });

        if (error?.code) {
            toast.danger(translateError(error.code));
            return;
        } 

        toast.success("Senha alterada com sucesso, redirecionando para login.");
        router.push("/login");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-default p-2 sm:p-8 md:p-12">
            <Card className="max-w-200" size="xl">
                <div className="flex w-full justify-center">
					{/* must revert classnames after testing */}
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
                <h1 className="text-center text-lg text-default-fg font-semibold pb-1">
					Alteração de senha
				</h1>
				<p className="text-center text-sm text-muted-fg font-medium pb-8"> 
					O token foi efetivado com sucesso. Digite a nova senha desejada.
				</p>
                <div className="w-full max-w-120 justify-self-center">
                    <ResetPasswordForm handleReset={handleReset} />
                </div>
            </Card>
        </main>
    );
}

