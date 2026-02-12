import ProfileGuard from "@/src/components/features/ProfileGuard"

/* can export metadata here if want because this is a server component */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full">
            {/* might add navbars or sidebars here in the future */}
            <main className="min-h-screen w-full">
                <ProfileGuard>
                    {children}
                </ProfileGuard>
            </main>
        </div>
    );
}