"use client"

import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/sprint-report/ui/popover"
import { Button } from "@/components/sprint-report/ui/button"
import { ChevronDown } from 'lucide-react'
import CSVIcon from './CSVmodule'
import PDFIcon from './PDFmodule'
import ZIPIcon from './ZIPmodule'
import { cn } from "@/lib/utils"

const ExportDropdown = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2 text-[#101828] font-semibold border-gray-200 hover:bg-gray-50 transition-all rounded-xl px-4 flex-1 sm:flex-none">
                    Export
                    <ChevronDown className="size-4 text-gray-500" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-1.5 rounded-2xl border-gray-100 shadow-xl mt-1 animation-all duration-300" align="end">
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all group">
                        <CSVIcon className="size-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-600">CSV</span>
                    </button>

                    <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-blue-600 bg-blue-50/50 transition-all group">
                        <PDFIcon className="size-5 text-blue-600" />
                        <span className="text-sm font-semibold">PDF</span>
                    </button>

                    <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all group">
                        <ZIPIcon className="size-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-600">ZIP</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ExportDropdown
