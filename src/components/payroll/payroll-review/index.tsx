"use client"

import React from "react"
import Link from "next/link"
import { Filter, Banknote } from "lucide-react"
import { Button } from "@/components/sprint-report/ui/button"
import { SalaryRevisionStats } from "./payroll-review-stats"
import { ApprovalList } from "./approval-list"

export default function SalaryRevision() {
    return (
        <div className="min-h-screen w-full bg-[#f8f9fa] p-4 md:p-6 lg:p-8">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 bg-white px-6 py-4 rounded-xl shadow-sm border-gray-100 border -mt-5">
                    <div className="flex items-center gap-2">
                        <Link href="/payroll/salary-revision-settings" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                            <Banknote className="h-4 w-4" />
                            Salary Revision
                        </Link>
                    </div>
                    <Button variant="outline" className="h-[36px] px-3 gap-2 text-gray-600 border-gray-200">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <SalaryRevisionStats />

                <ApprovalList />
            </div>
        </div>
    )
}
