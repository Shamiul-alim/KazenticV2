'use client';

import FilterViewToolkit from "@/components/employee/layout/filter-view-toolkit";
import EmployeeActionGrid from "@/components/employee/manage/employee-action-grid";
import { EmployeeActionTable } from "@/components/employee/manage/employee-action-table";
import { InviteEmployeeDialog } from "@/components/employee/manage/invite-employee-dialog";
import InviteMembersGrid from "@/components/employee/manage/invite-members-grid";
import { InviteMembersTable } from "@/components/employee/manage/invite-members-table";
import { Button } from "@/components/employee/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/employee/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

export default function ManageEmployee() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [tabValue, setTabValue] = useState<"join-request" | "invited">("join-request");
    const [openInviteDialog, setOpenInviteDialog] = useState(false);

    return (
        <main className="bg-background container mx-auto w-full h-full text-xs">
            <Tabs defaultValue="join-request" className="w-full" onValueChange={(value) => setTabValue(value as "join-request" | "invited")}>
                <div className="flex items-center justify-between border-y border-border py-3 px-4">
                    <TabsList className="w-full flex flex-row justify-start bg-transparent">
                        <TabsTrigger value="join-request">Join Requests</TabsTrigger>
                        <TabsTrigger value="invited">Invited</TabsTrigger>
                    </TabsList>
                    <FilterViewToolkit viewMode={viewMode} setViewMode={setViewMode} />

                    {
                        tabValue === "invited" && (
                            <Button onClick={() => setOpenInviteDialog(true)} className="rounded-md h-10 px-3 ml-3">
                                Invite Members
                            </Button>
                        )
                    }
                </div>
                <TabsContent value="join-request">
                    <div className="text-muted-foreground text-sm container p-4">
                        {
                            viewMode === "list" ? <EmployeeActionTable /> : <EmployeeActionGrid />
                        }
                    </div>
                </TabsContent>
                <TabsContent value="invited">
                    <div className="text-muted-foreground text-sm container p-4">
                        {
                            viewMode === "list" ? <InviteMembersTable /> : <InviteMembersGrid />
                        }
                    </div>
                </TabsContent>
            </Tabs>
            {openInviteDialog && (
                <InviteEmployeeDialog
                    open={openInviteDialog}
                    onOpenChange={setOpenInviteDialog}
                />
            )}
        </main>
    )
}
