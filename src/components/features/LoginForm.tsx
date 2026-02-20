"use client";

import { useState } from "react";
import { signIn } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";

export function LoginForm() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

    /* state to handle unverified login and show send email button */
	const [isUnverified, setIsUnverified] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
            e.preventDefault();
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
    
    return (
        <form 
            onSubmit={handleEmailLogin} 
            className="flex flex-col gap-2"
        >
            <div className="pb-2"> 
                <Label htmlFor="email">
                    E-mail
                </Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="pb-2"> 
                <Label htmlFor="password">
                    Senha
                </Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <Button 
                className="w-full"
                type="submit"
                variant="primary"
            >
                {loading ? "Entrando..." : "Entrar na conta"}
            </Button>
        </form>
    );
}