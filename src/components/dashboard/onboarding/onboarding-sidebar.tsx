"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, FolderKanban, Settings } from "lucide-react"

export function OnboardingSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="text-lg font-semibold px-4">K</SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LayoutDashboard /> Dashboard
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <FolderKanban /> Projects
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Users /> Team
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton>
                    <Settings /> Settings
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}
