/**
 * NestedFilter Component
 * 
 * A complex filtering system that allows users to add multiple conditions
 * with logical operators (AND/OR), filter types (Status, Priority, etc.),
 * and specific values.
 */

import * as React from "react"

// --- Icons ---
import { ChevronDown, X, Plus } from "lucide-react"

// --- UI Components ---
import { FilterOptionsPicker, type FilterOption } from "@/components/SprintReport/ui/filter-options-picker"
import { StatusPicker } from "@/components/SprintReport/ui/status-picker"

// --- Utilities ---
import { cn } from "@/lib/utils"

/* ==========================================================================
   TYPES & INTERFACES
   ========================================================================== */

interface FilterCondition {
    id: string
    operator: 'AND' | 'OR'
    filterType: string
    condition: string
    value: string
}

export const NestedFilter = () => {
    const [conditions, setConditions] = React.useState<FilterCondition[]>([
        { id: '1', operator: 'AND', filterType: 'Status', condition: 'Is', value: '' },
        { id: '2', operator: 'AND', filterType: 'Due Date', condition: 'Is', value: '' },
        { id: '3', operator: 'AND', filterType: 'Assignee', condition: 'Is', value: '' },
        { id: '4', operator: 'AND', filterType: 'Priority', condition: 'Is', value: '' },
        { id: '5', operator: 'AND', filterType: 'Tags', condition: 'Is', value: '' },
    ])

    const [openFilterPicker, setOpenFilterPicker] = React.useState<string | null>(null)
    const [openValuePicker, setOpenValuePicker] = React.useState<string | null>(null)

    const conditionTypes = ['Is', 'Is Not', 'Contains', 'Is Set', 'Is Not Set']

    const addCondition = () => {
        const newCondition: FilterCondition = {
            id: Date.now().toString(),
            operator: 'AND',
            filterType: 'Select Filter',
            condition: 'Is',
            value: ''
        }
        setConditions([...conditions, newCondition])
    }

    const removeCondition = (id: string) => {
        setConditions(conditions.filter(c => c.id !== id))
    }

    const updateCondition = (id: string, field: keyof FilterCondition, value: string) => {
        setConditions(conditions.map(c =>
            c.id === id ? { ...c, [field]: value } : c
        ))
    }

    // Close pickers when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.relative')) {
                setOpenFilterPicker(null)
                setOpenValuePicker(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleFilterSelect = (id: string, option: FilterOption) => {
        updateCondition(id, 'filterType', option.label)
        setOpenFilterPicker(null)
    }

    const firstCondition = conditions[0]

    return (
        <div className="w-full bg-gray-50/50 rounded-xl border border-gray-100 p-4 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase">Where</span>
                <button className="p-1 hover:bg-gray-200 rounded-md transition-colors">
                    <X size={14} className="text-gray-400" />
                </button>
            </div>

            {/* First Row - Dynamic "Where" row */}
            <div className="mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600 w-16">Where</span>

                    {/* Filter Type Dropdown with Picker */}
                    <div className="relative flex-1">
                        <div
                            className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium cursor-pointer hover:border-blue-400 transition-colors flex items-center justify-between"
                            onClick={() => setOpenFilterPicker(openFilterPicker === firstCondition.id ? null : firstCondition.id)}
                        >
                            <span>{firstCondition.filterType}</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        {openFilterPicker === firstCondition.id && (
                            <div className="absolute top-full left-0 mt-1 z-[100]">
                                <FilterOptionsPicker
                                    selectedOption={null}
                                    onSelect={(option) => handleFilterSelect(firstCondition.id, option)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Condition Dropdown */}
                    <div className="relative w-24">
                        <select
                            className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium appearance-none cursor-pointer hover:border-blue-400 transition-colors"
                            value={firstCondition.condition}
                            onChange={(e) => updateCondition(firstCondition.id, 'condition', e.target.value)}
                        >
                            {conditionTypes.map(cond => (
                                <option key={cond}>{cond}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Value Field with StatusPicker */}
                    <div className="relative flex-1">
                        <div
                            className="h-9 px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
                            onClick={() => {
                                setOpenValuePicker(openValuePicker === firstCondition.id ? null : firstCondition.id)
                                setOpenFilterPicker(null)
                            }}
                        >
                            {firstCondition.value ? (
                                <span className={cn(
                                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold",
                                    firstCondition.filterType === 'Status' ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700"
                                )}>
                                    {firstCondition.filterType === 'Status' && '✓ '}
                                    {firstCondition.value}
                                </span>
                            ) : (
                                <span className="text-[13px] text-gray-400">Select Option</span>
                            )}
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        {openValuePicker === firstCondition.id && firstCondition.filterType === 'Status' && (
                            <div className="absolute top-full right-0 mt-1 z-[100]">
                                <StatusPicker />
                            </div>
                        )}
                    </div>

                    {/* Remove Button */}
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Condition Rows */}
            {conditions.slice(1).map((condition) => (
                <div key={condition.id} className="mb-2">
                    <div className="flex items-center gap-2">
                        {/* Operator Dropdown */}
                        <div className="relative w-16">
                            <select
                                className="w-full h-9 px-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-semibold appearance-none cursor-pointer hover:border-blue-400 transition-colors"
                                value={condition.operator}
                                onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                            >
                                <option>AND</option>
                                <option>OR</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Filter Type Dropdown with Picker */}
                        <div className="relative flex-1">
                            <div
                                className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium cursor-pointer hover:border-blue-400 transition-colors flex items-center justify-between"
                                onClick={() => {
                                    setOpenFilterPicker(openFilterPicker === condition.id ? null : condition.id)
                                    setOpenValuePicker(null)
                                }}
                            >
                                <span>{condition.filterType}</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                            {openFilterPicker === condition.id && (
                                <div className="absolute top-full left-0 mt-1 z-[100]">
                                    <FilterOptionsPicker
                                        selectedOption={null}
                                        onSelect={(option) => handleFilterSelect(condition.id, option)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Condition Dropdown */}
                        <div className="relative w-24">
                            <select
                                className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 font-medium appearance-none cursor-pointer hover:border-blue-400 transition-colors"
                                value={condition.condition}
                                onChange={(e) => updateCondition(condition.id, 'condition', e.target.value)}
                            >
                                {conditionTypes.map(cond => (
                                    <option key={cond}>{cond}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Value Display with Picker */}
                        <div className="relative flex-1">
                            <div
                                className="h-9 px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
                                onClick={() => {
                                    setOpenValuePicker(openValuePicker === condition.id ? null : condition.id)
                                    setOpenFilterPicker(null)
                                }}
                            >
                                {condition.value ? (
                                    <span className={cn(
                                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold",
                                        condition.filterType === 'Priority' && "bg-blue-100 text-blue-700",
                                        condition.filterType === 'Tags' && "bg-purple-100 text-purple-700 border border-purple-300",
                                        condition.filterType === 'Task Type' && "bg-blue-100 text-blue-700 border border-blue-300",
                                        condition.filterType === 'Status' && "bg-green-100 text-green-700",
                                        !['Priority', 'Tags', 'Task Type', 'Status'].includes(condition.filterType) && "bg-gray-100 text-gray-700"
                                    )}>
                                        {condition.filterType === 'Priority' && '▶ '}
                                        {condition.filterType === 'Status' && '✓ '}
                                        {condition.value}
                                    </span>
                                ) : (
                                    <span className="text-[13px] text-gray-400">Select Option</span>
                                )}
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                            {openValuePicker === condition.id && condition.filterType === 'Status' && (
                                <div className="absolute top-full right-0 mt-1 z-[100]">
                                    <StatusPicker />
                                </div>
                            )}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removeCondition(condition.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Nested Filter Button */}
            <button
                onClick={addCondition}
                className="flex items-center gap-2 mt-3 px-3 py-2 text-[13px] font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <Plus size={16} className="text-gray-500" />
                Add Nested Filter
            </button>
        </div>
    )
}
