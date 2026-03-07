import { ButtonLink } from "../../ui/ButtonLink";
import { WhatsappIcon } from "@/src/components/icons/brand/"

export const Hero = () => {
    return (
            <section 
                id="inicio"
                className="w-full flex h-144 lg:h-168 max-w-384 items-center bg-[url('/hero.png')] dark:bg-[url('/hero-dark.png')]
                bg-no-repeat bg-bottom-right bg-size-[340px] sm:bg-size-[480px] md:bg-size-[600px] lg:bg-size-[760px] xl:bg-size-[880px]"
            >
                <div className="flex flex-col max-w-80 sm:max-w-108 lg:max-w-124 p-4 sm:ml-4 lg:ml-8 xl:ml-28">
                    <div className="bg-default/10 dark:bg-default/70 dark:xl:bg-transparent xl:bg-transparent 
                        backdrop-blur-sm xl:backdrop-blur-none p-2 rounded-md"
                    >
                        <h1 className="text-default-fg font-bold text-2xl sm:text-4xl lg:text-5xl">
                            Cuidamos do seu <span className="text-brand-fg">melhor amigo</span> com amor 
                        </h1>
                        <p className="text-muted-fg text-xs sm:text-sm lg:text-lg">
                            De check-up à dia de cuidados e mimo, nosso centro veterinário 24h é a escolha certa para o seu pet
                        </p>
                    </div>

                    <div className="flex flex-col w-fit sm:flex-row gap-y-1 gap-x-3 items-center py-2">
                        <ButtonLink 
                            href="/dashboard"
                            target="_blank"
                            className="sm:h-11! w-full"
                            variant="primary"
                            pill="true"
                        >
                            Agendar consulta agora
                        </ButtonLink>
                        <span className="text-default-fg">ou</span>
                        <ButtonLink 
                            href="https://api.whatsapp.com/send?phone=5524998423088"
                            target="_blank"
                            className="sm:h-11! w-full text-[#25D366]! border-[#25D366]! hover:bg-[#25D366]! hover:text-white! gap-1"
                            variant="outline"
                            pill="true"
                        >
                            <WhatsappIcon />
                            Contato via Whastapp
                        </ButtonLink>
                    </div>
                </div>
            </section>
    )
}