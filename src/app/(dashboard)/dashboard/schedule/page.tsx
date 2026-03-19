"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { DatePicker } from "@/src/components/ui/DatePicker"
import { Label } from "@/src/components/ui/Label"
import { Select } from "@/src/components/ui/Select"
import { ScheduleAppointmentForm } from "@/src/components/features/dashboard/ScheduleAppointmentForm"

import { SpinnerIcon } from "@/src/components/icons/SpinnerIcon"

import { parseBrasiliaDate, getTodayInBrasilia } from "@/src/lib/scheduling"
import { toast } from "@/src/lib/toast-store"
import { translateError } from "@/src/lib/error-map"
import { Dialog } from "@/src/components/ui/Dialog"

interface Pet {
    id: string;
    name: string;
    species: string;
    gender: string;
    breed: string;
}

interface Professional {
    id: string;
    name: string;
    specialty: string;
    active?: boolean;
}

interface Appointment {
    id: string
    date: string
    endDate: string
}

/* main component */

const ScheduleContent = () => {
    const searchParams = useSearchParams();
    const petIdParam = searchParams.get("petId") || "";
    
    /* first of all load user's pets and clinic professionals */
    const [pets, setPets] = useState<Pet[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const activeProfessionals = professionals.filter(p => p.active !== false);

    /* after that, set pet id if it came from params, and asks user for petId and selectedDate */
    const [selectedPetId, setSelectedPetId] = useState(petIdParam);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    /* load all apointments whenever a date (day) is selected */
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    /* loading states */
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

    /* state to confirm if pet select dialog is open */
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const datePickerTodayDate = getTodayInBrasilia();

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            loadSchedule(selectedDate);
        }
    }, [selectedDate]);

    const loadInitialData = async () => {
        try {
            setIsLoading(true);

            const [petsResponse, professionalsResponse] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/me`, { credentials: "include" }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals`, { credentials: "include" })
            ])

            if (!petsResponse.ok || !professionalsResponse.ok) {
                const [petsData, professionalsData] = await Promise.all([
                    petsResponse.json(),
                    professionalsResponse.json()
                ])
                const message = !petsResponse.ok ? petsData.message : professionalsData.message;
                throw new Error(message || "Falha ao carregar os dados iniciais.");
            }
            
            const [petsData, professionalsData] = await Promise.all([
                petsResponse.json(),
                professionalsResponse.json()
            ])

            setPets(petsData);
            setProfessionals(professionalsData);

        } catch (err: unknown) { 
            if (err instanceof Error) {
                toast.warning(translateError(err.message));
                return;
            }
            toast.warning("Erro desconhecido ao carregar dados da página.");
        } finally {
            setIsLoading(false);
        }
    }

    const loadSchedule = async (dateObj: Date) => {
        try {
            setIsLoadingSchedule(true);
            
            const start = parseBrasiliaDate(dateObj, 0, 0);
            const end = parseBrasiliaDate(dateObj, 23, 59);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/schedule?startDate=${start.toISOString()}&endDate=${end.toISOString()}`, 
                { 
                    credentials: "include" 
                }
            );

            if (!response.ok) { /* manually throws backend error */
                const data = await response.json();
                throw new Error(data.message || "Erro desconhecido ao carregar pets.");
            }
            const data = await response.json();
            setAppointments(data);
        } catch (err: unknown) { 
            if (err instanceof Error) { 
                toast.warning(translateError(err.message));
                return;
            }
            toast.warning("Erro desconhecido ao carregar agenda.");
        } finally {
            setIsLoadingSchedule(false);
        }
    }

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center">
                <SpinnerIcon />
            </div>
        );
    }

    return (
        <>
            <div className="w-full flex flex-col p-4 md:p-6">
                <div className="w-full flex justify-between items-center flex-wrap gap-y-2">
                    <h1 className="text-default-fg font-bold text-xl sm:text-2xl lg:text-4xl text-center lg:text-start">
                        Agendar consulta
                    </h1>
                </div>

                <p className="text-muted-fg text-xs sm:text-sm pt-4 pb-2 max-w-164">
                    Nesta página você pode fazer pedidos de agendamento de consultas para seu pet. Ao realizar um pedido, ele ficará pendente. 
                
                </p>
                <p className="text-muted-fg text-xs sm:text-sm pb-2 max-w-164">
                    Entraremos em contato por telefone para confirmar o agendamento e modificar algum dado (horário, profissional, etc) caso necesário. Os horários da clínica estão sempre no horário de brasília GMT -3.
                </p>

                <div className="flex w-full items-start pb-4">
                    <div className="flex flex-col items-center sm:flex-row gap-4 max-w-164 w-full">
                        <Select 
                            id="pet"
                            placeholder="Selecione um pet..."
                            value={selectedPetId}
                            variant="primary"
                            className="max-w-64 w-full"
                            selectClassName="rounded-full!"
                            onChange={(id) => {setSelectedPetId(id); setIsDialogOpen(false)}}
                            options={
                                pets.map(p => (
                                    {value: p.id, label: p.name}
                                ))  
                            }
                        />
                        {!selectedPetId && 
                            <p className="text-default-fg font-medium text-xs sm:text-sm">
                                Você ainda não selecionou nenhum pet, selecione-o para solicitar o atendimento.
                            </p>
                        }
                    </div>
                </div>

                {selectedPetId &&
                    <div className="flex w-full items-center p-4 border-2 border-dashed border-default-border rounded-xl grow justify-center">
                            <div className="flex flex-col max-w-64 justify-center gap-x-1 w-full">
                                <Label 
                                    htmlFor="date"
                                    className="text-center pb-2"
                                >
                                    Selecione uma data:
                                </Label>
                                <DatePicker
                                    className="w-full"
                                    id="date"
                                    value={selectedDate}
                                    placeholder="01/01/2000"
                                    disabledBefore={datePickerTodayDate} 
                                    onChange={(date: Date | undefined) => {
                                        setSelectedDate(date);
                                        setIsDialogOpen(true);
                                    }}
                                />
                            </div>
                    </div>
                }
                <Dialog 
                    size="lg"
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    title="Concluir agendamento"
                >
                    <ScheduleAppointmentForm
                        onClose={() => setIsDialogOpen(false)}
                        selectedPetId={selectedPetId}
                        selectedDate={selectedDate}
                        appointments={appointments}
                        professionals={activeProfessionals}
                        isLoadingSchedule={isLoadingSchedule}
                    />
                </Dialog>
            </div>   
        </>
    )
}

export default function SchedulePage() {
  return (
    <Suspense 
        fallback={
            <div className="w-full flex justify-center items-center">
                <SpinnerIcon />
            </div>
        }
    >
        <ScheduleContent />
    </Suspense>
  )
}
