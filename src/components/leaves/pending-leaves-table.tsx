"use client"

import * as React from "react"
import { Filter, Pencil, Trash2, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/sprint-report/ui/button"
import { StatusBadge } from "@/components/sprint-report/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/sprint-report/ui/avatar"

interface LeaveRequest {
    id: string
    employeeName: string
    avatar: string
    type: string
    reason: string
    period: string
    totalDays: string
    files: string
    status: "PENDING" | "APPROVED" | "REJECTED"
}

const leaveRequests: LeaveRequest[] = Array(7).fill({
    id: "1",
    employeeName: "Pat Cummins",
    avatar: "P",
    type: "Sick Leave",
    reason: "Medical appointment and recovery period needed",
    period: "Aug 12 - Aug 14, 2025",
    totalDays: "2 Days",
    files: "2 Files",
    status: "PENDING",
})

export function PendingLeavesTable() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">Pending Leaves</h2>
                    <span className="flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-bold h-5 w-5 rounded-full">
                        7
                    </span>
                </div>
                <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-700 bg-white">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider">Employee Name</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider">Type</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider">Reason</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider">Leave from & to</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider">Total Days</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider">Files</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider text-center">Status</th>
                                <th className="px-5 py-3 font-semibold text-gray-600 uppercase text-[11px] tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leaveRequests.map((leave, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 ring-1 ring-gray-100">
                                                <AvatarFallback className="bg-blue-600 text-white text-[10px] font-bold">
                                                    {leave.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-semibold text-gray-900">{leave.employeeName}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <StatusBadge
                                            label={leave.type}
                                            variant="purple"
                                            className="font-medium px-2 py-0.5 rounded-md border-purple-100 text-[11px]"
                                            icon={<div className="h-4 w-4 rounded bg-purple-100 flex items-center justify-center"><Clock className="h-3 w-3" /></div>}
                                        />
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 max-w-[250px] truncate">{leave.reason}</td>
                                    <td className="px-5 py-3 text-gray-600">{leave.period}</td>
                                    <td className="px-5 py-3 text-gray-600 font-medium">{leave.totalDays}</td>
                                    <td className="px-5 py-3 text-gray-600 font-medium">{leave.files}</td>
                                    <td className="px-5 py-3 text-center">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-orange-100 bg-orange-50 text-orange-600 text-[11px] font-bold uppercase tracking-wide">
                                            <Clock className="h-3.5 w-3.5" />
                                            PENDING
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
