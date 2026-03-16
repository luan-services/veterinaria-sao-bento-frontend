import { AuthGuard } from "@/src/components/features/auth/AuthGuard";
import { MobileDrawerContainer } from "@/src/components/features/dashboard/MobileDrawerContainer";
import { SidebarContainer } from "@/src/components/features/dashboard/SidebarContainer";
import { MobileDrawer } from "@/src/components/ui/MobileDrawer";

/* can export metadata here if want because this is a server component */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="h-screen md:h-auto md:min-h-screen w-full flex flex-col md:flex-row bg-default">
                <div className="hidden md:flex">
                    <SidebarContainer />
                </div>
                {/* pb-14 is the drawer size */}
                <main className="min-h-screen overflow-y-auto w-full flex flex-col max-w-384 pb-14 md:pb-0">
                        {children}
                </main>
                <div className="flex md:hidden">
                    <MobileDrawerContainer />
                </div>
            </div>
        </AuthGuard>
    );
}