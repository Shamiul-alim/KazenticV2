"use client"

import { pendingApprovalsData, ApprovalItem } from "@/data/payroll-data"
import { Eye, X, Check, CheckSquare, Square } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/sprint-report/ui/button"
import { PayslipReviewModal } from "./payslip-review-modal"

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
        <span className={`inline-flex items-center px-2 py-0.5 rounded border ${classes} text-xs font-medium`}>
            {status}
        </span>
    )
}

const PriorityBadge = ({ priority }: { priority: string }) => {
    if (priority === "High") {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded border bg-red-50 text-red-600 border-red-100 text-xs font-medium">
                High
            </span>
        )
    }
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded border bg-orange-50 text-orange-600 border-orange-100 text-xs font-medium">
            Medium
        </span>
    )
}

export function ApprovalList() {
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null)
    const allSelected = selectedItems.length === pendingApprovalsData.length

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedItems([])
        } else {
            setSelectedItems(pendingApprovalsData.map(item => item.id))
        }
    }

    const handleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleViewDetails = (item: ApprovalItem) => {
        setSelectedItem(item)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
    }

    const handleApprove = () => {
        // Handle approval logic
        console.log("Approved:", selectedItem?.name)
        handleCloseModal()
    }

    const handleReject = () => {
        // Handle rejection logic
        console.log("Rejected:", selectedItem?.name)
        handleCloseModal()
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-gray-900">Pending Approvals</h3>

            <div className="flex items-center gap-2 mb-2">
                <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    {allSelected ? (
                        <CheckSquare className="h-4 w-4 text-purple-600" />
                    ) : (
                        <Square className="h-4 w-4 text-gray-400" />
                    )}
                    Select all
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {pendingApprovalsData.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                        {/* Left Side: Avatar & Info */}
                        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto flex-1">
                            <div
                                className={`relative flex items-center justify-center shrink-0 border-l-[3px] pl-3 py-1 ${selectedItems.includes(item.id) ? 'border-purple-500' : 'border-blue-500'}`}
                            >
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm md:text-base">
                                    {item.avatar}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold text-base text-gray-900">{item.name}</span>
                                    <PriorityBadge priority={item.priority} />
                                    <StatusBadge status={item.status} />
                                </div>
                                <p className="text-xs md:text-sm text-gray-500">
                                    {item.designation} <span className="mx-1">·</span> Submitted: {item.submissionDate}
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Amount & Actions */}
                        <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 mt-2 md:mt-0">
                            <span className="font-bold text-lg text-gray-900">{item.amount}</span>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    onClick={() => handleViewDetails(item)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full border border-emerald-100 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedItem && (
                <PayslipReviewModal
                    item={selectedItem}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    )
}
