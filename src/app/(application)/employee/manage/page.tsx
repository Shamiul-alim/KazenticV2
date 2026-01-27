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
import { Plus } from "lucide-react";
import { useState } from "react";

const colors = {
    text: "#191F38"
}

export default function ManageEmployee() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [tabValue, setTabValue] = useState<"join-request" | "invited">("join-request");
    const [openInviteDialog, setOpenInviteDialog] = useState(false);

    return (
        <main className="bg-background container mx-auto w-full h-full text-xs">
            <Tabs defaultValue="join-request" className="w-full" onValueChange={(value) => setTabValue(value as "join-request" | "invited")}>
                <div className="flex items-center justify-between border-y border-border py-3 px-4">
                    <TabsList className="w-full flex flex-row justify-start bg-transparent border-0 p-0 m-0 self-items-end">
                        <TabsTrigger value="join-request" className="text-xs">Join Requests</TabsTrigger>
                        <TabsTrigger value="invited" className="text-xs">Invited</TabsTrigger>
                    </TabsList>
                    <FilterViewToolkit viewMode={viewMode} setViewMode={setViewMode} />

                    {
                        tabValue === "invited" && (
                            <Button onClick={() => setOpenInviteDialog(true)} className="rounded-md h-8 px-3 ml-3">
                                Invite Members <Plus size={4} />
                            </Button>
                        )
                    }
                </div>
                <TabsContent value="join-request">
                    <div className="text-[colors.text] text-sm container p-4">
                        {
                            viewMode === "list" ? <EmployeeActionTable /> : <EmployeeActionGrid />
                        }
                    </div>
                </TabsContent>
                <TabsContent value="invited">
                    <div className="text-[colors.text] text-sm container p-4">
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
