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
            <div className="min-h-screen w-full bg-[#f8f9fa] p-4 md:p-6 lg:p-8">
                <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
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
        <div className="min-h-screen w-full bg-[#f8f9fa] p-4 md:p-6 lg:p-8">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
                <PayrollAlert />

                <PayrollStats />

                <PayrollChart />

                <PayrollCharts />

                <EmployeePayrollTable onRowClick={() => setView("history")} />
            </div>
        </div>
    )
}
