"use client";

import { useState } from "react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // This handles the "Enter" key AND the Button click
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // <--- CRITICAL: Stops the page from refreshing!
        
        // Call your login logic here
        console.log("Logging in with:", email, password);
        // await signIn.email(...)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // HTML5 validation (free bonus)
                />
                <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/* A button inside a form is type="submit" by default */}
            <Button type="submit" className="w-full">
                Entrar
            </Button>
        </form>
    );
}