"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubtaskOptionProps {
    label: string
    selected: boolean
    onClick: () => void
}

const SubtaskOption = ({ label, selected, onClick }: SubtaskOptionProps) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors",
            selected ? "bg-blue-50/50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
        )}
    >
        <span className="text-[14px] font-medium">{label}</span>
        {selected && <Check size={16} className="text-blue-600" strokeWidth={3} />}
    </div>
)

export const SubtaskPopover = ({
    selected,
    onSelect
}: {
    selected: string,
    onSelect: (val: string) => void
}) => {
    const options = ["Collapsed", "Expanded", "Separate"]

    return (
        <div className="w-[180px] bg-white rounded-xl border border-gray-100 shadow-xl p-1.5 select-none">
            <div className="px-3 py-2">
                <span className="text-[12px] font-semibold text-slate-400">Filter Subtask</span>
            </div>
            <div className="space-y-0.5">
                {options.map(option => (
                    <SubtaskOption
                        key={option}
                        label={option}
                        selected={selected === option}
                        onClick={() => onSelect(option)}
                    />
                ))}
            </div>
        </div>
    )
}
