import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="min-h-screen w-full">
				<Card>
					<Button type="button" disabled={false} variant="ghost">oi</Button>
				</Card>
			</main>
		</div>
	);
}
