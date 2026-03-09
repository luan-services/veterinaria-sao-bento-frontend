"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Label } from "@/src/components/ui/Label";

/* import zod and react-hook-form */
import { zodResolver } from "@hookform/resolvers/zod";
import { cpf } from "cpf-cnpj-validator";
import * as z from "zod";

/* makes a zod schema almost identical to the backend one, with a few changes */
const completeProfileSchema = z.object({
    phone: z.string()
        .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Formato de telefone inválido."),
    cpf: z.string().refine((val) => cpf.isValid(val), {
        message: "CPF inválido.",
    }),
});

/* register its type so react-hook-form useForm will be able to know which fields 'data' object has */
export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

interface CompleteProfileFormProps {
    handleUpdate: (data: CompleteProfileFormData) => Promise<void>;
}

export const CompleteProfileForm = ({handleUpdate}: CompleteProfileFormProps) => {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<CompleteProfileFormData>({
            resolver: zodResolver(completeProfileSchema), /* tells useForm() which fields are allowed to exist and update error states based on the schema rules */
            defaultValues: { /* defines the initial state of each field, controller is what actually creates the fields */
                cpf: "",
                phone: "",
            }
    });

    const onSubmit = async (data: CompleteProfileFormData) => {
            setLoading(true);
            await handleUpdate(data);
            setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="pb-2">
                <Label htmlFor="phone">Telefone</Label>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            autoComplete="tel"
                            {...field}
                            variant={errors.phone ? "danger" : "default"}
                        />
                    )}
                />
                {errors.phone && <span className="text-danger-fg text-sm">{errors.phone.message}</span>}
            </div>
            <div className="pb-2">
                <Label htmlFor="cpf">CPF</Label>
                <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            {...field}
                            variant={errors.cpf ? "danger" : "default"}
                        />
                    )}
                />
                {errors.cpf && <span className="text-danger-fg text-sm">{errors.cpf.message}</span>}
            </div>
            <Button
                className="w-full"
                type="submit"
                variant="primary"
                disabled={loading}
            >
                {loading ? "Enviando..." : "Salvar"}
            </Button>
        </form>
    );
};