import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";

import { StethoscopeIcon, SyringeIcon, PulseIcon, HeartIcon, ScissorsIcon, ClockIcon } from "@/src/components/icons/outline/";

export const Services = () => {
    return (
        <section 
            id="servicos"
            className="w-full flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6
            bg-[url('/grid-light.svg')] dark:bg-[url('/grid-dark.svg')] bg-size-[24px]"
        >
            <div className="flex flex-col items-center justify-center gap-4 pb-8 text-center">
                <Badge variant="primary">
                    Nossas especialidades
                </Badge>
                <h1 className="text-default-fg font-bold text-xl sm:text-3xl lg:text-4xl">
                    Serviços de referência<span className="text-brand-fg"> para o seu pet</span>  
                </h1>
                <p className="text-muted-fg text-xs sm:text-sm lg:text-base max-w-2xl">
                    Oferecemos diversos serviços de saúde e cuidado para garantir o bem-estar do seu melhor amigo.
                </p>
            </div>

            <div className="w-full max-w-284">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Card size="xl" className="flex flex-col gap-2 sm:gap-4 p-4! sm:p-8! border-none shadow-sm">
                        <div className="bg-primary text-primary-fg p-2 sm:p-4 rounded-lg sm:rounded-2xl w-fit">
                            <span className="sm:hidden"><StethoscopeIcon size={18} /></span>
                            <span className="hidden sm:inline"><StethoscopeIcon size={28} /></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm sm:text-lg text-default-fg">Consultas</h3>
                            <p className="text-muted-fg text-xs sm:text-sm">
                                Atendimento clínico completo com veterinários experientes e equipamentos modernos.
                            </p>
                        </div>
                    </Card>
                    <Card size="xl" className="flex flex-col gap-2 sm:gap-4 p-4! sm:p-8! border-none shadow-sm">
                        <div className="bg-primary text-primary-fg p-2 sm:p-4 rounded-lg sm:rounded-2xl w-fit">
                            <span className="sm:hidden"><SyringeIcon size={18} /></span>
                            <span className="hidden sm:inline"><SyringeIcon size={28} /></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm sm:text-lg text-default-fg">Vacinação</h3>
                            <p className="text-muted-fg text-xs sm:text-sm">
                                Programa completo de vacinação para manter seu pet protegido e saudável.
                            </p>
                        </div>
                    </Card>
                    <Card size="xl" className="flex flex-col gap-2 sm:gap-4 p-4! sm:p-8! border-none shadow-sm">
                        <div className="bg-primary text-primary-fg p-2 sm:p-4 rounded-lg sm:rounded-2xl w-fit">
                            <span className="sm:hidden"><PulseIcon size={18} /></span>
                            <span className="hidden sm:inline"><PulseIcon size={28} /></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm sm:text-lg text-default-fg">Exames</h3>
                            <p className="text-muted-fg text-xs sm:text-sm">
                                Laboratório próprio com resultados rápidos e precisos para diagnósticos eficazes.
                            </p>
                        </div>
                    </Card>
                    <Card size="xl" className="flex flex-col gap-2 sm:gap-4 p-4! sm:p-8! border-none shadow-sm">
                        <div className="bg-primary text-primary-fg p-2 sm:p-4 rounded-lg sm:rounded-2xl w-fit">
                            <span className="sm:hidden"><HeartIcon size={18} /></span>
                            <span className="hidden sm:inline"><HeartIcon size={28} /></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm sm:text-lg text-default-fg">Cirurgias</h3>
                            <p className="text-muted-fg text-xs sm:text-sm">
                                Centro cirúrgico equipado para procedimentos de rotina e emergenciais.
                            </p>
                        </div>
                    </Card>
                    <Card size="xl" className="flex flex-col gap-2 sm:gap-4 p-4! sm:p-8! border-none shadow-sm">
                        <div className="bg-primary text-primary-fg p-2 sm:p-4 rounded-lg sm:rounded-2xl w-fit">
                            <span className="sm:hidden"><ScissorsIcon size={18} /></span>
                            <span className="hidden sm:inline"><ScissorsIcon size={28} /></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm sm:text-lg text-default-fg">Banho e Tosa</h3>
                            <p className="text-muted-fg text-xs sm:text-sm">
                                Serviço de estética e higiene com profissionais qualificados e carinhosos.
                            </p>
                        </div>
                    </Card>
                    <Card size="xl" className="flex flex-col gap-2 sm:gap-4 p-4! sm:p-8! border-none shadow-sm">
                        <div className="bg-primary text-primary-fg p-2 sm:p-4 rounded-lg sm:rounded-2xl w-fit">
                            <span className="sm:hidden"><ClockIcon size={18} /></span>
                            <span className="hidden sm:inline"><ClockIcon size={28} /></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm sm:text-lg text-default-fg">Emergências 24h</h3>
                            <p className="text-muted-fg text-xs sm:text-sm">
                                Atendimento de urgência disponível 24 horas para cuidar do seu pet.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};