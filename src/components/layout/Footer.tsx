import { TextLink } from "../ui/TextLink";

import Image from "next/image";
import sao_bento_logo_full_dark from "@/public/sao-bento-logo-full-dark.svg"

import { EnvelopeIcon, LocationIcon, PhoneIcon } from "../icons/outline/";

export const Footer = () => {
    return (
        <footer className="flex w-full items-center justify-center bg-footer pt-2 pb-8">
            <div className="w-full max-w-384 py-8 px-8 md:px-16 lg:px-32">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-8">
                    <div className="flex flex-col w-full gap-4 md:col-span-3 lg:col-span-1">
                        <Image
                            src={sao_bento_logo_full_dark}
                            alt="Logo"
                            className="w-full max-w-28 sm:max-w-32"
                        />
                        <p className="text-white font-semibold text-base sm:text-xl">
                            Centro Veterinário São Bento
                        </p>
                        <p className="text-white text-xs">
                            De check-up à dia de cuidados e mimo, nosso centro veterinário 24h é a escolha certa para o seu pet
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white font-semibold text-lg mb-2">Navegação</h3>
                        <nav className="flex flex-col w-fit gap-2">
                            <TextLink 
                                href="/sobre"
                                size="md"
                                className="text-white"
                            >
                                Sobre Nós
                            </TextLink>
                            <TextLink 
                                href="/servicos"
                                size="md"
                                className="text-white"
                            >
                                Serviços
                            </TextLink>
                            <TextLink 
                                href="/contato"
                                size="md"
                                className="text-white"
                            >
                                Contato
                            </TextLink>
                        </nav>
                    </div>
                    <div className="flex flex-col md:col-span-2 lg:col-span-1">
                        <h3 className="text-white font-semibold text-lg mb-2">Contato</h3>
                        <div className="flex flex-col gap-4">
    
                            <div className="flex items-center gap-2 text-white text-sm">
                                <span className="text-primary-fg dark:text-primary">
                                    <LocationIcon />
                                </span>
                                Avenida Almirante Júlio César de Noronha, 150 Centro, Angra dos Reis - RJ CEP: 23900-000
                            </div>
                            <div className="flex items-center gap-2 text-white text-sm">
                                <span className="text-primary-fg dark:text-primary">
                                    <PhoneIcon />
                                </span>
                                (24) 3365-0019
                            </div>
                            <div className="flex items-center gap-2 text-white text-sm">
                                <span className="text-primary-fg dark:text-primary">
                                    <EnvelopeIcon />
                                </span>
                                clinicavetsaobento@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full border-b-1 border-default-accent-border my-4"></div>
                <div className="flex flex-wrap w-full justify-between gap-2">
                    <h1 className="text-white text-xs">
                        © 2026 Centro Veterinário São Bento. Todos os direitos reservados.
                    </h1>
                    <nav className="flex gap-x-4">
                        <TextLink 
                            size="sm"
                            href="#"
                            variant="default"
                            className="text-white!"
                        >
                            Políticas de Privacidade
                        </TextLink>
                        <TextLink 
                            size="sm"
                            href="#"
                            variant="default"
                            className="text-white!"
                        >
                            Termos de Uso
                        </TextLink>
                    </nav>
                </div>
            </div>
        </footer>
    );
}