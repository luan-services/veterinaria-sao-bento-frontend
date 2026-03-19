"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "@/src/lib/auth-client";
import { translateTable } from "@/src/lib/table-map";

import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Dialog } from "@/src/components/ui/Dialog";
import { Card } from "@/src/components/ui/Card";
import { Select } from "@/src/components/ui/Select";

import { SpinnerIcon } from "@/src/components/icons/SpinnerIcon";
import { toast } from "@/src/lib/toast-store";
import { XIcon } from "@/src/components/icons/outline";
import { translateError } from "@/src/lib/error-map";

interface Appointment {
    id: string;
    date: string;
    endDate: string;
    status: string;
    serviceType: string;
    petId: string;
    pet: {
        name: string;
    };
    professionalId?: string;
}

export default function AppointmentsPage() {
    const { data: session } = useSession();
    
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [petFilter, setPetFilter] = useState<string>("ALL");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
    const [isCanceling, setIsCanceling] = useState(false);

    useEffect(() => {
        loadData();
    }, [statusFilter]); 

    const loadData = async () => {
        setIsLoading(true);
        setFetchError(false);
        try {
            let appointmentsUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/me`;
            if (statusFilter !== "ALL") {
                appointmentsUrl += `?status=${statusFilter}`;
            }

            const response = await fetch(appointmentsUrl, { credentials: "include" });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || "Falha ao carregar os dados.");
            }

            const appointmentsData = await response.json();
            setAppointments(appointmentsData);

        } catch (err: unknown) { 
            setFetchError(true);
            if (err instanceof Error) { 
                toast.danger(translateError(err.message));
                return;
            }
            toast.danger("Erro desconhecido ao carregar agendamentos.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmCancel = async () => {
        if (!appointmentToCancel) return;

        setIsCanceling(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${appointmentToCancel.id}/cancel`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao cancelar agendamento.");
            }

            toast.success("Agendamento cancelado com sucesso.");
            setIsCancelDialogOpen(false);
            setAppointmentToCancel(null);
            
            loadData();

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.danger(translateError(err.message));
            } else {
                toast.danger("Erro desconhecido ao cancelar agendamento.");
            }
        } finally {
            setIsCanceling(false);
        }
    };

    const openCancelDialog = (appointment: Appointment) => {
        setAppointmentToCancel(appointment);
        setIsCancelDialogOpen(true);
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR', { 
            timeZone: 'America/Sao_Paulo',
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredAndSortedAppointments = useMemo(() => {
        return appointments
            .filter((app) => petFilter === "ALL" ? true : app.petId === petFilter)
            .sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
    }, [appointments, petFilter, sortOrder]);

    const petOptions = useMemo(() => {
        const uniquePets = new Map();
        appointments.forEach(app => {
            if (!uniquePets.has(app.petId) && app.pet) {
                uniquePets.set(app.petId, app.pet.name);
            }
        });
        
        return [
            { value: "ALL", label: "Todos os pets listados" },
            ...Array.from(uniquePets, ([value, label]) => ({ value, label }))
        ];
    }, [appointments]);

    return (
        <div className="w-full flex flex-col p-4 md:p-6">
            <div className="w-full flex justify-between items-center flex-wrap gap-y-2">
                <h1 className="text-default-fg font-bold text-xl sm:text-2xl lg:text-4xl text-center lg:text-start">
                    Meus Agendamentos
                </h1>
            </div>
            
            <p className="text-muted-fg text-xs sm:text-sm py-4 max-w-164">
                Acompanhe aqui o histórico e o status dos agendamentos dos seus pets. 
                Lembre-se que cancelamentos só podem ser feitos com 24 horas de antecedência.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full pb-6 items-start sm:items-end flex-wrap border-b-2 border-dashed border-default-border mb-6">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <label htmlFor="statusFilter" className="text-xs text-muted-fg ml-2 font-medium">Status da Consulta</label>
                    <Select 
                        id="statusFilter"
                        value={statusFilter}
                        variant="primary"
                        className="w-full sm:min-w-48"
                        selectClassName="rounded-full!"
                        onChange={(value) => setStatusFilter(value)}
                        options={[
                            { value: "ALL", label: "Todos" },
                            { value: "PENDING", label: "Pendentes" },
                            { value: "CONFIRMED", label: "Confirmados" },
                            { value: "COMPLETED", label: "Concluídos" },
                            { value: "CANCELLED", label: "Cancelados" }
                        ]}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <label htmlFor="petFilter" className="text-xs text-muted-fg ml-2 font-medium">Filtrar por Pet</label>
                    <Select 
                        id="petFilter"
                        value={petFilter}
                        variant="primary"
                        className="w-full sm:min-w-48"
                        selectClassName="rounded-full!"
                        onChange={(value) => setPetFilter(value)}
                        options={petOptions}
                        disabled={petOptions.length <= 1}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full sm:w-auto sm:ml-auto">
                    <Button 
                        variant="outline" 
                        pill="true"
                        onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                    >
                        {sortOrder === "asc" ? "Ordenar: Mais próximos" : "Ordenar: Mais distantes"}
                    </Button>
                </div>
            </div>

            {filteredAndSortedAppointments.length === 0 && (
                <div className="flex flex-col items-center justify-center p-4 min-h-88 border-2 border-dashed border-primary-border bg-card rounded-xl gap-y-4 w-full">
                    {isLoading ? (
                        <div className="flex justify-center">
                            <SpinnerIcon /> 
                        </div>
                    ) : fetchError ? (
                        <>
                            <div className="text-5xl text-muted-fg">
                                <XIcon size={40}/>
                            </div>
                            <h2 className="text-default-fg font-medium">
                                Erro ao carregar agendamentos
                            </h2>
                            <Button
                                variant="outline" 
                                pill="true"
                                onClick={loadData}
                            >
                                Tentar novamente
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className="text-5xl">
                                📅
                            </div>
                            <h2 className="text-default-fg font-medium text-center">
                                Nenhum agendamento encontrado
                            </h2>
                            <p className="text-muted-fg text-sm text-center">
                                Não encontramos consultas para os filtros selecionados.
                            </p>
                            {(statusFilter !== "ALL" || petFilter !== "ALL") && (
                                <Button
                                    variant="ghost-default" 
                                    pill="true"
                                    onClick={() => { setStatusFilter("ALL"); setPetFilter("ALL"); }}
                                >
                                    Limpar filtros
                                </Button>
                            )}
                        </>
                    )}
                </div>            
            )}
            
            {filteredAndSortedAppointments.length !== 0 && (
                <div className="flex flex-col w-full gap-4 relative">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 bg-background/50 flex justify-center items-center rounded-xl backdrop-blur-sm">
                            <SpinnerIcon />
                        </div>
                    )}
                    
                    {filteredAndSortedAppointments.map((appointment) => (
                        <Card 
                            key={appointment.id}
                            className="w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-default-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Lado Esquerdo: Detalhes */}
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-bold text-lg text-default-fg">
                                        {translateTable(appointment.serviceType)}
                                    </h3>
                                    <Badge 
                                        className={appointment.status === "CANCELLED" ? "dark:bg-red-500! bg-red-200! border-none!" : 
                                            appointment.status === "CONFIRMED" ? "dark:bg-green-500! bg-green-200! border-none!" : 
                                            appointment.status === "COMPLETED" ? "dark:bg-green-800! bg-green-300! border-none!" :
                                          appointment.status === "PENDING" ? "dark:bg-amber-500! bg-amber-200! border-none!" :
                                        ""}
                                        variant="default"
                                        size="sm" 
                                        pill="true"
                                    >
                                        {translateTable(appointment.status)}
                                    </Badge>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-fg mt-1">
                                    <span className="flex items-center">
                                        <strong className="text-default-fg font-medium mr-1">Pet:</strong> 
                                        {appointment.pet?.name || "Pet desconhecido"}
                                    </span>
                                    <span className="hidden sm:inline text-default-border">•</span>
                                    <span className="flex items-center">
                                        <strong className="text-default-fg font-medium mr-1">Data:</strong> 
                                        {formatDateTime(appointment.date)}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Lado Direito: Ações */}
                            <div className="flex justify-end sm:justify-center shrink-0 mt-2 sm:mt-0 border-t border-dashed border-default-border pt-4 sm:border-0 sm:pt-0">
                                {appointment.status === "PENDING" ? (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        pill="true"
                                        onClick={() => openCancelDialog(appointment)}
                                    >
                                        Cancelar Consulta
                                    </Button>
                                ) : (
                                    <div className="h-9" />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog
                isOpen={isCancelDialogOpen}
                onClose={() => setIsCancelDialogOpen(false)}
                size="sm"
                title="Cancelar agendamento"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-muted-fg py-4">
                        Tem certeza que deseja cancelar o agendamento de
                        {" "}
                        <span className="font-medium text-default-fg wrap-break-word">
                            {translateTable(appointmentToCancel?.serviceType || "")}
                        </span>
                        {" "}para o pet{" "}
                        <span className="font-medium text-default-fg wrap-break-word">
                            {appointmentToCancel?.pet?.name}
                        </span>
                        ? Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="ghost-default"
                            onClick={() => setIsCancelDialogOpen(false)}
                            disabled={isCanceling}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleConfirmCancel}
                            disabled={isCanceling}
                        >
                            {isCanceling ? <SpinnerIcon /> : "Sim, cancelar"}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}