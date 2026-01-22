import * as React from "react"
import { RefreshCcw, Maximize2, Filter, Settings, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface ChartHeaderProps {
    title: string
    className?: string
    showFilter?: boolean
    onSettingsClick?: () => void
    filterContent?: React.ReactNode
}

export const ChartHeader = ({ title, className, showFilter = true, onSettingsClick, filterContent }: ChartHeaderProps) => {
    return (
        <div className={cn("flex flex-wrap gap-4 justify-between items-center mb-6", className)}>
            <h3 className="text-gray-900 font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <RefreshCcw size={18} className="cursor-pointer hover:text-gray-600 transition-colors hidden sm:block" />
                <Maximize2 size={18} className="cursor-pointer hover:text-gray-600 transition-colors hidden sm:block" />
                {showFilter && (
                    filterContent ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Filter size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />
                            </PopoverTrigger>
                            <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto z-[200]" align="end" sideOffset={8}>
                                {filterContent}
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Filter size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />
                    )
                )}
                <Settings size={18} className="cursor-pointer hover:text-gray-600 transition-colors" onClick={onSettingsClick} />
                <MoreHorizontal size={18} className="cursor-pointer hover:text-gray-600 transition-colors" />
            </div>
        </div>
    )
}
