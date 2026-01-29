"use client"

import React, { useState } from "react"
import { PayrollAlert } from "./payroll-alert"
import { PayrollStats } from "./payroll-stats"
import { PayrollChart } from "./payroll-chart"
import { PayrollCharts } from "./payroll-charts"
import { EmployeePayrollTable } from "./employee-payroll-table"
import PaymentHistory from "./payment-history"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"

export default function Payroll() {
    const [view, setView] = useState<"dashboard" | "history">("dashboard")

    if (view === "history") {
        return (
            <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:gap-6 lg:gap-8">
                    <div>
                        <Button
                            variant="ghost"
                            onClick={() => setView("dashboard")}
                            className="flex items-center gap-2 text-[#4157FE]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Payroll
                        </Button>
                    </div>
                    <PaymentHistory />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:gap-6 lg:gap-8">
                <PayrollAlert />

                <div className="min-w-0">
                    <PayrollStats />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 min-w-0">
                    <PayrollChart />
                    <PayrollCharts />
                </div>

                <div className="min-w-0">
                    <EmployeePayrollTable onRowClick={() => setView("history")} />
                </div>
            </div>
        </div>
    )
}
