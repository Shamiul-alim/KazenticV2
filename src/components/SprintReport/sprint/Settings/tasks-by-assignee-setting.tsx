"use client"

import React, { useState } from "react"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts"
import {
    RefreshCcw,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    X,
    Eye,
    ArrowUpDown,
    Layers,
    Filter,
} from "lucide-react"
import { Card } from "../../ui/card"
import { Switch } from "../../ui/switch"
import { cn } from "@/lib/utils"
import { TaskTable } from "../../list/TaskTable"

interface TasksByAssigneeSettingsProps {
    isOpen: boolean
    onClose: () => void
    data: any[]
}

export const TasksByAssigneeSettings = ({
    isOpen,
    onClose,
    data: initialData,
}: TasksByAssigneeSettingsProps) => {
    const [activeTab, setActiveTab] = useState<"Settings" | "Data">("Settings")

    if (!isOpen) return null

    // Use specific data from the image for the preview if we want to match it exactly, 
    // or use the passed data. The image shows: ACTIVE 4, IN PROGRESS 3, IN REVIEW 6.
    const previewData = [
        { name: 'ACTIVE', value: 4, color: '#a7f3d0' },
        { name: 'IN PROGRESS', value: 3, color: '#e9d5ff' },
        { name: 'IN REVIEW', value: 6, color: '#c7d2fe' },
    ]

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <Card className="w-full max-w-[1220px] h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-none animate-in zoom-in-95 duration-300">
                {/* ================= HEADER ================= */}
                <div className="h-14 px-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <HeaderIcon>
                            <ChevronLeft size={16} />
                        </HeaderIcon>
                        <HeaderIcon>
                            <ChevronRight size={16} />
                        </HeaderIcon>
                    </div>

                    <div className="flex items-center gap-2">
                        <HeaderIcon>
                            <RefreshCcw size={18} />
                        </HeaderIcon>
                        <HeaderIcon>
                            <MoreHorizontal size={18} />
                        </HeaderIcon>
                        <div className="w-px h-4 bg-gray-200 mx-1" />
                        <HeaderIcon danger onClick={onClose}>
                            <X size={18} />
                        </HeaderIcon>
                    </div>
                </div>

                {/* ================= BODY ================= */}
                <div className="flex flex-1 overflow-hidden">
                    {/* ===== LEFT: CHART PREVIEW ===== */}
                    <div className="flex-[1.45] bg-[#fcfcfc] border-r border-gray-100 p-8 flex flex-col">
                        <h3 className="text-[18px] font-bold text-slate-800 mb-6">
                            Pie Chart
                        </h3>

                        <div className="flex-1 min-h-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={previewData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {previewData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Inner labels simulation based on image */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                {/* This is just a visual simulation for the preview */}
                                <div className="absolute top-[20%] right-[25%] bg-white/90 backdrop-blur px-2 py-1 rounded-lg border border-gray-100 shadow-sm flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-emerald-500">ACTIVE</span>
                                    <span className="text-[10px] font-bold text-gray-800">4</span>
                                </div>
                                <div className="absolute top-[25%] left-[20%] bg-white/90 backdrop-blur px-2 py-1 rounded-lg border border-gray-100 shadow-sm flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-purple-500">IN PROGRESS</span>
                                    <span className="text-[10px] font-bold text-gray-800">3</span>
                                </div>
                                <div className="absolute bottom-[20%] left-[25%] bg-white/90 backdrop-blur px-2 py-1 rounded-lg border border-gray-100 shadow-sm flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-blue-500">IN REVIEW</span>
                                    <span className="text-[10px] font-bold text-gray-800">6</span>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-6 mt-6">
                            {previewData.map((item, index) => (
                                <LegendItem key={index} color={item.color} label={item.name} />
                            ))}
                        </div>
                    </div>

                    {/* ===== RIGHT: SETTINGS PANEL ===== */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 shrink-0">
                            {["Settings", "Data"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={cn(
                                        "flex-1 py-4 text-[13px] font-bold relative transition-colors",
                                        activeTab === tab
                                            ? "text-blue-600"
                                            : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
                            {activeTab === "Settings" ? (
                                <>
                                    {/* Display */}
                                    <Section title="Display">
                                        <Row label="Display as percentages">
                                            <Switch defaultChecked />
                                        </Row>
                                        <Row label="Show Legend">
                                            <Switch defaultChecked />
                                        </Row>
                                    </Section>

                                    {/* Data Section */}
                                    <Section title="Data">
                                        <SelectRow label="Show" value="All Statuses" icon={<Eye size={18} />} />
                                        <SelectRow
                                            label="Measure"
                                            value="Number of tasks"
                                            icon={<ArrowUpDown size={18} />}
                                        />
                                        <ArrowRow label="Group by" value="Status" icon={<Layers size={18} />} />
                                    </Section>

                                    {/* Filter Section */}
                                    <Section title="Filter">
                                        <ArrowRow label="Filter" value="None" icon={<Filter size={18} />} />
                                    </Section>
                                </>
                            ) : (
                                <div className="w-full h-full overflow-x-auto custom-scrollbar">
                                    <TaskTable />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

/* ================= HELPERS ================= */

const HeaderIcon = ({
    children,
    danger,
    onClick,
}: any) => (
    <button
        onClick={onClick}
        className={cn(
            "p-1.5 rounded-lg border border-gray-100 text-slate-400 hover:bg-gray-50 transition",
            danger && "hover:bg-red-50 hover:text-red-500"
        )}
    >
        {children}
    </button>
)

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-2">
        <span className="w-3.5 h-3.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            {label}
        </span>
    </div>
)

const Section = ({ title, children }: any) => (
    <div className="space-y-4">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            {title}
        </h4>
        {children}
    </div>
)

const Row = ({ label, children }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
        <span className="text-[13px] font-bold text-slate-600">{label}</span>
        {children}
    </div>
)

const SelectRow = ({ label, value, icon }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3 text-slate-400">
            {icon}
            <span className="text-[13px] font-bold text-slate-600">{label}</span>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5 shadow-sm min-w-[140px]">
            <span className="flex-1 text-[12px] font-bold text-slate-600">{value}</span>
            <ChevronDownIcon />
        </div>
    </div>
)

const ArrowRow = ({ label, value, icon }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
        <div className="flex items-center gap-3 text-slate-400">
            {icon}
            <span className="text-[13px] font-bold text-slate-600">{label}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[12px] font-bold">{value}</span>
            <ChevronRight size={14} />
        </div>
    </div>
)

const ChevronDownIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-slate-300"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
)
