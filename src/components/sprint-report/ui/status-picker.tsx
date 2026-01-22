"use client"

import * as React from "react"
import {
    Search,
    Check,
    TrendingUp,
    Zap,
    CheckCircle2,
    RotateCcw,
    Clock,
    XCircle,
    Monitor,
    MinusCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const statuses = [
    { id: "todo", label: "TO DO", icon: TrendingUp, color: "text-orange-500" },
    { id: "inprogress", label: "IN PROGRESS", icon: Zap, color: "text-purple-500", active: true },
    { id: "active", label: "ACTIVE", icon: CheckCircle2, color: "text-green-500" },
    { id: "inreview", label: "IN REVIEW", icon: RotateCcw, color: "text-blue-500" },
    { id: "pending", label: "PENDING", icon: Clock, color: "text-amber-700" },
    { id: "rejected", label: "REJECTED", icon: XCircle, color: "text-red-500" },
    { id: "qa", label: "QUALITY ASSURANCE", icon: "Monitor", color: "text-purple-600" },
    { id: "closed", label: "CLOSED", icon: MinusCircle, color: "text-emerald-600" },
]

export const StatusPicker = () => {
    return (
        <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-50">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-50 border-none rounded-lg py-1.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Statuses</span>
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Select All</button>
            </div>

            {/* Status List */}
            <div className="flex-1 overflow-y-auto py-1 max-h-[350px] no-scrollbar">
                {statuses.map((status) => {
                    const Icon = status.icon === "Monitor" ? Monitor : status.icon
                    return (
                        <div
                            key={status.id}
                            className={cn(
                                "flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors group",
                                status.active ? "bg-blue-50/50" : "hover:bg-gray-50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <Icon className={cn("w-5 h-5", status.color)} />
                                <span className={cn(
                                    "text-[13px] font-bold tracking-tight",
                                    status.active ? "text-blue-600" : "text-[#475569]"
                                )}>
                                    {status.label}
                                </span>
                            </div>
                            {status.active && (
                                <Check className="w-4 h-4 text-blue-600" />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
