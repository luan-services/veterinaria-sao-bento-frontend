export const DangerIcon = ({ size = 20 }: { size?: number }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
        </svg>
    );
};