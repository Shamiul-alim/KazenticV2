"use client"

import React from "react"
import { PayrollAlert } from "./payroll-alert"
import { PayrollStats } from "./payroll-stats"
import { PayrollChart } from "./payroll-chart"
import { PayrollCharts } from "./payroll-charts"
import { EmployeePayrollTable } from "./employee-payroll-table"
import { useRouter } from "next/navigation"

export default function Payroll() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
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
                    <EmployeePayrollTable onRowClick={() => router.push("/payroll/employee-payroll")} />
                </div>
            </div>
        </div>
    )
}
