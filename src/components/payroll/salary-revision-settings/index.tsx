"use client"

import React, { useState } from "react"
import { RotateCcw, CheckCircle } from "lucide-react"
import { ApprovalTypeCard } from "./approval-type-card"
import { MultiLevelConfig } from "./multi-level-config"
import { SimpleApprovalConfig } from "./simple-approval-config"
import { CustomApprovalConfig } from "./custom-approval-config"

type ApprovalType = "simple" | "multi-level" | "custom"

interface ApprovalChainLevel {
    id: number
    role: string
    department: string
}

export default function SalaryRevisionSettings() {
    const [selectedApprovalType, setSelectedApprovalType] = useState<ApprovalType>("multi-level")

    // Mock data for display purposes
    const multiLevelChain: ApprovalChainLevel[] = [
        { id: 1, role: "HR Manager", department: "Human Resources" },
        { id: 2, role: "Finance Manager", department: "Finance" },
        { id: 3, role: "Director", department: "Executive" }
    ]

    const approvalTypes = [
        {
            type: "simple" as ApprovalType,
            title: "Simple Approval",
            description: "A single-level review by an assigned manager or HR representative",
            features: [
                "Single approval step",
                "Quick processing time",
                "Ideal for standard revisions",
                "Assign specific role or user"
            ]
        },
        {
            type: "multi-level" as ApprovalType,
            title: "Multi-Level Approval",
            description: "Sequential approvals from multiple roles (e.g., HR → Finance → Director)",
            features: [
                "Multiple sequential approvals",
                "Predefined approval chain",
                "Role-based routing",
                "Comprehensive review process"
            ],
            isRecommended: true
        }
    ]

    return (
        <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8 xl:p-10 font-sans">
            <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-8 md:gap-10">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-50 shrink-0">
                        <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div className="pt-0 sm:pt-1">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Salary Revision</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Configure approval workflows for salary revisions</p>
                    </div>
                </div>

                {/* Approval Types Grid */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 lg:p-8">
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-5 md:mb-6">Approval Types</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        {approvalTypes.map((approvalType) => (
                            <ApprovalTypeCard
                                key={approvalType.type}
                                type={approvalType.type}
                                title={approvalType.title}
                                description={approvalType.description}
                                features={approvalType.features}
                                isSelected={selectedApprovalType === approvalType.type}
                                isRecommended={approvalType.isRecommended}
                                onSelect={() => setSelectedApprovalType(approvalType.type)}
                            />
                        ))}

                        {/* Custom Approval Card - Full Width */}
                        <div
                            onClick={() => setSelectedApprovalType("custom")}
                            className={`col-span-1 lg:col-span-2 relative cursor-pointer flex flex-col md:flex-row md:items-start md:gap-8 p-5 md:p-6 rounded-2xl border transition-all ${selectedApprovalType === "custom"
                                ? "border-blue-500 bg-blue-50/40 shadow-sm"
                                : "border-gray-100 bg-white shadow-sm hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${selectedApprovalType === "custom" ? "border-blue-600 bg-white" : "border-gray-300 bg-white"
                                    }`}>
                                    {selectedApprovalType === "custom" && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">Custom Approval</h3>
                                    <p className="text-[13px] leading-relaxed text-gray-500 max-w-md">
                                        Define dynamic approval chains based on employee department, designation, or salary amount
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 pl-9 md:pl-0">
                                <div className="flex items-center gap-2.5 opacity-90">
                                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                    <span className="text-[13px] font-medium text-gray-600">Fully customizable workflow</span>
                                </div>
                                <div className="flex items-center gap-2.5 opacity-90">
                                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                    <span className="text-[13px] font-medium text-gray-600">Conditional routing rules</span>
                                </div>
                                <div className="flex items-center gap-2.5 opacity-90">
                                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                    <span className="text-[13px] font-medium text-gray-600">Department-specific chains</span>
                                </div>
                                <div className="flex items-center gap-2.5 opacity-90">
                                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                    <span className="text-[13px] font-medium text-gray-600">Amount-based thresholds</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Configuration Sections - Rendered conditionally based on selectedApprovalType */}
                {selectedApprovalType === "multi-level" && (
                    <MultiLevelConfig approvalChain={multiLevelChain} />
                )}

                {selectedApprovalType === "simple" && (
                    <SimpleApprovalConfig />
                )}

                {selectedApprovalType === "custom" && (
                    <CustomApprovalConfig />
                )}
            </div>
        </div>
    )
}
