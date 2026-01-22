"use client"

import * as React from "react"
import {
    Pencil,
    Plus,
    CircleDashed,
    ChevronUpCircle,
    ChevronsUpDown,
    ChevronRight,
    Minimize2
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
    { label: "Rename", icon: Pencil },
    { label: "New Status", icon: Plus },
    { label: "Edit Status", icon: CircleDashed, hasSubmenu: true },
    { label: "Collapse Group", icon: ChevronUpCircle },
    { label: "Collapse All Groups", icon: Minimize2 },
]

export const StatusActionMenu = () => {
    return (
        <div className="w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
            {menuItems.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-[14px] font-bold text-[#475569] tracking-tight">
                            {item.label}
                        </span>
                    </div>
                    {item.hasSubmenu && (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                </div>
            ))}
        </div>
    )
}
