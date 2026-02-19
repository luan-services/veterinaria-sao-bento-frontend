import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-default p-2">
				<Card className="max-w-120" size="xl">
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
					<Input placeholder="password" type="password" disabled={true}></Input>
					<Input placeholder="file" type="file"></Input>
				</Card>
		</main>
	);
}
