"use client";

import { useState } from "react";
import { signUp } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";

export function RegisterForm() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        await signUp.email( /* try to call registration route */
            {
                email,
                password,
                name,
                cpf,
                phone,
                lastName,
                callbackURL: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/email-verified`
            }, 
            {
                onSuccess: () => { /* if everything works, route to /dasbhoard page where it will get the session data */
                    const safeEmail = encodeURIComponent(email);
                    router.push(`/check-email?email=${safeEmail}`);
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                    setLoading(false);
                }
            }
        );
    };
    
    return (
        <form 
            onSubmit={handleRegister} 
            className="flex flex-col gap-2"
        >

            <div className="pb-2">
                <Label htmlFor="name">
                    Nome
                </Label>
            	<Input
                    id="name"
					type="text"
                    name="name"
					placeholder="Ex: Vitor"
					value={name}
					onChange={(e) => setName(e.target.value)}
                    required
				/>
            </div>
            <div className="pb-2">
                <Label htmlFor="last_name">
                    Sobrenome
                </Label>
				<Input
                    id="last_name"
					type="text"
                    name="last_name"
					placeholder="Ex: Nascimento"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
                    required
				/>
            </div>
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
            <div className="pb-2"> 
                <Label htmlFor="confirmPassword">
                    Confirmar senha
                </Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="pb-2"> 
                <Label htmlFor="phone">
                    Telefone
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="(00) 0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="pb-2"> 
                <Label htmlFor="cpf">
                    CPF
                </Label>
                <Input
                    id="cpf"
                    type="text"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
            </div>
            <Button 
                className="w-full"
                type="submit"
                variant="primary"
            >
                {loading ? "Carregando..." : "Criar conta"}
            </Button>
        </form>
    );
}