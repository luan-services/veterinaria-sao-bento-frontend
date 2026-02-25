import Link from "next/link";

import { Navbar } from "./Navbar"
import { NavLoginContainer } from "./NavLoginContainer";

import Image from "next/image";
import sao_bento_logo_full from "@/public/sao-bento-logo-full.svg"
import sao_bento_logo_full_dark from "@/public/sao-bento-logo-full-dark.svg"

export const Header = () => {

    return (
        <header className="flex fixed w-full items-center justify-center h-16">
            <div className="flex w-full container items-center justify-between px-4 sm:px-8 md:px-12">
                <div className="flex">
                    <Link href="/">
                        <Image
                            src={sao_bento_logo_full}
                            alt="Logo"
                            className="dark:hidden w-full max-w-24 sm:max-w-28"
                        />
                        <Image
                            src={sao_bento_logo_full_dark}
                            alt="Logo"
                            className="hidden dark:block w-full max-w-24 sm:max-w-28"
                        />
                    </Link>
                </div>
                <Navbar />
                <NavLoginContainer />
            </div>
        </header>
    )
}