"use client"

import * as React from "react"
import { Filter, Eye, Clock, Settings, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/sprint-report/ui/button"
import { StatusBadge } from "@/components/sprint-report/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/sprint-report/ui/avatar"
import { LeaveDetailsModal } from "./leave-details-modal"


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

const leaveRequests: LeaveRequest[] = [
    { id: "1", employeeName: "Pat Cummins", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
    { id: "2", employeeName: "Peter", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
    { id: "3", employeeName: "Alif", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
    { id: "4", employeeName: "Tonmoy", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
    { id: "5", employeeName: "Asif", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
    { id: "6", employeeName: "Hassan", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
    { id: "7", employeeName: "Keyn Watson", avatar: "P", type: "Sick Leave", reason: "Medical appointment and recovery period needed", period: "Aug 12 - Aug 14, 2025", totalDays: "2 Days", files: "2 Files", status: "PENDING" },
]

export function AllLeaves() {
    const router = useRouter()
    const [selectedLeave, setSelectedLeave] = React.useState<LeaveRequest | null>(null)
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const handleViewLeave = (leave: LeaveRequest) => {
        setSelectedLeave(leave)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:gap-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">All Employee Leaves</h1>
                        <span className="flex items-center justify-center bg-gray-100 text-gray-600 text-[10px] font-bold h-6 w-6 rounded-full">
                            7
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => router.push("/leaves/manage-leaves")}
                            className="h-8 gap-2 bg-[#4157FE] text-white hover:bg-[#3249e0] px-4 rounded-lg text-xs font-bold shadow-none"
                        >
                            Manage Leaves
                            <Settings className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" className="h-8 gap-2 text-gray-600 bg-white border-gray-200 rounded-lg px-3 text-xs font-bold">
                            <Filter className="h-3.5 w-3.5" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[1100px]">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Employee Name</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Type</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Reason</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Leave from & to</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Total Days</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Files</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 font-bold text-gray-700 text-[11px] uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {leaveRequests.map((leave, index) => (
                                    <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-7 w-7 rounded-full bg-[#4157FE] flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-white">
                                                    {leave.avatar}
                                                </div>
                                                <span className="font-bold text-gray-900 text-[13px]">{leave.employeeName}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-purple-100 bg-purple-50/50 text-purple-600 text-[11px] font-semibold">
                                                <div className="h-4 w-4 rounded-full border border-purple-200 flex items-center justify-center">
                                                    <RotateCcw className="h-2.5 w-2.5" />
                                                </div>
                                                {leave.type}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5 text-gray-600 text-[13px] max-w-[280px] truncate">{leave.reason}</td>
                                        <td className="px-4 py-2.5 text-gray-600 text-[13px]">{leave.period}</td>
                                        <td className="px-4 py-2.5 text-gray-600 text-[13px] font-medium">{leave.totalDays}</td>
                                        <td className="px-4 py-2.5 text-gray-600 text-[13px] font-medium">{leave.files}</td>
                                        <td className="px-4 py-2.5">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                                                <Clock className="h-3 w-3" />
                                                PENDING
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => handleViewLeave(leave)}
                                                    className="h-7 w-7 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-md border border-gray-100 hover:border-blue-100"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
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

            <LeaveDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                leave={selectedLeave}
            />
        </div>
    )
}
