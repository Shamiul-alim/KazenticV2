"use client"

import * as React from "react"
import { ChevronDown, LayoutGrid, Calendar, Star, RefreshCw, Filter, Settings2, Plus, List } from "lucide-react"
import { Button } from "@/components/sprint-report/ui/button"
import { Badge } from "@/components/sprint-report/ui/badge"
import { cn } from "@/lib/utils"

interface HeaderProps {
    activeTab: "reporting" | "list";
    onTabChange: (tab: "reporting" | "list") => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
    return (
        <div className="w-full bg-white border-b border-gray-100">
            {/* Top Bar */}
            <div className="px-6 h-12 flex items-center gap-4 text-sm whitespace-nowrap overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">K</div>
                    <span className="font-bold text-gray-900">Kazentic</span>
                    <ChevronDown size={16} className="text-gray-400" />
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <LayoutGrid size={16} />
                        Sprint Category
                    </div>

                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <div className="w-5 h-5 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center p-0.5">
                            <div className="w-full h-full bg-blue-500 rounded-full" />
                        </div>
                        Sprint 2 (7/12 - 8/12)
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>

                    <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 text-gray-400">
                        <span className="w-3 h-3 rounded border border-gray-300"></span>
                        <span className="text-xs font-semibold text-gray-500">Not Started</span>
                        <Star size={14} />
                    </div>

                    <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-xs font-semibold">Dec 7-8</span>
                    </div>

                    <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 text-gray-500">
                        <Star size={14} />
                        <span className="text-xs font-semibold">0 Points</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tab Bar */}
            <div className="px-6 flex items-center border-t border-gray-50 h-9">
                <div className="flex items-center gap-6 h-full">
                    <div
                        onClick={() => onTabChange("reporting")}
                        className={cn(
                            "relative flex items-center gap-1.5 font-bold h-full text-[12px] cursor-pointer transition-colors",
                            activeTab === "reporting" ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <LayoutGrid size={14} />
                        Sprint Reporting
                    </div>
                    <div
                        onClick={() => onTabChange("list")}
                        className={cn(
                            "relative flex items-center gap-1.5 font-bold h-full text-[12px] cursor-pointer transition-colors",
                            activeTab === "list" ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <List size={14} />
                        List
                    </div>
                </div>
            </div>

            {/* Action Bar (Only for Reporting) */}
            {activeTab === "reporting" && (
                <div className="px-6 py-2 flex justify-between items-center bg-gray-50/30">
                    <Button variant="outline" size="sm" className="bg-white gap-1.5 font-bold text-gray-600 h-7 px-2.5 text-[11px]">
                        <RefreshCw size={13} />
                        Refresh
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-white gap-1.5 font-bold text-gray-600 h-7 px-2.5 text-[11px]">
                            <Filter size={13} />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white gap-1.5 font-bold text-gray-600 h-7 px-2.5 text-[11px]">
                            <Settings2 size={13} />
                            Customize view
                        </Button>
                        <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-bold h-7 px-3 border-0 text-[11px]">
                            <Plus size={14} />
                            Add Widget
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
