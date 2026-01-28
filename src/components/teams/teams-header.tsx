"use client"

import React from "react"
import { Button } from "@/components/sprint-report/ui/button"
import { ListFilter, Plus } from "lucide-react"

interface TeamsHeaderProps {
    onAddNew?: () => void
}

export function TeamsHeader({ onAddNew }: TeamsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4 border-b border-gray-100 bg-white">
            <h1 className="text-lg font-semibold text-[#111827]">All Teams</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none h-[38px] px-3 text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200">
                    <ListFilter className="size-4" />
                    Filter
                </Button>
                <Button
                    onClick={onAddNew}
                    className="flex-1 sm:flex-none h-[38px] px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center gap-2 rounded-lg font-medium shadow-sm transition-all duration-200"
                >
                    <Plus className="size-4" />
                    Add New
                </Button>
            </div>
        </div>
    )
}
