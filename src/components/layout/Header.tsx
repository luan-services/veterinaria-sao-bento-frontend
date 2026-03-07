import Link from "next/link";

import { Navbar } from "./Navbar"
import { NavLoginContainer } from "./NavLoginContainer";

import Image from "next/image";
import sao_bento_logo_full from "@/public/sao-bento-logo-full.svg"
import sao_bento_logo_full_dark from "@/public/sao-bento-logo-full-dark.svg"

export const Header = () => {

    return (
        <header className="flex fixed w-full items-center justify-center h-16 bg-default/20 backdrop-blur-xs z-50">
            <div className="flex w-full max-w-384 items-center justify-between px-4 md:px-8 lg:px-12">
                <div className="flex">
                    <Link href="#inicio">
                        <Image
                            src={sao_bento_logo_full}
                            alt="Logo do Centro Veterinário São Bento"
                            className="dark:hidden w-full max-w-24 lg:max-w-28"
                        />
                        <Image
                            src={sao_bento_logo_full_dark}
                            alt="Logo do Centro Veterinário São Bento"
                            className="hidden dark:block w-full max-w-24 lg:max-w-28"
                        />
                    </Link>
                </div>
                <Navbar />
                <NavLoginContainer />
            </div>
        </header>
    )
}