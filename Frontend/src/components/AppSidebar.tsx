import { BarChartBig,  LocateFixed } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { StarIcon } from "@radix-ui/react-icons";

// Menu items.
const items = [
  {
    title: "My Locations",
    url: "/",
    icon: LocateFixed,
  },
  {
    title: "Leader Board",
    url: "/leaderboard",
    icon: StarIcon,
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: BarChartBig,
  }
]

export default function AppSidebar() {
  const { pathname } =useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Energy App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={pathname===item.url?"bg-gray-200 hover:bg-gray-200":""} asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

