/**
 * ListView Component
 * 
 * The primary view for managing tasks in a list format. 
 * Includes a toolbar for subtasks, grouping, filtering, and customization.
 * Displays summary metrics and grouped task tables.
 */

import * as React from "react"

// --- Icons ---
import {
    Plus,
    Filter,
    Settings2,
    ChevronDown,
    ChevronRight,
    LayoutGrid,
    List,
    Flag,
    Star,
    MoreHorizontal,
    FileText,
    MessageSquare,
    Link2,
    Calendar,
    User,
    GitBranch,
    Check,
    Circle,
    Tag,
    Package
} from "lucide-react"

// --- UI Components ---
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// --- Local Components ---
import { StatusPicker } from "@/components/sprint-report/components/status-picker"
import { AssigneePicker } from "@/components/sprint-report/components/assignee-picker"
import { CustomDatePicker } from "@/components/sprint-report/components/date-picker-custom"
import { StatusActionMenu } from "@/components/sprint-report/components/status-action-menu"
import { TaskTable } from "@/components/sprint-report/list/TaskTable"
import { FilterPopover } from "@/components/sprint-report/list/FilterPopover"
import { AssigneeSidebar } from "@/components/sprint-report/list/AssigneeSidebar"
import { CustomizeViewSidebar } from "@/components/sprint-report/list/CustomizeViewSidebar"
import { SubtaskPopover } from "@/components/sprint-report/SubtaskPopover"
import { AddTaskModal } from "@/components/sprint-report/list/AddTaskModal"
import { FilterOptionsPicker, filterOptions } from "@/components/sprint-report/components/filter-options-picker"

// --- Utilities ---
import { cn } from "@/lib/utils"

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

/**
 * SummaryCard: Renders a metric card with an icon and title/subtitle.
 */
interface SummaryCardProps {
    icon: any
    title: string
    subtitle: string
    colorClass: string
}
const SummaryCard = ({ icon: Icon, title, subtitle, colorClass }: SummaryCardProps) => (
    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClass)}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">{title}</span>
            <span className="text-xs text-gray-500 font-medium">{subtitle}</span>
        </div>
    </div>
)

