"use client"

import {
    LayoutDashboard,
} from "lucide-react"
import PlayCircleIcon from "../icons/play-circle"
import { Button } from "../ui/button"
import { SprintSelectPopover } from "./sprint-select/sprint-select-popover"
import { SPRINTS_MOCK_DATA } from "@/data/sprint-data"

export function SprintMeta() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center text-[10px] sm:text-xs text-[#697588] mb-3 sm:mb-4">
            <SprintSelectPopover
                sprints={SPRINTS_MOCK_DATA}
                onChange={(sprintId) => { }}
                className="border-r-2"
            >
                <Button variant="ghost" size="sm" className="w-fit h-auto px-2 py-1 font-medium sm:border-r-2 sm:pr-3 rounded-none hover:bg-transparent">
                    <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                    Sprint Category
                </Button>
            </SprintSelectPopover>
            <SprintSelectPopover
                sprints={SPRINTS_MOCK_DATA}
                onChange={(sprintId) => { }}
            >
                <Button variant="ghost" size="sm" className="w-fit h-auto px-2 py-1 font-medium sm:border-r-2 sm:pr-3 rounded-none hover:bg-transparent">
                    <PlayCircleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                    <span className="truncate">Sprint 2 (7/12 - 8/12)</span>
                </Button>
            </SprintSelectPopover>
            <SprintSelectPopover
                sprints={SPRINTS_MOCK_DATA}
                onChange={(sprintId) => { }}
            >
                <Button variant="ghost" size="sm" className="w-fit h-auto px-2 py-1 font-medium rounded-none hover:bg-transparent">
                    <span className="truncate">Confirmed: Dec 6 at 6:00 pm</span>
                </Button>
            </SprintSelectPopover>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
            {stats.map((label) => (
                <div
                    key={label}
                    className="rounded-lg border px-2 sm:px-2.5 py-1 sm:py-0.75"
                >
                    <p className="text-[10px] sm:text-[11px] font-medium text-[#697588]">
                        {label}
                    </p>
                    <p className="text-xs sm:text-xs font-semibold text-[#191F38]">
                        9 pts
                    </p>
                </div>
            ))}
        </div>
    )
}