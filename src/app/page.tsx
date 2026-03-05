import { Contact } from "../components/features/landing-page/Contact";
import { Hero } from "../components/features/landing-page/Hero";
import { Services } from "../components/features/landing-page/Services";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-full flex flex-col min-h-screen justify-center items-center bg-neutral">
				<Hero />
                <Services />
                <Contact />
			</main>
            <Footer />
        </>
    );
}