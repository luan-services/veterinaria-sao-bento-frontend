export const ScissorsIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="19" r="3" />
        <circle cx="16" cy="19" r="3" />
        <line x1="9.5" y1="16.5" x2="16" y2="4" />
        <line x1="14.5" y1="16.5" x2="8" y2="4" />
        <circle cx="12" cy="11.5" r="1" />
    </svg>
);