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
        <main className="bg-background mx-auto w-full h-full text-xs">
            <Tabs defaultValue="join-request" className="w-full" onValueChange={(value) => setTabValue(value as "join-request" | "invited")}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t sm:border-y border-border pr-2 sm:pr-4 gap-2 sm:gap-0">
                    <TabsList className="h-12 w-full inline-flex justify-start items-end border-b sm:border-b-0 bg-transparent p-0 text-[#697588] rounded-none overflow-x-auto">
                        <TabsTrigger
                            value="join-request"
                            className="w-25 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium text-[10px] sm:text-xs whitespace-nowrap shrink-0"
                        >
                            Join Requests
                        </TabsTrigger>
                        <TabsTrigger
                            value="invited"
                            className="w-25 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium text-[10px] sm:text-xs whitespace-nowrap shrink-0"
                        >
                            Invited
                        </TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2 px-2 sm:px-0 pb-2 sm:pb-0">
                        <FilterViewToolkit viewMode={viewMode} setViewMode={setViewMode} />

                        {
                            tabValue === "invited" && (
                                <Button onClick={() => setOpenInviteDialog(true)} className="rounded-md h-7 sm:h-8 px-2 sm:px-3 text-[10px] sm:text-xs whitespace-nowrap">
                                    <span className="hidden sm:inline">Invite Members</span>
                                    <span className="sm:hidden">Invite</span>
                                    <Plus size={14} className="stroke-3 ml-1" />
                                </Button>
                            )
                        }
                    </div>
                </div>
                <TabsContent value="join-request">
                    <div className="text-[colors.text] text-sm p-2 sm:p-4">
                        {
                            viewMode === "list" ? <EmployeeActionTable /> : <EmployeeActionGrid />
                        }
                    </div>
                </TabsContent>
                <TabsContent value="invited">
                    <div className="text-[colors.text] text-sm p-2 sm:p-4">
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
