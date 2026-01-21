import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
    label: string
    icon?: React.ReactNode
    variant?: 'blue' | 'green' | 'red' | 'orange' | 'purple'
    className?: string
}

export const StatusBadge = ({ label, icon, variant = 'blue', className }: StatusBadgeProps) => {
    const variants = {
        blue: "bg-blue-50 border-blue-200 text-blue-600",
        green: "bg-green-50 border-green-200 text-green-600",
        red: "bg-red-50 border-red-200 text-red-600",
        orange: "bg-orange-50 border-orange-200 text-orange-600",
        purple: "bg-purple-50 border-purple-200 text-purple-600",
    }

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold",
            variants[variant],
            className
        )}>
            {icon}
            {label}
        </div>
    )
}
