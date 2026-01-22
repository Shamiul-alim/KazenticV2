"use client"

import * as React from "react"
import { Search, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { cn } from "@/lib/utils"

const assignees = [
    { id: "AH", name: "Alif Hassan", initials: "AH" },
    { id: "TA", name: "Tonmoy Asif", initials: "TA" },
    { id: "JD", name: "John Doe", initials: "JD" },
    { id: "NQ", name: "Nat qwe", initials: "NQ" },
]

export const AssigneePicker = ({
    selectedId = "AH",
    onSelect
}: {
    selectedId?: string,
    onSelect?: (id: string) => void
}) => {
    return (
        <div className="w-[240px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Search Bar */}
            <div className="p-2 border-b border-gray-50">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-50 border-none rounded-lg py-1.5 pl-9 pr-4 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-1 max-h-[300px] no-scrollbar">
                {assignees.map((person) => {
                    const isSelected = person.id === selectedId
                    return (
                        <div
                            key={person.id}
                            onClick={() => onSelect?.(person.id)}
                            className={cn(
                                "flex items-center justify-between px-3 py-2 cursor-pointer transition-colors group mx-1 rounded-lg",
                                isSelected ? "bg-blue-50/50" : "hover:bg-gray-50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-blue-600 text-white text-[8px] font-bold">
                                        {person.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <span className={cn(
                                    "text-[13px] font-bold tracking-tight",
                                    isSelected ? "text-blue-600" : "text-slate-600"
                                )}>
                                    {person.name}
                                </span>
                            </div>
                            {isSelected && (
                                <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
