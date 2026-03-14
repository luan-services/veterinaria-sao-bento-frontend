export const PawIcon = ({ size = 20 }: { size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <ellipse cx="5" cy="11" rx="2" ry="2.5" transform="rotate(-30 5 11)" />
        <ellipse cx="9" cy="7" rx="2" ry="2.8" transform="rotate(-10 9 7)" />
        <ellipse cx="15" cy="7" rx="2" ry="2.8" transform="rotate(10 15 7)" />
        <ellipse cx="19" cy="11" rx="2" ry="2.5" transform="rotate(30 19 11)" />
        <path d="M12 13.5c-2.5 0-4.5 1-5.5 2.5-1 1.5-1 4.5 1.5 5.5 1 .5 2.5 0 4 0s3 .5 4 0c2.5-1 2.5-4 1.5-5.5-1-1.5-3-2.5-5.5-2.5z" />
        <path d="M8.5 21.5c1.5-1 5.5-1 7 0" />
    </svg>
);