"use client"

import React from "react"
import { Filter, ChevronDown, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { UserInfoCard } from "./user-info-card"
import { BankInfoCard } from "./bank-info-card"
import { PaymentSummary } from "./payment-summary"
import { PaymentHistoryTable } from "./payment-history-table"
import { useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/employee/ui/dropdown-menu"
import CSVIcon from "@/components/guest/CSVmodule"
import PDFIcon from "@/components/guest/PDFmodule"
import ZIPIcon from "@/components/guest/ZIPmodule"

export default function PaymentHistory() {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-6 w-full bg-white p-4 sm:p-6 lg:p-8 min-h-screen">
            {/* Top Section: User and Bank Info */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <UserInfoCard />
                <BankInfoCard />
            </div>

            {/* Main Content Area */}
            <div className="rounded-3xl border border-[#EBEBEB] bg-white p-6 shadow-sm">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold text-[#191F38]">Pay Slip</h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 gap-2 border border-[#EBEBEB] text-[#191F38] rounded-xl hover:bg-gray-50 text-sm px-4 flex items-center bg-white shadow-none">
                                    Export <ChevronDown className="h-4 w-4 text-[#717680]" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px] p-1.5 rounded-2xl border-gray-100 shadow-xl mt-1">
                                <DropdownMenuItem className="flex items-center gap-3 p-2.5 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 cursor-pointer group">
                                    <CSVIcon className="size-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-sm font-semibold">CSV</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-3 p-2.5 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50/50 cursor-pointer group">
                                    <PDFIcon className="size-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                                    <span className="text-sm font-semibold">PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-3 p-2.5 rounded-xl text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 cursor-pointer group">
                                    <ZIPIcon className="size-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                                    <span className="text-sm font-semibold">ZIP</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" className="h-10 gap-2 border border-[#EBEBEB] text-[#717680] rounded-xl hover:bg-gray-50 text-sm px-4 flex items-center bg-white shadow-none">
                            <Filter className="h-4 w-4" /> Filter
                        </Button>
                        <Button variant="outline" className="h-10 gap-2 border border-[#EBEBEB] text-[#717680] rounded-xl hover:bg-gray-50 text-sm px-4 flex items-center bg-white shadow-none">
                            <Calendar className="h-4 w-4" /> <span className="hidden sm:inline">Select Date Range</span><span className="sm:hidden">Date</span> <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => router.push("/payroll/create-payroll")}
                            className="h-10 gap-2 bg-[#4157FE] text-white rounded-xl hover:bg-[#3249e0] text-sm px-4 font-semibold shadow-none flex items-center w-full sm:w-auto justify-center"
                        >
                            <Plus className="h-4 w-4" /> Create New
                        </Button>
                    </div>
                </div>

                <div className="min-w-0">
                    <PaymentSummary />
                </div>
                <div className="min-w-0">
                    <PaymentHistoryTable />
                </div>
            </div>
        </div>
    )
}
