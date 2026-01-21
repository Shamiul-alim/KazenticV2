import * as React from "react"
import { cn } from "@/lib/utils"

interface MiniMetricProps {
    label: string
    value: string
    className?: string
}

export const MiniMetric = ({ label, value, className }: MiniMetricProps) => (
    <div className={cn("flex-1 bg-white border border-gray-100 rounded-xl p-3 min-w-[120px]", className)}>
        <div className="text-gray-400 text-xs font-semibold mb-1">{label}</div>
        <div className="text-gray-900 font-bold text-sm tracking-tight">{value}</div>
    </div>
)
