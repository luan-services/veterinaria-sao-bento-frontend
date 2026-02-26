

import { Button } from "../../ui/Button"
/* dark:bg-[url('/herodarkd.png')] */
export const Hero = () => {
    return (
            <section className="w-full flex h-168 container items-center  bg-[url('/hero.png')] bg-no-repeat bg-bottom-right bg-size-[80%] sm:bg-size-[70%] md:bg-size-[75%] lg:bg-size-[50%]">
                <Button variant="outline">sad</Button>
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-0">
                    
                    <div className="z-10 flex flex-col gap-6 max-w-xl p-4 lg:p-0 rounded-2xl lg:backdrop-blur-none">
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-default-fg leading-[1.1] tracking-tight">
                            O Melhor Cuidado <br />
                            <span className="text-brand-fg">Para Seu Pet</span> 
                        </h1>
                        
                        <p className="text-muted-fg text-lg md:text-xl leading-relaxed">
                            Seja para uma viagem, uma emergência ou apenas um dia de cuidados extras, nosso centro veterinário 24h é a escolha certa para o seu melhor amigo.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <Button 
                                className="px-8 py-6 text-lg rounded-full" 
                                type="button" 
                                variant="primary"
                            >
                                Agendar Consulta
                            </Button>
                            <Button 
                                className="px-8 py-6 text-lg rounded-full font-semibold" 
                                type="button" 
                                variant="ghost"
                            >
                                Saiba mais
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
    )
}