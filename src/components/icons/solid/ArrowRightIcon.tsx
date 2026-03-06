export const ArrowRightIcon = ({ size = 20 }: { size?: number }) => {
    return (
        <svg 
            viewBox="0 0 24 24" 
            width={size} height={size}
        >
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <path 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round" 
                d="M10.5 7.5l4.5 4.5-4.5 4.5" 
            />
        </svg>
    );
};