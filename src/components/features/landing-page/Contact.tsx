import Link from "next/link";

import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";

import { WhatsappIcon, InstagramIcon, FacebookIcon } from "@/src/components/icons/brand/";
import { PhoneIcon, LocationIcon, EnvelopeIcon, ClockIcon } from "@/src/components/icons/outline/";

export const Contact = () => {
    return (
        <section 
            id="contato"
            className="w-full flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 max-w-384"
        >
            <div className="flex flex-col items-center justify-center gap-4 pb-8 text-center">
                <Badge variant="primary">
                    Entre em contato
                </Badge>
                <h1 className="text-default-fg font-bold text-xl sm:text-3xl lg:text-4xl">
                    Alguma dúvida? 
                    <span className="text-brand-fg"> Fale conosco</span>
                </h1>
                <p className="text-muted-fg text-xs sm:text-sm lg:text-base max-w-2xl">
                    Atendemos você 24h por dia. Entre em contato por nosso telefone, whatsapp, e-mail ou faça uma visita.
                </p>
            </div>

            <div className="w-full max-w-6xl flex flex-col gap-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 p-0! rounded-xl! overflow-hidden h-88 md:h-auto grow">
                        <iframe 
                            src="https://maps.google.com/maps?q=Avenida%20Almirante%20J%C3%BAlio%20C%C3%A9sar%20de%20Noronha%2C%20150%20-%20Centro%2C%20Angra%20dos%20Reis%20-%20RJ%2C%2023900-000&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, borderRadius: 'var(--radius-sm)' }} 
                            allowFullScreen={false} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de Localização"
                        ></iframe>
                    </Card>
                    <div className="flex flex-col gap-6 justify-between">
                        <Card className="flex flex-row md:flex-col items-center md:items-start justify-between gap-4 shadow-xs!">
                            <div className="flex items-center gap-2">
                                <div className="bg-[#25D366] dark:bg-[#25D366]/40 text-white p-2.5 sm:p-3 rounded-full">
                                    <span className="sm:hidden"><WhatsappIcon size={20} /></span>
                                    <span className="hidden sm:inline"><WhatsappIcon size={24} /></span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">WhatsApp</span>
                                    <span className="text-muted-fg text-sm">(24) 99842-3088</span>
                                </div>
                            </div>
                            <Button 
                                size="sm" 
                                className="w-full max-w-20 sm:max-w-32 md:max-w-full bg-[#25D366]! dark:bg-[#25D366]/80! text-white!"
                            >
                                Chamar
                            </Button>
                        </Card>
                        <Card className="flex flex-row md:flex-col items-center md:items-start justify-between gap-4 shadow-xs!">
                            <div className="flex items-center gap-2">
                                <div className="bg-default text-muted-fg p-2.5 sm:p-3 rounded-full">
                                    <span className="sm:hidden"><PhoneIcon size={20} /></span>
                                    <span className="hidden sm:inline"><PhoneIcon size={24} /></span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">Telefone</span>
                                    <span className="text-muted-fg text-sm">(24) 3365-0019</span>
                                </div>
                            </div>
                            <Button 
                                size="sm" 
                                variant="default" 
                                className="w-full max-w-20 sm:max-w-32 md:max-w-full"
                            >
                                Ligar
                            </Button>
                        </Card>
                        <Card className="flex flex-row md:flex-col items-center md:items-start justify-between gap-4 shadow-xs!">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary dark:bg-primary/20 text-primary-fg dark:text-brand-fg p-2.5 sm:p-3 rounded-full">
                                    <span className="sm:hidden"><LocationIcon size={20} /></span>
                                    <span className="hidden sm:inline"><LocationIcon size={24} /></span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">Visite-nos</span>
                                    <span className="text-muted-fg text-xs">
                                        Av. Almirante Júlio César de Noronha, 150 - Centro
                                    </span>
                                </div>
                            </div>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full max-w-20 sm:max-w-32 md:max-w-full"
                            >
                                Mapa
                            </Button>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="flex items-center gap-3 sm:gap-4 shadow-xs!">
                        <div className="bg-primary text-primary-fg p-2.5 sm:p-3 rounded-full">
                            <span className="sm:hidden"><ClockIcon size={20} /></span>
                            <span className="hidden sm:inline"><ClockIcon size={24} /></span>
                            
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-semibold text-sm">Horários</span>
                            <span className="text-muted-fg text-sm">Seg - Sex: 8h às 19h.</span>
                            <span className="text-muted-fg text-xs">Plantão: Todos os dias 24h.</span>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4 shadow-xs!">
                        <div className="bg-primary text-primary-fg p-2.5 sm:p-3 rounded-full">
                            <span className="sm:hidden"><EnvelopeIcon size={20} /></span>
                            <span className="hidden sm:inline"><EnvelopeIcon size={24} /></span>
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-semibold text-sm">E-mail</span>
                            <span className="text-muted-fg text-xs truncate max-w-none sm:max-w-44 lg:max-w-60">
                                clinicavetsaobento@gmail.com
                            </span>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4 shadow-xs!">
                        <div className="bg-primary text-primary-fg p-2.5 sm:p-3 rounded-full">
                            <span className="sm:hidden"><InstagramIcon size={20} /></span>
                            <span className="hidden sm:inline"><InstagramIcon size={24} /></span>
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-semibold text-sm">Siga-nos nas redes sociais</span>
                            <div className="flex w-full gap-2 py-1.5">
                                <Link href="#" className="text-muted-fg hover:text-brand-fg transition-colors">
                                    <InstagramIcon size={20} />
                                </Link>
                                <Link href="#" className="text-muted-fg hover:text-brand-fg transition-colors">
                                    <FacebookIcon size={20} />
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};