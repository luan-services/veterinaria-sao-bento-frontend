"use client";

import { useSession, signOut } from "@/src/lib/auth-client"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  
	const { 
		data: session, 
		isPending,
		error
	} = useSession(); /* this better auth hook searches on the backend for an active session */

	useEffect(() => {
		if (!session && !isPending) { /* if there is no session, return to login */
			router.push("/login"); /* router is an state (side effect), so it must be inside an use effect to run only after the initial page render */
		}
	}, [session, router, isPending])

	if (isPending) { /* loading state, in the future, you can make a loading.tsx skeleton page */
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<p className="text-sm font-medium text-slate-500 animate-pulse">Carregando dados...</p>
			</div>
		);
	}

	if (!session) { /* if there is no active session could render a forbidden page here */
		return null;
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

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<div className="w-full space-y-2 max-w-md bg-white p-8 border text-slate-700">
				<div className="w-full">
					Dados do usuário
				</div>

				<p className="">id: {session.session.userId}</p>
				<p className="">id: {session.session.token}</p>
				<p className="">name: {session.user.name}</p>
				<p className="">email: {session.user.email}</p>
				<p className="">{session.user.emailVerified ? "Verificado ✅" : "Pendente ⚠️"}</p>
				
				<button
					onClick={handleLogout}
					className="w-full border bg-slate-50"
				>
					Sair do Sistema
				</button>
			</div>
		</div>
  );
}