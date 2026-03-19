const tableTranslations: Record<string, string> = {
    // gender
    "MALE" : "Macho",
    "FEMALE" : "Fêmea",

    // species
    "DOG" : "Cachorro",
    "CAT" : "Gato",
    "BIRD" : "Pássaro",
    "RAT" : "Roedor",
    "FISH" : "Peixe",
    "CHICKEN" : "Ave (Galinha)",
    "OTHER" : "Outro",

    // appointment
    "NO_SHOW" : "FALTOU",
    "PENDING" : "PENDENTE",
    "CONFIRMED" : "CONFIRMADO",
    "COMPLETED" : "COMPLETO",
    "CANCELLED" : "CANCELADO",

    // service
    "CONSULTATION" : "CONSULTA",
    "VACCINATION" : "VACINAÇÃO",
    "EXAM" : "EXAME",
    "CHECKUP" : "CHECKUP",
    "BATH_GROOMING" : "BANHO E TOSA"
};

export const translateTable = (text: string): string => {
    return tableTranslations[text]  || text;
}