"use client"

import * as React from "react"
import { Settings, Plus, ChevronDown, RotateCcw } from "lucide-react"
import { LeaveStats } from "../leave-stats"
import { PendingLeavesTable } from "../pending-leaves-table"
import { PreviousApplicationsTable } from "../previous-applications-table"
import { Button } from "@/components/sprint-report/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function ManageLeaves() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:gap-8">
                {/* Header Container */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6">
                        {/* Title and Action Buttons */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-gray-900">Manage Leaves</h1>
                            <div className="flex items-center gap-3">
                                {/* Employee Selector */}
                                <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src="/avatars/pat-cummins.png" />
                                        <AvatarFallback className="bg-blue-600 text-[10px] font-bold text-white">P</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-semibold text-gray-700">Pat Cummins</span>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </div>

                                {/* Configuration Button */}
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/leaves/leave-configuration")}
                                    className="h-9 gap-2 text-blue-600 border-blue-100 bg-white hover:bg-blue-50 px-4 rounded-xl text-sm font-semibold shadow-none"
                                >
                                    Configuration
                                    <Settings className="h-4 w-4" />
                                </Button>

                                {/* View All Leaves Button */}
                                <Button
                                    onClick={() => router.push("/leaves/all-leaves")}
                                    className="h-9 bg-[#4157FE] text-white hover:bg-[#3249e0] px-4 rounded-xl text-sm font-semibold shadow-none"
                                >
                                    View All Leaves
                                </Button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="min-w-0">
                            <LeaveStats />
                        </div>
                    </div>
                </div>

                <div className="min-w-0 flex flex-col gap-8">
                    <PendingLeavesTable />
                    <PreviousApplicationsTable />
                </div>
            </div>
        </div>
    )
}
