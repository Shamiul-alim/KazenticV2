"use client"

import React, { useState } from "react"
import {
    Calendar,
    CalendarDays,
    User,
    Clock,
    Hourglass,
    ClipboardList,
    CheckCircle2,
    ClipboardCheck,
    ChevronDown,
    ChevronsUpDown,
    Plus,
    Trash2,
    FileText
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CreatePayslipProps {
    onBack: () => void
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="flex items-center gap-4 rounded-3xl border border-[#EBEBEB] bg-white p-5 shadow-sm min-w-[200px] flex-1">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
            <p className="text-sm font-bold text-[#191F38]">{label}</p>
            <p className="text-xl font-medium text-[#717680]">{value}</p>
        </div>
    </div>
)

export function CreatePayslip({ onBack }: CreatePayslipProps) {
    const [items, setItems] = useState([{ id: 1, name: "", earnings: 0, reductions: 0, total: 0 }])

    const addItem = () => {
        setItems([...items, { id: items.length + 1, name: "", earnings: 0, reductions: 0, total: 0 }])
    }

    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id))
        }
    }

    const stats = [
        { icon: Calendar, label: "Total Days Worked", value: "24", color: "bg-[#F2F9FE]" },
        { icon: CalendarDays, label: "Total Days Leave", value: "24", color: "bg-[#F2F9FE]" },
        { icon: User, label: "Total Days Absent", value: "24", color: "bg-[#F2F9FE]" },
        { icon: Clock, label: "Total Estimated Hours", value: "24", color: "bg-[#F2F9FE]" },
        { icon: Hourglass, label: "Total Hours Worked", value: "24", color: "bg-[#F2F9FE]" },
        { icon: ClipboardList, label: "Total Tasks In Progress", value: "24", color: "bg-[#F2F9FE]" },
        { icon: CheckCircle2, label: "Total Tasks Completed", value: "24", color: "bg-[#F2F9FE]" },
        { icon: ClipboardCheck, label: "Total Assigned Tasks", value: "24", color: "bg-[#F2F9FE]" },
    ]

    return (
        <div className="flex flex-col gap-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Pay Slip Form */}
            <div className="rounded-3xl border border-[#EBEBEB] bg-white p-8 shadow-sm">
                <h3 className="mb-8 text-xl font-bold text-[#191F38]">Pay Slip</h3>

                <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="w-full max-w-md">
                        <Input
                            placeholder="Enter Pay Slip Title"
                            className="h-12 rounded-2xl border-[#EBEBEB] bg-[#FDFDFD] px-6 text-sm text-[#717680] shadow-none"
                        />
                    </div>
                    <div className="w-full sm:w-[220px]">
                        <Select>
                            <SelectTrigger className="h-12 rounded-xl border-[#EBEBEB] bg-[#FDFDFD] px-4 text-sm">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Items Table */}
                <div className="overflow-hidden rounded-2xl border border-[#EBEBEB]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-[#F2F9FE] text-[#191F38]">
                                    <th className="px-6 py-4 font-bold border-r border-[#EBEBEB]">
                                        <div className="flex items-center gap-1">Sl <ChevronDown className="h-4 w-4" /></div>
                                    </th>
                                    <th className="px-6 py-3 font-bold border-r border-[#EBEBEB] whitespace-nowrap">
                                        <div className="flex items-center gap-2">Name <ChevronsUpDown className="h-3 w-3 text-[#717680]" /></div>
                                    </th>
                                    <th className="px-6 py-3 font-bold border-r border-[#EBEBEB] whitespace-nowrap">
                                        <div className="flex items-center gap-2">Earnings <ChevronsUpDown className="h-3 w-3 text-[#717680]" /></div>
                                    </th>
                                    <th className="px-6 py-3 font-bold border-r border-[#EBEBEB] whitespace-nowrap">
                                        <div className="flex items-center gap-2">Reductions <ChevronsUpDown className="h-3 w-3 text-[#717680]" /></div>
                                    </th>
                                    <th className="px-6 py-3 font-bold border-r border-[#EBEBEB] whitespace-nowrap">
                                        <div className="flex items-center gap-2">Total <ChevronsUpDown className="h-3 w-3 text-[#717680]" /></div>
                                    </th>
                                    <th className="px-6 py-3 font-bold whitespace-nowrap">
                                        <div className="flex items-center gap-2">Action <ChevronsUpDown className="h-3 w-3 text-[#717680]" /></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EBEBEB]">
                                {items.map((item, index) => (
                                    <tr key={index} className="bg-white hover:bg-gray-50/50">
                                        <td className="px-6 py-3 text-[#191F38] font-bold border-r border-[#EBEBEB]">{index + 1}.</td>
                                        <td className="px-6 py-3 border-r border-[#EBEBEB]">
                                            <Input
                                                placeholder="Type Here.."
                                                className="h-auto border-none bg-transparent p-0 text-sm text-[#717680] shadow-none focus-visible:ring-0"
                                            />
                                        </td>
                                        <td className="px-6 py-3 text-[#717680] border-r border-[#EBEBEB]">0 $</td>
                                        <td className="px-6 py-3 text-[#717680] border-r border-[#EBEBEB]">0 $</td>
                                        <td className="px-6 py-3 text-[#717680] border-r border-[#EBEBEB]">0 $</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-[#98A2B3] hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add new item button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={addItem}
                        className="flex items-center gap-2 text-sm font-semibold !text-[#4157FE] hover:opacity-80"
                    >
                        <Plus className="h-4 w-4" /> Add new invoice item
                    </button>
                </div>

                {/* Footer Section */}
                <div className="mt-16 flex items-center justify-between">
                    <p className="text-2xl font-bold !text-[#4157FE]">Total Amount: 0</p>
                    <Button className="h-14 flex items-center gap-2 bg-[#4157FE] text-white rounded-2xl hover:bg-[#3249e0] px-8 font-bold shadow-sm transition-all whitespace-nowrap">
                        <FileText className="h-5 w-5" />
                        Generate Payslip
                    </Button>

                </div>
            </div>
        </div>
    )
}
