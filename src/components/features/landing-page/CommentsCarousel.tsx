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
                className="flex items-center justify-center rounded-full bg-white/80 p-2 text-brand-fg cursor-pointer active:scale-95 transition"
                aria-label="Comentário Anterior"
            >
                <ArrowLeftIcon size={40}/>
            </button>

            <div className="overflow-hidden w-full max-w-124" ref={emblaRef}>
                <div className="flex items-center">
                    {reviews.map((review) => (
                        <div 
                            key={review.id} 
                            className="flex-[0_0_100%] min-w-0 h-full"
                        >
                            <div className="">
                                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                                    "{review.text}"
                                </p>
                                <p className="font-semibold text-default-fg">
                                    - {review.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={scrollNext}
                className="flex items-center justify-center rounded-full bg-white/80 p-2 text-brand-fg cursor-pointer active:scale-95 transition"
                aria-label="Próximo Comentário"
            >
                <ArrowRightIcon size={40}/>
            </button>
        </div>
    );
};