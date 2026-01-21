"use client"

import * as React from "react"
import { Circle, Folder, Box, Flag, User, Calendar, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterOption {
    id: string
    label: string
    icon: React.ElementType
    color: string
}

const filterOptions: FilterOption[] = [
    { id: 'status', label: 'Status', icon: Circle, color: 'text-blue-500' },
    { id: 'project', label: 'Project', icon: Folder, color: 'text-gray-600' },
    { id: 'project-type', label: 'Project Type', icon: Box, color: 'text-gray-600' },
    { id: 'priority', label: 'Priority', icon: Flag, color: 'text-gray-600' },
    { id: 'assignee', label: 'Assignee', icon: User, color: 'text-gray-600' },
    { id: 'start-date', label: 'Start Date', icon: Calendar, color: 'text-gray-600' },
    { id: 'end-date', label: 'End Date', icon: Calendar, color: 'text-gray-600' },
]

interface FilterOptionsPickerProps {
    selectedOption?: FilterOption | null
    onSelect?: (option: FilterOption) => void
}

export const FilterOptionsPicker = ({ selectedOption, onSelect }: FilterOptionsPickerProps) => {
    return (
        <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter By</span>
            </div>

            {/* Filter Options List */}
            <div className="flex-1 overflow-y-auto py-1">
                {filterOptions.map((option) => {
                    const Icon = option.icon
                    const isSelected = selectedOption?.id === option.id

                    return (
                        <div
                            key={option.id}
                            className={cn(
                                "flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors group",
                                isSelected ? "bg-blue-50/70" : "hover:bg-gray-50"
                            )}
                            onClick={() => onSelect?.(option)}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={cn("w-4 h-4", option.color)} />
                                <span className={cn(
                                    "text-[13px] font-medium",
                                    isSelected ? "text-blue-600 font-semibold" : "text-gray-700"
                                )}>
                                    {option.label}
                                </span>
                            </div>
                            {isSelected && (
                                <Check className="w-4 h-4 text-blue-600" />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Export the filter options for use in other components
export { filterOptions }
export type { FilterOption }
