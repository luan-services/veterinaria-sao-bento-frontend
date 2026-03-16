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

};

export const translateTable = (text: string): string => {
    return tableTranslations[text]  || text;
}