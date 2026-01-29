"use client"

import { MoreHorizontal, Filter, ChevronDown, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { employeePayrollData } from "@/data/payroll-data"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/employee/ui/dropdown-menu"

const PositionBadge = ({ position }: { position: string }) => {
    let classes = ""
    switch (position) {
        case "Full-Time":
            classes = "bg-indigo-50 text-indigo-600 border-indigo-100"
            break
        case "Part-Time":
            classes = "bg-purple-50 text-purple-600 border-purple-100"
            break
        case "Contract":
            classes = "bg-orange-50 text-orange-600 border-orange-100"
            break
        default:
            classes = "bg-gray-100 text-gray-700"
    }
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes}`}>
            {position}
        </span>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    if (status === "PAID") {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-600 border-emerald-100">
                <CheckCircle className="h-3 w-3" />
                PAID
            </span>
        )
    }
    if (status === "PENDING") {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-50 text-amber-600 border-amber-100">
                <Clock className="h-3 w-3" />
                PENDING
            </span>
        )
    }
    if (status === "OVERDUE") {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-50 text-red-600 border-red-100">
                <AlertCircle className="h-3 w-3" />
                OVERDUE
            </span>
        )
    }
    return null
}

const ApprovalBadge = ({ approval }: { approval: string }) => {
    let classes = ""
    switch (approval) {
        case "COMPLETED":
            classes = "bg-emerald-50 text-emerald-600 border-emerald-100"
            return (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded border ${classes} text-xs font-medium`}>
                    {approval}
                </span>
            )
        case "HR Review":
            classes = "bg-blue-50 text-blue-600 border-blue-100"
            break
        case "Finance Review":
            classes = "bg-orange-50 text-orange-600 border-orange-100"
            break
        case "Director Approval":
            classes = "bg-purple-50 text-purple-600 border-purple-100"
            break
        default:
            classes = "bg-gray-100 text-gray-700"
    }
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded border ${classes} text-xs font-medium`}>
            {approval}
        </span>
    )
}

export function EmployeePayrollTable({ onRowClick }: { onRowClick?: () => void }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Employee Payroll (4)</h2>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        Export
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4 text-gray-500" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Employee Name <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Designation <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Position <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Email <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Number <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Joining Date <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Salary <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Status <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap">Approval <ChevronDown className="inline h-3 w-3 ml-1" /></th>
                                <th className="px-6 py-2.5 font-medium text-gray-500 whitespace-nowrap"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employeePayrollData.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    onClick={onRowClick}
                                >
                                    <td className="px-6 py-2.5 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-medium text-xs">
                                                {employee.avatar}
                                            </div>
                                            <span className="font-medium text-gray-900">{employee.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-2.5 text-gray-600 whitespace-nowrap">{employee.designation}</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap">
                                        <PositionBadge position={employee.position} />
                                    </td>
                                    <td className="px-6 py-2.5 text-gray-600 whitespace-nowrap">{employee.email}</td>
                                    <td className="px-6 py-2.5 text-gray-600 whitespace-nowrap">{employee.number}</td>
                                    <td className="px-6 py-2.5 text-gray-600 whitespace-nowrap">{employee.joiningDate}</td>
                                    <td className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap">{employee.salary}</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap">
                                        <StatusBadge status={employee.status} />
                                    </td>
                                    <td className="px-6 py-2.5 whitespace-nowrap">
                                        <ApprovalBadge approval={employee.approval} />
                                    </td>
                                    <td className="px-6 py-2.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="text-gray-400 hover:text-gray-600 p-2 outline-none">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[140px] p-0 overflow-hidden border-[#EBEBEB] rounded-xl shadow-lg">
                                                <DropdownMenuItem className="px-4 py-2 text-[#697588] font-medium cursor-pointer focus:bg-gray-50 focus:text-[#697588]">
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="px-4 py-2 text-[#4157FE] font-medium cursor-pointer bg-[#F2F9FE] focus:bg-[#ecf6ff] focus:text-[#4157FE]">
                                                    Profile
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
