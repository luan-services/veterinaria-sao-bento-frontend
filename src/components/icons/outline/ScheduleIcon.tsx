export const ScheduleIcon = ({ size = 24 }: { size?: number }) => (
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
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <line x1="8" y1="18" x2="16" y2="18"/>
        <line x1="8" y1="14" x2="16" y2="14"/>
        <line x1="12" y1="10" x2="16" y2="10"/>
        <rect x="18" y="12" width="2" height="8" rx="1" transform="rotate(-30 19 16)"/>
    </svg>
);