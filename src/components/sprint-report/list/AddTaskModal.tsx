/**
 * AddTaskModal Component
 * 
 * A large modal used to add existing tasks to a specific sprint.
 * Features a header, status filters, a task table, and a floating footer for bulk actions.
 */

import * as React from "react"

// --- Icons ---
import {
    X,
    ChevronDown,
    MoreHorizontal,
    Plus,
    Trash2,
    Calendar,
    Circle,
    CheckCircle2,
    Clock
} from "lucide-react"

// --- UI Components ---
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"

// --- Local Components ---
import { TaskTable } from "@/components/sprint-report/list/TaskTable"

// --- Utilities ---
import { cn } from "@/lib/utils"

interface AddTaskModalProps {
    isOpen: boolean
    onClose: () => void
}

export const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-none max-w-[1100px] w-full h-full sm:w-[90vw] sm:h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-white border-0 shadow-2xl">
                {/* Header */}
                <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between shrink-0 border-b border-gray-50">
                    <DialogTitle className="text-xl font-bold text-[#1e293b]">Add Task to Sprint</DialogTitle>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-500"
                    >
                        <X size={20} />
                    </button>
                </DialogHeader>

                {/* Sub-header / Filters */}
                <div className="px-6 py-3 flex items-center gap-3 shrink-0 border-b border-gray-50">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <ChevronDown size={16} />
                    </button>
                    <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        ACTIVE
                    </div>
                    <div className="bg-green-50 text-green-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                        4
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <MoreHorizontal size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <Plus size={16} />
                    </button>
                </div>

                {/* Main Content (Table) */}
                <div className="flex-1 overflow-auto p-4 bg-[#fcfcfc] no-scrollbar">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <TaskTable />
                    </div>
                </div>

                {/* Footer Selection Bar */}
                <div className="p-4 shrink-0 flex justify-center">
                    <div className="flex flex-wrap justify-center items-center gap-2 bg-[#f8faff] border border-blue-100 rounded-xl px-4 py-2 shadow-lg shadow-blue-100/50 w-full sm:w-auto">
                        <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                            <span className="text-[13px] font-bold text-gray-700 whitespace-nowrap">1 Tasks selected</span>
                            <button className="p-1 hover:bg-gray-200 rounded-full text-gray-400">
                                <X size={14} />
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-2 pl-2">
                            <Button variant="ghost" size="sm" className="h-9 px-3 text-[13px] font-bold text-gray-600 gap-2 hover:bg-white hover:shadow-sm">
                                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center p-0.5">
                                    <Clock size={10} />
                                </div>
                                <span className="hidden sm:inline">Add To Sprint 1 ((7/..)</span>
                                <span className="sm:hidden">Sprint 1</span>
                            </Button>

                            <Button variant="ghost" size="sm" className="h-9 px-3 text-[13px] font-bold text-gray-600 gap-2 hover:bg-white hover:shadow-sm">
                                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center p-0.5">
                                    <CheckCircle2 size={10} />
                                </div>
                                Status
                            </Button>

                            <Button variant="ghost" size="sm" className="h-9 px-3 text-[13px] font-bold text-gray-600 gap-2 hover:bg-white hover:shadow-sm">
                                <Calendar size={14} className="text-gray-400" />
                                Dates
                            </Button>

                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2">
                                <Trash2 size={18} />
                            </button>

                            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
