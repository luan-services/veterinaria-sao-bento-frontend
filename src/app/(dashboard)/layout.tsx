import { AuthGuard } from "@/src/components/features/auth/AuthGuard";

/* can export metadata here if want because this is a server component */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex">
            {/* might add navbars or sidebars here in the future */}
            <main className="min-h-screen w-full">
                <AuthGuard>
                    {children}
                </AuthGuard>
            </main>
        </div>
    );
}