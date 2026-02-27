

import { WhatsappIcon } from "../../icons/WhatsappIcon"
import { Button } from "../../ui/Button"

export const Hero = () => {
    return (
            <section className=" w-full flex h-108 sm:h-144 lg:h-168 max-w-384 items-end sm:items-center 
                bg-[url('/hero.png')] dark:bg-[url('/herodark.png')] bg-no-repeat 
                bg-bottom-right bg-size-[340px] sm:bg-size-[480px] md:bg-size-[600px] lg:bg-size-[800px]"
            >
                <div className="flex flex-col max-w-80 sm:max-w-108 lg:max-w-124 p-4 sm:ml-4 lg:ml-8 xl:ml-20">
                    <div className="bg-default/10 dark:bg-default/70 dark:sm:bg-transparent sm:bg-transparent 
                        backdrop-blur-md sm:backdrop-blur-none p-2 rounded-md"
                    >
                        <h1 className="text-default-fg font-bold text-2xl sm:text-4xl lg:text-5xl">
                            Cuidamos do seu <span className="text-brand-fg">melhor amigo</span> com amor 
                        </h1>
                        <p className="text-muted-fg text-xs sm:text-sm lg:text-lg">
                            De check-up à dia de cuidados e mimo, nosso centro veterinário 24h é a escolha certa para o seu pet
                        </p>
                    </div>

                    <div className="flex flex-col w-fit sm:flex-row gap-y-1 gap-x-3 items-center py-2">
                        <Button 
                            className="sm:h-11! w-full"
                            variant="primary"
                            pill="true"
                        >
                            Agendar consulta agora
                        </Button>
                        <span className="text-default-fg">ou</span>
                        <Button
                            className="sm:h-11! w-full text-[#25D366]! border-[#25D366]! hover:bg-[#25D366]! hover:text-white! gap-1"
                            variant="outline"
                            pill="true"
                        >
                            <span className="text-[#25D366] dark:text-transparent">
                                <WhatsappIcon />
                            </span>
                            Contato via Whastapp
                        </Button>
                    </div>
                </div>
            </section>
    )
}