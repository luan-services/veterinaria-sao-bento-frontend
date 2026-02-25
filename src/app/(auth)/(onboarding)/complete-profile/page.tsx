"use client";

import { useSession, signOut, updateUser } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/src/lib/toastStore";
import { translateError } from "@/src/lib/errorMap";

import Image from "next/image";
import sao_bento_logo from "@/public/sao-bento-logo.svg"
import sao_bento_logo_dark from "@/public/sao-bento-logo-dark.svg"

import { Card } from "@/src/components/ui/Card";
import { TextButton } from "@/src/components/ui/TextButton";
import { Loading } from "@/src/components/layout/Loading";
import { CompleteProfileForm } from "@/src/components/features/CompleteProfileForm";
import type { CompleteProfileFormData } from "@/src/components/features/CompleteProfileForm";

export default function CompleteProfilePage() {
    const router = useRouter();
  
    const { data: session, isPending, refetch, error  } = useSession(); /* this better auth hook searches on the backend for an active session */

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
            <Loading/>
        );
    }

    if (!session) { /* if there is no active session could render a forbidden page here */
        return <Loading/>
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

    const handleUpdateUser = async (data: CompleteProfileFormData) => {
        await updateUser(
        {
            cpf: data.cpf,
            phone: data.phone,
        },
        {
            onError: (ctx) => {
                toast.danger(translateError(ctx.error.message));
            },
            onSuccess: async () => {
                await refetch();
                router.push("/dashboard");
            },
        }
        );
    };

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
					Você está quase lá! Precisamos de algumas informações antes de continuar.
				</h1>
				<p className="text-center text-sm text-muted-fg font-medium pb-8"> 
					Quando o login é feito pelo Google, alguns campos obrigatórios não são preenchidos. Precisamos desses dados para validar seu cadastro.
				</p>
                <div className="w-full max-w-120 justify-self-center">
                    <CompleteProfileForm handleUpdate={handleUpdateUser} />
                </div>
                <div className="w-full text-center py-2">
                    <TextButton onClick={handleLogout} variant="primary">
                        Sair do sistema
                    </TextButton>
                </div>
            </Card>
        </main>
  );
}