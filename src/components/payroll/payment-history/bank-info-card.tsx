"use client"

import React from "react"
import { Landmark, Building2, User, Hash } from "lucide-react"
import Card from "@/components/ui/card"

import { defaultUserInfo } from "@/data/payroll-data"

const BankInfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2F9FE]">
            <Icon className="h-5 w-5 text-[#2563EB]" />
        </div>
        <div>
            <p className="text-xs font-medium text-[#000000]">{label}</p>
            <p className="text-sm font-semibold text-[#717680]">{value}</p>
        </div>
    </div>
)

export function BankInfoCard() {
    return (
        <Card title="Bank Information">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2">
                <BankInfoItem icon={Landmark} label="Bank Name" value={defaultUserInfo.bankName} />
                <BankInfoItem icon={Building2} label="Branch Name" value={defaultUserInfo.branchName} />
                <BankInfoItem icon={User} label="Account Holder name" value={defaultUserInfo.accountHolderName} />
                <BankInfoItem icon={Hash} label="Account Number" value={defaultUserInfo.accountNumber} />
                <BankInfoItem icon={Hash} label="Routing Number" value={defaultUserInfo.routingNumber} />
                <BankInfoItem icon={Hash} label="SWIFT Code" value={defaultUserInfo.swiftCode} />
            </div>
        </Card>
    )
}
