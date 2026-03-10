import { AuthGuard } from "@/src/components/features/auth/AuthGuard";
import { Sidebar } from "@/src/components/Sidebar";

/* can export metadata here if want because this is a server component */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="min-h-screen w-full flex">
                
                {/* might add navbars or sidebars here in the future */}
                <Sidebar />
                <main className="min-h-screen w-full">
                        {children}
                    
                </main>
            </div>
        </AuthGuard>
    );
}