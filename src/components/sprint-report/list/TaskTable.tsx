/**
 * TaskTable Component
 * 
 * This component renders a task management table with columns for:
 * - Select (Checkbox)
 * - Task Name (with expand/collapse and actions)
 * - Priority (with Picker)
 * - Assignee (with Picker)
 * - Dates (Start/Due with Picker)
 * - Sprints & Sprint Points
 * - Time Estimates & Tracking
 */

import * as React from "react"

// --- Icons ---
import {
    ChevronDown,
    ChevronRight,
    Plus,
    Pencil,
    FileText,
    User,
    Calendar,
    Hourglass,
    Clock,
    Flag,
    Star,
    RefreshCw,
} from "lucide-react"

// --- UI Components ---
import { Checkbox } from "@/components/sprint-report/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/sprint-report/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/sprint-report/ui/popover"
import { StatusPicker } from "@/components/sprint-report/ui/status-picker"
import { AssigneePicker } from "@/components/sprint-report/ui/assignee-picker"
import { CustomDatePicker } from "@/components/sprint-report/ui/date-picker-custom"

// --- Utilities ---
import { cn } from "@/lib/utils"

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

/**
 * ColumnHeader: Renders a consistent header with a label and sort icon.
 */

/* ---------------- Column Header ---------------- */

const ColumnHeader = ({ label }: { label: string }) => (
    <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold uppercase text-slate-500/80 tracking-tight">
        {label}
        <ChevronDown size={11} className="text-slate-400" />
    </div>
)

/**
 * TaskRow: Renders a single row in the task table.
 */
interface TaskRowProps {
    id: string
    name?: string
    empty?: boolean
    priority?: string
    priorityColor?: string
}

const TaskRow = ({
    id,
    name,
    empty = false,
    priority = "Urgent",
    priorityColor = "#e11d48",
}: TaskRowProps) => (
    <div className="flex items-center h-[44px] border-b border-gray-100 hover:bg-[#f8fbff] text-[13px] min-w-max">
        {/* Checkbox */}
        <div className="w-[40px] shrink-0 flex justify-center">
            <Checkbox className="h-4 w-4" />
        </div>

        {/* Task Name */}
        <div className="w-[300px] sm:w-[500px] lg:w-[650px] shrink-0 flex items-center gap-1 px-2 transition-all duration-300">
            <ChevronRight size={14} className="text-gray-400" />
            <span
                className={cn(
                    "truncate font-semibold",
                    empty ? "text-gray-300" : "text-gray-800"
                )}
            >
                {empty ? "[kzt-1]" : `${id} ${name}`}
            </span>

            {!empty && (
                <div className="ml-auto flex items-center gap-1 opacity-0 hover:opacity-100">
                    <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-500">
                        <span>1</span>
                        <FileText size={10} />
                    </div>
                    <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-600">
                        <Plus size={12} />
                    </button>
                    <button className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-blue-600">
                        <Pencil size={12} />
                    </button>
                </div>
            )}
        </div>

        {/* Priority */}
        <div className="w-[140px] shrink-0 flex items-center justify-center">
            {!empty && (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                            <Flag size={14} style={{ color: priorityColor, fill: priorityColor }} />
                            <span className="font-semibold text-[#1e293b]">{priority}</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto z-[200]" align="start">
                        <StatusPicker />
                    </PopoverContent>
                </Popover>
            )}
        </div>

        {/* Assignee */}
        <div className="w-[140px] shrink-0 flex justify-center">
            {!empty ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-50">
                            <Avatar className="h-6 w-6 ring-1 ring-blue-200">
                                <AvatarFallback className="bg-blue-600 text-white text-[10px] font-bold">
                                    AH
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto z-[200]" align="start">
                        <AssigneePicker />
                    </PopoverContent>
                </Popover>
            ) : (
                <User size={16} className="opacity-30" />
            )}
        </div>

        {/* Start Date */}
        <div className="w-[140px] shrink-0 flex justify-center">
            {empty ? (
                <Calendar size={16} className="opacity-30" />
            ) : (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer hover:text-blue-600 transition-colors font-semibold text-gray-600 px-3 py-1 rounded-md hover:bg-blue-50/50">
                            21/01/26
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto z-[200]" align="center">
                        <CustomDatePicker />
                    </PopoverContent>
                </Popover>
            )}
        </div>

        {/* Due Date */}
        <div className="w-[140px] shrink-0 flex justify-center">
            {empty ? (
                <Calendar size={16} className="opacity-30" />
            ) : (
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer hover:text-blue-600 transition-colors font-semibold text-gray-600 px-3 py-1 rounded-md hover:bg-blue-50/50">
                            21/01/26
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto z-[200]" align="center">
                        <CustomDatePicker />
                    </PopoverContent>
                </Popover>
            )}
        </div>

        {/* Sprints */}
        <div className="w-[200px] shrink-0 flex items-center justify-center gap-3">
            {!empty ? (
                <>
                    <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Sprint 1 (7/12 - 8/12)</span>
                    <button className="w-7 h-7 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                        <Plus size={14} />
                    </button>
                </>
            ) : (
                <RefreshCw size={16} className="opacity-30" />
            )}
        </div>

        {/* Sprint Points */}
        <div className="w-[140px] shrink-0 flex items-center justify-center">
            {!empty ? (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Star size={14} className="text-gray-400" />
                    <span className="font-bold text-gray-700">2</span>
                </div>
            ) : (
                <Star size={16} className="opacity-30" />
            )}
        </div>

        {/* Estimated Time */}
        <div className="w-[140px] shrink-0 text-center font-semibold text-gray-600">
            {empty ? <Hourglass size={16} className="mx-auto opacity-30" /> : "1h"}
        </div>

        {/* Tracked Time */}
        <div className="w-[140px] shrink-0 text-center font-semibold text-gray-600">
            {empty ? <Clock size={16} className="mx-auto opacity-30" /> : "1h"}
        </div>
    </div>
)

export const TaskTable = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
            {/* Header Row */}
            <div className="flex items-center h-[44px] bg-[#f5faff] border-b border-[#e6f0ff] min-w-max">
                <div className="w-[40px] shrink-0 flex justify-center">
                    <Checkbox className="h-4 w-4" />
                </div>

                <div className="w-[300px] sm:w-[500px] lg:w-[650px] shrink-0 transition-all duration-300">
                    <ColumnHeader label="Task Name" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Priority" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Assignee" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Start Date" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Due Date" />
                </div>
                <div className="w-[200px] shrink-0">
                    <ColumnHeader label="Sprints" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Sprint Points" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Estimated Time" />
                </div>
                <div className="w-[140px] shrink-0">
                    <ColumnHeader label="Tracked Time" />
                </div>
            </div>

            {/* Task Data Rows */}
            <div className="flex flex-col min-w-max">
                <TaskRow id="[kzt-1]" name="Auth, Profile, Dashboard..." />
                <TaskRow id="[kzt-1]" name="Auth, Profile, Dashboard..." />
                <TaskRow id="[kzt-1]" name="Auth, Profile, Dashboard..." />
                <TaskRow id="[kzt-1]" name="Auth, Profile, Dashboard..." />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 h-[44px] px-4 text-[13px] text-gray-400 hover:bg-[#f8fbff] cursor-pointer border-t border-gray-50">
                <Plus size={16} />
                <span className="font-semibold">Create Task</span>
            </div>
        </div>
    )
}
