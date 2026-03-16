"use client";

import React from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns"

import { Select } from "../../ui/Select";
import { DatePicker } from "../../ui/DatePicker";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Label } from "@/src/components/ui/Label";

import { toast } from "@/src/lib/toastStore";

/* birthDate is now a Date object because of our custom DatePicker, that means it will convert the date to our timezone,
in this case, we will need to strip the timezone before sending it to the backend. 

the same way we need to strip the timezone UTC-0 from the backend string we get before displaying to the user here (if we
want to include pet's birthday on its data showing) 

when sending to backend -> gets date with utc -3 for example, strips utc -3, backends saves as date utc-0
when getting from backend -> gets date with utc 0, strips utc 0, frontend MUST show as date utc -3 without actually 
converting */

const createPetSchema = z.object({
    name: z.string()
        .min(1, "O nome do pet é obrigatório.")
        .max(60, "O nome deve ter no máximo 60 caracteres."),
    species: z.enum(["DOG", "CAT", "RAT", "FISH", "BIRD", "CHICKEN", "OTHER"]),
    gender: z.enum(["MALE", "FEMALE"]),
    breed: z.string()
        .max(60, "A raça deve ter no máximo 60 caracteres.")
        .optional(),
    birthDate: z.date().optional(), 
});

type CreatePetFormData = z.infer<typeof createPetSchema>;

interface CreatePetFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const speciesOptions = [
    { value: "DOG", label: "Cachorro" },
    { value: "CAT", label: "Gato" },
    { value: "BIRD", label: "Pássaro" },
    { value: "RAT", label: "Roedor" },
    { value: "FISH", label: "Peixe" },
    { value: "CHICKEN", label: "Ave (Galinha)" },
    { value: "OTHER", label: "Outro" },
];

const genderOptions = [
    { value: "MALE", label: "Macho" },
    { value: "FEMALE", label: "Fêmea" },
];


export const CreatePetForm = ({ onSuccess, onCancel }: CreatePetFormProps) => {
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePetFormData>({
        resolver: zodResolver(createPetSchema),
        defaultValues: {
            name: "",
            species: undefined,
            gender: undefined,
            breed: "",
            birthDate: undefined, 
        },
    });

    const handleCreatePet = async (data: CreatePetFormData) => {
        try {
            
            const payload = { 
                ...data,
                /* since our datepicker returns a date object now, we must strip the timezone out of it before sending 
                to the backend to correctly set the date */
                birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : undefined,
            };  

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Erro ao criar pet");
            }

            toast.success("Pet cadastrado com sucesso!");
            onSuccess();
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.danger(err.message);
                return;
            }
            toast.danger("Ocorreu um erro inesperado.");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreatePet)} className="flex flex-col gap-4 pt-4">
            <div>
                <Label htmlFor="name">Nome do pet</Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="name"
                            placeholder="Ex: Rex"
                            {...field}
                            variant={errors.name ? "danger" : "default"}
                        />
                    )}
                />
                {errors.name && <span className="text-danger-fg text-sm">{errors.name.message}</span>}
            </div>

            <div>
                <Label htmlFor="species">Espécie</Label>
                <Controller
                    name="species"
                    control={control}
                    render={({ field: { value, onChange, name, onBlur } }) => (
                        <Select
                            id="species"
                            name={name}
                            placeholder="Selecione a espécie..."
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            options={speciesOptions}
                            variant={errors.species ? "danger" : "default"}
                        />
                    )}
                />
                {errors.species && <span className="text-danger-fg text-sm">{errors.species.message}</span>}
            </div>

            <div>
                <Label htmlFor="gender">Gênero</Label>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field: { value, onChange, name, onBlur } }) => (
                        <Select
                            id="gender"
                            name={name}
                            placeholder="Selecione o gênero..."
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            options={genderOptions}
                            variant={errors.species ? "danger" : "default"}
                        />
                    )}
                />
                {errors.gender && <span className="text-danger-fg text-sm">{errors.gender.message}</span>}
            </div>
                    
            <div>
                <Label htmlFor="breed">Raça (Opcional)</Label>
                <Controller
                    name="breed"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="breed"
                            placeholder="Ex: Labrador"
                            {...field}
                            variant={errors.breed ? "danger" : "default"}
                        />
                    )}
                />
                {errors.breed && <span className="text-danger-fg text-sm">{errors.breed.message}</span>}
            </div>

            <div>
                <Label htmlFor="birthDate">Data de Nascimento (Opcional)</Label>
                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            value={value}
                            disabledBefore={new Date("2000-01-01")}
                            onChange={onChange}
                            placeholder="Selecione uma data..."
                            variant={errors.birthDate ? "danger" : "default"}
                        />
                    )}
                />
                {errors.birthDate && <span className="text-danger-fg text-sm">{errors.birthDate.message}</span>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Salvando..." : "Salvar Pet"}
                </Button>
            </div>
        </form>
    );
};