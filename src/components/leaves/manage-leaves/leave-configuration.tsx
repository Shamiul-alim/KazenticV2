"use client"

import * as React from "react"
import { Filter, Plus, ChevronDown, CheckCircle2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/sprint-report/ui/button"
import { cn } from "@/lib/utils"
import { AddNoticeSidebar } from "./add-notice-sidebar"

interface CategoryItem {
    id: string
    slNo: string
    name: string
    daysAllowed: string
    status: "ACTIVE" | "INACTIVE"
}

interface TypeItem {
    id: string
    slNo: string
    typeName: string
    category: string
    status: "ACTIVE" | "INACTIVE"
}

const categories: CategoryItem[] = [
    { id: "1", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
    { id: "2", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
    { id: "3", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
    { id: "4", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
    { id: "5", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
    { id: "6", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
    { id: "7", slNo: "1.", name: "Paid Leave", daysAllowed: "12", status: "ACTIVE" },
]

const leaveTypes: TypeItem[] = [
    { id: "1", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
    { id: "2", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
    { id: "3", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
    { id: "4", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
    { id: "5", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
    { id: "6", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
    { id: "7", slNo: "1.", typeName: "Sick Leave", category: "Paid Leave", status: "ACTIVE" },
]

interface LeaveConfigurationProps {
    onBack?: () => void
}

export function LeaveConfiguration({ onBack }: LeaveConfigurationProps) {
    const [activeTab, setActiveTab] = React.useState<"category" | "type">("type")
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-6">
            {/* Tabs and Actions Header */}
            <div className="flex items-center justify-between border-b border-gray-100/50">
                <div className="flex items-center">
                    <button
                        onClick={() => setActiveTab("category")}
                        className={cn(
                            "px-6 py-3.5 text-sm font-semibold transition-all relative",
                            activeTab === "category" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        Category List
                        {activeTab === "category" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("type")}
                        className={cn(
                            "px-6 py-3.5 text-sm font-semibold transition-all relative",
                            activeTab === "type" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        Type List
                        {activeTab === "type" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2 pb-2">
                    <Button variant="outline" className="h-8 gap-2 text-gray-600 border-gray-200 rounded-lg px-3 text-xs font-bold shadow-none">
                        <Filter className="h-3.5 w-3.5" />
                        Filter
                    </Button>
                    <Button
                        onClick={() => setIsSidebarOpen(true)}
                        className="h-8 gap-2 bg-[#4157FE] text-white hover:bg-[#3249e0] px-4 rounded-lg text-xs font-bold shadow-none"
                    >
                        Add
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                <th className="px-5 py-2.5 font-bold text-gray-700 text-[11px] uppercase tracking-wider w-[80px]">Sl. No.</th>
                                <th className="px-5 py-2.5 font-bold text-gray-700 text-[11px] uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        {activeTab === "category" ? "Category Name" : "Type Name"}
                                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-5 py-2.5 font-bold text-gray-700 text-[11px] uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        {activeTab === "category" ? "No. of Days Allowed" : "Category"}
                                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-5 py-2.5 font-bold text-gray-700 text-[11px] uppercase tracking-wider text-right pr-10">
                                    <div className="flex items-center justify-end gap-1.5">
                                        Status
                                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {(activeTab === "category" ? categories : leaveTypes).map((item: any, index) => (
                                <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-5 py-2 text-gray-600 font-bold text-[13px]">{item.slNo}</td>
                                    <td className="px-5 py-2 text-gray-900 font-bold text-[13px]">
                                        {activeTab === "category" ? item.name : item.typeName}
                                    </td>
                                    <td className="px-5 py-2 text-gray-600 font-bold text-[13px]">
                                        {activeTab === "category" ? item.daysAllowed : item.category}
                                    </td>
                                    <td className="px-5 py-2 text-right pr-10">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-green-200 bg-green-50/50 text-green-600 text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-green-100 transition-colors">
                                            <CheckCircle2 className="h-3 w-3" />
                                            {item.status}
                                            <ChevronDown className="h-3 w-3 ml-0.5" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddNoticeSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    )
}
