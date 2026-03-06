"use client"

import { useRef, useState } from 'react';
import { PlayIconSolid } from '../../icons/PlayIconSolid';

interface VideoPlayerProps {
    src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative flex w-full max-h-128 sm:max-h-152 overflow-hidden rounded-4xl">
            <video 
                ref={videoRef}
                className="w-full h-full object-cover object-center cursor-pointer"
                playsInline 
                preload="auto"
                onClick={togglePlay}
            >
                <source src={src} type="video/mp4" />
                Seu navegador não suporta players de vídeo.
            </video>

            {!isPlaying && (
                <button 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors duration-200"
                    aria-label="Iniciar Video"
                >
                    <span className="cursor-pointer text-brand-fg flex items-center justify-center rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.25)] transform hover:scale-105">
                        <PlayIconSolid size={64}/>
                    </span>
                </button>
            )}
        </div>
    );
};