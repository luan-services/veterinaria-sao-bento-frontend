"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/src/lib/auth-client";
import { translateTable } from "@/src/lib/tableMap";

import Image from "next/image";
import pet_avatar_placeholder from "@/public/pet-avatar-placeholder.webp"

import { Button } from "@/src/components/ui/Button";
import { TextButton } from "@/src/components/ui/TextButton";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { Badge } from "@/src/components/ui/Badge";
import { Dialog } from "@/src/components/ui/Dialog";
import { CreatePetForm } from "@/src/components/features/dashboard/CreatePetForm";

import { SpinnerIcon } from "@/src/components/icons/SpinnerIcon";
import { toast } from "@/src/lib/toastStore";
import { XIcon } from "@/src/components/icons/outline";
import { translateError } from "@/src/lib/errorMap";
import { Card } from "@/src/components/ui/Card";

interface Pet {
    id: string;
    name: string;
    species: string;
    gender: string;
    breed?: string;
    age?: number;
}

export default function DashboardPage() {

    const { data: session, error } = useSession();
    
    const [pets, setPets] = useState<Pet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState<Pet | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchPets();
    }, []);

    
    const fetchPets = async () => {
        setIsLoading(true);
        setFetchError(false);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/me`, {
                credentials: "include",
            });
            if (!response.ok) { /* manually throws backend error */
                const data = await response.json();
                throw new Error(data.message || "Erro desconhecido ao carregar pets.");
            }
            const data = await response.json();
            setPets(data);
        } catch (err: unknown) { 
            /* this is the standart way to handle errors on the catch block, we should prevent crash if a non-error is thrown */
            if (err instanceof Error) { 
                setFetchError(true);
                toast.warning(translateError(err.message));
                return;
            }
            setFetchError(true);
            toast.warning("Erro desconhecido ao carregar pets.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!petToDelete) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/pets/${petToDelete.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao deletar pet.");
            }

            setPets((prev) => prev.filter((pet) => pet.id !== petToDelete.id));

            toast.success("Pet removido com sucesso.");
            setIsDeleteDialogOpen(false);
            setPetToDelete(null);

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.warning(translateError(err.message));
            } else {
                toast.warning("Erro desconhecido ao deletar pet.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePetCreated = () => {
        setIsDialogOpen(false);
        fetchPets();
    };

    const openDeleteDialog = (pet: Pet) => {
        setPetToDelete(pet);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="w-full flex flex-col p-4 md:p-6 ">
            <div className="w-full flex justify-between items-center flex-wrap gap-y-2">
                <h1 className="text-default-fg font-bold text-xl sm:text-2xl lg:text-4xl text-center lg:text-start">
                    Bem-vindo, {session?.user.name}!
                </h1>
                <Button 
                    variant="primary" 
                    size="sm"
                    pill="true"
                    onClick={() => setIsDialogOpen(true)}
                >
                    + Cadastrar novo pet
                </Button>
            </div>
            
            <p className="text-muted-fg text-xs sm:text-sm py-4 max-w-164">
                Esta é sua área do cliente. Aqui você pode ver detalhes sobre seus pets cadastrados, criar novos pets e agendar
                consultas para eles. No momento você 
                {pets.length > 0 ? ` tem ${pets.length} pet${pets.length === 1 ? "" : "s"}.` : " ainda não tem pets cadastrados."}
            </p>


            {pets.length === 0 &&
                <div className="flex flex-col items-center justify-center p-4 min-h-88 border-2 border-dashed border-primary-border 
                    bg-card rounded-xl gap-y-4">
                    {isLoading ? 
                        <div className="flex justify-center">
                            <SpinnerIcon /> 
                        </div>
                        : 
                        fetchError ? 
                            <>
                                <div className="text-5xl text-muted-fg">
                                    <XIcon size={40}/>
                                </div>
                                <h2 className="text-default-fg font-medium">
                                    Erro ao carregar pets
                                </h2>
                                <Button
                                    variant="outline" 
                                    pill="true"
                                    onClick={fetchPets}
                                >
                                    Tentar novamente
                                </Button>
                            </>
                            :
                            <>
                                <div className="text-5xl">
                                    🐶
                                </div>
                                <h2 className="text-default-fg font-medium">
                                    Nenhum pet cadastrado
                                </h2>
                                <Button
                                    variant="outline" 
                                    pill="true"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Cadastrar meu primeiro pet
                                </Button>
                            </>
                    }
                </div>            
            }
            
            {/* must update the pet display here */}
            {pets.length !== 0 && 
                <div className="border-2 border-dashed border-default-border rounded-xl h-full">
                    <div className="flex w-full max-w-184 flex-wrap justify-self-center justify-center p-4 gap-4">
                        {pets.map((pet) => (
                            <Card 
                                key={pet.id}
                                className="max-w-56!"
                                size="lg"
                            >

                                <Image 
                                    className="max-w-20 justify-self-center rounded-full"
                                    src={pet_avatar_placeholder}
                                    alt="Foto de perfil do pet"
                                />
                                    

                                <div className="flex flex-col gap-1 py-2">
                                    <Badge 
                                        className="w-fit self-end"
                                        variant="primary" 
                                        size="sm" 
                                        pill="true"
                                    >
                                        {translateTable(pet.species)}
                                    </Badge>
                                    <h3 className="font-medium text-lg text-default-fg truncate">{pet.name}</h3>
                                </div>

                                <p className="text-sm text-muted-fg flex truncate">
                                    Raça: {pet.breed ? pet.breed : "Não informado."}
                                </p>
                                <p className="text-sm text-muted-fg text-end flex">
                                    Genero: {translateTable(pet.gender)}
                                </p>
                                
                                <div className="flex flex-col pt-8 pb-2">
                                    <ButtonLink
                                        variant="primary"
                                        size="sm"
                                        href={`/dashboard/schedule?petId=${pet.id}`}
                                    >
                                        Agendar consulta
                                    </ButtonLink>
                                </div>

                                <div className="flex justify-center">
                                    <TextButton
                                        className="w-fit!"
                                        variant="danger"
                                        size="sm"
                                        onClick={() => openDeleteDialog(pet)}
                                    >
                                        Remover
                                    </TextButton>
                                </div>


                            </Card>
                        ))}
                    </div> 
                </div>
            }

            <Dialog
                className="text-sm! sm:text-base!"
                isOpen={isDialogOpen}
                size="md"
                onClose={() => setIsDialogOpen(false)}
                title="Cadastrar novo pet"
            >
                <CreatePetForm 
                    onSuccess={handlePetCreated} 
                    onCancel={() => setIsDialogOpen(false)} 
                />
            </Dialog>   

            <Dialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                size="sm"
                title="Remover pet"
            >
                <div className="flex flex-col gap-4">

                    <p className="text-muted-fg py-4">
                        Tem certeza que deseja remover
                        {" "}
                        <span className="font-medium text-default-fg wrap-break-word">
                            {petToDelete?.name}
                        </span>
                        ?
                    </p>
                    <div className="flex justify-end gap-2">

                        <Button
                            variant="ghost-default"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="danger"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? <SpinnerIcon /> : "Remover"}
                        </Button>

                    </div>

                </div>
            </Dialog>
        </div>
    );
}
