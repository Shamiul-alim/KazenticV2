"use client"

import * as React from "react"
import { X, Clock, RotateCcw, Eye, Download, Trash2, Edit, FileText } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/sprint-report/ui/dialog"
import { Button } from "@/components/sprint-report/ui/button"
import { cn } from "@/lib/utils"

interface LeaveDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    leave: {
        employeeName: string
        type: string
        reason: string
        period: string
        totalDays: string
        files: string
        status: string
    } | null
}

export function LeaveDetailsModal({ isOpen, onClose, leave }: LeaveDetailsModalProps) {
    if (!leave) return null

    // Split period into start and end dates (assuming format "Aug 12 - Aug 14, 2025")
    const periodParts = leave.period.split(" - ")
    const startDate = periodParts[0] || "Aug 10, 2025"
    const endDate = periodParts[1] || "Aug 12, 2025"

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="max-w-[500px] p-0 overflow-hidden border-none rounded-[24px]">
                <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between border-b border-gray-100/50 bg-white relative">
                    <DialogTitle className="text-[16px] font-bold text-[#1e293b]">Leave Application Details</DialogTitle>
                    <button
                        onClick={onClose}
                        className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </DialogHeader>

                <div className="p-6 space-y-4 bg-white">
                    {/* Dates */}
                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Leave From</span>
                        <span className="text-gray-500 font-semibold">{startDate}</span>
                    </div>

                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Leave To</span>
                        <span className="text-gray-500 font-semibold">{endDate}</span>
                    </div>

                    {/* Leave Type */}
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="text-[#1e293b] font-bold">Leave Type</span>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-purple-100 bg-purple-50/50 text-purple-600 text-[11px] font-bold">
                            <div className="h-4 w-4 rounded-full border border-purple-200 flex items-center justify-center">
                                <RotateCcw className="h-2.5 w-2.5" />
                            </div>
                            {leave.type}
                        </div>
                    </div>

                    {/* Total Days */}
                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Total Working Days</span>
                        <span className="text-gray-500 font-semibold">{leave.totalDays}</span>
                    </div>

                    {/* Reason */}
                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Reason</span>
                        <div className="text-right max-w-[240px]">
                            <p className="text-gray-500 font-semibold leading-normal">
                                {leave.reason}
                            </p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center text-[13px]">
                        <span className="text-[#1e293b] font-bold">Status</span>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-orange-200 bg-orange-50/50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                            <Clock className="h-3 w-3" />
                            {leave.status}
                        </div>
                    </div>

                    {/* Delegate */}
                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Delegate</span>
                        <span className="text-gray-500 font-semibold">Chris Horizon</span>
                    </div>

                    {/* Approved/Rejected By */}
                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Approved/Rejected By</span>
                        <span className="text-gray-500 font-semibold">Md. Al Amin</span>
                    </div>

                    {/* Approved/Rejected Date */}
                    <div className="flex justify-between items-start text-[13px]">
                        <span className="text-[#1e293b] font-bold">Approved/Rejected Date</span>
                        <span className="text-gray-500 font-semibold">Aug 12, 2025</span>
                    </div>

                    {/* Attachments */}
                    <div className="space-y-3 pt-4">
                        <span className="text-[#1e293b] font-bold text-[13px]">Attachments</span>
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white shadow-sm ring-1 ring-gray-100/30">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex items-center justify-center bg-orange-50 rounded-lg">
                                    <FileText className="h-6 w-6 text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-[#1e293b]">PRD</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">5 MB · PDF</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all">
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-6 pb-2">
                        <Button
                            variant="outline"
                            className="h-9 gap-2 text-red-500 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl px-5 text-xs font-bold shadow-none"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                        <Button
                            className="h-9 gap-2 bg-[#4157FE] text-white hover:bg-[#3249e0] px-6 rounded-xl text-xs font-bold shadow-none"
                        >
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
