"use client"

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRightIcon, ArrowLeftIcon } from "@/src/components/icons/solid/";

/* npm install embla-carousel-react */

interface CarouselProps {
    reviews: {
        id: number;
        name: string;
        text: string;
    }[]
}

export const CommentsCarousel = ({ reviews }: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="flex items-center justify-center w-full max-w-5xl gap-2 sm:gap-6 mt-6">
            
            <button 
                onClick={scrollPrev}
                aria-label="Ver comentário anterior"
                className="flex items-center justify-center rounded-full p-2 text-brand-fg cursor-pointer active:scale-95 transition"
            >
                <ArrowLeftIcon size={36}/>
            </button>

            <div 
                className="overflow-hidden w-full max-w-124 bg-card border-default-border border cursor-grab active:cursor-grabbing rounded-lg" 
                role="region"
                aria-roledescription="carousel"
                aria-label="Carrossel de depoimentos de clientes"
                ref={emblaRef}
                
            >
                <div className="flex items-center -ml-4 sm:-ml-6">
                    {reviews.map((review) => (
                        <div 
                            key={review.id}
                            className="flex-[0_0_100%] min-w-0 pl-4 sm:pl-6"
                        >
                            <div className="p-4 sm:p-6">
                                <p className="text-xs sm:text-sm text-default-fg italic mb-2">
                                    "{review.text}"
                                </p>
                                <p className="text-xs sm:text-sm font-medium text-muted-fg text-right">
                                - {review.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={scrollNext}
                className="flex items-center justify-center rounded-full p-2 text-brand-fg cursor-pointer active:scale-95 transition"
                aria-label="Ver próximo Comentário"
            >
                <ArrowRightIcon size={36}/>
            </button>
        </div>
    );
};