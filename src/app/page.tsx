import { Contact } from "../components/features/landing-page/Contact";
import { Hero } from "../components/features/landing-page/Hero";
import { Header } from "../components/layout/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-full flex flex-col min-h-screen justify-center items-center bg-default">
				<Hero />
                <Contact />
				<div className="bg-muted-fg h-160 w-full">
					OISDO
				</div>
			</main>
        </>
    );
}