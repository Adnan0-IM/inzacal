import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout() {


    return (
      <SidebarProvider>
        <div className="flex min-h-dvh w-full">
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    );


}
