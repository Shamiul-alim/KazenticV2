"use client"

import React, { useState } from "react"
import {
    Search,
    Check,
    ArrowUpRight,
    Zap,
    CheckCircle2,
    RotateCcw,
    Clock,
    XCircle,
    Monitor,
    MinusCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusItem {
    id: string
    label: string
    icon: React.ReactNode
    color: string
}

const statuses: StatusItem[] = [
    { id: 'todo', label: 'TO DO', icon: <ArrowUpRight size={16} />, color: 'text-orange-500' },
    { id: 'in-progress', label: 'IN PROGRESS', icon: <Zap size={16} />, color: 'text-purple-500' },
    { id: 'active', label: 'ACTIVE', icon: <CheckCircle2 size={16} />, color: 'text-emerald-500' },
    { id: 'in-review', label: 'IN REVIEW', icon: <RotateCcw size={16} />, color: 'text-blue-500' },
    { id: 'pending', label: 'PENDING', icon: <Clock size={16} />, color: 'text-orange-400' },
    { id: 'rejected', label: 'REJECTED', icon: <XCircle size={16} />, color: 'text-red-500' },
    { id: 'qa', label: 'QUALITY ASSURANCE', icon: <Monitor size={16} />, color: 'text-purple-400' },
    { id: 'closed', label: 'CLOSED', icon: <MinusCircle size={16} />, color: 'text-emerald-500' },
]

interface StatusPopoverProps {
    onClose: () => void
    onSelect: (status: StatusItem) => void
    currentStatus?: string
}

export const StatusPopover = ({ onClose, onSelect, currentStatus }: StatusPopoverProps) => {
    const [search, setSearch] = useState("")

    const filteredStatuses = statuses.filter(s =>
        s.label.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="absolute top-10 left-0 z-[200] w-[280px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 animate-in fade-in zoom-in-95 duration-200">
            {/* Search */}
            <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-gray-50/80 border-none rounded-xl py-2.5 pl-10 pr-4 text-[13px] focus:ring-0 placeholder:text-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Statuses</span>
                <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">Select All</button>
            </div>

            {/* List */}
            <div className="space-y-0.5 max-h-[320px] overflow-y-auto custom-scrollbar">
                {filteredStatuses.map((status) => (
                    <button
                        key={status.id}
                        onClick={() => {
                            onSelect(status)
                            onClose()
                        }}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group",
                            currentStatus?.toLowerCase() === status.label.toLowerCase()
                                ? "bg-blue-50/50 text-blue-600"
                                : "hover:bg-gray-50 text-slate-600"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <span className={cn(status.color, "group-hover:scale-110 transition-transform")}>
                                {status.icon}
                            </span>
                            <span className="text-[12px] font-bold uppercase tracking-tight">{status.label}</span>
                        </div>
                        {currentStatus?.toLowerCase() === status.label.toLowerCase() && (
                            <Check size={16} className="text-blue-600" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
