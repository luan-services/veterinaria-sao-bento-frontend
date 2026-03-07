import { Badge } from "../../ui/Badge";
import { CommentsCarousel } from "./CommentsCarousel";

const REVIEWS = [
    { id: 1, name: "Ana Silva", text: "Dr. Fernando cuidou muito bem da minha gatinha. Recomendo demais!" },
    { id: 2, name: "Carlos Souza", text: "Atendimento de emergência excelente. Salvaram meu cachorro." },
    { id: 3, name: "Mariana Luz", text: "Estrutura incrível e profissionais super atenciosos." },
];

export const Comments = () => {
    return (
        <section 
            className="w-full flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 max-w-384 bg-no-repeat bg-size-[200px] md:bg-size-[480px]
            bg-position-[right_top,left_bottom] bg-[url('/gradient.svg'),url('/gradient.svg')] dark:bg-[url('/gradient-dark.svg'),url('/gradient-dark.svg')]"
        >
            <div className="flex flex-col items-center justify-center gap-4 pb-8 text-center">
                <Badge variant="primary">
                    Comentários
                </Badge>
                <h2 className="text-default-fg font-bold text-xl sm:text-3xl lg:text-4xl">
                    Avaliações dos nossos  
                    <span className="text-brand-fg"> clientes</span>
                </h2>
                <p className="text-muted-fg text-xs sm:text-sm lg:text-base max-w-2xl">
                    Veja o que estão dizendo sobre nosso centro veterinário.
                </p>
            </div>

            <CommentsCarousel reviews={REVIEWS} />
        </section>
    );
};