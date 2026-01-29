"use client"

import * as React from "react"
import { X, Calendar, Type, Clock, FileText, ChevronDown, HelpCircle } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/sprint-report/ui/button"
import { cn } from "@/lib/utils"

interface AddNoticeSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function AddNoticeSidebar({ isOpen, onClose }: AddNoticeSidebarProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[540px] p-0 border-none shadow-2xl bg-white">
                <SheetHeader className="px-6 py-5 flex flex-row items-center justify-between border-b border-gray-50">
                    <SheetTitle className="text-[18px] font-bold text-[#1e293b]">Add New Notice</SheetTitle>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </SheetHeader>

                <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
                    {/* Notice Title */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[14px] font-bold text-[#1e293b]">
                            <div className="h-6 w-6 flex items-center justify-center rounded-md border border-gray-200">
                                <FileText className="h-3.5 w-3.5" />
                            </div>
                            Notice Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Notice Title"
                            className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Date and Type Row */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[14px] font-bold text-[#1e293b]">
                                <div className="h-6 w-6 flex items-center justify-center rounded-md border border-gray-200">
                                    <Calendar className="h-3.5 w-3.5" />
                                </div>
                                Occasion Date
                            </label>
                            <input
                                type="text"
                                placeholder="dd/mm/yyyy"
                                className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-300"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[14px] font-bold text-[#1e293b]">
                                <div className="h-6 w-6 flex items-center justify-center rounded-md border border-gray-200">
                                    <HelpCircle className="h-3.5 w-3.5" />
                                </div>
                                Notice Type
                            </label>
                            <div className="relative">
                                <select className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-400">
                                    <option value="">Select</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Post Now */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[14px] font-bold text-[#1e293b]">
                            <div className="h-6 w-6 flex items-center justify-center rounded-md border border-gray-200">
                                <Clock className="h-3.5 w-3.5" />
                            </div>
                            Post Now
                        </label>
                        <div className="relative">
                            <select className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-400">
                                <option value="">Select</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[14px] font-bold text-[#1e293b]">
                            <div className="h-6 w-6 flex items-center justify-center rounded-md border border-gray-200">
                                <FileText className="h-3.5 w-3.5" />
                            </div>
                            Description
                        </label>
                        <textarea
                            rows={12}
                            className="w-full p-4 rounded-xl border border-gray-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
