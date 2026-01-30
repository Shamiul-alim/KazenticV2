"use client"

import { X, Calendar, DollarSign, CheckCircle } from "lucide-react"
import { ApprovalItem } from "@/data/payroll-data"
import { Button } from "@/components/sprint-report/ui/button"

interface PayslipReviewModalProps {
    item: ApprovalItem
    isOpen: boolean
    onClose: () => void
    onApprove: () => void
    onReject: () => void
}

const PriorityBadge = ({ priority }: { priority: string }) => {
    if (priority === "High") {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded border bg-red-50 text-red-600 border-red-100 text-xs font-medium">
                HIGH
            </span>
        )
    }
    return (
        <span className="inline-flex items-center px-2.5 py-1 rounded border bg-orange-50 text-orange-600 border-orange-100 text-xs font-medium">
            MEDIUM
        </span>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    let classes = ""
    switch (status) {
        case "HR Review":
            classes = "bg-blue-50 text-blue-600 border-blue-100"
            break
        case "Finance Review":
            classes = "bg-purple-50 text-purple-600 border-purple-100"
            break
        case "Direct Approval":
            classes = "bg-orange-50 text-orange-600 border-orange-100"
            break
        default:
            classes = "bg-gray-100 text-gray-700"
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded border ${classes} text-xs font-medium`}>
            {status}
        </span>
    )
}

export function PayslipReviewModal({ item, isOpen, onClose, onApprove, onReject }: PayslipReviewModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Payslip Review - {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Employee Info */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                                {item.avatar}
                            </div>
                            <div>
                                <h3 className="font-semibold text-base text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.designation}</p>
                            </div>
                        </div>
                        <PriorityBadge priority={item.priority} />
                    </div>

                    {/* Pay Period & Net Pay */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50/50">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">Pay Period</p>
                                <p className="text-sm font-semibold text-gray-900">{item.payPeriod}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50/50">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <DollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">Net Pay</p>
                                <p className="text-sm font-semibold text-gray-900">{item.netPay}</p>
                            </div>
                        </div>
                    </div>

                    {/* Salary Breakdown */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Salary Breakdown</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Basic Salary</span>
                                <span className="text-sm font-medium text-gray-900">{item.salaryBreakdown.basicSalary}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Allowances</span>
                                <span className="text-sm font-medium text-emerald-600">{item.salaryBreakdown.allowances}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Overtime</span>
                                <span className="text-sm font-medium text-emerald-600">{item.salaryBreakdown.overtime}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Deductions</span>
                                <span className="text-sm font-medium text-red-600">{item.salaryBreakdown.deductions}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm font-semibold text-gray-900">Net Pay</span>
                                <span className="text-sm font-bold text-gray-900">{item.salaryBreakdown.netPay}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submission Details */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Submission Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Submitted By</span>
                                <span className="text-sm font-medium text-gray-900">{item.submittedBy}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Submitted Date</span>
                                <span className="text-sm font-medium text-gray-900">Aug 12, 2025</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Current Stage</span>
                                <StatusBadge status={item.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
                    <Button
                        onClick={onReject}
                        variant="outline"
                        className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                        <X className="h-4 w-4" />
                        Reject
                    </Button>
                    <Button
                        onClick={onApprove}
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                    </Button>
                </div>
            </div>
        </div>
    )
}
