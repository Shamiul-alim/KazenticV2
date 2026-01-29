"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Settings, Plus } from "lucide-react"
import { LeaveStats } from "./leave-stats"
import { PendingLeavesTable } from "./pending-leaves-table"
import { PreviousApplicationsTable } from "./previous-applications-table"
import { Button } from "@/components/sprint-report/ui/button"
import { ApplyLeaveSidebar } from "./ApplyLeaveSidebar"

export default function Leaves() {
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:gap-8">
                {/* Header Container */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6">
                        {/* Title and Action Buttons */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-gray-900">My Leaves</h1>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/leaves/manage-leaves")}
                                    className="h-9 gap-2 text-blue-600 border-blue-100 bg-white hover:bg-blue-50 px-4 rounded-xl text-sm font-semibold"
                                >
                                    Manage Leaves
                                    <Settings className="h-4 w-4" />
                                </Button>
                                <Button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="h-9 gap-2 bg-[#4157FE] text-white hover:bg-[#3249e0] px-4 rounded-xl text-sm font-semibold shadow-none"
                                >
                                    <Plus className="h-4 w-4" />
                                    Apply for leave
                                </Button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="min-w-0">
                            <LeaveStats />
                        </div>
                    </div>
                </div>

                {/* Tables Section */}
                <div className="min-w-0 flex flex-col gap-8">
                    <PendingLeavesTable />
                    <PreviousApplicationsTable />
                </div>
            </div>

            <ApplyLeaveSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    )
}
