"use client"; /* we use client here because register page does not need SEO */

import { useRouter } from "next/navigation";

import Image from "next/image";
import sao_bento_logo from "@/public/sao-bento-logo.svg"
import sao_bento_logo_dark from "@/public/sao-bento-logo-dark.svg"

import { Card } from "@/src/components/ui/Card";
import { RegisterForm } from "@/src/components/features/RegisterForm";
import { TextLink } from "@/src/components/ui/TextLink";

export default function RegisterPage() {

	const router = useRouter(); /* router is next routing state, the same as useNavigation() on SPA react */

	return (
		<main className="flex min-h-screen items-center justify-center bg-default p-2 sm:p-8 md:p-12">
			<Card className="max-w-120" size="xl">
				{/* logo container */}
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

				<h1 className="text-center text-lg text-default-fg font-semibold">
					Cadastrar em Veterinária São Bento
				</h1>

				<p className="text-center text-xs text-muted-fg font-medium"> 
					Crie uma conta em nosso site para acessar a área do cliente
				</p>

				<div className="py-4">
					<RegisterForm></RegisterForm>
				</div>

				<div className="w-full text-center py-2">
					<span className="text-sm font-medium text-default-fg">Já possui uma conta? </span>
					<TextLink href="/login" variant="primary">
						Faça o login
					</TextLink>
				</div>

				<div className="w-full text-center py-2">
					<TextLink href="/" variant="default">
						Voltar para o site
					</TextLink>
				</div>
			</Card>
		</main>
	);
}