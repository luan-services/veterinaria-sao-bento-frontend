export const PlayIcon = ({ size = 20 }: { size?: number }) => {
    return (
        <svg 
            viewBox="0 0 24 24" 
            width={size} height={size}
        >
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <path 
                fill="white" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
                d="M9.5 8.5v7l6.5-3.5-6.5-3.5z" 
            />
        </svg>
    );
};