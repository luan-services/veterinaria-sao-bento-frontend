
import Link from "next/link";

import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";

import { WhatsappIcon } from "../../icons/WhatsappIcon";
import { PhoneIconSolid } from "../../icons/PhoneIconSolid";
import { LocationPinIconSolid } from "../../icons/LocationIconSolid";
import { EnvelopeIconSolid } from "../../icons/EnvelopeIconSolid";
import { ClockIcon } from "../../icons/ClockIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { FacebookIcon } from "../../icons/FacebookIcon";

export const Contact = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6 max-w-384">
            <div className="flex flex-col items-center justify-center gap-4 pb-8 text-center">
                <Badge variant="primary">
                    Entre em contato
                </Badge>
                <h1 className="text-default-fg font-bold text-xl sm:text-3xl lg:text-4xl">
                    Alguma dúvida? 
                    <span className="text-brand-fg"> Fale conosco</span>
                </h1>
                <p className="text-muted-fg text-sm lg:text-base max-w-2xl">
                    Atendemos você 24h por dia. Entre em contato por nosso telefone, whatsapp, e-mail ou faça uma visita.
                </p>
            </div>

            <div className="w-full max-w-6xl flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card size="xl" className="flex flex-col items-center text-center gap-4 bg-success-fg! text-white
                        border-none! hover:opacity-98 transition-colors"
                    >
                        <div className="bg-white/10 p-4 rounded-full text-success-fg!">
                            <WhatsappIcon size={32} />
                        </div>
                        <div className="flex flex-col grow">
                            <h3 className="font-semibold text-xl">WhatsApp</h3>
                            <p className=" text-sm">Envie-nos uma mensagem no WhatsApp.</p>
                            <span className="font-semibold text-lg">(24) 99842-3088</span>
                        </div>
                        <Button className="w-full bg-white! text-success-fg!">
                            Chamar no WhatsApp
                        </Button>
                    </Card>

                    <Card size="xl" className="flex flex-col items-center text-center gap-4 bg-btn-primary! text-white
                        border-none! hover:opacity-98 transition-colors"
                    >
                        <div className="bg-white/10 p-4 rounded-full">
                            <PhoneIconSolid size={32} />
                        </div>
                        <div className="flex flex-col grow">
                            <h3 className="font-semibold text-xl">Ligar agora</h3>
                            <p className="text-sm">Ou, se preferir, fale por ligação.</p>
                            <span className="font-semibold text-lg">(24) 3365-0019</span>
                        </div>
                        <Button className="w-full bg-white! text-brand-fg!">
                            Ligar Agora
                        </Button>
                    </Card>

                    <Card size="xl" className="flex flex-col items-center text-center gap-4 bg-muted-fg! text-white
                        border-none! hover:opacity-98 transition-colors"
                    >
                        <div className="bg-white/10 p-4 rounded-full">
                            <LocationPinIconSolid size={32} />
                        </div>
                        <div className="flex flex-col grow">
                            <h3 className="font-semibold text-xl">Visite-nos</h3>
                            <div className="text-sm mt-2 flex flex-col">
                                Avenida Almirante Júlio César de Noronha, 150 - Centro, Angra dos Reis, Rio de Janeiro, Brazil 
                                23900-000.
                            </div>
                        </div>
                        <Button className="w-full mt-2 bg-white! text-muted-fg!">
                            Ver no Maps
                        </Button>
                    </Card>
                </div>

                <Card size="sm" className="w-full p-0! rounded-xl! overflow-hidden h-80 sm:h-112">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="flex items-center gap-4">
                        <div className="bg-btn-primary text-btn-primary-fg p-3 rounded-full">
                            <ClockIcon size={24} />
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-bold text-sm">Horários</span>
                            <span className="text-muted-fg text-sm">Seg - Sex: 8h às 19h.</span>
                            <span className="text-muted-fg text-xs">Plantão: Todos os dias 24h.</span>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-btn-primary text-btn-primary-fg p-3 rounded-full">
                            <EnvelopeIconSolid size={24} />
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-bold text-sm">E-mail</span>
                            <span className="text-muted-fg text-xs truncate max-w-none sm:max-w-44 lg:max-w-60">
                                clinicavetsaobento@gmail.com
                            </span>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-btn-primary text-btn-primary-fg p-3 rounded-full">
                            <InstagramIcon size={24} /> 
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-bold text-sm">Siga-nos nas redes sociais</span>
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