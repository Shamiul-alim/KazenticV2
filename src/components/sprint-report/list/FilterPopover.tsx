"use client"

import * as React from "react"
import { Trash2, Plus, ChevronDown, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { StatusPicker } from "@/components/sprint-report/components/status-picker"
import { NestedFilter } from "@/components/sprint-report/components/nested-filter"
import { FilterOptionsPicker, type FilterOption } from "@/components/sprint-report/components/filter-options-picker"

const FilterRow = () => {
    const [isFilterOpen, setIsFilterOpen] = React.useState(false)
    const [selectedFilter, setSelectedFilter] = React.useState<FilterOption | null>(null)
    const [isOperatorOpen, setIsOperatorOpen] = React.useState(false)
    const [selectedOperator, setSelectedOperator] = React.useState<string>('Is')
    const [isOptionOpen, setIsOptionOpen] = React.useState(false)
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>(['TO DO'])
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const operatorRef = React.useRef<HTMLDivElement>(null)
    const optionRef = React.useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false)
            }
            if (operatorRef.current && !operatorRef.current.contains(event.target as Node)) {
                setIsOperatorOpen(false)
            }
            if (optionRef.current && !optionRef.current.contains(event.target as Node)) {
                setIsOptionOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelectFilter = (option: FilterOption) => {
        setSelectedFilter(option)
        setIsFilterOpen(false)
    }

    const handleSelectOperator = (operator: string) => {
        setSelectedOperator(operator)
        setIsOperatorOpen(false)
    }

    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 relative" ref={dropdownRef}>
                <div
                    className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <span className="text-[13px] text-gray-700 font-medium">
                        {selectedFilter ? selectedFilter.label : 'Select Filter'}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {/* FilterOptionsPicker Component */}
                {isFilterOpen && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                        <FilterOptionsPicker
                            selectedOption={selectedFilter}
                            onSelect={handleSelectFilter}
                        />
                    </div>
                )}
            </div>

            {/* Operator Dropdown */}
            <div className="w-[120px] relative" ref={operatorRef}>
                <div
                    className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => setIsOperatorOpen(!isOperatorOpen)}
                >
                    <span className="text-[13px] text-gray-700 font-medium">{selectedOperator}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {/* Operator Dropdown Menu */}
                {isOperatorOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                        <div
                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleSelectOperator('Is')}
                        >
                            <span className="text-[13px] text-gray-700">Is</span>
                            {selectedOperator === 'Is' && (
                                <Check size={16} className="text-blue-500" />
                            )}
                        </div>
                        <div
                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleSelectOperator('Is Not')}
                        >
                            <span className="text-[13px] text-gray-700">Is Not</span>
                            {selectedOperator === 'Is Not' && (
                                <Check size={16} className="text-blue-500" />
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Select Option Dropdown */}
            <div className="flex-[1.5] relative" ref={optionRef}>
                <div
                    className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => setIsOptionOpen(!isOptionOpen)}
                >
                    <span className="text-[13px] text-gray-700 font-medium">
                        {selectedOptions.length > 0 ? `${selectedOptions.length} selected` : 'Select Option'}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>

                {/* StatusPicker Component */}
                {isOptionOpen && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                        <StatusPicker />
                    </div>
                )}
            </div>

            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
            </button>
        </div>
    )
}

export const FilterPopover = () => {
    const [showNestedFilter, setShowNestedFilter] = React.useState(false)

    return (
        <div className="w-[90vw] sm:w-[700px] max-w-[700px] bg-white rounded-2xl border border-gray-100 shadow-2xl p-5 select-none">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-bold text-[#1e293b]">Filters</h3>
                <button className="text-[13px] font-semibold text-[#64748b] hover:text-blue-600 transition-colors">
                    Clear Filter
                </button>
            </div>

            <div className="bg-[#f8fafc]/50 rounded-xl border border-gray-100 p-4 mb-6">
                <FilterRow />
                <button
                    onClick={() => setShowNestedFilter(!showNestedFilter)}
                    className="flex items-center gap-2 h-9 px-3 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-[#64748b] hover:bg-gray-50 transition-colors"
                >
                    <Copy size={14} className="text-[#64748b]" />
                    Add Nested Filter
                </button>
            </div>

            {/* Nested Filter Section */}
            {showNestedFilter && (
                <div className="mb-6">
                    <NestedFilter />
                </div>
            )}

            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-10 px-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                <Plus size={18} />
                Add More Filter
            </Button>
        </div>
    )
}
