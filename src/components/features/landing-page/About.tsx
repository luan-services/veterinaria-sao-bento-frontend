import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { ButtonLink } from "../../ui/ButtonLink";
import { VideoPlayer } from "./VideoPlayer";
import { RibbonIcon, CheckIcon, UsersIcon, ClockIcon } from "../../icons/outline";

export const About = () => {
    return (
        <section 
            id="sobre"
            className="w-full bg-neutral py-16 sm:py-24 px-4 sm:px-12 lg:px-16 max-w-384 bg-no-repeat bg-[url('/paws.png')]
            dark:bg-[url('/paws-dark.png')] bg-size-[640px] sm:bg-size-[800px] bg-bottom lg:bg-bottom-left"
        >
            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center lg:justify-around">

                <div className="w-full max-w-88 sm:max-w-108 flex items-center justify-center order-1 lg:order-0 border-2 
                    border-primary-border p-2 rounded-4xl"
                >
                    <VideoPlayer src="/sao_bento_vet.mp4" />
                </div>

                <div className="flex flex-col w-full max-w-160 gap-4">
                    <div className="bg-default/10 dark:bg-default/70 backdrop-blur-sm xl:backdrop-blur-none rounded-md p-4"
                    >
                        <div className="flex flex-col items-start gap-4">
                            <Badge className="self-center">
                                Sobre nós
                            </Badge>
                            <h1 className="text-default-fg font-bold text-2xl sm:text-4xl lg:text-5xl text-center lg:text-start">
                                Trabalhando com amor há mais de <span className="text-brand-fg"> 15 anos</span>
                            </h1>
                            <p className="text-muted-fg text-xs sm:text-sm lg:text-base text-center lg:text-start">
                                Temos profissionais capacitados em diversas áreas, prontos para atender seu pet com dedicação, carinho e a competência que ele merece.
                            </p>
                        </div>
                        </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="flex items-center gap-2 hover:border-brand-fg transition-colors duration-200 p-4">
                            <div className="bg-primary dark:bg-primary/20 text-primary-fg dark:text-brand-fg p-2.5 rounded-full">
                                <ClockIcon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-default-fg">Atendimento Ágil</h3>
                                <p className="text-xs text-muted-fg mt-0.5">Sem filas de espera</p>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-2 hover:border-brand-fg transition-colors duration-200 p-4">
                            <div className="bg-primary dark:bg-primary/20 text-primary-fg dark:text-brand-fg p-2.5 rounded-full">
                                <UsersIcon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-default-fg">Especialistas</h3>
                                <p className="text-xs text-muted-fg mt-0.5">Corpo clínico renomado</p>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-2 hover:border-brand-fg transition-colors duration-200 p-4">
                            <div className="bg-primary dark:bg-primary/20 text-primary-fg dark:text-brand-fg p-2.5 rounded-full">
                                <CheckIcon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-default-fg">Diagnóstico Preciso</h3>
                                <p className="text-xs text-muted-fg mt-0.5">Laboratório próprio</p>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-2 hover:border-brand-fg transition-colors duration-200 p-4">
                            <div className="bg-primary dark:bg-primary/20 text-primary-fg dark:text-brand-fg p-2.5 rounded-full">
                                <RibbonIcon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-default-fg">Reconhecimento</h3>
                                <p className="text-xs text-muted-fg mt-0.5">Qualidade garantida</p>
                            </div>
                        </Card>
                    </div>

                    <ButtonLink 
                        href="/register"
                        className="w-fit self-center mt-8" 
                        variant="primary" 
                        pill="true"
                    >
                        Cadastre-se agora
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
};