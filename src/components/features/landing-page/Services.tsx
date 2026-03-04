import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { StethoscopeIcon } from "../../icons/StethoscopeIcon";
import { SyringeIcon } from "../../icons/SyringeIcon";
import { PulseIcon } from "../../icons/PulseIcon";
import { HeartIcon } from "../../icons/HeartIcon";
import { ScissorsIcon } from "../../icons/ScissorsIcon";
import { ClockIcon } from "../../icons/ClockIcon";

export const Services = () => {
    return (
        <section 
            className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6
            bg-[url('/grid-light.svg')] dark:bg-[url('/grid-dark.svg')] bg-size-[24px]"
        >
            <div className="flex flex-col items-center justify-center gap-4 pb-8 text-center">
                <Badge variant="primary">
                    Nossas especialidades
                </Badge>
                <h1 className="text-default-fg font-bold text-xl sm:text-3xl lg:text-4xl">
                    Serviços <span className="text-brand-fg"> de referência</span> para o seu pet 
                </h1>
                <p className="text-muted-fg text-sm lg:text-base max-w-2xl">
                    Oferecemos diversos serviços de saúde e cuidado para garantir o bem-estar do seu melhor amigo.
                </p>
            </div>

            <div className="w-full max-w-6xl z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card size="xl" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-[#eff6ff] text-[#3b82f6] p-4 rounded-2xl w-fit">
                            <StethoscopeIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-default-fg mb-2">Consultas</h3>
                            <p className="text-muted-fg text-sm leading-relaxed">
                                Atendimento clínico completo com veterinários experientes e equipamentos modernos.
                            </p>
                        </div>
                    </Card>

                    <Card size="xl" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-[#f0fdf4] text-[#22c55e] p-4 rounded-2xl w-fit">
                            <SyringeIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-default-fg mb-2">Vacinação</h3>
                            <p className="text-muted-fg text-sm leading-relaxed">
                                Programa completo de vacinação para manter seu pet protegido e saudável.
                            </p>
                        </div>
                    </Card>

                    <Card size="xl" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-[#faf5ff] text-[#a855f7] p-4 rounded-2xl w-fit">
                            <PulseIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-default-fg mb-2">Exames</h3>
                            <p className="text-muted-fg text-sm leading-relaxed">
                                Laboratório próprio com resultados rápidos e precisos para diagnósticos eficazes.
                            </p>
                        </div>
                    </Card>

                    <Card size="xl" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-[#fff1f2] text-[#f43f5e] p-4 rounded-2xl w-fit">
                            <HeartIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-default-fg mb-2">Cirurgias</h3>
                            <p className="text-muted-fg text-sm leading-relaxed">
                                Centro cirúrgico equipado para procedimentos de rotina e emergenciais.
                            </p>
                        </div>
                    </Card>

                    <Card size="xl" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-[#fdf4ff] text-[#d946ef] p-4 rounded-2xl w-fit">
                            <ScissorsIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-default-fg mb-2">Banho e Tosa</h3>
                            <p className="text-muted-fg text-sm leading-relaxed">
                                Serviço de estética e higiene com profissionais qualificados e carinhosos.
                            </p>
                        </div>
                    </Card>

                    <Card size="xl" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-[#fff7ed] text-[#f97316] p-4 rounded-2xl w-fit">
                            <ClockIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-default-fg mb-2">Emergências 24h</h3>
                            <p className="text-muted-fg text-sm leading-relaxed">
                                Atendimento de urgência disponível 24 horas para cuidar do seu pet.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};