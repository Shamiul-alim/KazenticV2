"use client"

import { AssignRoleCard } from "@/components/access-control/layout/assign-role-card"
import PermissionsTab from "@/components/access-control/layout/permissions/permissions-tab"
import { RolesTable } from "@/components/access-control/layout/roles-table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const style = {
    tabTrigger: "active=#4157FE, inactive=#697588, border-b-[#4157FE], text-xs, h-10, font-medium",
    border: "border-[#EBEBEB]",
}

export default function AccessControl() {
    return (
        <main className="flex flex-col gap-4 h-full w-full bg-white text-xs">
            {/* Header Tabs */}
            <Tabs defaultValue="roles" className="w-full border-t border-[#EBEBEB] flex flex-col h-full">
                <TabsList className="h-10 w-full inline-flex justify-start items-end border-b bg-transparent p-0 text-xs text-[#697588] rounded-none">
                    <TabsTrigger
                        value="roles"
                        className="w-25 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium"
                    >
                        Roles
                    </TabsTrigger>
                    <TabsTrigger
                        value="permissions"
                        className="w-25 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium"
                    >
                        Permissions
                    </TabsTrigger>
                </TabsList>

                {/* Roles Tab */}
                <TabsContent value="roles" className="grow flex flex-col">
                    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 m-4">
                        <RolesTable />
                        <AssignRoleCard />
                    </div>
                </TabsContent>

                {/* Permissions Tab */}
                <TabsContent value="permissions" className="grow flex flex-col">
                    <PermissionsTab />
                </TabsContent>
            </Tabs>
        </main>
    )
}