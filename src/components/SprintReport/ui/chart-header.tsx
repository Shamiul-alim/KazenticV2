import * as React from "react"
import { RefreshCcw, Maximize2, Filter, Settings, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChartHeaderProps {
    title: string
    className?: string
    showFilter?: boolean
    onSettingsClick?: () => void
}

export const ChartHeader = ({ title, className, showFilter = true, onSettingsClick }: ChartHeaderProps) => {
    return (
        <div className={cn("flex justify-between items-center mb-6", className)}>
            <h3 className="text-gray-900 font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-3 text-gray-400">
                <RefreshCcw size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />
                <Maximize2 size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />
                {showFilter && <Filter size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />}
                <Settings size={18} className="cursor-pointer hover:text-gray-600 transition-colors" onClick={onSettingsClick} />
                <MoreHorizontal size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />
            </div>
        </div>
    )
}
