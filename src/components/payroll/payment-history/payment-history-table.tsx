"use client"

import React from "react"
import { ChevronUp, ChevronDown, CheckCircle, MoreHorizontal } from "lucide-react"

import { defaultPaymentHistory } from "@/data/payroll-data"

const SortingIcon = () => (
    <div className="flex flex-col -space-y-1">
        <ChevronUp className="h-2.5 w-2.5 text-gray-400" />
        <ChevronDown className="h-2.5 w-2.5 text-gray-400" />
    </div>
)

export function PaymentHistoryTable() {
    return (
        <div className="overflow-x-auto rounded-xl border border-[#F2F4F7]">
            <table className="w-full text-left text-sm min-w-[700px]">
                <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#F2F4F7]">
                        <th className="px-6 py-2.5 font-medium text-[#000000] whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                Invoice No. <SortingIcon />
                            </div>
                        </th>
                        <th className="px-6 py-2.5 font-medium text-[#000000] whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                Payment date <SortingIcon />
                            </div>
                        </th>
                        <th className="px-6 py-2.5 font-medium text-[#000000] whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                Payment type <SortingIcon />
                            </div>
                        </th>
                        <th className="px-6 py-2.5 font-medium text-[#000000] whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                Amount <SortingIcon />
                            </div>
                        </th>
                        <th className="px-6 py-2.5 font-medium text-[#000000] whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                Status <SortingIcon />
                            </div>
                        </th>
                        <th className="px-6 py-2.5 font-medium text-[#000000] whitespace-nowrap">
                            <div className="flex items-center gap-2 justify-center">
                                Action <SortingIcon />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F4F7]">
                    {defaultPaymentHistory.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-[#191F38] whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 text-[#191F38] whitespace-nowrap">{item.date}</td>
                            <td className="px-6 py-4 text-[#191F38] whitespace-nowrap">{item.type}</td>
                            <td className="px-6 py-4 font-semibold text-[#191F38] whitespace-nowrap">{item.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]">
                                    <CheckCircle className="h-3.5 w-3.5 fill-[#027A48] text-white" />
                                    PAID
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                <button className="text-[#98A2B3] hover:text-[#191F38] ml-2">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
