"use client"

import React from "react"
import { Filter, ChevronDown, Plus, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { UserInfoCard } from "./user-info-card"
import { BankInfoCard } from "./bank-info-card"
import { PaymentSummary } from "./payment-summary"
import { PaymentHistoryTable } from "./payment-history-table"
import { CreatePayslip } from "./CreatePayslip"


export default function PaymentHistory() {
    const [view, setView] = React.useState<"list" | "create">("list")

    if (view === "create") {
        return (
            <div className="flex flex-col gap-6 p-6 bg-[#FCFCFD] min-h-screen">
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => setView("list")}
                        className="flex items-center gap-2 !text-[#4157FE]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Pay Slip
                    </Button>
                </div>
                <CreatePayslip onBack={() => setView("list")} />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-[#FCFCFD] min-h-screen">
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
                        <Button variant="outline" className="h-10 gap-2 border border-[#EBEBEB] text-[#191F38] rounded-xl hover:bg-gray-50 text-sm px-4 flex items-center bg-white shadow-none">
                            Export <ChevronDown className="h-4 w-4 text-[#717680]" />
                        </Button>
                        <Button variant="outline" className="h-10 gap-2 border border-[#EBEBEB] text-[#717680] rounded-xl hover:bg-gray-50 text-sm px-4 flex items-center bg-white shadow-none">
                            <Filter className="h-4 w-4" /> Filter
                        </Button>
                        <Button variant="outline" className="h-10 gap-2 border border-[#EBEBEB] text-[#717680] rounded-xl hover:bg-gray-50 text-sm px-4 flex items-center bg-white shadow-none">
                            <Calendar className="h-4 w-4" /> <span className="hidden sm:inline">Select Date Range</span><span className="sm:hidden">Date</span> <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => setView("create")}
                            className="h-10 gap-2 bg-[#4157FE] text-white rounded-xl hover:bg-[#3249e0] text-sm px-4 font-semibold shadow-none flex items-center w-full sm:w-auto justify-center"
                        >
                            <Plus className="h-4 w-4" /> Create New
                        </Button>
                    </div>
                </div>

                <PaymentSummary />
                <PaymentHistoryTable />
            </div>
        </div>
    )
}
