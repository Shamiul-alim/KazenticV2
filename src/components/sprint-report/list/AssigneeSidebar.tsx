"use client"

import * as React from "react"
import { Search, X, Check, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { cn } from "@/lib/utils"

interface AssigneeItemProps {
    name: string
    count: number
    avatar?: string
    initials: string
    selected?: boolean
    isTeam?: boolean
}

const AssigneeItem = ({
    name,
    count,
    initials,
    selected,
    isTeam,
    onClick
}: AssigneeItemProps & { onClick?: () => void }) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50/50 group",
            selected && "bg-[#edf5ff]"
        )}
    >
        <div className="flex items-center gap-2.5">
            <div className="relative">
                <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                    <AvatarFallback className={cn(
                        "text-[10px] font-bold text-white",
                        isTeam ? "bg-[#131A57]" : "bg-blue-600"
                    )}>
                        {initials}
                    </AvatarFallback>
                </Avatar>
                {selected && !isTeam && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                        <Check size={8} className="text-white" strokeWidth={3} />
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <span className={cn(
                    "text-[12px] font-semibold",
                    selected ? "text-blue-700" : "text-slate-700"
                )}>
                    {name} <span className="text-slate-400 font-medium ml-0.5 text-[11px]">({count})</span>
                </span>
            </div>
        </div>
        <div className={cn(
            "w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center",
            selected
                ? "bg-blue-600 border-blue-600"
                : "border-slate-200 group-hover:border-blue-400"
        )}>
            {selected && <Check size={10} className="text-white" strokeWidth={3} />}
        </div>
    </div>
)

export const AssigneeSidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>(["AH"])

    const toggleId = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        )
    }

    const people = [
        { id: "AH", name: "Alif Hassan", count: 2, initials: "AH" },
        { id: "TA", name: "Tonmoy Asif", count: 2, initials: "TA" },
        { id: "JD", name: "John Doe", count: 3, initials: "JD" },
        { id: "U", name: "Unassigned", count: 9, initials: "U" },
    ]

    const teams = [
        { id: "KZ", name: "Kazentic", count: 0, initials: "KZ" },
    ]

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[100] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={cn(
                "fixed top-0 right-0 h-full w-full sm:w-[340px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] z-[101] transition-transform duration-300 ease-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[15px] font-bold text-slate-800">Select Assignees</h2>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 pb-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-9 pl-9 pr-4 bg-[#f8fafc] border border-transparent rounded-lg text-[13px] font-medium outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all"
                        />
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-3 no-scrollbar pb-24">
                    {/* People Section */}
                    <div className="mb-6">
                        <div className="px-3 py-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">People 4</span>
                        </div>
                        <div className="space-y-1">
                            {people.map(person => (
                                <AssigneeItem
                                    key={person.id}
                                    {...person}
                                    selected={selectedIds.includes(person.id)}
                                    onClick={() => toggleId(person.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Teams Section */}
                    <div>
                        <div className="px-3 py-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Teams</span>
                        </div>
                        <div className="space-y-1">
                            {teams.map(team => (
                                <AssigneeItem
                                    key={team.id}
                                    {...team}
                                    isTeam
                                    selected={selectedIds.includes(team.id)}
                                    onClick={() => toggleId(team.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-50 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.02)]">
                    <button
                        onClick={onClose}
                        className="w-full h-10 bg-[#131A57] text-white rounded-lg font-bold text-[13px] hover:bg-[#1e276e] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/10"
                    >
                        Save Selection ({selectedIds.length})
                    </button>
                </div>
            </div>
        </>
    )
}
