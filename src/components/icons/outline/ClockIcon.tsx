export const ClockIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" />
        <polyline points="12 9 12 13 15 15" />
        <path d="M5 3 2 6" />
        <path d="M19 3 22 6" />
    </svg>
);