import { Contact } from "../components/features/landing-page/Contact";
import { Hero } from "../components/features/landing-page/Hero";
import { About } from "../components/features/landing-page/About";
import { Services } from "../components/features/landing-page/Services";
import { Comments } from "../components/features/landing-page/Comments";
import { Cto } from "../components/features/landing-page/Cto";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

/* testing cloudflare deploy */

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-full flex flex-col min-h-screen justify-center items-center bg-neutral">
				<Hero />
                <About />
                <Services />
                <Cto />
                <Comments />
                <Contact />
			</main>
            <Footer />
        </>
    );
}