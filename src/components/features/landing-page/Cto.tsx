import Image from "next/image";
import sao_bento_logo_full from "@/public/sao-bento-logo-full.svg"
import sao_bento_logo_full_dark from "@/public/sao-bento-logo-full-dark.svg"
import { ButtonLink } from "../../ui/ButtonLink";
import { ArrowCtoIcon } from "../../icons/outline";

export const Cto = () => {
    return (
        <section 
            className="w-full flex items-center justify-center py-16 sm:py-32 px-4 sm:px-6 bg-default dark:bg-card"
        >
            <div className="flex flex-col sm:flex-row max-w-304 w-full justify-around items-center gap-12">
                    <div className="flex max-w-64 sm:max-w-80 w-full">
                        <Image
                            src={sao_bento_logo_full}
                            alt="Logo do Centro Veterinário São Bento"
                            className="dark:hidden w-full"
                        />
                        <Image
                            src={sao_bento_logo_full_dark}
                            alt="Logo do Centro Veterinário São Bento"
                            className="hidden dark:block w-full"
                        />
                    </div>

                    <div className="flex flex-col items-center max-w-108 justify-center gap-4 text-center">
                        <h2 className="text-default-fg font-bold text-2xl md:text-3xl lg:text-4xl">
                            Dê ao seu pet o tratamento que    
                            <span className="text-brand-fg"> ele merece</span>
                        </h2>
                        <p className="text-muted-fg text-sm md:text-base max-w-2xl">
                            Cadastre-se no nosso centro e marque todo tipo de serviço com rapidez e facilidade.
                        </p>
                        <ButtonLink
                            href="/register"
                            variant="primary"
                            className="gap-2"
                            size="lg"
                        >
                            Criar conta agora
                            <ArrowCtoIcon />
                        </ButtonLink>
                    </div>
            </div>


        </section>
    );
};