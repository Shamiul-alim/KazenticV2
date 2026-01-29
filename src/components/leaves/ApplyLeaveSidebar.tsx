"use client"

import * as React from "react"
import { Calendar, FileText, RotateCcw, User, UploadCloud, ChevronDown } from "lucide-react"
import { Button } from "@/components/sprint-report/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/sprint-report/ui/select"
import { cn } from "@/lib/utils"

interface ApplyLeaveSidebarProps {
    isOpen: boolean
    onClose: () => void
}

const FormLabel = ({ children, icon: Icon, optional }: { children: React.ReactNode, icon?: any, optional?: boolean }) => (
    <label className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2 text-[13px] font-bold text-slate-800">
            {Icon && <Icon size={16} className="text-slate-400" />}
            {children}
        </span>
        {optional && <span className="text-[11px] text-slate-400 font-medium">(Optional)</span>}
    </label>
)

const StyledInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className={cn(
            "w-full h-11 px-4 bg-[#f8fafc] border border-transparent rounded-xl text-[13px] font-medium outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300",
            props.className
        )}
    />
)

const StyledTextarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        {...props}
        className={cn(
            "w-full min-h-[180px] p-4 bg-[#f8fafc] border border-transparent rounded-2xl text-[13px] font-medium outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300 resize-none",
            props.className
        )}
    />
)

export function ApplyLeaveSidebar({ isOpen, onClose }: ApplyLeaveSidebarProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                side="right"
                    className="w-full sm:w-[680px] p-0 flex flex-col gap-0 border-l-0 shadow-2xl bg-white overflow-hidden"
            >
                {/* Header */}
                <SheetHeader className="px-6 py-4 flex flex-row items-center justify-between border-b border-slate-50 shrink-0 space-y-0">
                    <SheetTitle className="text-[16px] font-bold text-slate-800">Apply for Leave</SheetTitle>
                </SheetHeader>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-10">
                    <div className="flex flex-col gap-6">
                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FormLabel icon={Calendar}>Leave From</FormLabel>
                                <StyledInput placeholder="dd/mm/yyyy" />
                            </div>
                            <div>
                                <FormLabel icon={Calendar}>Leave To</FormLabel>
                                <StyledInput placeholder="dd/mm/yyyy" />
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <FormLabel icon={Calendar}>Duration</FormLabel>
                            <div className="h-11 flex items-center px-4 bg-[#f8fafc] rounded-xl text-[13px] font-bold text-blue-600">
                                1 day
                            </div>
                        </div>

                        {/* Leave Type */}
                        <div>
                            <FormLabel icon={RotateCcw}>Leave type</FormLabel>
                            <Select>
                                <SelectTrigger className="w-full h-11 bg-[#f8fafc] border-transparent rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-100 transition-all focus:border-blue-100 focus:ring-4 focus:ring-blue-50">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                    <SelectItem value="sick">Sick Leave</SelectItem>
                                    <SelectItem value="casual">Casual Leave</SelectItem>
                                    <SelectItem value="earned">Earned Leave</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Description */}
                        <div>
                            <FormLabel icon={FileText}>Description</FormLabel>
                            <StyledTextarea placeholder="Explain your reason here..." />
                        </div>

                        {/* Delegate */}
                        <div>
                            <FormLabel icon={User} optional>Assign Delegate</FormLabel>
                            <Select>
                                <SelectTrigger className="w-full h-11 bg-[#f8fafc] border-transparent rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-100 transition-all focus:border-blue-100 focus:ring-4 focus:ring-blue-50">
                                    <SelectValue placeholder="Select delegate" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                    <SelectItem value="d1">Pat Cummins</SelectItem>
                                    <SelectItem value="d2">Travis Head</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Attachments */}
                        <div>
                            <FormLabel icon={UploadCloud}>Attachments</FormLabel>
                            <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/30 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group">
                                <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={20} />
                                </div>
                                <div className="text-center">
                                    <p className="text-[13px] font-semibold text-slate-600">
                                        Drag or <span className="text-blue-600 underline">upload</span> your file
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">Maximum file size 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-50 flex items-center gap-3 shrink-0 bg-white">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 h-11 text-[13px] font-bold text-slate-500 hover:bg-slate-50 rounded-xl"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 h-11 bg-[#131A57] text-white text-[13px] font-bold rounded-xl hover:bg-[#1e276e] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/10"
                    >
                        Apply for Leave
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
