"use client"; /* we use client here because login page does not need SEO */

import { useState } from "react";
import { signIn } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {

	const router = useRouter(); /* router is next routing state, the same as useNavigation() on SPA react */

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleEmailLogin = async () => {
		setLoading(true);

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


	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
					<button
						onClick={handleGoogleLogin}
						className="w-full border text-slate-700 text-sm bg-slate-50"
					>
						Login com Google
					</button>

					<div>login com e-mail</div>

					<input
						type="email"
						placeholder="seu@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border  bg-slate-50"
					/>
					
					<input
						type="password"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border bg-slate-50"
					/>
					
					<button
						onClick={handleEmailLogin}
						disabled={loading}
						className="w-full border bg-slate-50"
					>
						{loading ? "Entrando..." : "Entrar na conta"}
					</button>

					<div>cadastro</div>

					<button
						onClick={() => router.push("/register")}
						className="w-full border bg-slate-50"
					>
						Cadastre-se grátis
					</button>
			</div>
		</div>
	);
}