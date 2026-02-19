import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-default p-2">
				<Card className="max-w-120" size="xl">
					<Button className="w-full" type="button" disabled={false} variant="primary">
						Entrar
					</Button>
				</Card>
		</main>
	);
}
