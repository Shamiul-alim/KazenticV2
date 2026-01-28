"use client"

import {
    ChevronsUpDown,
    LayoutDashboard,
} from "lucide-react"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table"
import PlayCircleIcon from "../icons/play-circle"

export function SprintMeta() {
    return (
        <div className="flex items-center gap-3 text-xs text-[#697588] mb-4">
            <span className="flex items-center gap-1 font-medium border-r-2 pr-3">
                <LayoutDashboard className="h-4 w-4" />
                Sprint Category
            </span>
            <span className="flex items-center gap-1 font-medium border-r-2 pr-3">
                <PlayCircleIcon className="h-4 w-4" />
                Sprint 2 (7/12 - 8/12)
            </span>
            <span>Confirmed: Dec 6 at 6:00 pm</span>
        </div>
    )
}

export function SprintStats() {
    const stats = [
        "Committed",
        "Added",
        "Removed",
        "Completed",
        "Remaining",
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {stats.map((label) => (
                <div
                    key={label}
                    className="rounded-lg border px-2.5 py-0.75"
                >
                    <p className="text-[11px] font-medium text-[#697588]">
                        {label}
                    </p>
                    <p className="text-xs font-semibold text-[#191F38]">
                        9 pts
                    </p>
                </div>
            ))}
        </div>
    )
}