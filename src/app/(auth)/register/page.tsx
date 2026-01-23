"use client"; /* we use client here because register page does not need SEO */

import { useState } from "react";
import { signUp } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

	const router = useRouter(); /* router is next routing state, the same as useNavigation() on SPA react */

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		setLoading(true);
		await signUp.email( /* try to call registration route */
			{
				email,
				password,
				name,
			}, 
			{
				onSuccess: () => { /* if everything works, route to /dasbhoard page where it will get the session data */
					router.push("/dashboard");
				},
				onError: (ctx) => {
					alert(ctx.error.message);
					setLoading(false);
				}
			}
		);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
			<div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
				<input
					type="text"
					placeholder="nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border bg-slate-50"
				/>

				<input
					type="email"
					placeholder="seu@email.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full border bg-slate-50"
				/>

				<input
					type="password"
					placeholder="Crie uma senha segura"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border bg-slate-50"
				/>

				<button
					onClick={handleRegister}
					disabled={loading}
					className="w-full border bg-slate-50"
				>
					{loading ? "Criando conta..." : "Cadastrar"}
				</button>
			
				<button 
					onClick={() => router.push('/login')}
					className="w-full border bg-slate-50"
				>
					Já tem conta? Fazer Login
				</button>
			</div>
		</div>
	);
}