import { AuthGuard } from "@/src/components/features/auth/AuthGuard";
import { SidebarContainer } from "@/src/components/features/dashboard/SidebarContainer";

/* can export metadata here if want because this is a server component */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="min-h-screen w-full flex">
                <SidebarContainer/>
                <main className="min-h-screen w-full">
                        {children}
                    
                </main>
            </div>
        </AuthGuard>
    );
}