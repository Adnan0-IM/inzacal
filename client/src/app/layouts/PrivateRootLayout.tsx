import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";

export default function PrivateRootLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full">
        <AppSidebar />
        <SidebarInset>
          <AppTopbar title="Dashboard" />
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
