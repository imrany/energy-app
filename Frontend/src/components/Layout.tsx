import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar"

export default function Layout(){
    return(
        <SidebarProvider className="flex">
            <AppSidebar />
            <main className="flex-grow">
                <SidebarTrigger />
                <Outlet/>
            </main>
        </SidebarProvider>
    )
}
