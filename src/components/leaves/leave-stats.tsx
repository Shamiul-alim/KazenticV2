import * as React from "react"
import { Calendar, Clock, CheckCircle2, FileText, UserMinus, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    icon: React.ElementType
    label: string
    value: string | number
    iconColor: string
    bgColor: string
}

const StatCard = ({ icon: Icon, label, value, iconColor, bgColor }: StatCardProps) => (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm min-w-0 flex-1">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
)

export function LeaveStats() {
    const stats = [
        {
            icon: Calendar,
            label: "Total Leaves",
            value: "24",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Clock,
            label: "Pending Approval",
            value: "24",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: CheckCircle2,
            label: "Approved",
            value: "24",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Calendar,
            label: "Remaining Days",
            value: "24",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: FileText,
            label: "Paid Leave",
            value: "24",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: UserMinus,
            label: "Unpaid Leave",
            value: "24",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        }
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}
