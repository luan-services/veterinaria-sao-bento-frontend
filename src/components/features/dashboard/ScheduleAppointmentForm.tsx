"use client"

import { useEffect, useState } from "react"

import { Button } from "@/src/components/ui/Button"
import { Select } from "@/src/components/ui/Select"
import { Label } from "@/src/components/ui/Label"

import { parseBrasiliaDate, isSlotInPast, getAppointmentsCountForSlot } from "@/src/lib/scheduling"
import { toast } from "@/src/lib/toast-store"
import { translateError } from "@/src/lib/error-map"

const serviceTypes = [
    { value: "CONSULTATION", label: "Consulta" },
    { value: "VACCINATION", label: "Vacina" },
    { value: "EXAM", label: "Exame" },
    { value: "CHECKUP", label: "Checkup" },
    { value: "BATH_GROOMING", label: "Banho & Tosa" }
]

export const appointmentTimeSlots = [
    "08:00","08:30","09:00","09:30",
    "10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30",
    "14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30",
]

interface Professional {
    id: string
    name: string
    specialty: string
    active?: boolean
}

export interface Appointment {
    id: string
    date: string
    endDate: string
}

interface ScheduleAppointmentFormProps {
    onClose: () => void
    selectedPetId: string
    selectedDate: Date | undefined
    appointments: Appointment[]
    professionals: Professional[]
    isLoadingSchedule: boolean
}

export const ScheduleAppointmentForm = ({ onClose, selectedPetId, selectedDate, appointments, professionals, isLoadingSchedule }: ScheduleAppointmentFormProps) => {
    
    const [selectedSlot, setSelectedSlot] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [professionalId, setProfessionalId] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* when user selects a date (when dialog opens) */
    useEffect(() => {
        setSelectedSlot("");
        setServiceType("");
        setProfessionalId("");
        setNotes("");
    }, [selectedDate]);

    const createAppointment = async () => {
        if (!selectedDate || !selectedSlot || !selectedPetId || serviceType === "") {
            toast.warning("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setIsSubmitting(true);

            const [hour, minute] = selectedSlot.split(":").map(Number);
            const dateToSend = parseBrasiliaDate(selectedDate, hour, minute);

            const payload: any = {
                date: dateToSend.toISOString(),
                petId: selectedPetId,
                serviceType,
                notes: notes || undefined,
            };

            if (professionalId) {
                payload.professionalId = professionalId;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao criar agendamento.");
            }

            toast.success("Consulta solicitada com sucesso!");
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.warning(translateError(err.message));
                return;
            }
            toast.warning("Erro desconhecido ao criar agendamento.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex gap-y-4 flex-col pt-4">
            <div className="flex gap-2">
                <div className="flex-1 min-w-0">
                    <Label className="">Serviço *</Label>
                    <Select
                        value={serviceType}
                        placeholder="Selecione o serviço..."
                        onChange={setServiceType}
                        options={serviceTypes}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <Label className="">Profissional</Label>
                    <Select
                        value={professionalId}
                        placeholder="Sem preferência"
                        onChange={setProfessionalId}
                        options={professionals.map(p => ({
                            value: p.id,
                            label: p.name,
                        }))}
                    />
                </div>
            </div>

            <div>
                <Label className="">Motivo ou Observações (Opcional)</Label>
                <textarea
                    className="w-full text-sm p-2 rounded-md resize-none bg-background text-default-fg focus:outline-none 
                        transition duration-200  border border-default-border focus:border-default-accent-border focus:shadow-ring-gray"
                    rows={3}
                    maxLength={500}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Descreva brevemente o motivo da consulta..."
                />
            </div>

            <div className="">
                <Label>
                    Horários disponíveis{" "}
                    {isLoadingSchedule && (
                        <span className="text-blue-500 text-xs">(Atualizando...)</span>
                    )}
                </Label>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1">
                    {appointmentTimeSlots.map(slot => {
                        const isPast = isSlotInPast(slot, selectedDate || null);

                        const concurrentAppointments = getAppointmentsCountForSlot(
                            slot,
                            appointments,
                            selectedDate || null
                        )
                        const isSelected = selectedSlot === slot;
                        return (
                            <Button
                                key={slot}
                                disabled={isPast || isLoadingSchedule}
                                onClick={() => setSelectedSlot(slot)}
                                variant="outline-default"
                                size="md"
                                className={isSelected ? "bg-btn-accent-default! text-btn-accent-default-fg!" : (concurrentAppointments >= 1) ? 
                                    "bg-yellow-200 border-yellow-200 hover:bg-yellow-200 text-gray-900 hover:text-gray-900" : " "}
                                title={
                                    concurrentAppointments >= 1 ? "Horário concorrido" : "Horário livre"
                                }
                            >
                                {slot}
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div className="pt-2">
                <Button
                    onClick={createAppointment}
                    disabled={!selectedSlot || isSubmitting}
                    className="w-full"
                    variant="primary"
                >
                    {isSubmitting ? "Enviando solicitação..." : "Solicitar Agendamento"}
                </Button>
            </div>
        </div>
    )
}