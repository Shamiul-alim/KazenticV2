"use client"

import React from "react"
import { CheckCircle, Wallet, CircleDollarSign } from "lucide-react"

import { defaultUserInfo } from "@/data/payroll-data"

const SummaryCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
    <div className="flex items-center gap-4 rounded-3xl border border-[#EBEBEB] bg-[#FDFDFD] p-5 shadow-sm w-full sm:w-auto sm:min-w-[220px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F2F9FE]">
            <Icon className="h-7 w-7 text-[#2563EB]" />
        </div>
        <div>
            <p className="text-sm font-medium text-[#191F38]">{label}</p>
            <p className="text-2xl font-bold text-[#191F38]">{value}</p>
        </div>
    </div>
)

export function PaymentSummary() {
    return (
        <div className="mb-8 flex flex-wrap gap-6">
            <SummaryCard icon={CheckCircle} label="Total Paid" value={defaultUserInfo.stats.totalPaid} />
            <SummaryCard icon={Wallet} label="Total Unpaid" value={defaultUserInfo.stats.totalUnpaid} />
            <SummaryCard icon={CircleDollarSign} label="Total Fine" value={defaultUserInfo.stats.totalFine} />
        </div>
    )
}
