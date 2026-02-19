import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { GoogleSignInButton } from "../components/ui/GoogleSignInButton";
import { Input } from "../components/ui/Input";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-default p-2">
				<Card className="max-w-120" size="xl">
					<GoogleSignInButton>
						Entrar com o Google
					</GoogleSignInButton>
					<Button className="w-full" type="button" disabled={false}>
						Entrar
					</Button>
					<Button className="w-full" type="button" disabled={false} variant="primary">
						Entrar
					</Button>
					<Button className="w-full" type="button" disabled={false} variant="outline">
						Entrar
					</Button>
					<Button className="w-full" type="button" disabled={false} variant="ghost">
						Entrar
					</Button>
					<Input placeholder="email"></Input>
					<Input placeholder="password" type="password"></Input>
					<Input placeholder="file" type="file" variant="default"></Input>
				</Card>
		</main>
	);
}