export const ListView = () => {
    const [groupBy, setGroupBy] = React.useState("Status")
    const [groupPopoverNav, setGroupPopoverNav] = React.useState<"main" | "options">("main")
    const [isActiveExpanded, setIsActiveExpanded] = React.useState(true)
    const [isAssigneeOpen, setIsAssigneeOpen] = React.useState(false)
    const [isCustomizeOpen, setIsCustomizeOpen] = React.useState(false)
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false)
    const [subtaskMode, setSubtaskMode] = React.useState("Collapsed")

    return (
        <div className="flex flex-col h-full bg-[#f8faff] overflow-hidden">
            {/* List View Toolbar */}
            <div className="px-4 md:px-6 py-2 bg-white border-b border-gray-100 flex flex-wrap gap-2 items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 text-[12px] font-bold bg-white text-black gap-1.5 px-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:text-black shadow-sm transition-all">
                                <GitBranch size={14} className="rotate-90 text-gray-500" />
                                <span className="hidden sm:inline">Subtasks</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto" align="start" sideOffset={8}>
                            <SubtaskPopover selected={subtaskMode} onSelect={setSubtaskMode} />
                        </PopoverContent>
                    </Popover>
                    <Popover onOpenChange={(open) => !open && setGroupPopoverNav("main")}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 text-[12px] font-bold bg-white text-gray-900 gap-1.5 px-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:text-black shadow-sm transition-all active:scale-95">
                                <LayoutGrid size={14} className="text-gray-500" />
                                <span className="hidden sm:inline">Group by : </span>{groupBy}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto" align="start" sideOffset={8}>
                            <div className="flex items-start gap-1.5 pointer-events-none">
                                {/* Main Menu */}
                                <div className="w-[160px] bg-white rounded-xl shadow-2xl border border-gray-100 p-3 space-y-3 animate-in fade-in zoom-in duration-200 pointer-events-auto">
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setGroupPopoverNav(groupPopoverNav === "options" ? "main" : "options")}
                                            className={cn(
                                                "w-full flex items-center justify-between px-3 py-2 border rounded-xl transition-all group",
                                                groupPopoverNav === "options"
                                                    ? "border-blue-100 bg-blue-50 text-blue-600"
                                                    : "border-gray-100 hover:bg-gray-50 text-slate-600"
                                            )}
                                        >
                                            <span className="text-[13px] font-bold">{groupBy}</span>
                                            <ChevronRight size={14} className={cn("transition-transform", groupPopoverNav === "options" ? "text-blue-400 rotate-0" : "text-slate-300 group-hover:text-slate-500")} />
                                        </button>
                                        <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-100 rounded-xl hover:bg-gray-50 text-[13px] font-bold text-slate-600 transition-all group">
                                            Ascending
                                            <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />
                                        </button>
                                    </div>
                                    <div className="flex justify-end pt-1">
                                        <button className="text-red-500 text-[12px] font-extrabold hover:text-red-600 transition-colors px-1">
                                            Clear filter
                                        </button>
                                    </div>
                                </div>

                                {/* Options Flyout */}
                                {groupPopoverNav === "options" && (
                                    <div className="pointer-events-auto">
                                        <FilterOptionsPicker
                                            selectedOption={filterOptions.find(o => o.label === groupBy)}
                                            onSelect={(option) => {
                                                setGroupBy(option.label);
                                                setGroupPopoverNav("main");
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center gap-2 flex-wrap">

                    {/* Filter */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="h-[38px] min-w-[110px] px-3 flex items-center justify-center gap-1.5
        border-gray-100 bg-white hover:bg-gray-50
        text-gray-600 rounded-lg text-[12px] font-bold"
                            >
                                <Filter size={14} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Filter</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 border-none bg-transparent shadow-none w-auto"
                            align="end"
                            sideOffset={8}
                        >
                            <FilterPopover />
                        </PopoverContent>
                    </Popover>

                    {/* Assignee */}
                    <Button
                        variant="outline"
                        onClick={() => setIsAssigneeOpen(true)}
                        className="h-[38px] min-w-[110px] px-3 flex items-center justify-center gap-2
    border-gray-100 bg-white hover:bg-gray-50
    text-gray-700 rounded-lg text-[12px] font-bold"
                    >
                        <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-blue-600 text-white text-[9px] font-bold">
                                AH
                            </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline">Alif Hassan</span>
                    </Button>

                    {/* Customize */}
                    <Button
                        variant="outline"
                        onClick={() => setIsCustomizeOpen(true)}
                        className="h-[38px] min-w-[110px] px-3 flex items-center justify-center gap-1.5
    border-gray-100 bg-white hover:bg-gray-50
    text-gray-600 rounded-lg text-[12px] font-bold"
                    >
                        <Settings2 size={14} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Customize view</span>
                    </Button>

                    {/* Add Task */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => setIsAddTaskModalOpen(true)}
                        className="h-[38px] min-w-[140px] px-4 flex items-center justify-center gap-2 whitespace-nowrap
    text-[13px] font-bold
    bg-blue-600 hover:bg-blue-700 text-white
    border-0 active:scale-95 transition-all rounded-lg"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Add Task to Sprint</span>
                        <span className="sm:hidden">Add Task</span>
                    </Button>

                </div>
            </div>


            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <SummaryCard
                        icon={LayoutGrid}
                        title="Backlog"
                        subtitle="4 new tasks added"
                        colorClass="bg-green-100 text-green-600"
                    />
                    <SummaryCard
                        icon={User}
                        title="Unassigned"
                        subtitle="1 task missing assignee"
                        colorClass="bg-orange-100 text-orange-600"
                    />
                    <SummaryCard
                        icon={Calendar}
                        title="Missing Effort"
                        subtitle="1 task needs effort estimate"
                        colorClass="bg-red-100 text-red-600"
                    />
                </div>

                {/* Task List Section Header */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-1">
                        <div
                            onClick={() => setIsActiveExpanded(!isActiveExpanded)}
                            className="p-0.5 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                        >
                            {isActiveExpanded ? (
                                <ChevronDown size={14} className="text-gray-400" />
                            ) : (
                                <ChevronRight size={14} className="text-gray-400" />
                            )}
                        </div>
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            ACTIVE
                        </div>
                        <div className="bg-green-50 text-green-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                            4
                        </div>
                        <div className="flex items-center gap-3 ml-2">
                            <MoreHorizontal size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Plus size={14} className="text-gray-400 cursor-pointer hover:text-blue-600" />
                                </PopoverTrigger>
                                <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto" align="start">
                                    <StatusActionMenu />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {isActiveExpanded && <TaskTable />}
                </div>
            </div>

            <AssigneeSidebar
                isOpen={isAssigneeOpen}
                onClose={() => setIsAssigneeOpen(false)}
            />

            <CustomizeViewSidebar
                isOpen={isCustomizeOpen}
                onClose={() => setIsCustomizeOpen(false)}
            />

            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
            />
        </div>
    )
}
